require('dotenv').config()
const { Pool }  = require('pg')

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db





// 1. Object Destructuring
// The pg package has several components (like Pool, Client, and Query). Using { Pool } is a JavaScript destructuring shortcut to grab only the Pool class from that exported object. 
// const { Pool } = require('pg');
// Directly extracts the Pool class. You can then immediately call new Pool().
// const Pool = require('pg');
// Imports the entire pg module and names it Pool. If you do this, your code will fail when you try to call new Pool() because the variable Pool is actually the full library object, not the constructor. 
// 2. What would happen if you didn't destructure?
// If you preferred to import the whole library, you would have to access the pool like this:
// javascript
// const pg = require('pg');
// const pool = new pg.Pool({ ... }); // You must use the dot notation