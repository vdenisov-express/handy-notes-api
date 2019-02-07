CREATE TABLE "NotesTags" (
  "id"          INTEGER   PRIMARY KEY,
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

CREATE INDEX "NotesTags_ix_Notes_id"  ON "NotesTags" ("Notes_id");
CREATE INDEX "NotesTags_ix_Tags_id"   ON "NotesTags" ("Tags_id");
