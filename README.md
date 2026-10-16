# bluebear-io.github.io

Landing page for Bluebear's open source projects. Project docs sites in this org (for example `baloo-bear`) are served under this site's domain at `/<repo>/`.

## Analytics

The landing page uses PostHog for cookieless page views and project-link clicks
(`project_link_clicked`, with `project` and `link_type` properties).
`disable_persistence: true` prevents analytics cookies and local/session storage
for this site only. Anonymous IDs live in memory and reset on each page load,
so unique-visitor and session counts do not represent returning visitors. Person profiles, autocapture, session replay,
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

No PostHog project-wide setting changes are required. Do not enable Cookieless
server hash mode for this integration: it uses ordinary events with persistence
disabled, rather than PostHog's server-hashed cookieless mode. Other sites using
the same PostHog project keep their own SDK configuration.
See [PostHog's SDK configuration](https://posthog.com/docs/libraries/js/config).
Cookieless configuration does not by itself establish exemption from all consent
or privacy obligations; those depend on the applicable rules and deployment.
