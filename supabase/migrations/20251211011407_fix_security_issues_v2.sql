/*
  # Fix Security and Performance Issues - Version 2

  ## Changes Overview
  
  ### 1. Add Missing Foreign Key Indexes
    - Add index on `calendar_events.contact_id`
    - Add index on `cart_items.product_id`
  
  ### 2. Remove Unused Indexes
    - Remove 23 unused indexes across multiple tables to improve write performance
  
  ### 3. Consolidate Overlapping RLS Policies
    - Split overly broad policies into specific action policies
    - Remove duplicate policies for same role/action combinations
  
  ### 4. Secure Function Search Paths
    - Add search_path protection to all functions
  
  ## Security Impact
  - Prevents search path injection attacks
  - Clarifies RLS policy logic and removes ambiguity
  - Improves query performance with proper indexes
  - Reduces storage and write overhead
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_calendar_events_contact_id ON calendar_events(contact_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_bookings_status;
DROP INDEX IF EXISTS idx_bookings_created_at;
DROP INDEX IF EXISTS idx_bookings_email;
DROP INDEX IF EXISTS idx_bookings_event_date;
DROP INDEX IF EXISTS idx_contacts_email;
DROP INDEX IF EXISTS idx_contacts_status;
DROP INDEX IF EXISTS idx_contacts_created_at;
DROP INDEX IF EXISTS idx_calendar_start_time;
DROP INDEX IF EXISTS idx_calendar_status;
DROP INDEX IF EXISTS idx_calendar_booking_id;
DROP INDEX IF EXISTS idx_activity_entity;
DROP INDEX IF EXISTS idx_activity_created_at;
DROP INDEX IF EXISTS idx_analytics_type;
DROP INDEX IF EXISTS idx_analytics_recorded_at;
DROP INDEX IF EXISTS services_category_idx;
DROP INDEX IF EXISTS services_is_active_idx;
DROP INDEX IF EXISTS idx_products_category_id;
DROP INDEX IF EXISTS idx_products_slug;
DROP INDEX IF EXISTS idx_products_is_active;
DROP INDEX IF EXISTS idx_cart_items_session_id;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_customer_email;

-- ============================================================================
-- 3. CONSOLIDATE OVERLAPPING RLS POLICIES
-- ============================================================================

-- Fix calendar_events: Replace broad "manage" policy with specific action policies
DROP POLICY IF EXISTS "Authenticated users can manage events" ON calendar_events;
CREATE POLICY "Authenticated users can view events"
  ON calendar_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON calendar_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON calendar_events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON calendar_events FOR DELETE
  TO authenticated
  USING (true);

-- Fix contacts: Replace broad "manage" policy with specific action policies
DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON contacts;
CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Fix orders: Remove overlapping policies
DROP POLICY IF EXISTS "Authenticated users can manage all orders" ON orders;
DROP POLICY IF EXISTS "Users can view own orders by email" ON orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;

-- Recreate clean order policies
CREATE POLICY "Public can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (true);

-- Fix product_categories: Clean up policies
DROP POLICY IF EXISTS "Public can view all categories" ON product_categories;
DROP POLICY IF EXISTS "Authenticated can view all categories" ON product_categories;
DROP POLICY IF EXISTS "Authenticated can manage categories" ON product_categories;

CREATE POLICY "Public can view categories"
  ON product_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON product_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON product_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON product_categories FOR DELETE
  TO authenticated
  USING (true);

-- Fix products: Clean up policies
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Authenticated can view all products" ON products;
DROP POLICY IF EXISTS "Authenticated can manage products" ON products;

CREATE POLICY "Public can view active products only"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Fix services: Clean up policies
DROP POLICY IF EXISTS "Public can view active services" ON services;
DROP POLICY IF EXISTS "Authenticated can view all services" ON services;
DROP POLICY IF EXISTS "Authenticated can manage services" ON services;

CREATE POLICY "Public can view active services only"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- 4. SECURE FUNCTION SEARCH PATHS
-- ============================================================================

-- Fix update_updated_at_column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix update_updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix log_booking_activity
CREATE OR REPLACE FUNCTION log_booking_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  INSERT INTO activity_log (entity_type, entity_id, action, details)
  VALUES (
    'booking',
    NEW.id,
    TG_OP,
    json_build_object(
      'service_id', NEW.service_id,
      'event_date', NEW.event_date,
      'status', NEW.status
    )
  );
  RETURN NEW;
END;
$$;