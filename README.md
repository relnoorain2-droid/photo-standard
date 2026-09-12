# Photo Standard

A deliberately simple ICAO/UAE identity-photo preparation page:

1. Upload one JPG, PNG, or WebP photo.
2. The photo is processed immediately with the identity-preservation prompt.
3. Type one change request to refine the current result.
4. Download the final 35:45 image.

The AI key is used only by the server-side Cloudflare Worker and is never included in browser code.

## Run locally

Create a `.dev.vars` file:

```text
GEMINI_API_KEY=your_google_ai_studio_key
```

Then run:

```bash
npm install
npm run dev
```

## Deploy automatically from GitHub

Create a free Cloudflare account, make an API token with **Workers Scripts: Edit**, and add these repository secrets in **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GEMINI_API_KEY`

Push to `main`, or open **Actions → Deploy website → Run workflow**. GitHub will build and deploy the page and its secure processing API together. The live `workers.dev` address appears in the completed workflow log.

The website never describes a result as approved, certified, or guaranteed. Final acceptance is determined by the relevant government authority.
