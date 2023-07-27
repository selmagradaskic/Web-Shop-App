CREATE TABLE IF NOT EXISTS reviews (
id INT PRIMARY KEY NOT NULL,
author VARCHAR(50),
review VARCHAR(100),
stars INT,
product_id INT,
created_date DATE NOT NULL DEFAULT CURRENT_DATE,
updated_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE OR REPLACE FUNCTION reviews_new_id_fun() RETURNS TRIGGER AS $reviews_new_id$
BEGIN
    IF (NEW.id IS NULL) THEN
      NEW.id = ((SELECT MAX(id) FROM reviews) + 1);
	  IF NEW.id IS NULL THEN
	  NEW.id = 0;
	  END IF;
    END IF;
RETURN NEW;
END;
$reviews_new_id$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER reviews_new_id
BEFORE INSERT ON reviews FOR EACH ROW
EXECUTE FUNCTION reviews_new_id_fun();
