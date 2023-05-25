require('dotenv').config();
import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

const setupNodeEvents = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> => {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
};

export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    baseUrl: process.env.REACT_APP_CYPRESS_BASE_URL,
    setupNodeEvents,
    env: {
      allureReuseAfterSpec: true,
    },
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  video: false,
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
