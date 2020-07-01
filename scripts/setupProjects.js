const projects = [
  {
    title: 'Octolion Store',
    content:
      'A simple server-side-rendering ecomerce maded with express and pug',
    url: 'https://octolionstore.herokuapp.com/',
  },
  {
    title: 'Rock Paper Scissors',
    content:
      'This was a challenge from frontedmentor, it was maded in react, but i add an online mode using websockets and node.js, i really enjoy make this project',
    url: 'https://coodingalex-rock-paper-scissors.netlify.app/',
    img:
      'https://res.cloudinary.com/dcoxmw8gn/image/upload/v1593043789/Captura_de_pantalla_de_2020-06-24_18-09-07_hq6wzl.png',
  },
  {
    title: 'Platzi-exchange',
    content:
      'This project is a plattform of cryptocoins, in this page you can see the prices of a lot of cryptos in rel time, this page was maded with vue.',
    url: 'https://alex-exchange.netlify.app/',
    img:
      'https://res.cloudinary.com/dcoxmw8gn/image/upload/v1593044020/Captura_de_pantalla_de_2020-06-24_18-13-29_vbjxqf.png',
  },
  {
    title: 'alexgram',
    content:
      'This is a simple message service, it was maded with ssr (express) and handlebars in the frontend, and with express and passport.js in the backend',
    img:
      'https://res.cloudinary.com/dcoxmw8gn/image/upload/v1593044139/Captura_de_pantalla_de_2020-06-24_18-15-25_yj4yly.png',
    url: 'https://coodingalexgram-web.herokuapp.com/login',
  },
  {
    title: 'my blog',
    content:
      'this is a blog that im making right now, is maded with react in the front and express in the backend',
    url: 'https://coderalexblog.netlify.app/',
    img:
      'https://res.cloudinary.com/dcoxmw8gn/image/upload/v1593044237/Captura_de_pantalla_de_2020-06-24_18-17-07_quivty.png',
  },
]

const about = {
  data:
    "Hey, i'm Alejandro Ibarra, from mexico. Im a fullstack jr developer who loves javascript tecnologies. I like the backend and the frontend, but i love the backend. I know about Html, css,javascript, Authenticatio with passport and express, API rest, mysql,mongodb,react and a more things",
}
const MongoLib = require('../lib/Mongo')
const mongo = new MongoLib()
async function insertData() {
  await mongo.insertMany('projects', projects)
  await mongo.insertOne('about', about)
}

insertData()
