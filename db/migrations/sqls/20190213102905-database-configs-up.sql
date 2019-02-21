/* ENABLE foreign keys */

-- $> PRAGMA foreign_keys = ON;

/* But it's useless commands because ... */
-- // Changing the foreign_keys setting affects the execution of all statements prepared using the database connection, including those prepared before the setting was changed.
-- // To minimize future problems, applications should set the foreign key enforcement flag as required by the application and not depend on the default setting.
