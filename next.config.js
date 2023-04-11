const path = require('path');
const withMDX = require('@next/mdx');
const images = require('remark-images');
const emoji = require('remark-emoji');

const isProd = process.env.NODE_ENV === 'production';

const withMDXConfig = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [images, emoji],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react'
  }
});

const plugins = [withMDXConfig];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // target: 'serverless',
  env: {
    STATIC_URL: isProd ? process.env.STATIC_URL : 'http://localhost:9000'
  },
  assetPrefix: isProd ? process.env.STATIC_URL : '',
  eslint: {
    ignoreDuringBuilds: true
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

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
