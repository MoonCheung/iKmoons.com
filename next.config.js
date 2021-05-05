const path = require('path')
const images = require('remark-images')
const emoji = require('remark-emoji')

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [images, emoji], 
    rehypePlugins: []
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})