const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const cors = require('cors');
const db = require('./config/db');
const redisClient= require('./Redis_config/Redis_setup');
require('dotenv').config();
const Port = process.env.PORT;
const app = express();


// Allow CORS for all platforms 

app.use(cors({
  origin: ['https://subtarsal-kathyrn-untreated.ngrok-free.dev', 'http://localhost:5173'], // Allow Vite and CRA ports
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    })
);

// use bodyparser middleware 
app.use(express.json());
app.use('/nexasoft/users', userRoutes);

// Connect to the DB
db.connect().then(() => {
    console.log(`Connected to the database to : ${process.env.DB_NAME} `);
}).catch((err) => {
    console.error('Database connection error:', err);
});


// Connect to the Redis Client
app.post('/test-redis', async (req, res) => {
    // You can now use the client directly here
    await redisClient.set('status', 'running');
    const value = await redisClient.get('status');
    res.send(`Redis status: ${value}`);
});

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
   
})