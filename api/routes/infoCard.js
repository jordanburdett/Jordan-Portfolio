var express = require("express");
var router = express.Router();
const authenticateJwt = require("../auth/auth");
const infoCardService = require("../services/infoCardService");
const adminService = require("../services/adminService");
const { validateInfoCard } = require("../validation/infoCardValidation");

// get all infoCards
router.get("/", authenticateJwt, async function (req, res, next) {
  if (!adminService.isAdminUser(req?.user)) {
    res.sendStatus(403);
    return;
  }

  const query = req?.body?.query || {};
  const infoCards = await infoCardService.getAllInfoCards(query);
  res.json(infoCards);
});

// add new infoCard
router.post("/", authenticateJwt, async function (req, res, next) {
  if (!adminService.isAdminUser(req?.user)) {
    res.sendStatus(403);
    return;
  }

  const infoCard = req?.body?.infoCard;
  const validation = validateInfoCard(infoCard);
  
  if (!validation.isValid) {
    res.json({ success: false, message: validation.message });
    return;
  }

  await infoCardService.addInfoCard(infoCard);
  res.json({ success: true, message: "infoCard added" });
});

// update infoCard
router.put("/updateinfocard", authenticateJwt, async function (req, res, next) {
  if (!adminService.isAdminUser(req?.user)) {
    res.sendStatus(403);
    return;
  }

  const infoCard = req?.body?.infoCard;
  const validation = validateInfoCard(infoCard);
  
  if (!validation.isValid) {
    res.json({ success: false, message: validation.message });
    return;
  }

  const result = await infoCardService.updateInfoCard(infoCard);

  if (!result.acknowledged) {
    res.json({ success: false, message: "infoCard not updated" });
    return;
  }

  if (result.modifiedCount === 0) {
    res.json({ success: false, message: "infoCard not found" });
    return;
  }

  res.json({ success: true, message: "infoCard updated" });
});

router.delete("/deleteinfocard", authenticateJwt, async function (req, res, next) {
  if (!adminService.isAdminUser(req?.user)) {
    res.sendStatus(403);
    return;
  }

  const result = await infoCardService.deleteInfoCard(req?.body?.id);
  res.json(result);
});

// this is for getting the front infocards that are shown on home page. No auth needed
router.get("/getinfocards", async function (req, res, next) {
  const infoCards = await infoCardService.getPublicInfoCards();
  
  if (!infoCards) {
    res.json({ success: false, message: "infoCard not found" });
    return;
  }

  res.json(infoCards);
});

module.exports = router;
