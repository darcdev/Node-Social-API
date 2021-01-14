const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");

router.get("/", list);
router.get("/:id", get);
router.post("/", secure("add"), upsert);
router.put("/", secure("update"), upsert);
router.post("/:id/like", secure("add"), like);
router.get("/like", postsLiked);
router.get("/:id/like", secure("list"), postLikers);

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
    const list = await controller.get(req.params.id);
    response.success(req, res, list, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function upsert(req, res) {
  try {
    const post = await controller.upsert(req.params.id);
    response.success(req, res, post, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function like(req, res) {
  try {
    const result = await controller.upsert(req.params.id, req.user.id);
    response.success(req, res, result, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function postsLiked(req, res) {
  try {
    const result = await controller.upsert(req.user.id);
    response.success(req, res, result, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function postLikers(req, res) {
  try {
    const result = await controller.upsert(req.params.id);
    response.success(req, res, result, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
module.exports = router;
