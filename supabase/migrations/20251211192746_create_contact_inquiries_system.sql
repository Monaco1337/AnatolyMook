/*
  # Create Contact Inquiries System

  ## Overview
  This migration creates a complete contact inquiry system for managing customer inquiries and messages.

  ## 1. New Tables
  
  ### `contact_inquiries`
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `first_name` (text) - Contact's first name
  - `last_name` (text) - Contact's last name
  - `email` (text) - Contact's email address
  - `phone` (text) - Contact's phone number (optional)
  - `company` (text) - Company name (optional)
  - `subject` (text) - Inquiry subject
  - `message` (text) - Full message content
  - `inquiry_type` (text) - Type of inquiry (coaching, seminar, corporate, general)
  - `status` (text) - Status (new, read, replied, closed)
  - `priority` (text) - Priority level (low, medium, high, urgent)
  - `notes` (text) - Internal admin notes
  - `replied_at` (timestamptz) - When the inquiry was replied to
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
  - Enable RLS on contact_inquiries table
  - Anyone can submit inquiries (insert)
  - Only authenticated admins can view and manage inquiries

  ## 3. Indexes
  - Index on status for filtering
  - Index on inquiry_type for categorization
  - Index on created_at for chronological sorting
  - Index on email for searching
*/

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  inquiry_type text DEFAULT 'general',
  status text DEFAULT 'new',
  priority text DEFAULT 'medium',
  notes text DEFAULT '',
  replied_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_inquiry_type CHECK (inquiry_type IN ('coaching', 'seminar', 'corporate', 'keynote', 'shop', 'general')),
  CONSTRAINT valid_status CHECK (status IN ('new', 'read', 'replied', 'closed')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_type ON contact_inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_priority ON contact_inquiries(priority);

-- Enable Row Level Security
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_inquiries

-- Anyone can submit an inquiry (public insert access)
CREATE POLICY "Anyone can submit inquiries"
  ON contact_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view inquiries
CREATE POLICY "Authenticated users can view all inquiries"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update inquiries
CREATE POLICY "Authenticated users can update inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete inquiries
CREATE POLICY "Authenticated users can delete inquiries"
  ON contact_inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_contact_inquiries_updated_at ON contact_inquiries;
CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample inquiry for testing
INSERT INTO contact_inquiries (
  first_name,
  last_name,
  email,
  phone,
  company,
  subject,
  message,
  inquiry_type,
  status,
  priority,
  created_at
) VALUES
(
  'Max',
  'Mustermann',
  'max.mustermann@example.com',
  '+49 123 456789',
  'Mustermann GmbH',
  'Interesse an Corporate Coaching',
  'Guten Tag Herr Mook,

ich habe mit großem Interesse Ihre Website besucht und bin auf Ihre Corporate Coaching Programme aufmerksam geworden.

Wir sind ein mittelständisches Unternehmen mit etwa 50 Mitarbeitern und suchen nach Möglichkeiten, unser Führungsteam weiterzuentwickeln. Besonders interessiert sind wir an Ihren Programmen zu Leadership und mentaler Stärke.

Könnten Sie mir weitere Informationen zusenden und einen Termin für ein Erstgespräch vorschlagen?

Mit freundlichen Grüßen
Max Mustermann',
  'corporate',
  'new',
  'high',
  now() - interval '2 hours'
);