-- ============================================================================
-- BLUECREW DATABASE STATUS CHECK
-- Kjør denne i Supabase SQL Editor for å sjekke status
-- ============================================================================

-- 1. Sjekk om candidates-tabellen eksisterer
SELECT 'TABELL EKSISTERER:' as check_type, 
       CASE WHEN EXISTS (
           SELECT FROM information_schema.tables 
           WHERE table_schema = 'public' AND table_name = 'candidates'
       ) THEN 'JA ✓' ELSE 'NEI ✗ - MÅ OPPRETTES!' END as status;

-- 2. Tell antall kandidater (hvis tabellen finnes)
SELECT 'ANTALL KANDIDATER:' as check_type, COUNT(*)::text as status FROM candidates;

-- 3. Vis alle kolonner i candidates-tabellen
SELECT 'KOLONNER I CANDIDATES:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'candidates'
ORDER BY ordinal_position;

-- 4. Sjekk triggers på candidates
SELECT 'TRIGGERS PÅ CANDIDATES:' as info;
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'candidates';

-- 5. Sjekk om andre viktige tabeller eksisterer
SELECT 'ANDRE TABELLER:' as info;
SELECT table_name, 
       CASE WHEN table_name IS NOT NULL THEN 'Eksisterer ✓' END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('job_postings', 'job_applications', 'contacts', 'interest_leads', 'staffing_needs')
ORDER BY table_name;

-- 6. Sjekk problematiske funksjoner
SELECT 'PROBLEMATISKE FUNKSJONER:' as info;
SELECT proname as function_name
FROM pg_proc 
WHERE proname LIKE '%rebuild_candidate%' 
   OR proname LIKE '%trigger_rebuild%'
   OR proname LIKE '%display_name%';
