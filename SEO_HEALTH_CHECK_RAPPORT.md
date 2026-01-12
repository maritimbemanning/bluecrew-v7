# 🔍 SEO & PERFORMANCE HEALTH CHECK RAPPORT
**Dato:** 12. januar 2026  
**Prosjekt:** bluecrew-v7 (bluecrew.no)  
**Status:** GRUNDIG GJENNOMGANG UTEN KODEENDRINGER

---

## ✅ KRITISKE SEO-ELEMENTER (BEHOLDER RANKING)

### 1. **Robots.txt & Indexing** ✅ BRA
- **`src/app/robots.ts`**: Dynamisk robots.txt - KORREKT
  - ✅ Tillater crawling på produksjon
  - ✅ Blokkerer `/api/`, `/_next/`, `/admin/`
  - ✅ Blokkerer `/images/fullogo_transparent.png` (unødvendig indexing)
  - ✅ Sitemap URL: `https://bluecrew.no/sitemap.xml`
  - ⚠️ **VIKTIG**: Ingen `public/robots.txt` fil (bra! - dynamisk overtar)

### 2. **Sitemap.xml** ✅ UTMERKET
- **`src/app/sitemap.ts`**: Dynamisk sitemap med smart prioritering
  - ✅ B2B-prioritering (rederi, havbruk, bemanning = 0.95)
  - ✅ Lønn/karriere sider = 0.9 (høy SEO-verdi!)
  - ✅ Henter aktive stillinger fra Supabase
  - ✅ Crew articles inkludert
  - ✅ Ekskluderer `/lonn/oversikt` (redirecter til `/lonn`)
  - ✅ Ekskluderer `/slett-data` (noindex)
  - ✅ Change frequency: weekly/daily/monthly (realistisk)

### 3. **Canonical URLs** ⚠️ MANGLER PÅ MANGE SIDER
- **Root layout**: ✅ Canonical til `https://bluecrew.no`
- **Homepage**: ✅ Canonical til `https://bluecrew.no`
- **`/lonn/oversikt`**: ✅ Canonical til `/lonn` (redirect page)
- **PROBLEM**: Ingen canonical tags på individuelle sider!
  - ❌ `/lonn/kaptein`, `/karriere/maskinist`, etc. mangler canonical
  - ❌ 92 `.tsx` filer - kun 3 har canonical tags
  - **RISIKO**: Duplicate content hvis Vercel preview URLs blir indeksert

### 4. **Meta Robots Tags** ✅ KORREKT IMPLEMENTERT
- **Root layout**: `index: true, follow: true` ✅
- **Beskyttede sider** har `noindex, nofollow`:
  - ✅ `/profil` - noindex ✅
  - ✅ `/mine-soknader` - noindex ✅
  - ✅ `/lonn/oversikt` - noindex (men redirecter) ✅
- **Ingen sider** har feil noindex-tags

