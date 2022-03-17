const contentful = require('contentful')

module.exports = contentful.createClient({
  space: process.env.CONTENT_SPACE,
  accessToken: process.env.CONTENT_ACCESS_TOKEN,
  host: 'preview.contentful.com'
})
