const fs = require('fs');

const saveScreenshots = async (batch, screenshotArray)  => {

  console.log('👉 Outputtng screenshots for batch ' + batch.name + ' with ' + screenshotArray.length + ' screens')
  for (let i = 0; i < screenshotArray.length; i++){
    await fs.writeFile('Screenshot - ' + batch.screens[i].name + '.png', screenshotArray[i], function (err) {
        if (err) return console.log('❌ Error outputting screenshot #' + i + ' ' + err);
      });
  }
  console.log('💾 Finished outputting screenshots for batch ' + batch.name + ' with ' + screenshotArray.length + ' screens')
}


module.exports = saveScreenshots;
