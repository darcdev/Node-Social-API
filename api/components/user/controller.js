const dummyStore = require("../../../store/dummy");
const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore || dummyStore;
  let cache = injectedCache || dummyStore;

  async function list() {
    let users = await cache.list(TABLE);
    if (!users) {
      users = store.list(TABLE);
      cache.upsert(TABLE, users);
    }
    return users;
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
      id: body.id || nanoid(),
    };

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }
    return store.upsert(TABLE, user);
  }

  function follow(from, to) {
    return store.upsert(TABLE + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  async function following(user) {
    console.log(user);
    const join = {};
    join[TABLE] = "user_to"; //{user : 'user_to'}
    const query = { user_from: user };
    console.log(query);
    return await store.query(TABLE + "_follow", query, join);
  }
  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
