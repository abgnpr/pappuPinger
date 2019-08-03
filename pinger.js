// PappuPinger

const fs = require('fs')
const rl = require('readline-sync')
const cheerio = require('cheerio')
const request = require('request')
const moment = require('moment')
const jsdiff = require('diff');
require('colors');
const { exec } = require('child_process');
const commandExists = require('command-exists');


const interval = rl.questionInt('\nDuration between checks in millisec? (e.g. 2000 for 2sec) : ')
let prev_siteText = undefined
let errDisplayed = false

if (fs.existsSync('myCopy')) {
  prev_siteText = fs.readFileSync('myCopy')
}

function createLocalCopy(content) {
  try {
    fs.writeFileSync('myCopy', content)
  } catch (error) {
    console.log(error);
  }
}

function check() {

  request({
    method: 'GET',
    url: 'https://ppuponline.in/index.php?act=home',

  }, (err, res, body) => {
    
    if (err) {
      if (!errDisplayed) {
        console.log('\nDisconnected / page down / not available\n\
    Will try to reconnect on next ping.');
        errDisplayed = true
      }
      return
    } else if (!err && errDisplayed) {
      console.log('\nReconnected... waiting for changes/updates\n');
      errDisplayed = false
    }

    let $ = cheerio.load(body)
    let siteText = $('body').text()

    if (!prev_siteText) {
      prev_siteText = siteText
      createLocalCopy(siteText)

    } else {
      if (siteText == prev_siteText) {
        // console.log('no change')

      } else {
        console.log(`\n\nchanged / updated !  ${
          moment().format("DD/MM/YYYY hh:mm a")}`)
        let differences = jsdiff.diffLines(prev_siteText+'', siteText)
        differences.forEach((part) => {
          var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
          if (color != 'grey')
            process.stderr.write(part.value[color]);
        })
        commandExists('termux-notification')
          .then(function (command) {
            exec(`${command} -title Changed! -content 'Something\'s changed in you page. Check the terminal.'`, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          }).catch(function () {
            // console.log('termux-notification api not found');
          });
        prev_siteText = siteText
        createLocalCopy(siteText)
      }
    }
  })
}


console.log('\nMonitoring started...\n\
  You will be notified when a change occurs.\n')

check()
setInterval(() => check(), interval)