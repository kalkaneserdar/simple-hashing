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

  // Calling userIdGEnerator function to populate user attributes.
  // Bespoke function uses crypto and hashring packages to create unique user ids and 
  // assure persistence in the correct server in a consistent way.
  const userAttributes = userIdGenerator(result.username, result.email);

  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
  console.log('  User Id: ' + userAttributes.userId);
  console.log('  Server of the User: ' + userAttributes.server);
});

function onErr(err) {
  console.log(err);
  return 1;
}

function userIdGenerator(p1, p2){
  let hashOrigin = p1 + p2;
  let userId = crypto.createHash('sha256').update(hashOrigin).digest('base64').substring(0, 5);
  let server = hr.get(userId);
  return {userId, server};
};
