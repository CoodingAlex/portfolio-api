const express = require("express")
const router = express.Router()
const PortfolioService = require("../services/portfolio")
const config = require("../config")
const nodemailer = require("nodemailer")
const passport = require("passport")
require("../utils/auth/jwt-strategy")

const portfolioService = new PortfolioService()

router.get("/about", async (req, res, next) => {
  try {
    const { data } = await portfolioService.getAbout()
    res.json({ data, message: "data getted" })
  } catch (err) {
    console.log(err)
    next(err)
  }
})
router.get("/projects", async (req, res, next) => {
  try {
    const data = await portfolioService.getProjects()

    res.json({ data, message: "data getted" })
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params
    const data = await portfolioService.getProject(projectId)

    res.json({ data, message: "data getted" })
  } catch (err) {
    console.log(err)
    next(err)
  }
})
router.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const project = {
        title: req.body.title || "",
        content: req.body.content || "",
        url: req.body.url || "",
        img: req.body.img || "",
        tecnologies: req.body.tecnologies || [],
      }
      const data = await portfolioService.createProject(project)

      res.json({ data, message: "data getted" })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
)

router.put(
  "/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { projectId } = req.params
      const data = await portfolioService.updateProject(projectId, req.body)

      res.status(201).json({ data, message: "data updated" })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
)

router.delete(
  "/projects/:projectId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { projectId } = req.params
      const data = await portfolioService.deleteProject(projectId)

      res.status(200).json({ data, message: "data deleted" })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
)

router.post("/send", (req, res, next) => {
  try {
    const response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    }

    let mailOptions = {
      from: req.body.name,
      to: config.nodemailer.auth.user,
      subject: "Your Portfolio App Got a Message Open It!",
      text: req.body.message,
      html:
        "Message from: " +
        req.body.name +
        "<br></br> Email: " +
        req.body.email +
        "<br></br> Message: " +
        req.body.message,
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASS,
      },
    })

    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(JSON.stringify(res))
    })

    res.status(201).json({ message: "email recived" })
  } catch (err) {
    console.log(err)

    next(err)
  }
})

module.exports = router
