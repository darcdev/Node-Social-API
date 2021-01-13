const mysql = require("mysql");
const config = require("../config");
const err = require("../utils/error");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// connection

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.error("[db error]", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("[db connected]");
    }
  });
  connection.on("error", (error) => {
    console.error("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}
handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = '${id}'`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}
function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function upsert(table, data) {
  return insert(table, data);
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  console.log(joinQuery);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, data) => {
        if (err) return reject(err);
        console.log(data);
        let result = data.length > 1 ? data : data[0];
        resolve(result || null);
      }
    );
  });
}
module.exports = {
  list,
  get,
  insert,
  upsert,
  query,
};
