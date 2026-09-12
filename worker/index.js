const MAX_BODY_BYTES = 13_000_000;
const OPENAI_IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";
const OPENAI_IMAGE_MODEL = "gpt-image-1";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/process") {
      return processRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function processRequest(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "That photo is too large. Please use a smaller image." }, 413);
  }

  let body;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return json({ error: "That photo is too large. Please use a smaller image." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (body.useApi === false) {
    return json({ status: "API_OFF" }, 409);
  }

  if (env.OPENAI_API_ENABLED !== "true") {
    return json({ status: "API_UNAVAILABLE", error: "AI is turned off. Showing the browser result instead." }, 503);
  }

  if (!env.OPENAI_API_KEY) {
    return json({ status: "API_UNAVAILABLE", error: "AI is not connected yet." }, 503);
  }

  const source = parseImage(body.sourceImage);
  const current = body.currentImage ? parseImage(body.currentImage) : null;
  const instruction = typeof body.instruction === "string" ? body.instruction.trim().slice(0, 600) : "";

  if (!source) {
    return json({ error: "Please upload a valid JPG, PNG or WebP photo." }, 400);
  }
  if (body.currentImage && !current) {
    return json({ error: "The current result could not be read. Please upload the original again." }, 400);
  }

  const form = new FormData();
  form.append("model", env.OPENAI_IMAGE_MODEL || OPENAI_IMAGE_MODEL);
  form.append("image", dataUrlToFile(current || source, "photo.png"));
  form.append("prompt", buildPrompt(instruction, Boolean(current)));
  form.append("size", "1024x1536");
  form.append("quality", "medium");
  form.append("output_format", "png");
  form.append("input_fidelity", "high");

  let aiResponse;
  try {
    aiResponse = await fetch(OPENAI_IMAGE_EDIT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: form
    });
  } catch {
    return json({ status: "API_UNAVAILABLE", error: "AI could not connect." }, 502);
  }

  const result = await aiResponse.json().catch(() => null);
  if (!aiResponse.ok) {
    return json({
      status: "API_UNAVAILABLE",
      error: safeProviderMessage(result?.error?.message || "", aiResponse.status)
    }, aiResponse.status === 429 ? 429 : 502);
  }

  const imageBase64 = result?.data?.[0]?.b64_json;
  if (!imageBase64) {
    return json({ status: "API_UNAVAILABLE", error: "AI did not return an image." }, 502);
  }

  return json({ image: `data:image/png;base64,${imageBase64}` });
}

function buildPrompt(instruction, editingCurrentResult) {
  const requestedChange = instruction
    ? `\n\nRequested adjustment from user: ${instruction}\nApply this adjustment only if it stays identity-preserving and ICAO/UAE immigration-ready.`
    : "";

  return `Edit this photo to ICAO/UAE immigration standards. Keep the person's identity, facial features and natural skin tone unchanged. Face straight toward camera, head upright and perfectly centered, both sides of face clearly visible, eyes open and looking directly at camera, neutral expression with mouth closed. Use a plain light/white background, even shadow-free lighting, natural brightness/contrast and sharp quality. Crop as a close-up showing head and top of shoulders, with the face occupying approximately 70-80% of the photo. No blur, filters, retouching that changes appearance, red-eye, flash reflection, shadows, tilted pose, hair covering eyes, distracting objects or other people. Keep the final result natural and immigration/ICAO-ready.

The input image is ${editingCurrentResult ? "the current prepared result" : "the original identity reference"}. Preserve the original clothing color, neckline, shoulder shape, and visible accessories unless the requested adjustment explicitly says otherwise. Do not beautify, reshape, smooth skin, add makeup, change identity, generate a new person, or invent hidden facial details. If the source is too blurry, strongly turned, occluded, filtered, or missing identity-critical details, do not guess. Keep the safest possible crop and background cleanup. Never claim official approval or guaranteed acceptance.${requestedChange}`;
}

function parseImage(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || match[2].length > 12_000_000) return null;
  return { mimeType: match[1], data: match[2] };
}

function dataUrlToFile(image, fileName) {
  const bytes = Uint8Array.from(atob(image.data), (char) => char.charCodeAt(0));
  return new File([bytes], fileName, { type: image.mimeType });
}

function safeProviderMessage(message, status) {
  if (status === 429 || /quota|billing|credit|resource_exhausted|rate limit/i.test(message)) {
    return "AI limit reached. Showing the browser result instead.";
  }
  if (/api key|permission|unauthenticated|forbidden|unauthorized/i.test(message)) {
    return "AI key needs checking. Showing the browser result instead.";
  }
  return "AI could not process this photo. Showing the browser result instead.";
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}
