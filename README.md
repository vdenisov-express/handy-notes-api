# Training project "Notes"

This project made during the internship in "LodossTeam".

## Description

This is a backend application that uses the Express framework.

| Branch | Description |
| ------- | ------ |
| task1-landing       | Landing (Handlebars + Bootstrap)  |
| task2-tables        | Tables (migrations with pure sql) |
| task3-triggers      | Triggers (triggers for add/del tags and likes to note)  |
| task3-optimization  | Optimize code (fix some errors) |
| task4-rest          | Create endpoints for data management  |
| task5-auth          | Add authorization via [passport-jwt](http://www.passportjs.org/packages/passport-jwt/)  |
| task6-validation    | Add validation for endpoints using package [joi](https://www.npmjs.com/package/joi) |
| task7-websocket     | Create new page for getting [smiles](https://www.npmjs.com/package/cool-ascii-faces) by [socket](https://www.npmjs.com/package/socket.io) |
| task8-rating        | Use [Redis](https://redislabs.com/) to store user ratings (using [redis](https://www.npmjs.com/package/redis))  |
| task9-statistic     | Use [Mongo](https://mlab.com/) to store info about created notes and received likes for user (using [mongoose](https://www.npmjs.com/package/mongoose)) |
| task10-BestPracties | Intermediate code optimization based on best practices  |

to be continued ...

## Quick start

#### => installing ...
```sh
$ npm install
```

#### => starting ...
```sh
$ npm run start:dev
$ npm run db:dev:seeds
```

#### => testing ...
```sh
$ npm run start:test
$ npm run test
```

#### => eslint ...
```sh
$ npm run lint
$ npm run lint:fix
```

## Documentation

To get acquainted with the api methods, you can use the link to [Postman](https://www.getpostman.com/collections/eec0f45bc9384021fff6) collection.

Or you can see a description of some of the methods in [Swagger](http://localhost:3000/api/docs) page.

## Help

For all questions about the application, you can write to vdenisov.dev@gmail.com
