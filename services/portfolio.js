const MongoLib = require('../lib/Mongo')
const db = new MongoLib()

const PROJECTS_COLLECTION = 'projects'
const ABOUT_COLLECTION = 'about'

class PortfolioService {
  async getAbout() {
    try {
      const data = await db.find(ABOUT_COLLECTION, {})
      return data[0]
    } catch (err) {
      console.log(err)

      throw new Error(`Error in portfolio service`)
    }
  }
  async getProjects() {
    try {
      const data = await db.find(PROJECTS_COLLECTION, {})

      return data
    } catch (err) {
      throw new Error(`Error in portfolio service`)
    }
  }
}

module.exports = PortfolioService
