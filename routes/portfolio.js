const express = require('express')
const router = express.Router()
const PortfolioService = require('../services/portfolio')
const config = require('../config')
const nodemailer = require('nodemailer')

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

router.post('/send', (req, res, next) => {
  try {
   
    
    const response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    }

    let mailOptions = {
      from: req.body.name,
      to: config.nodemailer.auth.user,
      subject: 'Your Portfolio App Got a Message Open It!',
      text: req.body.message,
      html:
        'Message from: ' +
        req.body.name +
        '<br></br> Email: ' +
        req.body.email +
        '<br></br> Message: ' +
        req.body.message,
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // type: 'OAuth2',
        // user: config.nodemailer.auth.user,
        // clientId: config.nodemailer.auth.clientId,
        // clientSecret: config.nodemailer.auth.clientSecret,
        // accessToken: config.nodemailer.auth.accessToken,
        // refreshToken: config.nodemailer.auth.refreshToken,
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASS
      },
    })

    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(JSON.stringify(res))
    })

    res.status(201).json({message:'email recived'})
  } catch (err) {
    console.log(err);

    next(err)
  }
})

module.exports = router
