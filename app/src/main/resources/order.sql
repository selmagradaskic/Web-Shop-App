CREATE TABLE IF NOT EXISTS customer_order (
	id INT PRIMARY KEY NOT NULL,
	product INT,
	customer_name VARCHAR(50),
	email VARCHAR(50),
	address VARCHAR(100),
	city VARCHAR(50),
	country_state VARCHAR(50),
	card VARCHAR(50),
	ex_month VARCHAR(50),
	ex_year VARCHAR(50),
	cvv INT,
	created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE OR REPLACE FUNCTION customer_orders_new_id_fun() RETURNS TRIGGER AS $customer_orders_new_id$
BEGIN
    IF (NEW.id IS NULL) THEN
      NEW.id = ((SELECT MAX(id) FROM customer_orders) + 1);
	  IF NEW.id IS NULL THEN
	  NEW.id = 0;
	  END IF;
    END IF;
RETURN NEW;
END;
$customer_orders_new_id$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER customer_orders_new_id
BEFORE INSERT ON customer_orders FOR EACH ROW
EXECUTE FUNCTION customer_orders_new_id_fun();
