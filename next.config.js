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
  webpack: (config, options) => {
    const { isServer } = options;
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    return config;
  }
};

const mdxEnhancedConfig = {
  layoutPath: 'layouts',
  defaultLayout: false,
  fileExtensions: ['mdx'],
  remarkPlugins: [images, emoji],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both'
  },
  reExportDataFetching: false
};

module.exports = withPlugins([withMdxEnhanced(mdxEnhancedConfig)], nextConfig);
