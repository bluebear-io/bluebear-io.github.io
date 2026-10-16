# bluebear-io.github.io

Landing page for Bluebear's open source projects. Project docs sites in this org (for example `baloo-bear`) are served under this site's domain at `/<repo>/`.

## Analytics

The landing page uses PostHog for cookieless page views and project-link clicks
(`project_link_clicked`, with `project` and `link_type` properties).
`cookieless_mode: 'always'` and `disable_persistence: true` prevent analytics
cookies and local/session storage. Person profiles, autocapture, session replay,
surveys, browser error capture, and browser logs are disabled. Project documentation sites deployed
from other repositories need their own integration.

The Pages workflow generates `posthog-env.js` from the public GitHub repository
variables `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST`. Both must be set before
deploying. These are browser-visible settings, not a personal API key.

For local previews, create the gitignored `posthog-env.js` file:

```js
window.__POSTHOG_ENV__ = {
  POSTHOG_PROJECT_TOKEN: 'your-public-project-token',
  POSTHOG_HOST: 'https://us.i.posthog.com',
};
```

Use a test project for local previews to keep development events out of production.

Before deployment, enable **Cookieless server hash mode** under
[Project Settings > Web analytics](https://us.posthog.com/project/266998/settings).
This server setting is required in addition to the browser configuration.
PostHog uses a daily server-side hash for audience measurement; users cannot be
tracked across days. See [PostHog's cookieless guidance](https://posthog.com/tutorials/cookieless-tracking).
Cookieless configuration does not by itself establish exemption from all consent
or privacy obligations; those depend on the applicable rules and deployment.
