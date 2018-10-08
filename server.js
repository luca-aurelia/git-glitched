// server.js

const express = require('express')
const app = express()
const { execSync } = require('child_process')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.status(200).send('おかえり！🏡')
})

// Returns a string like https://username:password@github.com/user/repo
const addCredentials = repoUrl => {
  const [protocol, path] = repoUrl.split('://')
  const credentials = process.env.USERNAME + ':' + process.env.PASSWORD
  return [protocol + '://', credentials + '@', path].join('')
}

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

  const repoUrl = request.body.repository.url
  const repoUrlWithCredentials = addCredentials(repoUrl)

  console.log('Fetching latest changes from ' + repoUrl)
  let output = execSync(`git fetch ${repoUrlWithCredentials} glitch`).toString()
  console.log(output)
  console.log('Updating code base.')
  output = execSync(`git reset --hard ${repoUrl}/master`).toString()
  console.log(output)
  response.status(200).send()
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

console.log('3:09')
