const { onRequest } = require("firebase-functions/v2/https");

// Set environment before requiring the app
process.env.ENVIRONMENT = "cloud";

const app = require("./api/index.js");

exports.api = onRequest(
  {
    secrets: ["MONGODB_URI", "ACCESS_TOKEN_SECRET"],
    invoker: "public",
  },
  app
);
