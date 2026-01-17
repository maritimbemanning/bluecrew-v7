-- Link campaign applications to Bluecrew profile (candidates)
alter table if exists public.campaign_applications
  add column if not exists candidate_id uuid;

alter table if exists public.campaign_applications
  add constraint if not exists campaign_applications_candidate_id_fkey
  foreign key (candidate_id)
  references public.candidates (id)
  on delete set null;

create index if not exists campaign_applications_candidate_id_idx
  on public.campaign_applications (candidate_id);
