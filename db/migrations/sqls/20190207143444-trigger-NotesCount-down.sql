-- STEP 1
-- DELETE TRIGGER for INCREASE
DROP TRIGGER IF EXISTS "Users_incr_NotesCount";

-- STEP 2
-- DELETE TRIGGER for DECREASE
DROP TRIGGER IF EXISTS "Users_decr_NotesCount";

-- STEP 3
-- DROP COLUMN in table "Users"
-- https://www.techonthenet.com/sqlite/tables/alter_table.php

-- STEP 3.1
-- CREATE NEW TABLE with different name exactly like table "Users"
CREATE TABLE IF NOT EXISTS "Users_backup" (
  "id"          INTEGER   PRIMARY KEY,
  "name"        TEXT      NOT NULL      UNIQUE,
  "birthdate"   DATE,
  "email"       TEXT      NOT NULL      UNIQUE,
  "phone"       TEXT                    UNIQUE,
  "password"    TEXT      NOT NULL
);


-- STEP 3.2
-- COPY DATA from old table "Users" to new table "Users_backup"
INSERT INTO "Users_backup" ("id", "name", "birthdate", "email", "phone", "password")
  SELECT "id", "name", "birthdate", "email", "phone", "password"
  FROM "Users";

-- STEP 3.3
-- DROP OLD TABLE "Users"
DROP TABLE "Users";

-- STEP 3.4
-- RENAME NEW TABLE "Users_backup" to "Users"
ALTER TABLE "Users_backup" RENAME TO "Users" ;

