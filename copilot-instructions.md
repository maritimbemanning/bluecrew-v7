# Bluecrew Copilot Instructions

## Project Overview

Norwegian maritime staffing platform (Next.js 16 + React 19 + Supabase). Two audiences:
- **B2B**: Shipping companies (rederier) seeking crew - the paying customers
- **Candidates**: Seafarers (sjøfolk) registering for jobs - the talent pool

All UI text is in Norwegian (bokmål). See [BRAND_REFERENCE.md](../BRAND_REFERENCE.md) for tone and messaging.

## Architecture

```
src/
├── app/            # Next.js App Router pages
│   ├── api/        # Route handlers with standardized middleware
│   └── [pages]/    # Page components with layout.tsx/page.tsx pattern
├── components/     # React components (ui/, sections/, seo/, layout/)
├── lib/            # Business logic, organized by domain
│   ├── api/        # API helpers: middleware.ts, types.ts
│   ├── auth/       # JWT session management (jose library)
│   ├── data/       # Static data (positions.ts - maritime roles)
│   ├── email/      # Resend email service with templates
│   ├── seo/        # Metadata generators for dynamic pages
│   ├── supabase/   # server.ts (SSR client), admin.ts (service role)
│   └── vipps/      # Vipps OAuth integration
├── hooks/          # Custom hooks (useCsrfToken, etc.)
└── types/          # TypeScript types + Supabase generated types
```

## Key Patterns

### Forms & API Routes
All forms follow this security pattern:
1. Client fetches CSRF token via `useCsrfToken()` hook
2. Form uses `react-hook-form` + `zod` validation from `lib/validations.ts`
3. Include `HoneypotField` component for spam protection
4. Send CSRF token in `x-csrf-token` header
5. API route uses middleware from `lib/api/middleware.ts`:
   - `checkHoneypot()` → `validateCsrf()` → `checkRateLimit()` → `validateBody()`

Example API route structure:
```typescript
import { createDebugLogger, checkHoneypot, validateCsrf, checkRateLimit, validateBody } from "@/lib/api/middleware";
import { successResponse, HttpStatus } from "@/lib/api/types";
```

### Supabase Usage
- **Server Components**: `import { createClient } from "@/lib/supabase/server"`
- **API Routes**: `import { supabaseAdmin } from "@/lib/supabase/admin"` (service role)
- **Never** use admin client in client components
- Types: `import type { Database } from "@/types/database.types"`

### Styling
- Tailwind CSS 4 with custom theme in `globals.css` (navy/gold/cream palette)
- Use `cn()` from `lib/utils.ts` for class merging
- Brand colors: `navy-900` (headings on light), `cream-50` (headings on dark), `gold-500` (CTAs)
- Font: Inter (weights 300, 400, 500 only - never bold/600)

### SEO
- Metadata generators in `lib/seo/metadata.ts` for dynamic pages
- `SchemaMarkup` component for JSON-LD structured data
- Images via `getImageUrl()` / `getOgImageUrl()` from `lib/images.ts`
- All pages need Norwegian `og:locale: "nb_NO"` and `canonical` URLs

### Position Data
Maritime roles (kaptein, styrmann, maskinist, eto, matros, kokk) defined in `lib/data/positions.ts` with salary, certifications, career paths, and SEO keywords.

## Commands

```bash
npm run dev          # Turbopack dev server
npm run build        # Production build
npm run lint         # ESLint (flat config)
npm run build:analyze # Bundle analyzer
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (API routes only)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (rate limiting)
- `CSRF_SECRET` (form security)
- `RESEND_API_KEY` (email)
- `VIPPS_*` variables (OAuth login)

## Conventions

- Import alias: `@/*` maps to `src/*`
- API responses use `successResponse()` / `errorResponse()` from `lib/api/types.ts`
- Rate limiting via Upstash Redis sliding window (`lib/rate-limit.ts`)
- Email via Resend with HTML templates in `lib/email/templates/`
- Norwegian phone format: 8 digits, optional +47 prefix
