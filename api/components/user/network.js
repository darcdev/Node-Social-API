const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./secure");

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

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

module.exports = router;
