/*
  # Anamnesebogen System - Master Level Profiling

  1. New Tables
    - `anamnesis_submissions`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `phone` (text, optional)
      - Contact fields for follow-up

      ## Section 1: Context & Orientation
      - `inquiry_type` (text, required)
      - `life_situation` (jsonb, array)
      - `primary_role` (text, required)

      ## Section 2: Inner State (Baseline)
      - `inner_clarity` (integer 1-10)
      - `inner_stability` (integer 1-10)
      - `decision_capability` (integer 1-10)
      - `energy_level` (integer 1-10)
      - `inner_peace_vs_pressure` (integer 1-100, slider)

      ## Section 3: Stress & Reaction Patterns
      - `stress_reaction` (text)
      - `conflict_experience` (text)
      - `daily_feelings` (jsonb, array)

      ## Section 4: Decision & Action Logic
      - `decision_style` (text)
      - `self_trust_level` (integer 1-10)
      - `uncertainty_reaction` (text)

      ## Section 5: Relationship & External Impact
      - `closeness_difficulty` (text)
      - `external_appearance` (text)
      - `feedback_from_others` (jsonb, array)

      ## Section 6: Meaning, Truth, Direction
      - `on_my_path` (integer 1-10)
      - `change_is_coming` (integer 1-10)
      - `functioning_vs_living` (integer 1-10)
      - `seeking_clarity` (integer 1-10)

      ## Section 7: Readiness & Goal
      - `what_should_change` (text)
      - `what_must_not_stay` (text)
      - `readiness_to_examine` (integer 1-10)

      ## Typology Results
      - `primary_type` (text)
      - `secondary_type` (text)
      - `tension_profile` (jsonb)
      - `coaching_focus` (text)
      - `typology_scores` (jsonb)

      ## Meta
      - `status` (text, default 'new')
      - `priority` (text, default 'high')
      - `admin_notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `anamnesis_submissions` table
    - Public insert policy for new submissions
    - Admin-only read/update policies
*/

-- Create anamnesis submissions table
CREATE TABLE IF NOT EXISTS anamnesis_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Information
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,

  -- Section 1: Context & Orientation
  inquiry_type text NOT NULL,
  life_situation jsonb DEFAULT '[]'::jsonb,
  primary_role text NOT NULL,

  -- Section 2: Inner State (Baseline)
  inner_clarity integer CHECK (inner_clarity >= 1 AND inner_clarity <= 10),
  inner_stability integer CHECK (inner_stability >= 1 AND inner_stability <= 10),
  decision_capability integer CHECK (decision_capability >= 1 AND decision_capability <= 10),
  energy_level integer CHECK (energy_level >= 1 AND energy_level <= 10),
  inner_peace_vs_pressure integer CHECK (inner_peace_vs_pressure >= 0 AND inner_peace_vs_pressure <= 100),

  -- Section 3: Stress & Reaction Patterns
  stress_reaction text,
  conflict_experience text,
  daily_feelings jsonb DEFAULT '[]'::jsonb,

  -- Section 4: Decision & Action Logic
  decision_style text,
  self_trust_level integer CHECK (self_trust_level >= 1 AND self_trust_level <= 10),
  uncertainty_reaction text,

  -- Section 5: Relationship & External Impact
  closeness_difficulty text,
  external_appearance text,
  feedback_from_others jsonb DEFAULT '[]'::jsonb,

  -- Section 6: Meaning, Truth, Direction
  on_my_path integer CHECK (on_my_path >= 1 AND on_my_path <= 10),
  change_is_coming integer CHECK (change_is_coming >= 1 AND change_is_coming <= 10),
  functioning_vs_living integer CHECK (functioning_vs_living >= 1 AND functioning_vs_living <= 10),
  seeking_clarity integer CHECK (seeking_clarity >= 1 AND seeking_clarity <= 10),

  -- Section 7: Readiness & Goal
  what_should_change text,
  what_must_not_stay text,
  readiness_to_examine integer CHECK (readiness_to_examine >= 1 AND readiness_to_examine <= 10),

  -- Typology Results (calculated)
  primary_type text,
  secondary_type text,
  tension_profile jsonb,
  coaching_focus text,
  typology_scores jsonb,

  -- Meta
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'converted', 'archived')),
  priority text DEFAULT 'high' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE anamnesis_submissions ENABLE ROW LEVEL SECURITY;

-- Public policy: Anyone can insert a new submission
CREATE POLICY "Anyone can submit anamnesis"
  ON anamnesis_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view submissions
CREATE POLICY "Admins can view all submissions"
  ON anamnesis_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update submissions
CREATE POLICY "Admins can update submissions"
  ON anamnesis_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_anamnesis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_anamnesis_submissions_updated_at
  BEFORE UPDATE ON anamnesis_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_anamnesis_updated_at();

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS anamnesis_submissions_email_idx ON anamnesis_submissions(email);
CREATE INDEX IF NOT EXISTS anamnesis_submissions_status_idx ON anamnesis_submissions(status);
CREATE INDEX IF NOT EXISTS anamnesis_submissions_primary_type_idx ON anamnesis_submissions(primary_type);
CREATE INDEX IF NOT EXISTS anamnesis_submissions_created_at_idx ON anamnesis_submissions(created_at DESC);