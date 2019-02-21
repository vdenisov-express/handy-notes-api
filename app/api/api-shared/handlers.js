module.exports = {

  SUCCESS(response, status, data = null, message = null) {
    const results = {};
    results.data = data;

    if (data)     results.total = data.length;
    if (message)  results.message = message;

    return response.status(status).json(results);
  },

  ERROR(res, err) {
    return res.status(500).json(err);
  },

  STOPPER(res) {
    return res.status(200).send('All is okay ;)');
  },

  ERROR_ON_AUTH(res, message) {
    return res.status(401).json({ message });
  },

  ERROR_NOT_FOUND(res, message) {
    return res.status(404).json({ message });
  },

  ERROR_ON_DATABASE(ress, err) {
    // const message = 'unexpected database error';
    // if ((err.code) === 'SQLITE_CONSTRAINT') {
    //   message = 'already exists, send unique data'
    // }
    return response.status(400).json({ err });
  },

}
