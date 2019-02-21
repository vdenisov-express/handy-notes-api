module.exports = {

  SUCCESS(response, status, data = null, message = null) {
    const results = {};
    results['data'] = data;

    if (data)     results['total'] = data.length;
    if (message)  results['message'] = message;

    return response.status(status).json(results);
  },

  ERROR(res, err) {
    return res.status(500).json(err);
  },

  STOPPER(res) {
    return res.status(200).send('All is okay ;)');
  },

}
