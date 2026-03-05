const argon2 = require('argon2');

/**
 * Hashes the OTP using Argon2id.
 * Settings are tuned for high security (OWASP recommended).
 */
async function hashOTP(otp) {
  try {
    return await argon2.hash(otp, {
      type: argon2.argon2id, // The most secure variant
      hashLength: 16,        // 32-byte hash output
      memoryCost: 2 ** 16,   // 64MB memory usage ---[  High memory consumption to slow down brute-force attacks ]
      timeCost: 3,           // 3 iterations
      parallelism: 1         // Number of threads
    });
  } catch (err) {
    console.error('Error hashing OTP:', err);
    throw new Error('Internal Security Error');
  }
}

module.exports = { hashOTP};