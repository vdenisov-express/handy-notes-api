module.exports.applyTo = (db) => {
  return db.run(`
    INSERT INTO Notes
      (Users_id,    title,      text)
    VALUES
      (1,           "note-A",   "aaaaaaaaaa"),
      (1,           "note-B",   "bbbbbbbbbb"),

      (2,           "note-C",   "cccccccccc"),
      (2,           "note-D",   "dddddddddd"),

      (3,           "note-E",   "eeeeeeeeee"),
      (3,           "note-F",   "ffffffffff"),

      (4,           "note-G",   "gggggggggg"),
      (4,           "note-H",   "hhhhhhhhhh");
  `);
}
