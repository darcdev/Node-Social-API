const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");

const errors = require("../network/errors");
const config = require("../config.js");

const user = require("./components/user/network");
const auth = require("./components/auth/network");
const post = require("./components/post/network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require("./swagger.json");

// Router
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/auth", auth);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors);

app.listen(config.api.port, "0.0.0.0", () => {
  console.log("Api escuchando en el puerto", config.api.port);
});
