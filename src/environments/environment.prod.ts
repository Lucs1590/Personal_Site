export const environment = {
  production: true,
  appVersion: require('../../package.json').version,
  ipGeolocationApiKey: '${IPGEOLOCATION_API_KEY}' // This will be replaced by CI/CD with GitHub Secret
};
