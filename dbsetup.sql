DROP TABLE IF EXISTS parents;
CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(255),
  picture_url VARCHAR(255)
);

DROP TABLE IF EXISTS packs;
CREATE TABLE packs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  creator_id INTEGER
);

DROP TABLE IF EXISTS children;
CREATE TABLE children (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER,
  first_name VARCHAR(255),
  picture_url VARCHAR(255)
);

DROP TABLE IF EXISTS children_packs;
CREATE TABLE children_packs (
  id SERIAL PRIMARY KEY,
  child_id INTEGER,
  pack_id INTEGER
);

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  pack_id INTEGER,
  event_time TIMESTAMP,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS children_events;
CREATE TABLE children_events (
  id SERIAL PRIMARY KEY,
  child_id INTEGER,
  pack_id INTEGER
);

DROP TABLE IF EXISTS crises;
CREATE TABLE crises (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  child_id INTEGER,
  pack_id INTEGER,
  savior_id INTEGER
);
