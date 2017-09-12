module.exports = explore = async (dir) => {
  // For checking if item is directory and iterating folder for files
  const fs    = require('fs')

  // For OS compatible dir with item found joining together
  const path  = require('path')

  // Gets all items from the passed in dir(ectory) variable
  const items = await new Promise(r => fs.readdir(dir, (e, items) => r(items)))

  // Gets all files (nested files (files inside folders) will be inside nested arrays)
  const files = await new Promise(async r => {
    let files = []
    for (let item of items) {
      const isDir = await new Promise(r => fs.stat(path.join(dir, item), (e,s) => r(s.isDirectory())))
      if (isDir) { files.push(await explore(path.join(dir, item))) } else { files.push([dir, item]) }
    }
    r(files)
  })
  return files
}
