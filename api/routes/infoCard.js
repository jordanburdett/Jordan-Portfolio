var express = require("express");
var router = express.Router();
const authenticateJwt = require("../auth/auth");
const db = require("../db/connection");

const connectToCollection = async (collection) => {
  const usersCollection = await db.collection(collection);
  return usersCollection;
};

// get all infoCards
router.get("/", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  // connect to db
  let query = {};

  if (req?.body?.query) {
    query = req.body.query;
  }

  const infoCardsCollection = await connectToCollection("infoCards");
  const infoCards = await infoCardsCollection.find(query).toArray();

  res.json(infoCards);
});

// add new infoCard
router.post("/", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  const infoCard = req?.body?.infoCard;

  if (!infoCard || !infoCard.id) {
    res.json({ success: false, message: "infoCard not provided" });
    return;
  }

  const infoCardsCollection = await connectToCollection("infoCards");
  const result = await infoCardsCollection.insertOne(infoCard);

  res.json({ success: true, message: "infoCard added" });
});

// update infoCard
router.put("/updateinfocard", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  const infoCard = req?.body?.infoCard;

  delete infoCard._id;

  if (!infoCard) {
    res.json({ success: false, message: "infoCard not provided" });
    return;
  }

  // TODO add validation that there are not two id's that are the same

  const infoCardsCollection = await connectToCollection("infoCards");
  const result = await infoCardsCollection.updateOne(
    { id: infoCard.id },
    { $set: infoCard }
  );

  if (!result.acknowledged) {
    res.json({ success: false, message: "infoCard not updated" });
    return;
  }

  console.log(result);

  if (result.modifiedCount === 0) {
    res.json({ success: false, message: "infoCard not found" });
    return;
  }

  res.json({ success: true, message: "infoCard updated" });
});

router.delete("/deleteinfocard",authenticateJwt,
  async function (req, res, next) {
    if (req?.user?.admin == false || req?.user?.admin == null) {
      res.sendStatus(403);
      return;
    }

    const infoCardId = req?.body?.id;

    if (!infoCardId) {
      res.json({ success: false, message: "infoCardId not provided" });
      return;
    }

    const infoCardsCollection = await connectToCollection("infoCards");
    const result = await infoCardsCollection.deleteOne({ id: infoCardId });

    if (!result.acknowledged) {
      res.json({ success: false, message: "infoCard not deleted" });
      return;
    }

    if (result.deletedCount === 0) {
      res.json({ success: false, message: "infoCard not found" });
      return;
    }

    res.json({ success: true, message: "infoCard deleted" });
  }
);

// this is for getting the front infocards that are shown on home page. No auth needed
router.get("/getinfocards", async function (req, res, next) {
  const infoCardsCollection = await connectToCollection("infoCards");
  const infoCard = await infoCardsCollection.find({Hidden: false}).toArray();

  if (!infoCard) {
    res.json({ success: false, message: "infoCard not found" });
    return;
  }

  res.json(infoCard);
});

module.exports = router;
