var express = require("express");
var router = express.Router();
const authenticateJwt = require("../auth/auth");
const db = require("../db/connection");

const connectToCollection = async (collection) => {
  const usersCollection = await db.collection(collection);
  return usersCollection;
};

// Get about data
router.get("/", async function (req, res, next) {
  const aboutCollection = await connectToCollection("about");
  const aboutData = await aboutCollection.findOne({});
  res.json(aboutData || { text: "", imageUrl: "", imageAlt: "" });
});

// Update about data
router.put("/", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  const aboutData = req.body;

  if (!aboutData) {
    res.json({ success: false, message: "about data not provided" });
    return;
  }

  // Remove _id from the update data if it exists
  const { _id, ...updateData } = aboutData;

  const aboutCollection = await connectToCollection("about");
  
  // Since we only have one about document, we'll use upsert
  const result = await aboutCollection.updateOne(
    {}, // empty filter to match any document
    { $set: updateData },
    { upsert: true } // create if doesn't exist
  );

  res.json({ ...updateData, _id: _id });
});

module.exports = router;
