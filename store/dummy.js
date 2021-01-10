// Mock database
const db = {
  user: [
    { id: "1", name: "Carlos" },
    { id: "2", name: "Andrea" },
  ],
};
async function list(table) {
  return db[table];
}

async function get(table, id) {
  let collection = await list(table);
  return collection.find((item) => item.id === id) || null;
}

async function upsert(table, data) {
  db[table].push(data);
  return data;
}

function remove(table, id) {
  return true;
}
module.exports = {
  list,
  get,
  upsert,
  remove,
};
