CREATE TABLE IF NOT EXISTS "NotesTags" (
  "Notes_id"    INTEGER   NOT NULL,
  "Tags_id"     INTEGER   NOT NULL,

  UNIQUE("Notes_id", "Tags_id"),

  CONSTRAINT NotesTags_fk_Notes_id
    FOREIGN KEY ("Notes_id") REFERENCES "Notes" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT NotesTags_fk_Tags_id
    FOREIGN KEY ("Tags_id") REFERENCES "Tags" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "NotesTags_ix_ManyToMany"
  ON "NotesTags" ("Notes_id", "Tags_id");
