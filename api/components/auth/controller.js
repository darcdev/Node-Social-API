const bcrypt = require("bcrypt");
const dummyStore = require("../../../store/dummy");
const auth = require("../../../auth");

const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore || dummyStore;

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    const equals = await bcrypt.compare(password, data.password);
    if (equals) {
      delete data.password;
      // generate token
      return auth.sign({ ...data });
    } else {
      throw new Error("Informacion Invalida");
    }
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
