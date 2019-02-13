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
