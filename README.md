# Nutallis Brasil

E-commerce premium (multi-pagina) com Vite + React + tRPC + Express.

## Requisitos
- Node 18+ (recomendado 20)
- pnpm

## Rodar localmente
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
pnpm start
```

## Variaveis de ambiente
Copie o arquivo .env.example e preencha os valores do Supabase (Postgres + Auth).

## Deploy na Vercel (fullstack)
- Build Command: pnpm build
- Output Directory: dist/public
- Environment Variables: use as variaveis do .env.example

A API roda via Vercel Serverless Functions em /api (ver pasta api/).
