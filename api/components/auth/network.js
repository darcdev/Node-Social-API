const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");

router.post("/login", login);

async function login(req, res) {
  try {
    const token = await controller.login(req.body.username, req.body.password);
    response.success(req, res, token, 200);
  } catch (err) {
    response.error(req, res, "Informacion Invalida", 400);
  }
}
module.exports = router;
