-- Create new Bluecrew profile table (future source of truth)
-- Clone structure from legacy candidates table to support phased migration
create table if not exists public.bluecrew_profiles (
  like public.candidates including all
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'bluecrew_profiles'
      and column_name = 'email'
  ) then
    create index if not exists bluecrew_profiles_email_idx
      on public.bluecrew_profiles (email);
  end if;
end $$;
