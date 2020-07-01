const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config')

const debug = require('debug')('portfolio:mongo')
const USER = encodeURIComponent(config.mongo.user)
const PASSWORD = encodeURIComponent(config.mongo.password)
const DB_NAME = config.mongo.database

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}${config.mongo.host}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.connect = this.connect.bind(this)
    // this.find = this.find.bind(this)
    this.db
    this.connected
  }

  async connect() {
    try {
      await this.client.connect()
      this.db = this.client.db(DB_NAME)
      this.connected = true
      debug(`Db connected`)
    } catch (err) {
      this.connected = false
      console.log(err)

      debug(`Error connecting to the database`)
    }
  }

  async find(collection, query) {
    if (!this.connected) {
      await this.connect()
    }
    try {
      const data = await this.db.collection(collection).find(query).toArray()

      return data
    } catch (err) {
      console.log(err)

      debug('Error in the query')
      throw new Error(`Error finding the data`)
    }
  }
  
  async insertOne(collection, body) {
    if (!this.connected) {
      await this.connect()
    }
    try {
      const data = await this.db.collection(collection).insertOne(body)

      return data
    } catch (err) {
      console.log(err)

      debug('Error in the query')
      throw new Error(`Error finding the data`)
    }
  }
  async insertMany(collection, body) {
    if (!this.connected) {
      await this.connect()
    }
    try {
      const data = await this.db.collection(collection).insertMany(body)

      return data
    } catch (err) {
      console.log(err)

      debug('Error in the query')
      throw new Error(`Error finding the data`)
    }
  }
}

module.exports = MongoLib
