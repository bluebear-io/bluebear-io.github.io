(() => {
  const config = window.__POSTHOG_ENV__
  const projectToken = config?.POSTHOG_PROJECT_TOKEN
  const apiHost = config?.POSTHOG_HOST

  if (!projectToken || !apiHost) {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      const missingVariable = projectToken ? 'POSTHOG_HOST' : 'POSTHOG_PROJECT_TOKEN'
      throw new Error(`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`)
    }
    return
  }

  const sdkScript = document.createElement('script')
  const assetsHost = new URL(apiHost)
  assetsHost.hostname = assetsHost.hostname.replace('.i.posthog.com', '-assets.i.posthog.com')
  sdkScript.src = `${assetsHost.origin}/static/array.js`
  sdkScript.async = true
  sdkScript.crossOrigin = 'anonymous'
  sdkScript.onload = () => {
    window.posthog.init(projectToken, {
      api_host: apiHost,
      defaults: '2026-05-30',
      logs: {
        serviceName: 'bluebear-open-source-web',
      },
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false,
      },
    })
    window.posthog.logger?.info('landing_page_initialized', {
      page: 'open_source_landing',
    })
  }
  document.head.appendChild(sdkScript)
})()
