/*
  # Create Consciousness Quiz System

  1. New Tables
    - `consciousness_quiz_questions`
      - `id` (uuid, primary key)
      - `order_number` (integer) - Question order in quiz
      - `question_text` (text) - The question
      - `question_type` (text) - Type: 'multiple_choice', 'multi_select'
      - `options` (jsonb) - Array of available options
      - `category` (text) - Category for scoring (old_consciousness, new_consciousness)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `consciousness_quiz_submissions`
      - `id` (uuid, primary key)
      - `user_email` (text) - Participant email
      - `user_name` (text) - Participant name
      - `answers` (jsonb) - All quiz answers
      - `score_old_consciousness` (integer) - Score for old consciousness
      - `score_new_consciousness` (integer) - Score for new consciousness
      - `dominant_type` (text) - Result: 'old_consciousness' or 'new_consciousness'
      - `result_text` (text) - Personalized result description
      - `submitted_at` (timestamp)
      - `read` (boolean) - Admin has viewed this submission
      
  2. Security
    - Enable RLS on both tables
    - Anyone can read questions (public quiz)
    - Anyone can insert submissions (public quiz)
    - Only admins can view all submissions
    - Only admins can update submissions (mark as read)
*/

-- Create consciousness_quiz_questions table
CREATE TABLE IF NOT EXISTS consciousness_quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number integer NOT NULL,
  question_text text NOT NULL,
  question_type text NOT NULL DEFAULT 'multiple_choice',
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create consciousness_quiz_submissions table
CREATE TABLE IF NOT EXISTS consciousness_quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  score_old_consciousness integer DEFAULT 0,
  score_new_consciousness integer DEFAULT 0,
  dominant_type text,
  result_text text,
  submitted_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE consciousness_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_quiz_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for consciousness_quiz_questions
CREATE POLICY "Anyone can read quiz questions"
  ON consciousness_quiz_questions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quiz questions"
  ON consciousness_quiz_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update quiz questions"
  ON consciousness_quiz_questions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quiz questions"
  ON consciousness_quiz_questions
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for consciousness_quiz_submissions
CREATE POLICY "Anyone can insert quiz submissions"
  ON consciousness_quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all submissions"
  ON consciousness_quiz_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON consciousness_quiz_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
  ON consciousness_quiz_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_questions_order ON consciousness_quiz_questions(order_number);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_submitted_at ON consciousness_quiz_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_read ON consciousness_quiz_submissions(read);

-- Insert initial quiz questions
INSERT INTO consciousness_quiz_questions (order_number, question_text, question_type, options, category, image_url) VALUES
(1, 'In welchen Lebensbereichen möchten Sie sich weiterentwickeln?', 'multi_select', 
  '["Mindset", "Gesundheit", "Business", "Glück", "Wohlstand", "Beziehungen", "Leadership"]'::jsonb, 
  'focus_areas', 
  'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(2, 'Wie reagieren Sie typischerweise auf unerwartete Herausforderungen?', 'multiple_choice',
  '[
    {"text": "Ich reagiere sofort und handle instinktiv", "value": "old", "score": 3},
    {"text": "Ich pausiere kurz und überlege, dann handle ich", "value": "transition", "score": 2},
    {"text": "Ich nehme mir bewusst Zeit zum Reflektieren und wähle dann meine Reaktion", "value": "new", "score": 1}
  ]'::jsonb,
  'reactivity',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(3, 'Was motiviert Sie primär in Ihrem beruflichen Handeln?', 'multiple_choice',
  '[
    {"text": "Der Wunsch, anderen etwas zu beweisen oder Anerkennung zu erhalten", "value": "old", "score": 3},
    {"text": "Finanzielle Sicherheit und Status", "value": "old", "score": 3},
    {"text": "Persönliches Wachstum und sinnvolle Beiträge", "value": "new", "score": 1},
    {"text": "Innere Erfüllung und Authentizität", "value": "new", "score": 1}
  ]'::jsonb,
  'motivation',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(4, 'Wie gehen Sie mit Stress um?', 'multiple_choice',
  '[
    {"text": "Ich kämpfe dagegen an und versuche die Kontrolle zu behalten", "value": "old", "score": 3},
    {"text": "Ich lenke mich ab oder vermeide stressige Situationen", "value": "old", "score": 3},
    {"text": "Ich akzeptiere die Situation und suche nach konstruktiven Lösungen", "value": "new", "score": 1},
    {"text": "Ich nutze bewusste Praktiken wie Meditation oder Atemübungen", "value": "new", "score": 1}
  ]'::jsonb,
  'stress_management',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(5, 'Wie würden Sie Ihre innere Stimme beschreiben?', 'multiple_choice',
  '[
    {"text": "Kritisch, fordernd, vergleichend mit anderen", "value": "old", "score": 3},
    {"text": "Wechselhaft zwischen selbstkritisch und unterstützend", "value": "transition", "score": 2},
    {"text": "Überwiegend unterstützend und wohlwollend", "value": "new", "score": 1},
    {"text": "Mitfühlend, weise und liebevoll", "value": "new", "score": 1}
  ]'::jsonb,
  'inner_voice',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(6, 'Wie treffen Sie wichtige Entscheidungen?', 'multiple_choice',
  '[
    {"text": "Ich analysiere alle Fakten und folge der Logik", "value": "old", "score": 3},
    {"text": "Ich höre auf das, was andere sagen oder erwarten", "value": "old", "score": 3},
    {"text": "Ich kombiniere Verstand und Intuition", "value": "new", "score": 1},
    {"text": "Ich spüre in mich hinein und folge meiner inneren Weisheit", "value": "new", "score": 1}
  ]'::jsonb,
  'decision_making',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920'),

(7, 'Wie nehmen Sie Ihre Gedanken und Emotionen wahr?', 'multiple_choice',
  '[
    {"text": "Ich identifiziere mich stark mit meinen Gedanken und Gefühlen", "value": "old", "score": 3},
    {"text": "Manchmal beobachte ich sie, manchmal werde ich von ihnen überwältigt", "value": "transition", "score": 2},
    {"text": "Ich kann meine Gedanken und Gefühle meist beobachten ohne mich darin zu verlieren", "value": "new", "score": 1},
    {"text": "Ich erlebe eine natürliche Distanz und kann bewusst wählen, welchen ich folge", "value": "new", "score": 1}
  ]'::jsonb,
  'awareness',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920')
ON CONFLICT DO NOTHING;