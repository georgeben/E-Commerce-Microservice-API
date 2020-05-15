/* Replace with your SQL commands */
CREATE TABLE shipping_address(
  id SERIAL PRIMARY KEY,
  address VARCHAR(200) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  zipcode VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  phone_no VARCHAR(50) NOT NULL,
  sex CHAR,
  defeault_shipping_address INTEGER REFERENCES shipping_address,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  save_for_later BOOLEAN DEFAULT TRUE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  amount NUMERIC(10,2),
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

CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_cart
BEFORE UPDATE ON cart
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();