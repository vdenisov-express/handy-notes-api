CREATE TABLE IF NOT EXISTS "Likes" (
  "Notes_id"    INTEGER   NOT NULL,
  "Users_id"    INTEGER   NOT NULL,

  UNIQUE("Notes_id", "Users_id"),

  CONSTRAINT "Likes_fk_Notes_id"
    FOREIGN KEY ("Notes_id") REFERENCES "Notes" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Likes_fk_Users_id"
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Likes_ix_ManyToMany"
  ON "Likes" ("Notes_id", "Users_id");
