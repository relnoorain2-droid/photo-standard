const photoInput = document.querySelector("#photo-input");
const uploadButton = document.querySelector("#upload-button");
const uploadTitle = document.querySelector("#upload-title");
const processing = document.querySelector("#processing");
const processingTitle = document.querySelector("#processing-title");
const resultArea = document.querySelector("#result-area");
const originalPreview = document.querySelector("#original-preview");
const resultPreview = document.querySelector("#result-preview");
const changeInput = document.querySelector("#change-input");
const applyButton = document.querySelector("#apply-button");
const downloadButton = document.querySelector("#download-button");
const errorBox = document.querySelector("#error");
const retakeBox = document.querySelector("#retake");
const apiToggle = document.querySelector("#api-toggle");
const apiStatus = document.querySelector("#api-status");
const resultNoteText = document.querySelector("#result-note-text");
const API_PASSWORD = "noortctt";

let sourceImage = "";
let currentImage = "";
let apiEnabled = false;
let busy = false;
let localSettings = defaultLocalSettings();

apiToggle.addEventListener("click", () => {
  if (apiEnabled) {
    setApiEnabled(false);
    return;
  }

  const password = window.prompt("Enter password to turn on OpenAI API");
  if (password === API_PASSWORD) {
    clearMessages();
    setApiEnabled(true);
    return;
  }

  setApiEnabled(false);
  if (password !== null) {
    showError("Wrong password. OpenAI API stayed off.");
  }
});

uploadButton.addEventListener("click", () => {
  if (!busy) photoInput.click();
});

photoInput.addEventListener("change", async () => {
  const [file] = photoInput.files;
  if (!file) return;

  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
    showError("Please choose a JPG, PNG or WebP photo.");
    return;
  }

  if (file.size > 15 * 1024 * 1024) {
    showError("Please choose a photo smaller than 15 MB.");
    return;
  }

  try {
    clearMessages();
    localSettings = defaultLocalSettings();
    sourceImage = await prepareUpload(file);
    originalPreview.src = sourceImage;
    currentImage = "";
    resultArea.hidden = true;
    uploadTitle.textContent = file.name;
    await processPhoto("");
  } catch (error) {
    showError(error.message || "We could not read that photo. Please try another one.");
  }
});

applyButton.addEventListener("click", async () => {
  const instruction = changeInput.value.trim();
  if (!instruction || !sourceImage || busy) return;
  await processPhoto(instruction);
});

changeInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    applyButton.click();
  }
});

async function processPhoto(instruction) {
  setBusy(true, instruction ? "Applying your change..." : "Preparing your photo...");
  clearMessages();

  try {
    let result = null;
    if (apiEnabled) {
      result = await requestAiResult(instruction);
    }

    if (!result) {
      applyLocalInstruction(instruction);
      result = {
        image: await makeLocalResult(sourceImage),
        mode: "local"
      };
    }

    currentImage = await cropToSevenByNine(result.image);
    resultPreview.src = currentImage;
    downloadButton.href = currentImage;
    resultArea.hidden = false;
    changeInput.value = "";
    resultNoteText.textContent = result.mode === "api"
      ? "Prepared with AI, then cropped to 35:45."
      : "Prepared locally as a safer 35:45 crop. Turn AI on for full white-background cleanup.";
    requestAnimationFrame(() => resultArea.scrollIntoView({ behavior: "smooth", block: "start" }));
  } catch (error) {
    showError(error.message || "The photo could not be processed right now. Please try again.");
  } finally {
    setBusy(false);
  }
}

async function requestAiResult(instruction) {
  try {
    const response = await fetch("./api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceImage,
        currentImage: currentImage || undefined,
        instruction: instruction || undefined,
        useApi: apiEnabled
      })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      showError(payload.error || "AI is not available. Showing the browser-only result instead.");
      return null;
    }

    if (!payload.image) {
      showError("AI did not return a photo. Showing the browser-only result instead.");
      return null;
    }

    return { image: payload.image, mode: "api" };
  } catch {
    showError("AI is not reachable. Showing the browser-only result instead.");
    return null;
  }
}

