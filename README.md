# Photo Standard

A deliberately simple ICAO/UAE identity-photo preparation page:

1. Upload one JPG, PNG, or WebP photo.
2. Keep AI off for an instant browser-only 35:45 crop.
3. Turn AI on for OpenAI background/composition cleanup through the Cloudflare backend.
4. Download the final 35:45 image.

The OpenAI key is stored only as a Cloudflare deployment secret. It is never included in browser code. If AI mode is off, the key is missing, OpenAI is unavailable, or the limit is reached, the page keeps working with the local browser-only crop.

## Run locally

Create a `.dev.vars` file:

```text
OPENAI_API_KEY=your_openai_key
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
- `OPENAI_API_KEY`

Push to `main`, or open **Actions → Deploy website → Run workflow**. GitHub will deploy the page and its secure AI backend together. The live `workers.dev` address appears in the completed workflow log.

The website never describes a result as approved, certified, or guaranteed. Final acceptance is determined by the relevant government authority.
