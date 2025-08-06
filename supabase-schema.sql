-- Create forms table
CREATE TABLE forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  fields JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL,
  short_url TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create form_submissions table
CREATE TABLE form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT
);

-- Create short_urls table
CREATE TABLE short_urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_forms_user_id ON forms(user_id);
CREATE INDEX idx_forms_short_url ON forms(short_url);
CREATE INDEX idx_form_submissions_form_id ON form_submissions(form_id);
CREATE INDEX idx_form_submissions_submitted_at ON form_submissions(submitted_at);
CREATE INDEX idx_short_urls_short_code ON short_urls(short_code);

-- Enable Row Level Security (RLS)
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE short_urls ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your auth requirements)
CREATE POLICY "Allow public read access to active forms" ON forms
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public insert on forms" ON forms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on forms" ON forms
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on forms" ON forms
  FOR DELETE USING (true);

CREATE POLICY "Allow public insert on form_submissions" ON form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to form_submissions" ON form_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to short_urls" ON short_urls
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on short_urls" ON short_urls
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on short_urls" ON short_urls
  FOR UPDATE USING (true);
