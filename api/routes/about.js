const express = require("express");
const router = express.Router();
const authenticateJwt = require("../auth/auth");
const db = require("../db/connection");

/**
 * Connects to the specified MongoDB collection
 * @param {string} collectionName - Name of the collection to connect to
 * @returns {Promise<Collection>} MongoDB collection
 */
const connectToCollection = async (collectionName) => {
  try {
    return await db.collection(collectionName);
  } catch (error) {
    console.error(`Error connecting to collection ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get about data
 * Public endpoint - no authentication required
 */
router.get("/", async (req, res) => {
  try {
    const aboutCollection = await connectToCollection("about");
    const aboutData = await aboutCollection.findOne({});
    res.json(aboutData || { text: "", imageUrl: "", imageAlt: "" });
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching about data" 
    });
  }
});

/**
 * Update about data
 * Protected endpoint - requires admin authentication
 */
router.put("/", authenticateJwt, async (req, res) => {
  try {
    if (!req?.user?.admin) {
      return res.status(403).json({ 
        success: false, 
        message: "Admin access required" 
      });
    }

    const aboutData = req.body;
    if (!aboutData) {
      return res.status(400).json({ 
        success: false, 
        message: "About data not provided" 
      });
    }

    // Remove _id from the update data if it exists
    const { _id, ...updateData } = aboutData;

    const aboutCollection = await connectToCollection("about");
    await aboutCollection.updateOne(
      {}, // empty filter to match any document
      { $set: updateData },
      { upsert: true } // create if doesn't exist
    );

    res.json({ 
      success: true, 
      data: { ...updateData, _id } 
    });
  } catch (error) {
    console.error("Error updating about data:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating about data" 
    });
  }
});

module.exports = router;
