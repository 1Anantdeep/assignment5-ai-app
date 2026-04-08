# Smart PDF Helper

Smart PDF Helper is a small end-to-end AI-enabled application built for Assignment 5.

## What it does
This app answers user questions based on a fixed set of PDFs.

## Supported tasks
- summarize the PDFs
- answer questions from the PDFs
- show source file names

## Out of scope
- no login
- no user uploads
- no database
- no multi-user support

## Architecture
- Bronze: raw PDFs in `data/bronze`
- Gold: processed chunks in `data/gold/chunks.json`
- ETL: `scripts/etl.ts`
- Retrieval: `src/lib/retrieve.ts`
- LLM: Gemini API in `src/lib/gemini.ts`
- API route: `src/app/api/ask/route.ts`
- UI: Next.js frontend
- Deployment: Vercel

## How to run locally
```bash
npm install
npm run etl
npm run dev