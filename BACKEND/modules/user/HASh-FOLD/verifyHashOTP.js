const argon2 = require('argon2');

 //Verifies the user's input against the hash stored in Redis.
async function OTPverify(storedHash, otp) {
  try {
    // argon2.verify handles extracting the salt from the hash automatically
    return await argon2.verify(storedHash, otp);
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return false;
  }
}

module.exports = { OTPverify };


// Explanation---------]

// this Function is used to verify the OTP provided by the user against the hashed OTP stored in Redis. 
// It uses argon2's verify function, which automatically extracts the salt from the stored hash and compares it with the provided OTP. 
// If the verification is successful, it returns true; otherwise, it returns false.