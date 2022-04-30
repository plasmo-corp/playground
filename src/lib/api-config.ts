export default {
  auth: process.env['GITHUB_TOKEN'],
  userAgent: process.env['USER_AGENT'],
  previews: [],
  timeZone: 'Etc/UTC',
  baseUrl: 'https://api.github.com',
  log: {
    debug: () => {},
    info: console.log,
    warn: console.warn,
    error: console.error
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0
  }
};
