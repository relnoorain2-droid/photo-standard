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

let sourceImage = "";
let currentImage = "";
let busy = false;

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
  if (!instruction || !currentImage || busy) return;
  await processPhoto(instruction);
});

changeInput.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    applyButton.click();
  }
});

async function processPhoto(instruction) {
  setBusy(true, instruction ? "Applying your change…" : "Preparing your photo…");
  clearMessages();

  try {
    const response = await fetch("./api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceImage,
        currentImage: currentImage || undefined,
        instruction: instruction || undefined
      })
    });

    const payload = await response.json().catch(() => ({}));
    if (response.status === 422 && payload.status === "RETAKE_REQUIRED") {
      showRetake(payload.message || "A new photo is needed to preserve identity reliably.");
      return;
    }
    if (!response.ok) {
      throw new Error(payload.error || "The photo could not be processed right now. Please try again.");
    }

    const exactRatioImage = await cropToSevenByNine(payload.image);
    currentImage = exactRatioImage;
    resultPreview.src = currentImage;
    downloadButton.href = currentImage;
    resultArea.hidden = false;
    changeInput.value = "";
    requestAnimationFrame(() => resultArea.scrollIntoView({ behavior: "smooth", block: "start" }));
  } catch (error) {
    showError(error.message || "The photo could not be processed right now. Please try again.");
  } finally {
    setBusy(false);
  }
}

function setBusy(value, title = "Preparing your photo…") {
  busy = value;
  processingTitle.textContent = title;
  processing.hidden = !value;
  uploadButton.hidden = value;
  photoInput.disabled = value;
  applyButton.disabled = value;
  changeInput.disabled = value;
}

function clearMessages() {
  errorBox.hidden = true;
  retakeBox.hidden = true;
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function showRetake(message) {
  retakeBox.textContent = `Retake required: ${message}`;
  retakeBox.hidden = false;
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
  return canvas.toDataURL("image/jpeg", .9);
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
