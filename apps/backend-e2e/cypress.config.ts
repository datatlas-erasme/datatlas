import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on, { printLogsToConsole: 'always' });
    },
    video: false,
    screenshotOnRunFailure: false,
  },

  env: {
    admin_credentials: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
    editor_credentials: {
      email: process.env.DUMMY_EDITOR_EMAIL,
      password: process.env.DUMMY_EDITOR_PASSWORD,
    },
  },
});
