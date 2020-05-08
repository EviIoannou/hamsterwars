var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hamsterwars-64a0f.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();


module.exports = {
    auth,
    db
}