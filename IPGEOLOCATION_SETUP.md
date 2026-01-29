# IP Geolocation API Setup

This project uses [ipgeolocation.io](https://ipgeolocation.io) for IP geolocation services.

## Local Development Setup

1. Sign up for a free account at [ipgeolocation.io](https://ipgeolocation.io)
2. Get your API key from the dashboard
3. Update `src/environments/environment.ts` with your API key:

   ```typescript
   export const environment = {
     production: false,
     appVersion: require('../../package.json').version + '-dev',
     ipGeolocationApiKey: 'YOUR_API_KEY_HERE' // Replace with your actual API key
   };
   ```

## Production Deployment (GitHub Actions / Vercel)

The production API key should be stored as a GitHub Secret to keep it secure.

### GitHub Secrets Setup

1. Go to your repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `IPGEOLOCATION_API_KEY`
4. Value: Your ipgeolocation.io API key
5. Click "Add secret"

### GitHub Actions Configuration

Add a build step to replace the placeholder in `environment.prod.ts`:

```yaml
- name: Replace API Key
  run: |
    sed -i "s/\${IPGEOLOCATION_API_KEY}/${{ secrets.IPGEOLOCATION_API_KEY }}/g" src/environments/environment.prod.ts
```

### Vercel Configuration

If deploying to Vercel:

1. Go to Project Settings → Environment Variables
2. Add a new variable:
   - Key: `IPGEOLOCATION_API_KEY`
   - Value: Your API key
   - Environments: Production, Preview

The `vercel.json` file in the project root is configured to:
- Automatically replace the API key placeholder during build time
- Add necessary CORS headers to prevent cross-origin issues

No additional build commands need to be configured in Vercel's dashboard - the `vercel.json` file handles everything automatically.

## API Usage

The API is used in `src/app/services/api.service.ts`:

```typescript
getIPInfo(): Observable<IPInfo> {
  const apiKey = environment.ipGeolocationApiKey;
  const url = `${IPGEOLOCATION_API_BASE_URL}?apiKey=${apiKey}`;
  
  return this.httpService.get<IPInfoRequest>(url, this.httpOptions)
    .pipe(
      timeout(5000),
      retryWhen(this.retryStrategy(2)),
      map(response => new IPInfo().deserialize(response)),
      catchError(this.handleError)
    );
}
```

## API Response Structure

The ipgeolocation.io API returns a comprehensive response including:

- IP address
- Country, city, region
- Latitude/longitude
- Timezone information
- Currency details
- ISP information
- And more...

See `src/app/models/ipinfo-request.model.ts` for the complete interface.

## Rate Limits

Free tier includes:

- 30,000 requests/month
- 1,000 requests/day

Monitor your usage at [ipgeolocation.io/dashboard](https://app.ipgeolocation.io/dashboard)

## Security Notes

- ⚠️ **Never commit API keys to the repository**
- Use environment variables for all environments
- Keep `environment.ts` with placeholder values in version control
- Production keys should only be in CI/CD secrets

## Troubleshooting

### CORS Errors

If you encounter CORS (Cross-Origin Resource Sharing) errors when calling the ipgeolocation.io API from your deployed application, this is typically caused by the API provider's server configuration, not your application.

**Note:** The ipgeolocation.io API should already support CORS for client-side requests. If you're experiencing CORS issues:

1. Verify your API key is valid and properly replaced in the production build
2. Check that you're using the correct API endpoint (should be `https://api.ipgeolocation.io/v2/ipgeo`)
3. Ensure you're making the request with proper headers (Content-Type: application/json)
4. Contact ipgeolocation.io support if CORS issues persist

**Important:** Adding CORS headers to your application's responses (via vercel.json or other means) will NOT fix CORS errors when making outbound requests to external APIs. CORS headers must be set by the API server being called, not by the client application.
