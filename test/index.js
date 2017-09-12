(async () => {
  // Module to help us explore a folder
  const explore = require('../lib/explore')

  // OS specific dir + file joining
  const path = require('path')

  // Enable prettier output
  const util = require('util')

  // Folder we would like to explore
  const folder = path.join(__dirname, '..', 'testFolder')

  // All files found while exploring
  const files = await explore(folder)

  // Print results to stdout
  process.stdout.write(
    util.inspect(files, { colors: true, depth: 12 })
  )

  // Exit tests
  process.exit()
})()
