const config = require("../../../config");
const store = require("../../../store/remote-mysql");
const controller = require("./controller");

let store, cache;

if (config.remoteDB === true) {
  store = require("../../../store/remote-mysql");
  cache = require("../../../store/remote-cache");
} else {
  W;
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}
module.exports = controller(store, cache);
