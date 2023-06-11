/*
    Randy Cao
    Project 3
*/

//Imported fastify, fs package, and coinCount
const fs = require('fs');
const fastify = require('fastify')();
const {coinCount} = require('./p3-module.js');

// Define a GET route for the home page that returns index.html
fastify.get('/', (request, response) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) {
        response
          .code(500)
          .header('Content-Type', 'text/html')
          .send('<h1>Sorry, something went wrong on our end.</h1>');
      } else {
        response
          .code(200)
          .header('Content-Type', 'text/html')
          .send(data);
      }
    });
  });

// Define a GET route for the /coin
fastify.get('/coin', (request, response) => {
    const { denom = 0, count = 0 } = request.query;
    const coinValue = coinCount({ denom, count });
    response
      .code(200)
      .header('Content-Type', 'text/html')
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });

 // Define a GET route for the /coins endpoint
fastify.get('/coins', (request, response) => {
    const { option } = request.query;
    let coinValue;
    const coins = [{ denom: 25, count: 2 }, { denom: 1, count: 7 }];
    // Use a switch statement to handle different option values
    switch (option) {
      case '1':
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case '2':
        coinValue = coinCount(...coins);
        break;
        default:
        coinValue = coinCount(coins);
        break;
    }
    // Return response with appropriate status code and MIME type
    response
      .code(200)
      .header('Content-Type', 'text/html')
      .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
  });
  

//added fastify.listen
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

 





