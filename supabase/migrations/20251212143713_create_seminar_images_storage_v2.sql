/*
  # Create Storage for Seminar Images

  ## Beschreibung
    Erstellt einen Storage Bucket für Seminar-Bilder mit öffentlichem Zugriff

  ## Änderungen
    1. Erstellt Bucket "seminar-images"
    2. Setzt öffentlichen Zugriff für alle Bilder
    3. Ermöglicht Upload für authentifizierte Benutzer
*/

-- Storage Bucket erstellen
INSERT INTO storage.buckets (id, name, public)
VALUES ('seminar-images', 'seminar-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy für öffentlichen Zugriff auf Bilder
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Access for seminar images'
  ) THEN
    CREATE POLICY "Public Access for seminar images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'seminar-images');
  END IF;
END $$;

-- Policy für Upload (nur authentifizierte Benutzer)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload seminar images'
  ) THEN
    CREATE POLICY "Authenticated users can upload seminar images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'seminar-images');
  END IF;
END $$;

-- Policy für Update (nur authentifizierte Benutzer)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update seminar images'
  ) THEN
    CREATE POLICY "Authenticated users can update seminar images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'seminar-images')
    WITH CHECK (bucket_id = 'seminar-images');
  END IF;
END $$;

-- Policy für Delete (nur authentifizierte Benutzer)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete seminar images'
  ) THEN
    CREATE POLICY "Authenticated users can delete seminar images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'seminar-images');
  END IF;
END $$;
