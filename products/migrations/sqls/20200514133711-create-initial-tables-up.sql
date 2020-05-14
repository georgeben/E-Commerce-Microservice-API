/* Creates, product table, product_categories table */

CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  thumbnail VARCHAR(200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  details VARCHAR(200) NOT NULL,
  category_id INTEGER REFERENCES product_categories(id),
  price NUMERIC(16,2) NOT NULL,
  amount_in_stock INTEGER DEFAULT 0,
  image_url VARCHAR(200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
