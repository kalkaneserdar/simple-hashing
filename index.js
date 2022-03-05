// import crypto from "crypto";
// import hashring from "hashring";
const prompt = require('prompt');
const crypto = require('crypto');
const hashring = require('hashring');

const hr = new hashring([
    'Server-A',
    'Server-B',
    'Server-C'
]);

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  
  const hashOrigin = result.username + result.email;
  const userId = crypto.createHash('sha256').update(hashOrigin).digest('base64').substring(0, 5);
  const server = hr.get(userId);
  
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
//   console.log('  User Hash Key: ' + hash);
  console.log('  User Id: ' + userId);
  console.log('  Server of the User: ' + server);
});

function onErr(err) {
  console.log(err);
  return 1;
}
