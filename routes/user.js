const express = require("express")
const router = express.Router()
const config = require("../config")
const passport = require("passport")
const jwt = require("jsonwebtoken")

require("../utils/auth/jwt-basic")
require("../utils/auth/jwt-strategy")

router.post(
  "/sign-in",
  passport.authenticate("basic", { session: false }),
  (req, res, next) => {
    try {
      const payload = {
        sub: req.user._id,
        username: req.user.username,
      }

      const token = jwt.sign(payload, config.auth.jwtSecret)

      res.cookie("token", token, {
        httpOnly: !config.dev,
        secure: !config.dev,
      })
      res.status(200).json({ data: token })
    } catch (err) {
      return next(err)
    }
  }
)
router.post("/sign-out", (req, res, next) => {
  res.clearCookie("token")
  res.status(200).json({ message: "logout" })
})
router.post(
  "/sign-verify",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({ message: "user verified" })
  }
)

module.exports = router
