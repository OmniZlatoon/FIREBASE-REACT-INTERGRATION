const admin = require ("firebase-admin");
const serviceAccount = require("./firebaseConfig.json")

// Initialize Firebase Admin SDK
// firebase admin initialization
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
if (adminApp) {
  console.log("Firebase Admin SDK initialized successfully.");
} else {
  console.error("Failed to initialize Firebase Admin SDK.");
}

const auth= admin.auth();
module.exports= {auth};