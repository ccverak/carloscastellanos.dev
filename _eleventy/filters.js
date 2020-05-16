const { DateTime } = require("luxon");

const getSimilarCategories = function (categoriesA, categoriesB) {
  return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
};

module.exports = {
  // Date formatting (human readable)
  readableDate: (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  },
  // Date formatting (machine readable)
  machineDate: (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  },
  // extract summary from post
  summary: (post) => {
    const [summary] = post.templateContent.split("</p>");
    return summary.split(" ").slice(0, 50).join(" ");
  },
  // A debug utility.
  log: (obj) => {
    console.log(obj);
  },

  similarPosts: (collection, path, tags) => {
    return collection.filter((post) => {
      console.log("TAGS", post.data.tags)
      return getSimilarCategories(post.data.tags, tags) >= 1 && post.data.page.inputPath !== path;
    });
    // .sort((a,b) => {
    //     return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories);
    // });
  },

  limit: (arr, limit) => {
    return arr.slice(0, limit);
  }
};
