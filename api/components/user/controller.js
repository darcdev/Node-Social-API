const dummyStore = require("../../../store/dummy");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore || dummyStore;

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }
  return {
    list,
    get,
  };
};
