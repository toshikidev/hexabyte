const path = require('path')

module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: { property: 'status', select: { equals: 'published' } },
      catalog: {
        enable: true,
        property: 'catalog',
      },
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs',
      filename: 'urlname',
      format: 'markdown',
      frontMatter: {
        enable: true,
        exclude: ['cover'],
      },
      catalog: true,
    },
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './docs', // base path
      imagePathExt: './scripts/imagePathExt.js', // point to the custom handler
    },
  },
}
