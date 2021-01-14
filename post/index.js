const express = require("express");
const app = express();

const errors = require("../network/errors");
const config = require("../config.js");

const post = require("./components/post/network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/post", post);
app.use(errors);

app.listen(config.post.port, "0.0.0.0", () => {
  console.log("Api escuchando en el puerto", config.post.port);
});
