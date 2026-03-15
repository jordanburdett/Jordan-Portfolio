const { MongoClient } = require("mongodb");

let db = null;

function getDb() {
  if (!db) {
    const connectionString = process.env.MONGODB_URI || "";
    const client = new MongoClient(connectionString);
    db = client.db("Jordan-Portfolio");
  }
  return db;
}

// Proxy so existing code using `db.collection(...)` works without changes
module.exports = new Proxy({}, {
  get(_, prop) {
    return getDb()[prop];
  }
});
