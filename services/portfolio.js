const MongoLib = require("../lib/Mongo")
const { ObjectId } = require("mongodb")
const db = new MongoLib()

const PROJECTS_COLLECTION = "projects"
const ABOUT_COLLECTION = "about"

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

  async getProject(id) {
    try {
      const data = await db.findOne(PROJECTS_COLLECTION, { _id: ObjectId(id) })
      return data
    } catch (err) {
      throw new Error(`Error in portfolio service`)
    }
  }

  async updateProject(id, body) {
    try {
      const data = await db.updateOne(
        PROJECTS_COLLECTION,
        { $set: body },
        { _id: ObjectId(id) }
      )
      return data
    } catch (err) {
      console.log(err)
      throw new Error(`Error in portfolio service`)
    }
  }

  async createProject(project) {
    try {
      const data = await db.insertOne(PROJECTS_COLLECTION, project)
      return data.insertedId
    } catch (err) {
      throw new Error(`Error in portfolio service`)
    }
  }

  async deleteProject(id) {
    try {
      const data = await db.deleteOne(PROJECTS_COLLECTION, {
        _id: ObjectId(id),
      })
      return id
    } catch (err) {
      throw new Error(`Error in portfolio service`)
    }
  }
}

module.exports = PortfolioService
