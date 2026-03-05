const { createClient } = require('redis');
require('dotenv').config(); // Load environment variables from .env file
// Create the client
const redisClient = createClient({
// use the url from the .env file
    url: process.env.REDIS_URI,
    socket: {
        tls: true, // Crucial for Upstash
        reconnectStrategy: (retries) => Math.min(retries * 50, 500)
    }
});

// Event listeners for monitoring
redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('⏳ Connecting to Redis...'));
redisClient.on('ready', () => console.log('Connection[Status]: Sucess✅ !\n-----------------------------------------------------\n<< [DEBUGGING SECTION [ACTIVE] >>'));


// Function to initiate connection
const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (err) {
        console.error('❌ Could not connect to Redis:', err);
    }
};

// Start the connection immediately when this file is required
connectRedis();

// Export the client so other files can use it
module.exports = redisClient;