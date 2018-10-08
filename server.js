// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const { execSync } = require('child_process')
const bodyParser = require('body-parser')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.status(200).send('おかえり！🏡')
})

app.post('/deploy', (request, response) => {
  if (request.query.secret !== process.env.SECRET) {
    response.status(401).send()
    return
  }

  if (request.body.ref !== 'refs/heads/glitch') {
    response
      .status(200)
      .send('Push was not to glitch branch, so did not deploy.')
    return
  }

  const output = execSync('git pull origin glitch; refresh').toString()
  console.log({ output })
  response.status(200).send()
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

console.log('updated 1:43 pm')
