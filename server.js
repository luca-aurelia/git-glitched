// server.js

const express = require('express')
const app = express()
const { execSync } = require('child_process')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.status(200).send('おかえり！🏡')
})

const addOrigin = repoUrl => {
  try {
    console.log('Trying to remove existing origin.')
    const removeExistingOrigin = 'git remote rm origin'
    execSync(removeExistingOrigin)
  } catch (err) {
    console.log(err)
  }

  console.log('Trying to add ' + repoUrl + ' as origin.')
  // Exits with status code 2 if remote doesn't exist
  const checkRemote = `git ls-remote --exit-code -h "${repoUrl}"`
  // Adds origin
  const addOrigin = `git remote add origin ${repoUrl}`

  // Add origin if remote doesn't already exist
  execSync(`${checkRemote} || ${addOrigin}`)
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

  const repoUrl = request.body.repository.git_url
  addOrigin(request.body.repository.ssh_url)

  console.log('Fetching latest changes.')
  let output = execSync(
    `git checkout -- ./ && git pull -X theirs ${repoUrl} glitch && refresh`
  ).toString()
  console.log(output)
  // console.log('Updating code base.')
  // output = execSync(`git reset --hard origin/glitch`).toString()
  // console.log(output)
  response.status(200).send()
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

console.log('local 3:40 pm')
