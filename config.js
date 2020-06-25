if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  mongo: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}
