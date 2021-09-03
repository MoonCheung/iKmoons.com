const path = require('path');
const withMDX = require("@next/mdx")
const images = require('remark-images');
const emoji = require('remark-emoji');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack5: true,
  webpack: (config, options) => {
    const { isServer } = options;
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      // webpack 4版本
      config.node = {
        fs: 'empty'
      };
      // webpack 5版本
      // config.resolve.fallback = {
      //   fs: false
      // };
    }
    return config;
  }
};

const withMDXConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [images, emoji],
    rehypePlugins: []
  }
}

module.exports = withPlugins([withMDX(withMDXConfig)], nextConfig);
