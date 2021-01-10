const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");

router.get("/", async (req, res) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

router.get("/:id", async function (req, res) {
  try {
    console.log(req.params.id);
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

module.exports = router;
