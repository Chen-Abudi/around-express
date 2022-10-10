const crypto = require('crypto');

// gonna move this when making .env !
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = { secretKey };
