const {randomBytes}= require ('node:crypto');// using crypto module to generate random bytes for OTP generation
 const generateOTP = ( ) => {
   const length = 6;
   const charset= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let result= '';
   const bytes= randomBytes(length);

    for (let i = 0; i < length; i++) {
        result += charset[bytes[i] % charset.length];
    }
    return result;
}
module.exports = { generateOTP };



// * Why use Crypto - randomBytes over Math.random() for OTP generation?

// 1. Security: randomBytes provides cryptographically secure random values, making it suitable for generating OTPs that need to be resistant to prediction and attacks.
//  Math.random() is not designed for security and can be predictable, which could lead to vulnerabilities in OTP generation.
// 2. Uniqueness: randomBytes generates unique values each time, 
// while Math.random() may produce the same sequence of numbers if the same seed is used, increasing the risk of OTP collisions.
// 3. Compliance: For applications that require compliance with security standards (e.g., PCI DSS), using a secure method like randomBytes 
// is essential to meet the requirements for generating secure OTPs.