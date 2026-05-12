/*
  # Create News Images Storage Bucket

  1. Storage
    - Create `news-images` bucket for storing news article images
    - Enable public access for viewing images
    - Set size limits and allowed file types
*/

-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete news images" ON storage.objects;

-- Allow public to view news images
CREATE POLICY "Public can view news images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'news-images');

-- Allow authenticated users to upload news images
CREATE POLICY "Authenticated users can upload news images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'news-images');

-- Allow authenticated users to update news images
CREATE POLICY "Authenticated users can update news images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'news-images')
  WITH CHECK (bucket_id = 'news-images');

-- Allow authenticated users to delete news images
CREATE POLICY "Authenticated users can delete news images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'news-images');
