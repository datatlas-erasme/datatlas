const path = require('path');
const webpack = require('webpack');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { useBabelRc, override, addWebpackPlugin } = require('customize-cra');

const appPath = path.resolve(__dirname, 'apps/frontend/');
const appTsConfig = path.resolve(appPath, 'tsconfig.app.json');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    useBabelRc(),
    addWebpackPlugin(
      new webpack.DefinePlugin({
        process: {},
      })
    ),
    (config, env) => {
      config.resolve.fallback = {
        querystring: require.resolve('querystring-es3'),
        url: false,
      };

      // Remove guard against importing modules outside of `src`.
      // Needed for workspace projects.
      config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));
      // Add support for importing workspace projects.
      config.resolve.plugins.push(
        new TsConfigPathsPlugin({
          configFile: appTsConfig,
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          mainFields: ['module', 'main'],
        })
      );

      // Replace include option for babel loader with exclude
      // so babel will handle workspace projects as well.
      config.module.rules[1].oneOf.forEach((r) => {
        if (r.loader && r.loader.indexOf('babel') !== -1) {
          r.exclude = /node_modules/;
          delete r.include;
        }
      });

      // Change default path of the config file
      const forkTsCheckerWebpackPlugin = config.plugins.find(
        (plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin'
      );
      if (forkTsCheckerWebpackPlugin) {
        forkTsCheckerWebpackPlugin.options.typescript.configFile = appTsConfig;
      }

      return config;
    }
  ),
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function (config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    if (!config.testPathIgnorePatterns) {
      config.testPathIgnorePatterns = [];
    }
    if (!process.env.RUN_COMPONENT_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
    }
    if (!process.env.RUN_REDUCER_TESTS) {
      config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    }
    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  // https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/paths.js#L62-L81
  paths: function (paths) {
    paths.appPath = appPath;
    paths.appBuild = path.resolve(__dirname, 'dist/apps/frontend');
    paths.appPublic = path.resolve(appPath, 'public');
    paths.appHtml = path.resolve(paths.appPublic, 'index.html');
    paths.appSrc = path.resolve(paths.appPath, 'src');
    paths.appIndexJs = path.resolve(paths.appSrc, 'index.tsx');
    paths.appTsConfig = appTsConfig;

    return paths;
  },
};
