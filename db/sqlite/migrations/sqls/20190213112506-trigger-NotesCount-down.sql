-- STEP 1
-- DELETE TRIGGER for INCREASE
DROP TRIGGER IF EXISTS "Users_incr_NotesCount";

-- STEP 2
-- DELETE TRIGGER for DECREASE
DROP TRIGGER IF EXISTS "Users_decr_NotesCount";

-- STEP 3
-- DROP COLUMN "notes_count" from table "Users"
-- https://www.techonthenet.com/sqlite/tables/alter_table.php

/* DISABLE foreign keys */
PRAGMA foreign_keys = OFF;

-- COMMENT {
-- If you want you can start transaction
-- BEGIN TRANSACTION;
-- } COMMENT

-- STEP 3.1
-- RENAME TABLE "Users" to "Users_backup"
ALTER TABLE "Users" RENAME TO "Users_backup" ;

-- STEP 3.2
-- CREATE NEW TABLE with different name exactly like table "Users"
CREATE TABLE IF NOT EXISTS "Users" (
  "id"          INTEGER   PRIMARY KEY,
  "name"        TEXT      NOT NULL      UNIQUE,
  "birthdate"   DATE,
  "email"       TEXT      NOT NULL      UNIQUE,
  "phone"       TEXT                    UNIQUE,
  "password"    TEXT      NOT NULL
);

-- STEP 3.3
-- COPY DATA from old table "Users_backup" to new table "Users"
INSERT INTO "Users" ("id", "name", "birthdate", "email", "phone", "password")
  SELECT "id", "name", "birthdate", "email", "phone", "password"
  FROM "Users_backup";

-- STEP 3.4
-- DROP OLD TABLE "Users_backup"
-- (optional step)
DROP TABLE "Users_backup";

-- COMMENT {
-- If you applied a transaction, you must close it
-- END TRANSACTION;
-- or you can use "COMMIT;"
-- } COMMENT

/* ENABLE foreign keys */
PRAGMA foreign_keys = ON;
