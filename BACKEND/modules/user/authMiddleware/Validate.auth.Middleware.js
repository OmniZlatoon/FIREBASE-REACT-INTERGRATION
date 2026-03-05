const { auth }= require('../firebase_init/initialize_firebase');

const validateFirebaseToken = async (req, res, next) => {

    // 1. ALWAYS let OPTIONS requests pass without checking for a token
  if (req.method === 'OPTIONS') {
    return next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Attaching the user (uid, email) to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = {validateFirebaseToken};