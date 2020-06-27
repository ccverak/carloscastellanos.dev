const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require('markdown-it-footnote');
const pluginNavigation = require("@11ty/eleventy-navigation");
const readingTime = require('eleventy-plugin-reading-time');

const filters = require('./_eleventy/filters.js')
const shortcodes = require('./_eleventy/shortcodes.js')
const installPrismLanguages = require('./_eleventy/prism-languages.js');

module.exports = function (config) {
  // Plugins
  config.addPlugin(pluginSyntaxHighlight, {
    init: function ({ Prism }) {
      installPrismLanguages(Prism);
    },
  });
  config.addPlugin(readingTime),
    config.addPlugin(pluginNavigation);
  config.addPlugin(pluginRss);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  // Shortcodes
  Object.keys(shortcodes).forEach((shortCodeName) => {
    config.addShortcode(shortCodeName, shortcodes[shortCodeName])
  })

  // Layouts
  config.addLayoutAlias("post", "post.njk");
  config.addLayoutAlias("default", "default.njk");
  config.addLayoutAlias("base", "base.njk");



  // Pass-through files
  // Copy all images directly to dist.
  config.addPassthroughCopy({ "src/assets/images": "assets/images" });
  // Copy external dependencies to dist.
  config.addPassthroughCopy({ "src/assets/vendor": "assets/vendor" });

  // Markdown Plugins
  config.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true // apply auto links
  })
    .use(markdownItFootnote)
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
      permalink: true,
      permalinkSymbol: '#',
      permalinkClass: 'heading-anchor',
      permalinkBefore: true,
      level: 2,
      // slugify: anchorSlugify
    })
  );

  // Collections: Posts
  // only content in the `posts/` directory
  config.addCollection("posts", function (collection) {
    const pathsRegex = /\/posts\/|\/drafts\//
    return collection
      .getAllSorted()
      .filter((item) => item.inputPath.match(pathsRegex) !== null)
      .filter((item) => item.data.permalink !== false)
      .filter((item) => !item.data.draft)
  });


  // Configurations
  config.setDataDeepMerge(true);
  // Reload the page every time the JS/CSS are changed.
  config.setBrowserSyncConfig({ files: [shortcodes.manifestPath] });

  return {
    dir: {
      input: "src",
      includes: "_includes", // relative to dir.input
      data: "_data",
      output: "dist",
      layouts: '_layouts'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