### 5. **Vercel.json - Preview URL Beskyttelse** ✅ PERFEKT!
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [{"type": "host", "value": "bluecrew.no"}],
      "headers": [{"key": "X-Robots-Tag", "value": "index, follow"}]
    },
    {
      "source": "/(.*)",
      "has": [{"type": "host", "value": ".*\\.vercel\\.app"}],
      "headers": [{"key": "X-Robots-Tag", "value": "noindex, nofollow"}]
    }
  ],
  "redirects": [
    {
      "source": "/:path*",
      "has": [{"type": "host", "value": "(?!bluecrew\\.no|www\\.bluecrew\\.no).*\\.vercel\\.app"}],
      "destination": "https://bluecrew.no/:path*",
      "permanent": true
    }
  ]
}
```
- ✅ **X-Robots-Tag** blokkerer Vercel preview URLs
- ✅ **301 redirect** fra preview URLs til bluecrew.no
- ✅ **BESKYTTER SEO-RANKING!**

---

## 📊 STRUCTURED DATA (SCHEMA.ORG)

### ✅ UTMERKET IMPLEMENTERING
1. **Root Layout** (`layout.tsx`):
   - ✅ WebSite schema (Google Sitelinks)
   - ✅ LocalBusiness schema (Google Business)
   - ✅ EmploymentAgency type
   - ✅ SearchAction (søkefunksjon)
   - ✅ AggregateRating (5.0 stjerner)

2. **Homepage** (`page.tsx`):
   - ✅ Organization schema
   - ✅ OfferCatalog (tjenester)
   - ✅ ContactPoint

3. **Alle schemas** lastes med `strategy="lazyOnload"` ✅ (performance)

---

## 🚀 PERFORMANCE OPTIMALISERING

### ✅ NEXT.JS CONFIG - UTMERKET!
```typescript
// next.config.ts highlights:
- optimizePackageImports: [supabase, react-hook-form, zod, jose, redis]
- removeConsole: true (production)
- productionBrowserSourceMaps: false
- compress: true
- poweredByHeader: false
- Image optimization: webp, avif
- Aggressive caching: 1 år på static assets
```

### ✅ LAYOUT.TSX - PERFORMANCE BEST PRACTICES
- ✅ DNS Prefetch: `plausible.io`
- ✅ Preconnect: `plausible.io`
- ✅ Preload critical fonts (Inter)
- ✅ Preload LCP image (`/images/hero/background.webp`)
- ✅ `fetchPriority="high"` på hero image
- ✅ Analytics: `lazyOnload` strategy

### ✅ LAZY LOADING
- **Homepage**: `AktueltSection` og `TeamGrid` lazy loaded ✅
- Reduserer initial bundle size

---

## 🔒 SECURITY HEADERS

### ✅ NEXT.CONFIG.TS - SECURITY
```typescript
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=()
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000
- Content-Security-Policy (production only)
```

---

## 🎯 SEO REDIRECTS (301)

### ✅ NEXT.CONFIG.TS - REDIRECTS
```typescript
// Old v2 URLs → New v3 URLs (permanent 301)
/jobbsoker → /sjofolk
/jobbsoker/registrer → /meld-interesse
/sjofolk/registrer → /meld-interesse
/kunde → /rederi
/kunde/registrer-behov → /rederi/behov
/kunde/hva-vi-hjelper-med → /rederi/bemanning
/kontakt-oss → /kontakt
/omoss → /om-oss
/om → /om-oss
/jobb → /stillinger
/ledige-stillinger → /stillinger
/blogg → /crew
/blog → /crew
/aktuelt → /crew
```
- ✅ **14 redirects** bevarer gammel ranking
- ✅ Alle er `permanent: true` (301)

---

## 📁 PUBLIC FOLDER - STATISKE FILER

### ✅ KORREKT OPPSETT
- ✅ `google9b95b649ea8f9e71.html` - Google Search Console verification
- ✅ `ai.txt` - AI crawling policy (bra for fremtiden!)
- ✅ `icon.png` - Favicon
- ✅ Ingen `robots.txt` (dynamisk overtar) ✅
- ✅ Bilder optimert som `.webp`

---

## ⚠️ KRITISKE PROBLEMER FUNNET

### 🔴 PROBLEM 1: MANGLENDE CANONICAL TAGS (HØYESTE PRIORITET!)
**Risiko:** Duplicate content hvis Vercel preview URLs blir indeksert

**Berørte sider (89 av 92 sider mangler canonical):**
- `/lonn/kaptein`, `/lonn/styrmann`, `/lonn/maskinist`, etc.
- `/karriere/kaptein`, `/karriere/styrmann`, etc.
- `/rederi/*` alle undersider
- `/stillinger/*` alle stillinger
- `/crew/*` alle artikler
- `/kampanje/*` alle kampanjesider

**Løsning:**
```typescript
// Legg til i ALLE page.tsx filer:
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: 'https://bluecrew.no/[FULL_PATH]',
  },
};
```

**Eksempel:**
```typescript
// src/app/lonn/kaptein/page.tsx
alternates: {
  canonical: 'https://bluecrew.no/lonn/kaptein',
},
```

---

### 🟡 PROBLEM 2: SLETT-DATA SIDE MANGLER NOINDEX
**Fil:** `src/app/slett-data/page.tsx`

**Status:** ❌ Ingen metadata definert!

**Risiko:** GDPR-side kan bli indeksert

**Løsning:**
```typescript
export const metadata: Metadata = {
  title: 'Slett dine data | Bluecrew',
  description: 'Be om sletting av dine personopplysninger i henhold til GDPR.',
  robots: {
    index: false,
    follow: false,
  },
};
```

---

### 🟡 PROBLEM 3: LIGHTHOUSE REPORT ER FOR STOR
**Fil:** `lighthouse-report.json` (624,222 characters!)

**Problem:** Kan ikke leses/analyseres

**Løsning:** Slett filen eller flytt til `.gitignore`

---

## 🎨 BRAND & CONTENT

### ✅ DOKUMENTASJON
- ✅ `BRAND_REFERENCE.md` - Brand guidelines
- ✅ `IMAGE-GUIDE.md` - Image optimization guide
- ✅ `CAMPAIGN_API_SCHEMA.md` - API dokumentasjon
- ✅ `CURRENT_STATUS.md` - Prosjektstatus
- ✅ `copilot-instructions.md` - AI instructions

---

## 📈 SEO KEYWORDS & METADATA

### ✅ ROOT LAYOUT - PERFEKT TARGETING
```typescript
title: "Bluecrew – Maritim Bemanning | Bemanningsbyrå & Vikarbyrå for Sjøfolk"
description: "Bemanningsbyrå og vikarbyrå for maritim sektor..."
keywords: [
  "bemanningsbyrå",
  "vikarbyrå", 
  "maritim bemanning",
  "bemanningsbyrå maritim",
  "vikarbyrå sjøfolk",
  "offshore bemanning",
  "rederi bemanning",
  "havbruk bemanning",
  "sjøfolk",
  "mannskap",
  "maritim rekruttering"
]
```

### ✅ HOMEPAGE - OPTIMALISERT FOR KONVERTERING
```typescript
title: "Bemanningsbyrå | Maritim Bemanning for Oppdrett, Offshore og Shipping"
description: "Bemanningsbyrå for oppdrett, havbruk og maritim sektor..."
keywords: [
  "bemanningsbyrå",
  "maritim bemanning",
  "oppdrett bemanning",
  "offshore bemanning",
  "shipping bemanning",
  "havbruk bemanning",
  "brønnbåt bemanning",
  "bluecrew"
]
```

---

## 🔍 GOOGLE SEARCH CONSOLE

### ✅ VERIFICATION
- ✅ Google verification: `29DdT978Xt9BjAEjTdMmH7MsBLa2RqF62vs81Pw1C2Q`
- ✅ Verification file: `public/google9b95b649ea8f9e71.html`

---

## 📊 SITEMAP PRIORITERING (SMART!)

### Prioritet 1.0 (Høyest)
- ✅ Homepage

### Prioritet 0.95 (B2B Focus)
- ✅ `/rederi`
- ✅ `/rederi/havbruk`
- ✅ `/rederi/bemanning`

### Prioritet 0.9 (High Value SEO)
- ✅ `/lonn` + alle undersider (MONEY KEYWORDS!)
- ✅ `/sjofolk`
- ✅ `/rederi/rekruttering`

### Prioritet 0.85 (Conversion)
- ✅ `/stillinger`
- ✅ `/karriere` + undersider
- ✅ `/turnus`

### Prioritet 0.8 (Job Listings)
- ✅ Alle dynamiske stillinger

### Prioritet 0.3 (Legal)
- ✅ `/personvern`
- ✅ `/vilkar`

---

## 🚨 HANDLINGSPLAN (PRIORITERT)

### 🔴 KRITISK (Gjør NÅ!)
1. **Legg til canonical tags på ALLE sider** (89 sider)
   - Start med høyverdi-sider: `/lonn/*`, `/karriere/*`, `/rederi/*`
   - Bruk template: `canonical: 'https://bluecrew.no/[PATH]'`

2. **Legg til noindex på `/slett-data`**
   - Hindre GDPR-side fra å bli indeksert

### 🟡 VIKTIG (Gjør denne uken)
3. **Slett eller ignorer `lighthouse-report.json`**
   - Filen er for stor og bloater repo

4. **Verifiser at Vercel deployment bruker riktig environment**
   - Sjekk at `VERCEL_ENV=production` på bluecrew.no
   - Test at preview URLs redirecter til bluecrew.no

### 🟢 ANBEFALT (Gjør når du har tid)
5. **Legg til mer structured data**
   - FAQPage schema på `/faq`
   - HowTo schema på karrieresider
   - JobPosting schema på stillinger (hvis ikke allerede)

6. **Optimaliser bilder ytterligere**
   - Sjekk at alle bilder er under 100KB
   - Bruk AVIF format der mulig

---

## ✅ KONKLUSJON

### 🎯 OVERALL SCORE: 8.5/10

**Styrker:**
- ✅ Utmerket Vercel.json beskyttelse mot preview URLs
- ✅ Smart sitemap med B2B-prioritering
- ✅ Perfekt structured data (Schema.org)
- ✅ Gode performance optimalisering
- ✅ Korrekte 301 redirects fra gammel versjon
- ✅ Security headers på plass
- ✅ Noindex på beskyttede sider

**Svakheter:**
- ❌ Mangler canonical tags på 89 av 92 sider (KRITISK!)
- ❌ `/slett-data` mangler noindex
- ⚠️ Lighthouse report for stor

**SEO-Ranking:**
- ✅ **DU BEHOLDER RANKING** - ingen breaking changes
- ✅ Alle gamle URLs redirecter korrekt (301)
- ✅ Sitemap og robots.txt er korrekt
- ⚠️ **MEN** - legg til canonical tags ASAP for å beskytte mot duplicate content

---

## 📝 NESTE STEG

1. **Les denne rapporten grundig**
2. **Prioriter canonical tags** (høyest prioritet!)
3. **Fix noindex på `/slett-data`**
4. **Test deployment** på bluecrew-v7.vercel.app
5. **Koble domene** til bluecrew.no når klar
6. **Submit sitemap** til Google Search Console

---

**Rapport generert:** 12. januar 2026  
**Analysert av:** Claude (Cursor AI)  
**Ingen kodeendringer gjort** ✅
