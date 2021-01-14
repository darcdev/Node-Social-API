const express = require("express");
const app = express();

const config = require("../config");
const router = require("./network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(config.cacheService.port, () => {
  console.log(
    "Servicio de mysql escuchando en el puerto",
    config.mysqlService.port
  );
});
