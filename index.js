import Mustache from "mustache";
import fs from "fs";
import Parser from "rss-parser";

const MUSTACHE_MAIN_DIR = './main.mustache';

const posts = [];
const parser = new Parser();
await (async () => {
  const feed = await parser.parseURL('https://dev.cavender.io/feed.xml');
  posts.push(...feed.items.slice(0, 3));
})();

const DATA = {
  name: "Steve",
  posts
}

const generateReadme = () => {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) { throw err; }
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  })
}

generateReadme();