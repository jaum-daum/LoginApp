const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte a arquivos .wasm para o SQLite na web
config.resolver.assetExts.push('wasm');

module.exports = config;