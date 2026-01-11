-- ============================================================================
-- FIX: Remove/Update trigger referencing non-existent display_name column
-- Error: record "new" has no field "display_name"
-- ============================================================================

-- Step 1: Find all triggers on candidates table
-- Run this query first to see what triggers exist:
/*
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'candidates';
*/

-- Step 2: Find trigger functions that reference display_name
-- Run this to find the problematic function:
/*
SELECT 
    p.proname as function_name,
    pg_get_functiondef(p.oid) as function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND pg_get_functiondef(p.oid) ILIKE '%display_name%';
*/

-- Step 3: Common fix - if there's a trigger setting display_name from name
-- Option A: Drop the trigger if it's not needed
-- DROP TRIGGER IF EXISTS set_display_name_trigger ON candidates;
-- DROP FUNCTION IF EXISTS set_display_name();

-- Option B: Add the display_name column if it's needed
-- ALTER TABLE candidates ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Option C: Fix the trigger function to not use display_name
-- Example: If the trigger was trying to set display_name = name
/*
CREATE OR REPLACE FUNCTION set_candidate_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Remove any reference to display_name
    -- Just return NEW without modification
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
*/

-- ============================================================================
-- QUICK FIX: Add display_name column to candidates table
-- This is the safest immediate fix
-- ============================================================================
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS display_name TEXT;

-- If the trigger is setting display_name from name, update existing records
UPDATE candidates SET display_name = name WHERE display_name IS NULL;
