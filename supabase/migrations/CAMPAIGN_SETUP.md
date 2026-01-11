# Campaign Infrastructure Setup

## What This Does

Creates the complete Supabase infrastructure for the 2026 campaign:

1. **`campaign_applications` table** - Stores all campaign applications
2. **`documents` storage bucket** - Private bucket for CVs (10MB limit, PDF/Word only)
3. **RLS policies** - Secure access (admin only)
4. **Indexes** - Fast queries on email, position, status, created_at

## How to Apply

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `20260110_create_campaign_infrastructure.sql`
4. Paste and run it
5. Verify:
   - Check **Table Editor** → `campaign_applications` exists
   - Check **Storage** → `documents` bucket exists
   - Check **Database** → **Policies** → storage policies exist

### Option 2: Supabase CLI (Local)

```bash
# Make sure you're linked to your project
supabase link --project-ref your-project-ref

# Apply migration
supabase db push

# Or apply specific migration
psql $DATABASE_URL -f supabase/migrations/20260110_create_campaign_infrastructure.sql
```

## Table Structure

### `campaign_applications`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `created_at` | TIMESTAMPTZ | When application was created |
| `updated_at` | TIMESTAMPTZ | Last update (auto-updated) |
| `name` | TEXT | Candidate name |
| `email` | TEXT | Candidate email (indexed) |
| `phone` | TEXT | Phone number |
| `position` | TEXT | Role applied for (elektriker, eto, riggere, etc.) |
| `segment` | TEXT | offshore/oppdrett/shipping |
| `metadata` | JSONB | Role-specific data (erfaring, offshoreErfaring, etc.) |
| `cv_url` | TEXT | Storage URL to uploaded CV |
| `cv_filename` | TEXT | Original filename |
| `cv_uploaded_at` | TIMESTAMPTZ | When CV was uploaded |
| `gdpr_consent` | BOOLEAN | Always true (required to submit) |
| `marketing_consent` | BOOLEAN | Email marketing opt-in |
| `status` | TEXT | pending/reviewed/contacted/hired/rejected |
| `source` | TEXT | Tracking source (default: 'campaign_2026') |
| `utm_source` | TEXT | UTM tracking |
| `utm_medium` | TEXT | UTM tracking |
| `utm_campaign` | TEXT | UTM tracking |
| `internal_notes` | TEXT | Notes for recruiters |

### Storage Bucket: `documents`

- **Private**: No public access
- **Size Limit**: 10MB per file
- **Allowed Types**: PDF, Word (.doc, .docx)
- **File Path Pattern**: `campaign-cv/{applicationId}.{ext}`
- **Access**: Service role only (via API)

## Verification

Run this after applying migration:

```sql
-- Check table exists
SELECT COUNT(*) FROM campaign_applications;

-- Check bucket exists
SELECT * FROM storage.buckets WHERE id = 'documents';

-- Check policies exist
SELECT * FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects';
```

## Data Flow

1. User fills form → POST `/api/campaign/apply`
2. Creates row in `campaign_applications`
3. Redirects to `/kampanje/verify?id={applicationId}`
4. User uploads CV → POST `/api/campaign/upload-cv`
5. Uploads file to `documents` bucket
6. Updates `cv_url`, `cv_filename` in `campaign_applications`
7. Success → Redirect to `/kampanje/verify/success`

## Admin Access

To view applications:

```sql
-- All applications
SELECT 
  name, 
  email, 
  phone, 
  position, 
  segment,
  metadata,
  cv_url,
  status,
  created_at
FROM campaign_applications
ORDER BY created_at DESC;

-- By position
SELECT position, COUNT(*) as count
FROM campaign_applications
GROUP BY position
ORDER BY count DESC;

-- With CV uploaded
SELECT COUNT(*) FROM campaign_applications WHERE cv_url IS NOT NULL;

-- Pending applications
SELECT * FROM campaign_applications WHERE status = 'pending';
```

## Next Steps

After migration is applied:

1. ✅ Test campaign form submission
2. ✅ Test CV upload
3. 🔄 Set up email notifications (already configured in code)
4. 🔄 Add Facebook Pixel tracking
5. 🔄 Add UTM parameter capture
6. 🔄 Create admin dashboard to view applications
