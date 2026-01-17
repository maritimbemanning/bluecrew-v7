-- Add internal notes to bluecrew_profiles
alter table if exists public.bluecrew_profiles
  add column if not exists internal_notes text;

-- Backfill internal notes from legacy candidates when available
update public.bluecrew_profiles bp
set internal_notes = c.internal_notes
from public.candidates c
where bp.id = c.id
  and bp.internal_notes is null;

-- Minimal admin view for Bluecrew profile management
create or replace view public.bluecrew_profiles_admin as
select
  id,
  short_id,
  candidate_id,
  first_name,
  last_name,
  email,
  phone,
  primary_role,
  experience_years,
  cv_key,
  cv_uploaded_at,
  gdpr_consent,
  gdpr_consent_date,
  stcw_consent,
  stcw_consent_date,
  status,
  verified_at,
  internal_notes,
  created_at,
  updated_at
from public.bluecrew_profiles;
