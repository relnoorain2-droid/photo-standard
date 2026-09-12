import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker/index.js";

const sourceImage = "data:image/jpeg;base64,aGVsbG8=";

test("returns the generated image from Gemini", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({
    candidates: [{ content: { parts: [{ inlineData: { mimeType: "image/png", data: "aW1hZ2U=" } }] } }]
  });

  try {
    const response = await worker.fetch(new Request("https://example.com/api/process", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sourceImage })
    }), { GEMINI_API_KEY: "test-key" });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.image, "data:image/png;base64,aW1hZ2U=");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("returns a retake result without inventing a face", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({
    candidates: [{ content: { parts: [{ text: "STATUS: RETAKE_REQUIRED\nThe face is severely blurred." }] } }]
  });

  try {
    const response = await worker.fetch(new Request("https://example.com/api/process", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sourceImage })
    }), { GEMINI_API_KEY: "test-key" });
    const body = await response.json();
    assert.equal(response.status, 422);
    assert.equal(body.status, "RETAKE_REQUIRED");
    assert.match(body.message, /severely blurred/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("does not call the provider without a secure deployment key", async () => {
  const response = await worker.fetch(new Request("https://example.com/api/process", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sourceImage })
  }), {});
  assert.equal(response.status, 503);
});
