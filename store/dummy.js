// Mock database
const db = {
  user: [
    { id: "1", name: "Carlos", username: "Carlos" },
    { id: "2", name: "Andrea", username: "Andrea" },
  ],
};
async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let collection = await list(table);
  return collection.find((item) => item.id === id) || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  return data;
}

function remove(table, id) {
  return true;
}

async function query(table, q) {
  let collection = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  return collection.find((item) => item[key] === q[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
