import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

// Authentication middleware. When used, the Access Token must exist and be verified against the Auth0 JSON Web Key Set
const checkJwt = expressjwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-4yituajghfjc8wca.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "t9wzEOtOAx3CyOLSQt8QU39cTrE2Gg1X",
  issuer: `https://dev-4yituajghfjc8wca.us.auth0.com/`,
  algorithms: ["RS256"],
});

export default checkJwt;
