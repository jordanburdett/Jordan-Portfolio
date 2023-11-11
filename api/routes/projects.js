var express = require("express");
var router = express.Router();
const authenticateJwt = require("../auth/auth");
const db = require("../db/connection");

const connectToCollection = async (collection) => {
  const usersCollection = await db.collection(collection);
  return usersCollection;
};

router.get("/", async function (req, res, next) {
  // connect to db
  let query = {};

  if (req?.body?.query) {
    query = req.body.query;
  }

  const projectsCollection = await connectToCollection("projects");
  const projects = await projectsCollection.find(query).toArray();

  res.json(projects);
});

router.post("/", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  const project = req?.body?.project;

  if (!project || !project.id) {
    res.json({ success: false, message: "project not provided" });
    return;
  }

  const projectsCollection = await connectToCollection("projects");
  const result = await projectsCollection.insertOne(project);

  res.json({ success: true, message: "project added" });
});

router.put("/updateproject", authenticateJwt, async function (req, res, next) {
  if (req?.user?.admin == false || req?.user?.admin == null) {
    res.sendStatus(403);
    return;
  }

  const project = req?.body?.project;

  if (project === null) {
    res.json({ success: false, message: "project not provided" });
    return;
  }

  delete project._id;

  const projectsCollection = await connectToCollection("projects");
  const result = await projectsCollection.updateOne(
    { id: project.id },
    { $set: project }
  );

  console.log("result: ", result);
  if (result.modifiedCount === 0) {
    res.json({
      success: false,
      message: "project not found",
    });
    return;
  }

  res.json({ success: true, message: "project updated" });
});

router.delete(
  "/deleteproject",
  authenticateJwt,
  async function (req, res, next) {
    if (req?.user?.admin == false || req?.user?.admin == null) {
      res.sendStatus(403);
      return;
    }

    console.log("deleteProject attempted");

    const id = req?.body?.id;

    if (id === null) {
      res.json({ success: false, message: "project not provided" });
      return;
    }

    const projectsCollection = await connectToCollection("projects");
    const result = await projectsCollection.deleteOne({ id: id });

    res.json({ success: true, message: "project deleted" });
  }
);
module.exports = router;
