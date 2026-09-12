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

let sourceImage = "";
let currentImage = "";
let apiEnabled = false;
let busy = false;
let localSettings = defaultLocalSettings();

apiToggle.addEventListener("click", () => {
  apiEnabled = !apiEnabled;
  apiToggle.textContent = apiEnabled ? "On" : "Off";
  apiToggle.setAttribute("aria-pressed", String(apiEnabled));
  apiStatus.textContent = apiEnabled
    ? "On - use secure backend when available"
    : "Off - browser result only";
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
      : "Prepared locally in your browser as a 35:45 result.";
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
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let drawWidth;
  let drawHeight;

  if (imageRatio > targetRatio) {
    drawHeight = outputHeight * localSettings.zoom;
    drawWidth = drawHeight * imageRatio;
  } else {
    drawWidth = outputWidth * localSettings.zoom;
    drawHeight = drawWidth / imageRatio;
  }

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, outputWidth, outputHeight);
  context.filter = `brightness(${localSettings.brightness}) contrast(${localSettings.contrast})`;
  const x = (outputWidth - drawWidth) / 2 + localSettings.offsetX * outputWidth;
  const y = (outputHeight - drawHeight) / 2 + localSettings.offsetY * outputHeight;
  context.drawImage(image, x, y, drawWidth, drawHeight);
  context.filter = "none";
  return canvas.toDataURL("image/png");
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
