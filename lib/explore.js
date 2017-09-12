module.exports = explore = async (dir) => {
  // For checking if item is directory and iterating folder for files
  const fs = require('fs')

  // For OS compatible dir with item found joining together
  const path = require('path')

  // Gets all items from the passed in dir(ectory) variable
  const items = await new Promise(r => fs.readdir(dir, (e, items) => r(items)))

  // Gets all files (nested files (files inside folders) will be inside nested arrays)
  const files = await new Promise(async r => {

    // Keep account of all results
    let files = []

    // Iterate over all items found in a particular directory
    for (let item of items) {
      const isDir = await new Promise(r => fs.stat(path.join(dir, item), (e,s) => r(s.isDirectory())))
      if (isDir) { files.push(await explore(path.join(dir, item))) } else { files.push(path.join(dir, item)) }
    }

    // Flatten all nested (deep exploration results)
    for (let i = 0; i < files.length; i++) {
      if (Array.isArray(files[i])) { files.splice(i, 1, ...files[i--]) }
    }

    // Resolve promise with the results
    r(files)
  })

  // Return the array containing all absolute path + filenames
  return files
}
