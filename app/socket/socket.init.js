const cool = require('cool-ascii-faces');
const random_name = require('node-random-name');


module.exports = function initialize(server) {
  const io = require('socket.io')(server);

  io.on('connection', client => {
    console.log('client connected!');
    let i = 0;

    setInterval(() => {
      client.emit('signup', {
        id: ++i,
        face: cool(),
        name: random_name(),
      });
    }, 1000);

    client.on('disconnect', () => {
      console.log('client disconnected!');
    });
  });
}
