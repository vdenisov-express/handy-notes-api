CREATE TABLE IF NOT EXISTS "Users" (
  "id"          INTEGER   PRIMARY KEY,
  "name"        TEXT      NOT NULL      UNIQUE,
  "birthdate"   DATE,
  "email"       TEXT      NOT NULL      UNIQUE,
  "phone"       TEXT                    UNIQUE,
  "password"    TEXT      NOT NULL
);
