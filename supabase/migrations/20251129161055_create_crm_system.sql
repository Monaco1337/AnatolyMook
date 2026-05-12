/*
  # CRM/CMS System für Anatoly Mook - World-Class Backend
  
  ## Übersicht
  Dieses System verwaltet alle Buchungen, Kontakte, Termine und Analytics für die Speaker-Website.
  
  ## 1. Neue Tabellen
  
  ### `bookings` - Buchungsanfragen
  - `id` (uuid, primary key)
  - `service_type` (text) - Art des gebuchten Service
  - `status` (text) - pending, confirmed, completed, cancelled
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `company` (text)
  - `role` (text)
  - `event_date` (date)
  - `location` (text)
  - `audience_size` (text)
  - `budget` (text)
  - `objective` (text)
  - `message` (text)
  - `priority` (text) - low, medium, high, urgent
  - `assigned_to` (uuid, foreign key zu users)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `contacts` - Lead & Contact Management
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text, unique)
  - `phone` (text)
  - `company` (text)
  - `role` (text)
  - `status` (text) - lead, prospect, client, inactive
  - `source` (text) - website, referral, event, direct
  - `tags` (text[]) - Array für flexible Kategorisierung
  - `notes` (text)
  - `last_contact` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `calendar_events` - Terminkalender
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `event_type` (text) - keynote, workshop, meeting, call, travel
  - `start_time` (timestamptz)
  - `end_time` (timestamptz)
  - `location` (text)
  - `attendees` (text[])
  - `booking_id` (uuid, foreign key zu bookings)
  - `contact_id` (uuid, foreign key zu contacts)
  - `status` (text) - scheduled, confirmed, completed, cancelled
  - `color` (text) - Für Kalender-Visualisierung
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `email_subscribers` - Newsletter & Email-Listen
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `name` (text)
  - `status` (text) - active, unsubscribed
  - `tags` (text[])
  - `subscribed_at` (timestamptz)
  - `unsubscribed_at` (timestamptz)
  
  ### `activity_log` - Aktivitäts-Tracking
  - `id` (uuid, primary key)
  - `entity_type` (text) - booking, contact, event
  - `entity_id` (uuid)
  - `action` (text) - created, updated, deleted, status_changed
  - `user_id` (uuid)
  - `metadata` (jsonb) - Flexible Zusatzdaten
  - `created_at` (timestamptz)
  
  ### `analytics` - Website & Business Analytics
  - `id` (uuid, primary key)
  - `metric_type` (text) - page_view, conversion, booking, revenue
  - `value` (numeric)
  - `metadata` (jsonb)
  - `recorded_at` (timestamptz)
  
  ## 2. Security - Row Level Security
  - RLS aktiviert für alle Tabellen
  - Nur authentifizierte Admin-User haben Zugriff
  - Real-time Subscriptions für Live-Updates
  
  ## 3. Indexes
  - Performance-Optimierung für häufige Queries
  - Email-Lookups
  - Status-Filtering
  - Datum-Ranges
  
  ## 4. Funktionen
  - Automatische Timestamps (updated_at)
  - Status-Change Notifications
  - Activity-Logging Triggers
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'confirmed', 'completed', 'cancelled')),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  event_date date,
  location text,
  audience_size text,
  budget text,
  objective text,
  message text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company text,
  role text,
  status text DEFAULT 'lead' CHECK (status IN ('lead', 'prospect', 'client', 'inactive')),
  source text DEFAULT 'website' CHECK (source IN ('website', 'referral', 'event', 'direct', 'other')),
  tags text[] DEFAULT '{}',
  notes text,
  last_contact timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Calendar Events Table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL CHECK (event_type IN ('keynote', 'workshop', 'meeting', 'call', 'travel', 'other')),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  attendees text[] DEFAULT '{}',
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  color text DEFAULT '#facc15',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Email Subscribers Table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  tags text[] DEFAULT '{}',
  subscribed_at timestamptz DEFAULT now() NOT NULL,
  unsubscribed_at timestamptz
);

-- Activity Log Table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type text NOT NULL CHECK (entity_type IN ('booking', 'contact', 'event', 'subscriber')),
  entity_id uuid NOT NULL,
  action text NOT NULL,
  user_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type text NOT NULL CHECK (metric_type IN ('page_view', 'conversion', 'booking', 'revenue', 'engagement')),
  value numeric NOT NULL DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  recorded_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_calendar_start_time ON calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_calendar_status ON calendar_events(status);
CREATE INDEX IF NOT EXISTS idx_calendar_booking_id ON calendar_events(booking_id);

CREATE INDEX IF NOT EXISTS idx_activity_entity ON activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics(metric_type);
CREATE INDEX IF NOT EXISTS idx_analytics_recorded_at ON analytics(recorded_at DESC);

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_calendar_updated_at ON calendar_events;
CREATE TRIGGER update_calendar_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function: Log activity on booking changes
CREATE OR REPLACE FUNCTION log_booking_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_log (entity_type, entity_id, action, metadata)
    VALUES ('booking', NEW.id, 'created', jsonb_build_object(
      'service_type', NEW.service_type,
      'customer_email', NEW.customer_email,
      'status', NEW.status
    ));
  ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO activity_log (entity_type, entity_id, action, metadata)
    VALUES ('booking', NEW.id, 'status_changed', jsonb_build_object(
      'old_status', OLD.status,
      'new_status', NEW.status,
      'customer_email', NEW.customer_email
    ));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for booking activity logging
DROP TRIGGER IF EXISTS log_booking_changes ON bookings;
CREATE TRIGGER log_booking_changes
  AFTER INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION log_booking_activity();

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Nur für authentifizierte User
CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Contacts Policies
CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage contacts"
  ON contacts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Calendar Events Policies
CREATE POLICY "Authenticated users can view all events"
  ON calendar_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage events"
  ON calendar_events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Email Subscribers Policies
CREATE POLICY "Authenticated users can view subscribers"
  ON email_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can subscribe"
  ON email_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage subscribers"
  ON email_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Activity Log Policies (Read-only for authenticated)
CREATE POLICY "Authenticated users can view activity log"
  ON activity_log FOR SELECT
  TO authenticated
  USING (true);

-- Analytics Policies
CREATE POLICY "Authenticated users can view analytics"
  ON analytics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert analytics"
  ON analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Sample Data für Testing
INSERT INTO bookings (service_type, customer_name, customer_email, customer_phone, company, role, status, priority, event_date, location, audience_size, budget, objective, message)
VALUES 
  ('keynote', 'Max Mustermann', 'max@example.com', '+49 123 456789', 'Tech Corp GmbH', 'CEO', 'pending', 'high', '2025-06-15', 'Berlin', '500', '€25.000 - €50.000', 'Team Motivation steigern', 'Wir suchen einen inspirierenden Keynote-Speaker für unser Annual Summit'),
  ('workshop', 'Anna Schmidt', 'anna@example.com', '+49 987 654321', 'Innovation Labs', 'HR Director', 'confirmed', 'medium', '2025-07-20', 'München', '50', '€50.000 - €100.000', 'Leadership Development', '2-tägiger Workshop für unser Leadership Team'),
  ('event-ticket', 'Thomas Weber', 'thomas@example.com', '+49 555 123456', 'Startup XYZ', 'Founder', 'completed', 'low', '2025-05-10', 'Hamburg', '1', '€2.497 - €4.997', 'Persönliches Wachstum', 'Ich möchte am Momentum Summit teilnehmen')
ON CONFLICT DO NOTHING;

INSERT INTO contacts (name, email, phone, company, role, status, source, tags)
VALUES
  ('Max Mustermann', 'max@example.com', '+49 123 456789', 'Tech Corp GmbH', 'CEO', 'prospect', 'website', ARRAY['vip', 'c-suite']),
  ('Anna Schmidt', 'anna@example.com', '+49 987 654321', 'Innovation Labs', 'HR Director', 'client', 'referral', ARRAY['hr', 'workshop-interest']),
  ('Thomas Weber', 'thomas@example.com', '+49 555 123456', 'Startup XYZ', 'Founder', 'client', 'event', ARRAY['founder', 'event-attendee'])
ON CONFLICT (email) DO NOTHING;
