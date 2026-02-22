/*
  # Add is_read field to notification tables

  1. Changes
    - Add `is_read` boolean field to contact_inquiries table (default: false)
    - Add `is_read` boolean field to bookings table (default: false)
    - Add `is_read` boolean field to anamnesis_submissions table (default: false)
    - Add `is_read` boolean field to consciousness_quiz_submissions table (default: false)
  
  2. Purpose
    - Track which entries have been read by admin
    - Enable notification badges to show only unread items
    - Allow admins to mark items as read/unread
  
  3. Security
    - No RLS changes needed (inherits existing policies)
*/

-- Add is_read field to contact_inquiries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_inquiries' AND column_name = 'is_read'
  ) THEN
    ALTER TABLE contact_inquiries ADD COLUMN is_read boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Add is_read field to bookings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'is_read'
  ) THEN
    ALTER TABLE bookings ADD COLUMN is_read boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Add is_read field to anamnesis_submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'anamnesis_submissions' AND column_name = 'is_read'
  ) THEN
    ALTER TABLE anamnesis_submissions ADD COLUMN is_read boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Note: consciousness_quiz_submissions already has a 'read' field, no changes needed
