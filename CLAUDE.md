@AGENTS.md

# Orbius Agency — orbius.agency

## Projeto
Site institucional + LP de vendas + Blog para agência de social media marketing focada em PMEs italianas.

## Stack
Next.js 14+ (App Router) + TypeScript + Tailwind CSS + MDX para blog

## Identidade Visual
- Navy escuro #0C1B2A como background principal
- Dourado #C9A84C como cor de destaque
- Font: Outfit (Google Fonts)
- Ícone: olho com estrela (representando visão estratégica + brilho do cliente)

## Estrutura
- / → Home institucional
- /offerta → Grand Slam Offer (LP de vendas)
- /blog → Lista de artigos
- /blog/[slug] → Artigo individual
- /contatti → Página de contato

## Para criar novo post no blog:
1. Criar arquivo .mdx em /content/blog/
2. Adicionar frontmatter (title, description, date, category)
3. Escrever conteúdo em Markdown
4. Fazer push — Vercel deploya automaticamente

## Deploy
Vercel (free tier) — domínio orbius.agency apontado via DNS da Hostinger

## Idioma
Todo conteúdo em italiano. Bastidores em português.
