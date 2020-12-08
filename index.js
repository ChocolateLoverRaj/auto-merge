const core = require('@actions/core')
const github = require('@actions/github')

const octokit = github.getOctokit(core.getInput('token'))
const bases = core.getInput('bases').split(',')
const head = core.getInput('head') || github.context.payload.repository.default_branch

Promise.all(bases.map(async base => {
    await octokit.repos.merge({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        base: base,
        head: head
    })
}))
    .catch(e => {
        core.setFailed(e)
    })
