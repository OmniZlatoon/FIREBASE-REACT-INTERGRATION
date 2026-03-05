
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  -- profile
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone_number TEXT,
  country_code TEXT,
  date_of_birth DATE,
  country TEXT,
  role TEXT NOT NULL,

  -- organization
  company_name TEXT,
  company_email TEXT,
  company_address TEXT,
  tax_id TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);
