const express = require('express')
const router = express.Router()
const PortfolioService = require('../services/portfolio')

const portfolioService = new PortfolioService()
function portfolioRouter(app) {
  app.use('/portfolio', router)

  router.get('/about', async (req, res, next) => {
    try {
      const { data } = await portfolioService.getAbout()
      res.json({ data, message: 'data getted' })
    } catch (err) {
      next(err)
    }
  })
  router.get('/projects', async (req, res, next) => {
    try {
      const data = await portfolioService.getProjects()

      res.json({ data, message: 'data getted' })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = portfolioRouter
