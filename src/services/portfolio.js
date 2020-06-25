const MongoLib = require('../lib/Mongo')
const db = new MongoLib()

const COLLECTION = 'portfolio'

class PortfolioService {
  async getAbout() {
    try {
      const data = await db.find(COLLECTION, {})
      return data[0].about
    } catch (err) {
      console.log(err)

      throw new Error(`Error in portfolio service`)
    }
  }
  async getProjects() {
    try {
      const data = await db.find(COLLECTION, {})

      return data[0].projects
    } catch (err) {
      throw new Error(`Error in portfolio service`)
    }
  }
}

module.exports = PortfolioService
