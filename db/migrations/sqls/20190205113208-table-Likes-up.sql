CREATE TABLE "Likes" (
  "id"          INTEGER   PRIMARY KEY,
  "Notes_id"    INTEGER   NOT NULL,
  "Users_id"    INTEGER   NOT NULL,

  UNIQUE("Notes_id", "Users_id"),

  CONSTRAINT Likes_fk_Notes_id
    FOREIGN KEY ("Notes_id") REFERENCES "Notes" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Likes_fk_Users_id
    FOREIGN KEY ("Users_id") REFERENCES "Users" ("id")
      ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Likes_ix_Notes_id ON "Likes" ("Notes_id");
CREATE INDEX Likes_ix_Users_id ON "Likes" ("Users_id");
