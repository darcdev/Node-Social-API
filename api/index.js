const express = require("express");
const app = express();

const config = require("../config.js");

const user = require("./components/user/network");
// Router
app.use("/api/user", user);

app.listen(config.api.port, "0.0.0.0", () => {
  console.log("Api escuchando en el puerto", config.api.port);
});
