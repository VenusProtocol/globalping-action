import axios, { AxiosError } from 'axios';
import { getInput, getMultilineInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

const run = async () => {
  const countryCodes = getMultilineInput('countryCodes');
  const target = getInput('target');

  try {
    const output = await axios.post(
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
          'User-Agent': `Venus Globalping GitHub Action (${context.repo.repo})`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Accept-Encoding': 'br',
        },
      },
    );

    console.log('Target successfully pinged:\n', output.data);
  } catch (error) {
    setFailed(error as AxiosError);
  }
};

run();
