module.exports.applyTo = (db) => {
  return db.run(`
    INSERT INTO NotesTags
      (Notes_id,  Tags_id)
    VALUES
      (1,         4),
      (1,         5),

      (2,         3),
      (2,         4),

      (3,         1),
      (3,         2),

      (4,         1),
      (4,         5),

      (5,         3),
      (5,         2),

      (6,         1),
      (6,         2),
      (6,         3),

      (7,         3),
      (7,         4),
      (7,         5),

      (8,         1),
      (8,         3),
      (8,         5);
  `);
}
