DROP TABLE IF EXISTS parent;
CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(255),
  picture_url VARCHAR(255)
);

DROP TABLE IF EXISTS pack;
CREATE TABLE pack (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  creator_id INTEGER
);
