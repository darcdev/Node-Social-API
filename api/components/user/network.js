const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);
router.post("/follow/:id", secure("follow"), follow);
router.get("/:id/following", following);

async function list(req, res) {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
async function get(req, res) {
  try {
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
async function upsert(req, res) {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function follow(req, res) {
  try {
    const data = await controller.follow(req.user.id, req.params.id);
    response.success(req, res, data, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function following(req, res) {
  try {
    const data = await controller.following(req.params.id);
    response.success(req, res, data, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
module.exports = router;
