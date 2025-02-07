const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const StatsService = require('../services/statsService');
const { statsQuerySchema } = require('../validation/statsSchema');
const { handleError, APIError } = require('../utils/errorHandler');

const connectToCollection = async (collectionName) => {
  try {
    return await db.collection(collectionName);
  } catch (error) {
    console.error(`Error connecting to collection ${collectionName}:`, error);
    throw new APIError(`Failed to connect to ${collectionName} collection`, 500);
  }
};

// Get aggregated statistics
router.get('/', async (req, res) => {
  try {
    const { error, value } = statsQuerySchema.validate(req.query);
    if (error) {
      throw new APIError(error.details[0].message, 400);
    }

    const statsCollection = await connectToCollection('statistics');
    const statsService = new StatsService(statsCollection);
    
    const result = await statsService.getAggregatedStats(value);
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
});

// Get location data from IP
router.get('/location', async (req, res) => {
  try {
    // Get client IP from request headers or socket
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // For development, return mock data if localhost
    if (ip === '::1' || ip === '127.0.0.1' || ip.includes('localhost')) {
      return res.json({
        country: 'United States',
        city: 'Local Development',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    }

    // For production, make the call to ipapi.co from the backend
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    res.json({
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      timezone: data.timezone || 'UTC'
    });
  } catch (error) {
    console.error('Error getting location:', error);
    res.json({
      country: 'Unknown',
      city: 'Unknown',
      timezone: 'UTC'
    });
  }
});

// Record a new page visit
router.post('/visit', async (req, res) => {
  try {
    const statsCollection = await connectToCollection('statistics');
    const visit = {
      ...req.body,
      timestamp: new Date().toISOString() // Ensure timestamp is stored as ISO string
    };
    await statsCollection.insertOne(visit);
    res.json({ success: true });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

// Update time spent on a page
router.post('/time', async (req, res) => {
  try {
    const { sessionId, route, timeSpent } = req.body;
    const statsCollection = await connectToCollection('statistics');
    
    await statsCollection.updateOne(
      { sessionId, route },
      { $set: { timeSpent } }
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating time spent:', error);
    res.status(500).json({ error: 'Failed to update time spent' });
  }
});

module.exports = router;
