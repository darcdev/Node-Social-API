module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "XsKGwqRxHJ",
    password: process.env.MYSQL_PASS || "5h5BQT0oNI",
    database: process.env.MYSQL_DB || "XsKGwqRxHJ",
  },
};
