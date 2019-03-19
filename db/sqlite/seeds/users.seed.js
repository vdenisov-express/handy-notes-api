const { Factory } = require('rosie');
const RandExp = require('randexp');

const moment = require('moment');
moment.suppressDeprecationWarnings = true;

const faker = require('faker');
faker.locale = 'en';

const supertest = require('supertest');
const apiLink = supertest('http://localhost:3000/api/v1');


Factory.define('User')
  .sequence('id')
  .option('defaultName', 'Vladimir Denisov')
  .option('defaultPassword', 'qwerty123')
  // attributes
  .attr('name', () => faker.name.firstName() + ' ' + faker.name.lastName())
  .attr('email', ['name'], (name) => {
    const [firstName, lastName] = name.toLowerCase().replace(/'/g, '').split(' ');
    const email = `${firstName.charAt(0)}.${lastName.slice(0,7)}@gmail.com`;
    return email;
  })
  .attr('password', ['defaultPassword'], (defaultPassword) => defaultPassword)
  .attr('phone', () => new RandExp(/^(8-|\+7-)(\(\d{3}\))-(\d){3}-(\d){2}-(\d){2}$/).gen())
  // .attr('birthdate', () => new RandExp(/^(0[1-9]|1[012])[./](0[1-9]|[12][0-9]|3[01])[./]20(15|16|17|18|19)$/).gen())
  .attr('birthdate', ['id'], (id) => {
    const dateSeveralDaysAgo = moment().subtract(365 - id, 'days').calendar();
    // format definition
    const dateInterim = moment(dateSeveralDaysAgo, "MM/DD/YYYY");
    // reformatting
    const dateFormatted = moment(dateInterim).format("DD.MM.YYYY");
    return dateFormatted;
  });


module.exports.applyTo = (db) => {

  console.log('\n ##### Users seeds ##### \n');
  const total = 4;

  for (let i = 0; i < total; i++) {
    const newUser = Factory.build('User');
    delete newUser.id;

    apiLink.post(`/auth/register`).send(newUser)
      .end((err, res) => console.log(`#${i+1} => [${res.status}] ${res.body.message}`));
  }

}


// // ============
// // old sql seed
// // ============
// module.exports.applyTo = (db) => {
//   return db.run(`
//     INSERT INTO Users
//       (name,              email,                password,         phone,    birthdate)
//     VALUES
//       ("Leonardo",        "leo@gmail.com",      "${passHash}",    NULL,     NULL),
//       ("Raphael",         "raph@gmail.com",     "${passHash}",    NULL,     NULL),
//       ("Donatello",       "donnie@gmail.com",   "${passHash}",    NULL,     NULL),
//       ("Michelangelo",    "mickey@gmail.com",   "${passHash}",    NULL,     NULL);
//   `);
// }
