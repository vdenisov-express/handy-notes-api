-- STEP 1
-- DELETE TRIGGER for INCREASE
DROP TRIGGER IF EXISTS "Notes_incr_TagsCount";

-- STEP 2
-- DELETE TRIGGER for DECREASE
DROP TRIGGER IF EXISTS "Notes_decr_TagsCount";

-- STEP 3
-- DROP COLUMN in table "Notes"
-- https://www.techonthenet.com/sqlite/tables/alter_table.php

-- STEP 3.1
-- CREATE NEW TABLE with different name exactly like table "Notes"
CREATE TABLE IF NOT EXISTS "Notes_backup" (
  "id"        INTEGER   PRIMARY KEY,
  "title"     TEXT      NOT NULL,
  "text"      TEXT      NOT NULL,
  "Users_id"  INTEGER   NOT NULL,

  CONSTRAINT "Notes_fk_Users_id"
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- STEP 3.2
-- COPY DATA from old table "Notes" to new table "Notes_backup"
INSERT INTO "Notes_backup" ("id", "title", "text", "Users_id")
  SELECT "id", "title", "text", "Users_id"
  FROM "Notes";

-- STEP 3.3
-- DROP OLD TABLE "Notes"
DROP TABLE "Notes";

-- STEP 3.4
-- RENAME NEW TABLE "Notes_backup" to "Notes"
ALTER TABLE "Notes_backup" RENAME TO "Notes" ;

-- STEP 3.5
-- CREATE INDEX for column "Users_id" in table "Notes"
-- because it was deleted at the end of step 3.3
-- (if you delete the table, all bound indexes are also deleted)
CREATE INDEX "Notes_ix_Users_id" ON "Notes" ("Users_id");
