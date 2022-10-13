const crypto = require('crypto');

// gonna move this when making .env !
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey); // 86d04d0a6631295a2f75d163e662c5a7e4e531c4415c588b576962454280d4ff

module.exports = { secretKey };
