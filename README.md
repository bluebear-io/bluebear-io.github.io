# bluebear-io.github.io

Landing page for Bluebear's open source projects. Project docs sites in this org (for example `baloo-bear`) are served under this site's domain at `/<repo>/`.

## Analytics

The landing page uses PostHog for page views, project-link clicks
(`project_link_clicked`, with `project` and `link_type` properties), browser
errors, and initialization/click logs. Project documentation sites deployed
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
