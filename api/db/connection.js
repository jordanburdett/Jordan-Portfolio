const { MongoClient } = require("mongodb");
console.log("MONGODB_URI", process.env.MONGODB_URI);
const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);
let db = client.db("Jordan-Portfolio");

module.exports = db;