const MongoLib = require("../lib/Mongo")
const { ObjectId } = require("mongodb")
const db = new MongoLib()

const COLLECTION = "users"
class UsersService {
  async findByUsername(username) {
    try {
      const data = await db.findOne(COLLECTION, { username })
      return data
    } catch (err) {
      console.log(err)
      throw new Error("error in users service")
    }
  }
}

module.exports = UsersService
