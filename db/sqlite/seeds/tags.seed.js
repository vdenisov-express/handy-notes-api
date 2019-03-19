module.exports.applyTo = (db) => {
  return db.run(`
    INSERT INTO Tags
      (value)
    VALUES
      ("music"),
      ("sport"),
      ("javascript"),
      ("netflix"),
      ("sleep");
  `);
}
