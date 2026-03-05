const {generateOTP} = require("./OTP/OTP.script");
const {hashOTP} = require("../user/HASh-FOLD/hashingOTPService");
const {SendOTPEmail} = require('../../NodeMailer/SendOTPEmail');
const redisClient = require('../../Redis_config/Redis_setup');



// create a function to generate OTP and send to the user's Email
async function generateandSendOTP(email, res) {
    try{

    // Create the 6-character OTP
        const otp = generateOTP();

        // hash OTP before sending to Redis
        const hashedOTP =  await hashOTP(otp);
        
        // Store the hash OTP in Redis
        await redisClient.set(email, hashedOTP, 'EX', 60); // Store OTP with a 60-second expiration

        //delete the OTP after expiration ( to not use of space in the Redis DB)
        setTimeout(async () => {
        await redisClient.del(email);
        }, 60000); // Delete OTP after 60 seconds (1 minute)


        // Send the  original OTP to the user's email
        await SendOTPEmail(email, otp);

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports= {generateandSendOTP};