import { config as loadDotEnvFile } from 'dotenv';
import { expand } from 'dotenv-expand';
import { createConfig } from './src/config/mikro-orm';

// As seen in @nx/bin
// It should do as in https://nx.dev/recipes/tips-n-tricks/define-environment-variables#setting-environment-variables
// But I'm not sure where this exact behavior is supposed to be implemented.

function loadDotEnvFiles() {
  for (const file of ['.local.env', '.env.local', '.env']) {
    const myEnv = loadDotEnvFile({ path: file });
    expand(myEnv);
  }
}

loadDotEnvFiles();

const config = createConfig();

export default config;
