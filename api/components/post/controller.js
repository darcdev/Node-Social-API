const dummystore = require("../../../store/dummy");
const error = require("../../../utils/error");

const TABLE = "post";

module.exports = function (injectedstore) {
  let store = injectedstore || dummystore;

  function list() {
    return store.list(TABLE);
  }

  async function get(id) {
    const post = await store.get(TABLE, id);
    if (!post) {
      throw error("No existe el post", 404);
    }
  }
  async function upsert(data, user) {
    const post = {
      id: data.id,
      user: user,
      text: data.text,
    };

    if (!post.id) {
      post.id = nanoid();
    }

    await store.upsert(TABLE, post);
    return post;
  }

  async function like(post, user) {
    const like = await store.upsert(TABLE + "_like", {
      post: post,
      user: user,
    });

    return like;
  }

  async function postsLiked(user) {
    const users = await store.query(
      TABLE + "_like",
      { user: user },
      { post: post }
    );
    return users;
  }

  async function postLikers(post) {
    const users = await store.query(
      TABLE + "_like",
      { post: post },
      { post: post }
    );
    return users;
  }

  return {
    list,
    get,
    upsert,
    like,
    postsLiked,
    postLikers,
  };
};
