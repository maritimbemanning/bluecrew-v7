# Campaign Applications API Schema Reference

**Generated from Supabase MCP on 2026-01-10**

## Table: `campaign_applications`

### Columns (from actual database)

| Column | Type | Required | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | uuid | ✓ | gen_random_uuid() | Primary key |
| `name` | text | ✓ | - | Applicant full name |
| `email` | text | ✓ | - | Applicant email |
| `phone` | text | ✓ | - | Applicant phone |
| `position` | text | ✓ | - | Job position (elektriker, eto, riggere, rov, offshore, sveiser, mekaniker) |
| `segment` | text | ✓ | - | Segment (offshore, oppdrett, shipping) |
| `cv_url` | text | - | null | CV file URL after upload |
| `cv_filename` | text | - | null | Original CV filename |
| `gdpr_consent` | boolean | ✓ | false | GDPR consent given |
| `gdpr_consent_date` | timestamptz | - | null | When GDPR consent was given |
| `marketing_consent` | boolean | - | false | Marketing consent |
| `status` | text | ✓ | 'ny' | Status: ny, reviewed, contacted, hired, rejected |
| `notes` | text | - | null | JSON string with extra fields (erfaring, etc) |
| `campaign` | text | - | 'stillinger-2026' | Campaign identifier |
| `source_url` | text | - | null | Referrer URL |
| `created_at` | timestamptz | ✓ | now() | Created timestamp |
| `updated_at` | timestamptz | ✓ | now() | Updated timestamp |

### API Route: POST /api/campaign/apply

**Request Body:**
```json
{
  "navn": "string",
  "epost": "string", 
  "telefon": "string",
  "stilling": "string",
  "segment": "offshore|oppdrett|shipping",
  "godtarVilkar": true,
  "markedsforing": false,
  "erfaring": "string",
  "offshoreErfaring": "string",
  "rovRolle": "string (optional)",
  "sertifikater": "string (optional)",
  "fagomrade": "string (optional)"
}
```

**Maps to DB:**
```
navn → name
epost → email  
telefon → phone
stilling → position
segment → segment
godtarVilkar → gdpr_consent (+ gdpr_consent_date)
markedsforing → marketing_consent
erfaring, offshoreErfaring, etc → notes (as JSON)
```

### API Route: POST /api/campaign/complete

Updates existing application with CV info.

**Request Body:**
```json
{
  "applicationId": "uuid",
  "cvUrl": "string",
  "cvFilename": "string"
}
```

---

## DO NOT USE THESE COLUMNS (they don't exist):

❌ `metadata` (JSONB) - use `notes` (TEXT) instead
❌ `source` - use `campaign` instead  
❌ `internal_notes` - use `notes` instead
❌ `status: 'pending'` - use `status: 'ny'` instead

---

## Forms → API Mapping

| Form | Component | Position Value |
|------|-----------|----------------|
| /kampanje/2026/elektriker | ElektrikerForm | 'elektriker' |
| /kampanje/2026/eto | ETOForm | 'eto' |
| /kampanje/2026/mekaniker | MekanikerForm | 'mekaniker' |
| /kampanje/2026/offshore | OffshoreForm | 'offshore' |
| /kampanje/2026/riggere | RiggereForm | 'riggere' |
| /kampanje/2026/rov | ROVForm | 'rov' |
| /kampanje/2026/sveiser | SveiserForm | 'sveiser' |
