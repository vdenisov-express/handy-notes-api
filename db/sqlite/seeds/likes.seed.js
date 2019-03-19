module.exports.applyTo = (db) => {
  return db.run(`
    INSERT INTO Likes
      (Users_id,  Notes_id)
    VALUES
      (1,         1),
      (1,         3),
      (1,         5),
      (1,         7),

      (2,         2),
      (2,         6),
      (2,         8),

      (3,         5),
      (3,         6),

      (4,         1),
      (4,         2),
      (4,         5),
      (4,         6);
  `);
}
