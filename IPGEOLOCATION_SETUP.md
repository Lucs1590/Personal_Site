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
   - Environments: Production, Preview (optional)

3. Add a build command in `vercel.json` or project settings:
   ```json
   {
     "buildCommand": "sed -i \"s/\\${IPGEOLOCATION_API_KEY}/\"$IPGEOLOCATION_API_KEY\"/g\" src/environments/environment.prod.ts && npm run build"
   }
   ```

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
