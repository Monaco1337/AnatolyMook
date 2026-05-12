/*
  # Add Multi-Language Support to Home Content

  This migration adds multi-language support to the home_content table by:
  1. Backing up existing content
  2. Changing content column to support translations (de, en, ru)
  3. Migrating existing German content to new structure
*/

-- Step 1: Create a backup of existing content
CREATE TABLE IF NOT EXISTS home_content_backup AS 
SELECT * FROM home_content;

-- Step 2: Add temporary column for translations
ALTER TABLE home_content ADD COLUMN IF NOT EXISTS content_translations JSONB;

-- Step 3: Migrate existing German content to new structure
UPDATE home_content
SET content_translations = jsonb_build_object(
  'de', content,
  'en', content,  -- Will be empty for now, admin can fill in
  'ru', content   -- Will be empty for now, admin can fill in
)
WHERE content_translations IS NULL;

-- Step 4: Drop old content column and rename
ALTER TABLE home_content DROP COLUMN IF EXISTS content;
ALTER TABLE home_content RENAME COLUMN content_translations TO content;