const express = require('express');
const app = express();
const path = require('path');
const format = require('pg-format');
const cors = require('cors');


/* SETTINGS FOR DEV */
    // const pgKeys_dev = require('./pgkeys_dev.js');
    // let config = {
    //   user: pgKeys_dev.PG_USER,
    //   password: pgKeys_dev.PG_PASSWORD,
    //   database: pgKeys_dev.PG_DATABASE,
    //   max: 10,
    //   idleTimeoutMillis: 30000
    // }

    // const pg = require('pg');
    // let pool = new pg.Pool(config);

/* SETTINGS FOR DEV */

/* SETTINGS FOR PROD */
    // let config = {
    //   user: pgKeys.PG_USER,
    //   password: pgKeys.PG_PASSWORD,
    //   database: pgKeys.PG_DATABASE ,
    //   max: 10,
    //   idleTimeoutMillis: 30000
    // }

    // const { Pool } = require('pg');
    // const pool = new Pool({
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: true
    // });
/* SETTINGS FOR PROD */

var env = process.env.NODE_ENV;

const {Pool} = require('pg');
let config;
let pool;

switch (env) {
    case 'development':
        const pgKeys_dev = require('./pgkeys_dev.js');
        config = {
          user: pgKeys_dev.PG_USER,
          password: pgKeys_dev.PG_PASSWORD,
          database: pgKeys_dev.PG_DATABASE,
          max: 10,
          idleTimeoutMillis: 30000
        }

        pool = new Pool(config);

        break;
    case 'production':
        const pgKeys = require('./pgkeys.js');
        config = {
          user: pgKeys.PG_USER,
          password: pgKeys.PG_PASSWORD,
          database: pgKeys.PG_DATABASE ,
          max: 10,
          idleTimeoutMillis: 30000
        }

        pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: true
        });

        break;
}

console.log('server start')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/vacationcity'));
}

// Serve only the static files from the dist directory
// app.use(express.static(__dirname + '/dist/vacationcity'));

app.use(cors());

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname,  '/dist/vacationcity', 'index.html'));
});

app.get('/api/months', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM months_table');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*" );
    res.send(results);

    // console.log(results)
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

app.get('/api/temps', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM temps_table');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*");
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

app.get('/api/humidity', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM humidity_table');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*");
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

app.get('/api/cities', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM cities_table');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*");
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

app.get('/api/citytemps', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM "cityTemps_table"');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*");
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

app.get('/api/citycoords', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM "cityCoords_table"');
    const results = { 'results': (result) ? result.rows : null};
    res.header("Access-Control-Allow-Origin", "*");
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err); 
  }
})

console.log('server 2')

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8000);
console.log('server 3')







/*------------- HEROKU DB CONNECTION ---------*/


// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

// console.log('server start')

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/vacationcity'));

// app.get('/', function(req,res) {
// res.sendFile(path.join(__dirname + '/dist/vacationcity/index.html'));
// });


// app.get('/api/db', async (req, res) => {
//   try {
//     const client = await pool.connect()
//     const result = await client.query('SELECT * FROM test_table');
//     const results = { 'results': (result) ? result.rows : null};
//     // res.render('pages/db', results );
//     res.send(results);
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err); 
//   }
// })

// console.log('server 2')

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8000);
// console.log('server 3')