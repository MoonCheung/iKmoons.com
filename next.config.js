const path = require('path');
const withMDX = require('@next/mdx');
const images = require('remark-images');
const emoji = require('remark-emoji');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  images: {
    domains: ['static.ikmoons.com']
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack5: true,
  webpack: (config, options) => {
    // webpack 4版本
    // const { isServer } = options;
    // if(!isServer) config.node = { fs:'empty' }
    // Fixes npm packages (mdx) that depend on `fs` module
    // webpack 5版本
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    config.resolve.fallback = {
      fs: false
    };
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
};

module.exports = withPlugins([withMDX(withMDXConfig)], nextConfig);
