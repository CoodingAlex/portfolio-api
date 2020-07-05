const passport = require("passport")
const { ExtractJwt, Strategy } = require("passport-jwt")
const UserService = require("../../services/users")
const userService = new UserService()
const config = require("../../config")

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.auth.jwtSecret,
}

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await userService.findByUsername(payload.username)
      if (!user) {
        return done(null, false)
      }

      //change
      delete user.password

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)
