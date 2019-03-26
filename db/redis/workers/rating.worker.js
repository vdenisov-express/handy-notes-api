const { AbstractWorker } = require('./abstract.worker');

class RatingWorker extends AbstractWorker {
  constructor () {
    super('rating');
  }
}

module.exports = { RatingWorker };
