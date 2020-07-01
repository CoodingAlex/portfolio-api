const express = require('express')
const debug = require('debug')('portfolio:index')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const config = require('./config')
//routes
const emailsRouter = require('./routes/email')
const portfolioRouter = require('./routes/portfolio')
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



app.get('/', (req, res) => {
  res.json({ hello: 'portfolio' })
})

app.use('/portfolio', portfolioRouter)
app.use('/emails',emailsRouter)
app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})
