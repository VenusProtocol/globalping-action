import axios from 'axios'
import core from '@actions/core'
import github from '@actions/github'

export interface Output {
  success: boolean
  error?: object
}

const run = async () => {
  const countryCodes = core.getMultilineInput('countryCodes')
  const target = core.getInput('target')

  return axios
    .post(
      'https://api.globalping.io/v1/measurements',
      {
        type: 'ping',
        target,
        locations: countryCodes.map((c) => ({
          country: c,
        })),
      },
      {
        headers: {
          'User-Agent': `Venus Globalping GitHub Action (${github.context.repo.repo})`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Accept-Encoding': 'br',
        },
      }
    )
    .catch((error) => core.setFailed(error.toJSON()))
}

run()
