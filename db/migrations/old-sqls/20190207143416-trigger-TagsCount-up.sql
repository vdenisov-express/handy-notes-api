-- STEP 1
-- ADD COLUMN "tags_count" to table "Notes"
ALTER TABLE "Notes"
  ADD COLUMN tags_count INTEGER DEFAULT 0;

-- STEP 2
-- CREATE TRIGGER for INCREASE by 1 column "tags_count"
-- in table "Notes" after adding new record to table "NotesTags"
CREATE TRIGGER IF NOT EXISTS "Notes_incr_TagsCount"
  AFTER INSERT ON "NotesTags"
  FOR EACH ROW BEGIN

    UPDATE "Notes"
    SET tags_count = tags_count + 1
    WHERE id = NEW.Notes_id;

  END;

-- STEP 3
-- CREATE TRIGGER for DECREASE by 1 column "tags_count"
-- in table "Notes" after deleting record from table "NotesTags"
CREATE TRIGGER IF NOT EXISTS "Notes_decr_TagsCount"
  AFTER DELETE ON "NotesTags"
  FOR EACH ROW BEGIN

    UPDATE "Notes"
    SET tags_count = tags_count - 1
    WHERE id = OLD.Notes_id;

  END;
