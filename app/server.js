// libs {
const express = require('express')
// } libs


const app = express();

app.get('/', (req, res) => res.send('Hello World!'))


// export {
module.exports = app;
// } export
