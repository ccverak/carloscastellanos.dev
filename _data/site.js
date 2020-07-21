/**
  This file can be accessed using: {{ site.title }}
*/

const year = new Date().getFullYear()

module.exports = {
  annee: `${year}`,
  allowDarkMode: true,
  lang: 'en', // for html tag
  title: 'MF Blog Starter',
  description: 'Eleventy + Tailwind CSS blog starter',
  url: 'https://mf-blogstarter.netlify.app', // don't end with a slash /
  brandName: 'MF', // for copyright and legal page

  author: {
    name: 'Carlos Castellanos', // for posts meta and Open Graph meta (FB and Twitter)
    email: 'me@carloscastellanos.dev', // used in legal page
    github: 'https://github.com/ccverak', // used in footer
    twitter: 'https://twitter.com/ccverak' // used in footer
  },

  metadata: {
    theme_color: '#1e2327', // used in Chrome, Firefox OS and Opera
    default_social_image: '/assets/images/avatar.jpg', // for Open Graph meta
    locale: 'en_US', // for Open Graph meta
    twitter_username: '@ccverak' // for Twitter Open Graph meta
  }
}
