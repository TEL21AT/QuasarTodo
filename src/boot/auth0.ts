import { createAuth0 } from "@auth0/auth0-vue";

export default ({ app, router, store }) => {
  app.use(
    createAuth0({
      domain: "dev-4yituajghfjc8wca.us.auth0.com",
      clientId: "t9wzEOtOAx3CyOLSQt8QU39cTrE2Gg1X",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  );
};
