#!/usr/bin/env node

const rp = require('request-promise');
const notifier = require('node-notifier');
const program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url [url]', 'Url to monitor')
  .option('-i, --interval <n>', 'Inteval to hit the url', parseInt)
  .parse(process.argv);

const options = {
  method: 'GET',
  uri: program.url,
  resolveWithFullResponse: true,
  time: true
};

setInterval(monitor, program.interval);

function monitor() {
  rp(options)
    .then(function (response) {
      console.log(`200 OK (${response.elapsedTime})`);
    })
    .catch(function (err) {
      console.log('Poop');

      notifier.notify({
        'title': 'Nick got crazy!',
        'message': 'We are f*cked!'
      });
    });
}