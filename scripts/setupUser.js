const MongoLib = require("../lib/Mongo")
const mongo = new MongoLib()
const bcrypt = require("bcrypt")

async function insertData() {
  let password = process.env.ADMIN_PASSWORD
  password = await bcrypt.hash(password, 5)
  const user = {
    username: process.env.ADMIN_USER,
    password,
  }
  try {
    await mongo.insertOne("users", user)
    console.log("Succesfull")
    process.exit(0)
  } catch (err) {
    process.exit(1)
  }
}

insertData()
