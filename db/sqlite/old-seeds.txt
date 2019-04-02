const { db } = require('./sqlite.init');
const authService = require('./../../app/api/auth/auth.service');

const passHash = authService.createPasswordHash('qwerty123');


// Users ================================================================================
db.run(`
  INSERT INTO Users
    (name,              email,                password,         phone,    birthdate)
  VALUES
    ("Leonardo",        "leo@gmail.com",      "${passHash}",    NULL,     NULL),
    ("Raphael",         "raph@gmail.com",     "${passHash}",    NULL,     NULL),
    ("Donatello",       "donnie@gmail.com",   "${passHash}",    NULL,     NULL),
    ("Michelangelo",    "mickey@gmail.com",   "${passHash}",    NULL,     NULL);
`);


// Notes ================================================================================
db.run(`
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


// Tags ================================================================================
db.run(`
  INSERT INTO Tags
    (value)
  VALUES
    ("music"),
    ("sport"),
    ("javascript"),
    ("netflix"),
    ("sleep");
`);


// NotesTags ================================================================================
db.run(`
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


// Likes ================================================================================

db.run(`
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
