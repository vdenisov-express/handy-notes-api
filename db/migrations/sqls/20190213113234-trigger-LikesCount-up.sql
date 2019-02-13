-- STEP 1
-- ADD COLUMN "likes_count" to table "Notes"
ALTER TABLE "Notes"
  ADD COLUMN likes_count INTEGER DEFAULT 0;

-- STEP 2
-- CREATE TRIGGER for INCREASE by 1 column "likes_count"
-- in table "Notes" after adding new record to table "Likes"
CREATE TRIGGER IF NOT EXISTS "Notes_incr_LikesCount"
  AFTER INSERT ON "Likes"
  FOR EACH ROW BEGIN

    UPDATE "Notes"
    SET likes_count = likes_count + 1
    WHERE id = NEW.Notes_id;

  END;

-- STEP 3
-- CREATE TRIGGER for DECREASE by 1 column "likes_count"
-- in table "Notes" after deleting record from table "Likes"
CREATE TRIGGER IF NOT EXISTS "Notes_decr_LikesCount"
  AFTER DELETE ON "Likes"
  FOR EACH ROW BEGIN

    UPDATE "Notes"
    SET likes_count = likes_count - 1
    WHERE id = OLD.Notes_id;

  END;
