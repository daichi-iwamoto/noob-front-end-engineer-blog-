/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "https://www.noob-front-end-engineer-blog.com/",
  generateRobotsTxt: true,
};