function applyLocalInstruction(instruction) {
  const text = instruction.toLowerCase();
  if (!text) return;

  if (/more space|headroom|smaller|zoom out|less close|farther/.test(text)) {
    localSettings.zoom = Math.max(0.78, localSettings.zoom - 0.08);
  }
  if (/closer|larger|zoom in|bigger/.test(text)) {
    localSettings.zoom = Math.min(1.35, localSettings.zoom + 0.08);
  }
  if (/up|higher|top/.test(text)) {
    localSettings.offsetY = Math.max(-0.18, localSettings.offsetY - 0.04);
  }
  if (/down|lower|bottom/.test(text)) {
    localSettings.offsetY = Math.min(0.18, localSettings.offsetY + 0.04);
  }
  if (/left/.test(text)) {
    localSettings.offsetX = Math.max(-0.14, localSettings.offsetX - 0.04);
  }
  if (/right/.test(text)) {
    localSettings.offsetX = Math.min(0.14, localSettings.offsetX + 0.04);
  }
  if (/bright|lighter|lighten/.test(text)) {
    localSettings.brightness = Math.min(1.18, localSettings.brightness + 0.04);
  }
  if (/dark|darker/.test(text)) {
    localSettings.brightness = Math.max(0.86, localSettings.brightness - 0.04);
  }
  if (/contrast/.test(text)) {
    localSettings.contrast = Math.min(1.16, localSettings.contrast + 0.04);
  }
}

async function makeLocalResult(dataUrl) {
  const image = await loadImage(dataUrl);
  const outputWidth = 1050;
  const outputHeight = 1350;
  const targetRatio = outputWidth / outputHeight;
  const crop = await getLocalCrop(image, targetRatio);

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, outputWidth, outputHeight);
  context.filter = `brightness(${localSettings.brightness}) contrast(${localSettings.contrast})`;
  context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, outputWidth, outputHeight);
  context.filter = "none";
  cleanPlainBackground(context, outputWidth, outputHeight);
  return canvas.toDataURL("image/png");
}

async function getLocalCrop(image, targetRatio) {
  const face = await detectMainFace(image);
  if (face) {
    const faceCenterX = face.x + face.width / 2;
    const faceCenterY = face.y + face.height / 2;
    let cropHeight = face.height / (0.27 * localSettings.zoom);
    let cropWidth = cropHeight * targetRatio;

    const minWidth = Math.min(image.naturalWidth, image.naturalHeight * targetRatio);
    cropWidth = Math.max(cropWidth, minWidth * 0.76);
    cropHeight = cropWidth / targetRatio;

    if (cropWidth > image.naturalWidth) {
      cropWidth = image.naturalWidth;
      cropHeight = cropWidth / targetRatio;
    }
    if (cropHeight > image.naturalHeight) {
      cropHeight = image.naturalHeight;
      cropWidth = cropHeight * targetRatio;
    }

    const x = clamp(faceCenterX - cropWidth / 2 + localSettings.offsetX * cropWidth, 0, image.naturalWidth - cropWidth);
    const y = clamp(faceCenterY - cropHeight * 0.36 + localSettings.offsetY * cropHeight, 0, image.naturalHeight - cropHeight);
    return { x, y, width: cropWidth, height: cropHeight };
  }

  const sourceRatio = image.naturalWidth / image.naturalHeight;
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let x = 0;
  let y = 0;

  if (sourceRatio > targetRatio) {
    width = image.naturalHeight * targetRatio / localSettings.zoom;
    height = image.naturalHeight / localSettings.zoom;
  } else {
    width = image.naturalWidth / localSettings.zoom;
    height = image.naturalWidth / targetRatio / localSettings.zoom;
  }

  x = clamp((image.naturalWidth - width) / 2 + localSettings.offsetX * width, 0, image.naturalWidth - width);
  y = clamp((image.naturalHeight - height) / 2 + localSettings.offsetY * height, 0, image.naturalHeight - height);
  return { x, y, width, height };
}

