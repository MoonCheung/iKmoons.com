const isProdMode = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [];

// 去除 console.log
if (isProdMode) {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: ['next/babel'],
  plugins
};
