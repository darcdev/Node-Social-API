const express = require("express");
const router = express.Router();

const response = require("../network/response");
const store = require("../store/redis");

router.get("/:table", list);
router.get("/:table/:id", get);
router.put("/:table", upsert);

async function list(req, res) {
  try {
    const data = await store.list(req.params.table);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
async function get(req, res) {
  try {
    const data = await store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
async function upsert(req, res) {
  try {
    const data = await store.upsert(req.params.table, req.params.body);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
module.exports = router;