async function detectMainFace(image) {
  if (!("FaceDetector" in window)) return null;

  try {
    const detector = new FaceDetector({ fastMode: true, maxDetectedFaces: 3 });
    const faces = await detector.detect(image);
    const largest = faces
      .map(face => face.boundingBox)
      .sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

    if (!largest || largest.width < 30 || largest.height < 30) return null;
    return {
      x: largest.x,
      y: largest.y,
      width: largest.width,
      height: largest.height
    };
  } catch {
    return null;
  }
}

function cleanPlainBackground(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const bg = estimateBorderColor(data, width, height);

  if (!isSafeToCleanBackground(bg)) {
    return;
  }

  const visited = new Uint8Array(width * height);
  const queue = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const index = y * width + x;
    if (visited[index]) return;
    const offset = index * 4;
    if (!isBackgroundPixel(data, offset, bg)) return;
    visited[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const index = queue.pop();
    const offset = index * 4;
    data[offset] = 255;
    data[offset + 1] = 255;
    data[offset + 2] = 255;

    const x = index % width;
    const y = Math.floor(index / width);
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  context.putImageData(imageData, 0, 0);
}

function estimateBorderColor(data, width, height) {
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  const sample = (x, y) => {
    const offset = (y * width + x) * 4;
    red += data[offset];
    green += data[offset + 1];
    blue += data[offset + 2];
    count += 1;
  };

  const step = 12;
  for (let x = 0; x < width; x += step) {
    sample(x, 0);
    sample(x, height - 1);
  }
  for (let y = 0; y < height; y += step) {
    sample(0, y);
    sample(width - 1, y);
  }

  return {
    red: red / count,
    green: green / count,
    blue: blue / count
  };
}

function isBackgroundPixel(data, offset, bg) {
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const distance = Math.hypot(red - bg.red, green - bg.green, blue - bg.blue);
  return distance < 46;
}

function isSafeToCleanBackground(bg) {
  const max = Math.max(bg.red, bg.green, bg.blue);
  const min = Math.min(bg.red, bg.green, bg.blue);
  const saturation = max - min;
  const brightness = (bg.red + bg.green + bg.blue) / 3;
  return saturation < 34 && brightness > 158;
}

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(max, Math.max(min, value));
}

function setBusy(value, title = "Preparing your photo...") {
  busy = value;
  processingTitle.textContent = title;
  processing.hidden = !value;
  uploadButton.hidden = value;
  photoInput.disabled = value;
  applyButton.disabled = value;
  changeInput.disabled = value;
  apiToggle.disabled = value;
}

function setApiEnabled(value) {
  apiEnabled = value;
  apiToggle.textContent = value ? "On" : "Off";
  apiToggle.setAttribute("aria-pressed", String(value));
  apiStatus.textContent = value
    ? "On - use secure backend when available"
    : "Off - browser result only";
}

function clearMessages() {
  errorBox.hidden = true;
  retakeBox.hidden = true;
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

async function prepareUpload(file) {
  const dataUrl = await readFile(file);
  const image = await loadImage(dataUrl);
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.9);
}

async function cropToSevenByNine(dataUrl) {
  const image = await loadImage(dataUrl);
  const targetRatio = 7 / 9;
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else if (sourceRatio < targetRatio) {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  const outputHeight = 1350;
  const outputWidth = 1050;
  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, outputWidth, outputHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, outputWidth, outputHeight);
  return canvas.toDataURL("image/png");
}

function defaultLocalSettings() {
  return {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    brightness: 1,
    contrast: 1
  };
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("We could not read that photo."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("We could not open that photo."));
    image.src = src;
  });
}
