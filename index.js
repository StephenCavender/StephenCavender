import Mustache from "mustache"
import fs from "fs"

const MUSTACHE_MAIN_DIR = './main.mustache'

let DATA = {
  name: "Steve"
}

const generateReadme = () => {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync('README.md', output)
  })
}

generateReadme()