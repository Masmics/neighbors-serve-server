// express middleware that checks for valid token
const jwt = require('express-jwt');
// gets a key to use for jwts
const jwksRsa = require('jwks-rsa')

// just configuration
module.exports = () => jwt({
  // skip providing credentials when testing
  credentialsRequired: process.env.NODE_ENV !== 'test',
  // info from auth0, fetches the auth seeker
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // must link up with client-side client id
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'] // hashing algo
});
