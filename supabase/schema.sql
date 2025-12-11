-- ============================================
-- NURO PHOTOGRAPHER - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  date TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

-- ============================================
-- AVAILABILITY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS availability (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('free', 'partial', 'busy')),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster date lookups
CREATE INDEX IF NOT EXISTS idx_availability_date 
  ON availability(date);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- CONTACT SUBMISSIONS POLICIES
-- Anyone can insert (public form)
CREATE POLICY "Anyone can insert contact submissions" 
  ON contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read contact submissions" 
  ON contact_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update contact submissions" 
  ON contact_submissions 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- AVAILABILITY POLICIES
-- Anyone can read availability (public calendar)
CREATE POLICY "Anyone can read availability" 
  ON availability 
  FOR SELECT 
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can manage availability" 
  ON availability 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA (Optional - remove in production)
-- ============================================

-- Insert some sample availability data
INSERT INTO availability (date, status, note) VALUES
  (CURRENT_DATE + INTERVAL '3 days', 'busy', 'Sessão de casamento'),
  (CURRENT_DATE + INTERVAL '5 days', 'partial', 'Manhã ocupada'),
  (CURRENT_DATE + INTERVAL '7 days', 'busy', 'Evento corporativo'),
  (CURRENT_DATE + INTERVAL '10 days', 'partial', 'Tarde ocupada'),
  (CURRENT_DATE + INTERVAL '14 days', 'busy', 'Feriado')
ON CONFLICT (date) DO NOTHING;

-- ============================================
-- FUNCTIONS (Optional helpers)
-- ============================================

-- Function to get availability for a month
CREATE OR REPLACE FUNCTION get_month_availability(p_year INTEGER, p_month INTEGER)
RETURNS TABLE(date DATE, status TEXT, note TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT a.date, a.status, a.note
  FROM availability a
  WHERE EXTRACT(YEAR FROM a.date) = p_year
    AND EXTRACT(MONTH FROM a.date) = p_month
  ORDER BY a.date;
END;
$$ LANGUAGE plpgsql;
