-- Admin view should expose only ONE identifier: short_id
create or replace view public.bluecrew_profiles_admin as
select
  short_id,
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
