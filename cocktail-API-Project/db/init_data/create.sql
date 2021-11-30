DROP TABLE IF EXISTS testing CASCADE;
CREATE TABLE IF NOT EXISTS testing(
  id SERIAL,
  name VarChar(50),
  PRIMARY KEY (id)
);

INSERT INTO testing(name)
VALUES('John Smith'),
('Jane Doe');

DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL,
  cocktail_title VarChar(50),
  review VarChar(300),
  review_date TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO reviews(cocktail_title,review,review_date)
VALUES('Margarita','Easy and tasty drink',CURRENT_TIMESTAMP);
