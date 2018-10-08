// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const { execSync } = require('child_process')
const bodyParser = require('body-parser')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

const includes = (string, substring) => string.indexOf(substring) > -1

const { REPO_URL } = process.env

const addOrigin = () => {
  // Exits with status code 2 if remote doesn't exist
  const checkRemote = `git ls-remote --exit-code -h "${REPO_URL}"`
  // Adds origin
  const addOrigin = `git remote add origin ${REPO_URL}`

  // Add origin if remote doesn't already exist
  execSync(`${checkRemote} || ${addOrigin}`)
}

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

  addOrigin()
  const output = execSync('git pull origin glitch').toString()
  console.log({ output })
  response.status(200).send()
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

console.log('updated 2:09 pm')
