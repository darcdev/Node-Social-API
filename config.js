module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
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
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  post: {
    host: process.env.POST_HOST || "localhost",
    port: process.env.POST_PORT || 3002,
  },
  cacheService: {
    host: process.env.CACHE_SRV_HOST || "localhost",
    port: process.env.CACHE_SRV_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      "redis-14139.c239.us-east-1-2.ec2.cloud.redislabs.com",
    port: process.env.REDIS_PORT || 14139,
    password: process.env.REDIS_PASSWORD || "d0dSNv4TjBwo7MMfl1LQPydpACLhZTvJ",
  },
};
