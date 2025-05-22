// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Increase the max workers and RAM usage
config.maxWorkers = 4;
config.transformer.minifierConfig = {
  compress: {
    reduce_funcs: false,
  },
};

// Reduce the number of concurrent tasks
config.resolver.nodeModulesPaths = config.resolver.nodeModulesPaths || [];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;