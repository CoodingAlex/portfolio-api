const express = require('express')
const debug = require('debug')('portfolio:index')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
//routes
const portfolioRouter = require('./routes/portfolio')
app.use(express.json())
app.use(cors())

portfolioRouter(app)

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})