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
const getRepoUrlWithCredentials = repoUrl => {
  const [protocol, path] = process.env.repoUrl.split('://')
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

  const origin = getRepoUrlWithCredentials(request.body.repository.url)
  console.log({ origin })
  const output = execSync(
    `git fetch ${origin} glitch; git reset --hard ${origin}/master`
  ).toString()
  console.log({ output })
  response.status(200).send()
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
