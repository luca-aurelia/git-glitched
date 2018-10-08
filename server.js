const express = require('express')
const app = express()
const { execSync } = require('child_process')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'readme.md'))
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

  const repoUrl = request.body.repository.git_url

  console.log('Fetching latest changes.')
  const output = execSync(
    `git checkout -- ./ && git pull -X theirs ${repoUrl} glitch && refresh`
  ).toString()
  console.log(output)
  response.status(200).send()
})

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
