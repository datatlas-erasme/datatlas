const { composePlugins, withNx } = require('@nrwl/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  config = {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@dnd-kit/modifiers': false,
        '@dnd-kit/sortable': false,
        react: false,
        'react-dom': false,
        '@reduxjs/toolkit': false,
      },
    },
  };

  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
