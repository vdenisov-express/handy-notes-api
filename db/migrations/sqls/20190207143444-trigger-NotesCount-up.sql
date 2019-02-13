-- STEP 1
-- ADD COLUMN "notes_count" to table "Users"
ALTER TABLE "Users"
  ADD COLUMN notes_count INTEGER DEFAULT 0;

-- STEP 2
-- CREATE TRIGGER for INCREASE by 1 column "notes_count"
-- in table "Users" after adding new record to table "Notes"
CREATE TRIGGER IF NOT EXISTS "Users_incr_NotesCount"
  AFTER INSERT ON "Notes"
  FOR EACH ROW BEGIN

    UPDATE "Users"
    SET notes_count = notes_count + 1
    WHERE id = NEW.Users_id;

  END;

-- STEP 3
-- CREATE TRIGGER for DECREASE by 1 column "notes_count"
-- in table "Users" after deleting record from table "Notes"
CREATE TRIGGER IF NOT EXISTS "Users_decr_NotesCount"
  AFTER DELETE ON "Notes"
  FOR EACH ROW BEGIN

    UPDATE "Users"
    SET notes_count = notes_count - 1
    WHERE id = OLD.Users_id;

  END;
