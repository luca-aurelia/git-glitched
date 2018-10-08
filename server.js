// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const { execSync } = require('child_process')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post('/deploy', (request, response) => {
  if (request.query.secret === process.env.SECRET) {
    console.log(request)
    response.send(200)
  } else {
    response.send(401)
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

const output = execSync('echo hello').toString()
console.log({ output })
