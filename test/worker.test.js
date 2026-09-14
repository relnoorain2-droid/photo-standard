import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker/index.js";

const sourceImage = "data:image/jpeg;base64,aGVsbG8=";

test("returns generated image from OpenAI", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, init) => {
    const form = await init.body;
    assert.equal(form.get("size"), "1024x1024");
    assert.equal(form.get("quality"), "low");
    assert.equal(form.get("input_fidelity"), "high");
    return Response.json({
      data: [{ b64_json: "aW1hZ2U=" }]
    });
  };

  try {
    const response = await worker.fetch(new Request("https://example.com/api/process", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sourceImage, useApi: true })
    }), { OPENAI_API_ENABLED: "true", OPENAI_API_KEY: "test-key", ASSETS: { fetch: originalFetch } });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.image, "data:image/png;base64,aW1hZ2U=");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reports API off without calling provider", async () => {
  const response = await worker.fetch(new Request("https://example.com/api/process", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sourceImage, useApi: false })
  }), {});
  const body = await response.json();
  assert.equal(response.status, 409);
  assert.equal(body.status, "API_OFF");
});

test("protects provider when key is missing", async () => {
  const response = await worker.fetch(new Request("https://example.com/api/process", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sourceImage, useApi: true })
  }), { OPENAI_API_ENABLED: "true" });
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.status, "API_UNAVAILABLE");
});

test("keeps provider disabled unless explicitly enabled", async () => {
  const response = await worker.fetch(new Request("https://example.com/api/process", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sourceImage, useApi: true })
  }), { OPENAI_API_KEY: "test-key" });
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.status, "API_UNAVAILABLE");
});
