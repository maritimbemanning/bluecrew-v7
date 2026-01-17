-- Backfill bluecrew_profiles from legacy candidates
insert into public.bluecrew_profiles (
  id,
  candidate_id,
  national_id_number,
  first_name,
  last_name,
  email,
  phone,
  primary_role,
  secondary_roles,
  experience_years,
  cv_key,
  gdpr_consent,
  gdpr_consent_date,
  stcw_consent,
  stcw_consent_date,
  status,
  verified_at,
  created_at,
  updated_at
)
select
  c.id,
  c.id,
  c.national_id_number,
  c.first_name,
  c.last_name,
  c.email,
  c.phone,
  c.primary_role,
  c.secondary_roles,
  c.experience_years,
  c.cv_key,
  c.gdpr_consent,
  c.gdpr_consent_date,
  c.stcw_consent,
  c.stcw_consent_date,
  c.status,
  coalesce(c.vipps_verified_at, c.created_at),
  c.created_at,
  c.updated_at
from public.candidates c
where c.first_name is not null
  and c.last_name is not null
  and c.email is not null
  and c.phone is not null
  and c.primary_role is not null
  and c.cv_key is not null
  and c.gdpr_consent is not null
on conflict (id) do nothing;
