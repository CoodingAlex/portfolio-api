const express = require('express')
const router = express.Router()
const PortfolioService = require('../services/portfolio')

const portfolioService = new PortfolioService()

router.get('/about', async (req, res, next) => {
  try {
    
    const { data } = await portfolioService.getAbout()
    res.json({ data, message: 'data getted' })
  } catch (err) {
    console.log(err)
    next(err)
  }
})
router.get('/projects', async (req, res, next) => {
  try {
    const data = await portfolioService.getProjects()

    res.json({ data, message: 'data getted' })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
