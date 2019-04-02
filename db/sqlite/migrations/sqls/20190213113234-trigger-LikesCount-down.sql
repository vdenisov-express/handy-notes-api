-- STEP 1
-- DELETE TRIGGER for INCREASE
DROP TRIGGER IF EXISTS "Notes_incr_LikesCount";

-- STEP 2
-- DELETE TRIGGER for DECREASE
DROP TRIGGER IF EXISTS "Notes_decr_LikesCount";

-- STEP 3
-- DROP COLUMN "likes_count" from table "Notes"
-- https://www.techonthenet.com/sqlite/tables/alter_table.php

/* DISABLE foreign keys */
PRAGMA foreign_keys = OFF;

-- COMMENT {
-- If you want you can start transaction
-- BEGIN TRANSACTION;
-- } COMMENT

-- STEP 3.1
-- RENAME TABLE "Notes" to "Notes_backup"
ALTER TABLE "Notes" RENAME TO "Notes_backup" ;

-- STEP 3.2
-- CREATE NEW TABLE with different name exactly like table "Notes"
CREATE TABLE IF NOT EXISTS "Notes" (
  "id"        INTEGER   PRIMARY KEY,
  "title"     TEXT      NOT NULL,
  "text"      TEXT      NOT NULL,
  "Users_id"  INTEGER   NOT NULL,

  CONSTRAINT "Notes_fk_Users_id"
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Notes_ix_Users_id"
  ON "Notes" ("Users_id");

-- STEP 3.3
-- COPY DATA from old table "Notes_backup" to new table "Notes"
INSERT INTO "Notes" ("id", "title", "text", "Users_id")
  SELECT "id", "title", "text", "Users_id"
  FROM "Notes_backup";

-- STEP 3.4
-- DROP OLD TABLE "Notes_backup"
-- (optional step)
DROP TABLE "Notes_backup";

-- COMMENT {
-- If you applied a transaction, you must close it
-- END TRANSACTION;
-- or you can use "COMMIT;"
-- } COMMENT

/* ENABLE foreign keys */
PRAGMA foreign_keys = ON;
