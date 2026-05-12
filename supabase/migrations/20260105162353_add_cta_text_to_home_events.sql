/*
  # Add CTA text field to home_events

  1. Changes
    - Add `cta_text` column to `home_events` table
    - This allows each event to have a custom call-to-action button text
    - Default value set to 'Jetzt Anmelden' for existing records
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'home_events' AND column_name = 'cta_text'
  ) THEN
    ALTER TABLE home_events ADD COLUMN cta_text text DEFAULT 'Jetzt Anmelden';
  END IF;
END $$;