const config = require('./config.json')
const screenshot = require('./lib/screenshot.js')
const saveScreenshots = require('./lib/save.js')
const createPDF = require('./lib/pdf.js')

const start = async () => {
  const numberOfBatches = config.length
  console.log('\n📋 Taking ' + numberOfBatches + ' batches of screenshots.')

  for (let i = 0; i < numberOfBatches; i ++) {
    console.log('\n👉 Starting batch ' + (i+1) + ' of ' + numberOfBatches)

  var screenshotArray = await screenshot(config[i])
  if(config[i].outputscreenshots != null && config[i].outputscreenshots == true)
    await saveScreenshots(config[i], screenshotArray)
  if(config[i].outputscreenflow == null || config[i].outputscreenflow == true)
    await createPDF(config[i], screenshotArray)

    console.log('👍 I finished batch ' + (i+1) + ' of ' + numberOfBatches)
  }
}

start()
