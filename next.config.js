const path = require('path');
const images = require('remark-images');
const emoji = require('remark-emoji');
const withPlugins = require('next-compose-plugins');
const withMdxEnhanced = require('next-mdx-enhanced');

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  // future: {
  //   webpack5: true
  // },
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

const mdxEnhancedConfig = {
  layoutPath: 'template',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [images, emoji],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both'
  },
  reExportDataFetching: true
};

module.exports = withPlugins([withMdxEnhanced(mdxEnhancedConfig)], nextConfig);
