export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  ipGeolocationApiKey: '${IPGEOLOCATION_API_KEY}' // This will be replaced by CI/CD with GitHub Secret
};
