export default {
  "default-src": ["'self'", "tjenester.nav.no", "appres.nav.no"].join(" "),
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "appres.nav.no",
    "www.google-analytics.com",
    "www.googletagmanager.com",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
  ].join(" "),
  "style-src": ["'self'", "blob:", "*.nav.no", "appres.nav.no", "'unsafe-inline'"].join(" "),
  "connect-src": [
    "'self'",
    "*.nav.no",
    "appres.nav.no",
    "amplitude.nav.no/collect",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.vc.hotjar.com",
    "api.puzzel.com",
  ].join(" "),
  "font-src": ["data:", "*.psplugin.com", "*.hotjar.com"].join(" "),
  "frame-src": ["video.qbrick.com/", "vars.hotjar.com"].join(" "),
  "img-src": ["*.hotjar.com", "www.google-analytics.com", "*.nav.no", "data:"].join(" "),
};
