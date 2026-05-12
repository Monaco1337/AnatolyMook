/*
  # Create increment_news_views RPC function
  
  1. New Function
    - `increment_news_views(article_id)` - Safely increments view count for news articles
    
  2. Purpose
    - Allows anonymous users to increment view counts without needing UPDATE permissions
    - Prevents page crashes when the function is called
*/

CREATE OR REPLACE FUNCTION increment_news_views(article_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE news_articles
  SET views_count = views_count + 1
  WHERE id = article_id;
END;
$$;