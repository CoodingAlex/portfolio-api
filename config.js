if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

module.exports = {
  dev: process.env.NODE_ENV !== "production",
  mongo: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  nodemailer: {
    auth: {
      type: "oauth2",
      user: process.env.GMAIL_ADRESS,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
}
