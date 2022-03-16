import Mustache from "mustache";
import fs from "fs";
import Parser from "rss-parser";

const MUSTACHE_MAIN_DIR = './main.mustache';

let posts = [];
const parser = new Parser();
(async () => {

  let feed = await parser.parseURL('https://dev.cavender.io/feed.xml');
  posts = feed.items.slice(-3)
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link);
  });

  console.log('posts', posts);

})();

let DATA = {
  name: "Steve",
  posts
}

const generateReadme = () => {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  })
}

generateReadme();