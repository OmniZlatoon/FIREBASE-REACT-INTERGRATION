// Create the setup script to run the sql file to build the table in the DB
const fs= require('fs');
const path = require('path');
// 1. Force dotenv to look one folder up (in the backend root)


require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// 2. Add a quick sanity check to prove it worked
console.log("🛠️ Attempting to connect on port:", process.env.DB_PORT);
const db = require('./db'); // import the db connection pool


// Read the SQL file and execute the query to create the users table
const initializeDB= async () => {
try{
const sqlFilePath = path.join(__dirname, '../migrations/001_create_users.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf-8');


// Execute the SQL query
await db.query(sql);
console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }

}
initializeDB();






// This file was/ is setup for those using postgres as the DB to handle user registrationa and authentication