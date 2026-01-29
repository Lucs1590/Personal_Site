# Deployment Instructions for Vercel

This document provides step-by-step instructions for deploying this application to Vercel with the IP Geolocation API properly configured.

## Prerequisites

- A Vercel account
- An API key from [ipgeolocation.io](https://ipgeolocation.io)
- Your repository connected to Vercel

## Setup Steps

### 1. Add Environment Variable in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Configure the variable:
   - **Key:** `IPGEOLOCATION_API_KEY`
   - **Value:** Your actual API key from ipgeolocation.io
   - **Environments:** Select all environments (Production, Preview, Development)
5. Click **Save**

**Important:** The API key should contain only alphanumeric characters, hyphens, and underscores. If your API key contains special characters like `/`, `&`, or `\`, the build process may fail. If you encounter issues, contact ipgeolocation.io support for a compatible key format.

### 2. Trigger a New Deployment

After adding the environment variable, trigger a new deployment:

**Option A: Push a new commit**
```bash
git commit --allow-empty -m "Trigger deployment with API key"
git push
```

**Option B: Redeploy from Vercel Dashboard**
1. Go to your project's **Deployments** tab
2. Find the latest deployment
3. Click the three-dot menu (⋯)
4. Select **Redeploy**

### 3. Verify the Deployment

Once the deployment completes:

1. Visit your deployed site
2. Open the browser's Developer Console (F12)
3. Look for IP geolocation API calls in the Network tab
4. The URL should show `apiKey=YOUR_ACTUAL_KEY` (not `apiKey=%24%7BIPGEOLOCATION_API_KEY%7D`)

If you see the placeholder instead of your actual key:
- Verify the environment variable is correctly set in Vercel
- Check the deployment logs for any build errors
- Ensure the variable name is exactly `IPGEOLOCATION_API_KEY`

## How It Works

### Build Process

The `vercel.json` file in the project root contains:

```json
{
  "buildCommand": "chmod +x build-vercel.sh && ./build-vercel.sh",
  "outputDirectory": "dist/personal-site/browser"
}
```

The `build-vercel.sh` script:

1. Checks if the `IPGEOLOCATION_API_KEY` environment variable is set
2. Uses `sed` to replace the placeholder `${IPGEOLOCATION_API_KEY}` in `environment.prod.ts` with the actual value
3. Runs the Angular build command (`npm run build`)
4. Outputs the compiled files to `dist/personal-site/browser`

During the build:

1. Vercel reads the `IPGEOLOCATION_API_KEY` environment variable from project settings
2. The build script replaces the placeholder with the actual value
3. Angular builds the application with the real API key embedded
4. The compiled files are served from the output directory

### Security Note

- The API key is only embedded during the build process
- It never appears in your source code repository
- Each environment (Production, Preview, Development) can have different keys if needed

## Troubleshooting

### Issue: API returns 401 Unauthorized

**Problem:** The URL shows `apiKey=%24%7BIPGEOLOCATION_API_KEY%7D`

**Solution:**
1. Verify the environment variable is set in Vercel (Settings → Environment Variables)
2. Check the variable name is exactly `IPGEOLOCATION_API_KEY` (case-sensitive)
3. **Check the Vercel build logs** to see what's happening:
   - Go to your deployment in Vercel
   - Click on the "Building" step to see logs
   - Look for these messages:
     - `"IPGEOLOCATION_API_KEY is set, replacing placeholder..."` - means it's working
     - `"API key replacement complete"` - confirms successful replacement
     - `"Verified: placeholder successfully replaced"` - final verification passed
     - `"ERROR: IPGEOLOCATION_API_KEY environment variable is not set"` - the variable isn't available
     - `"ERROR: Placeholder was not replaced successfully"` - replacement failed
4. Ensure the environment variable is enabled for the deployment environment (Production/Preview)
5. Redeploy after adding/updating the variable

### Issue: CORS Errors

**Problem:** Console shows CORS or Access-Control-Allow-Origin errors

**Solution:**
- The ipgeolocation.io API should support CORS by default
- Verify your API key is valid
- Check you're using the correct endpoint: `https://api.ipgeolocation.io/v2/ipgeo`
- If issues persist, contact ipgeolocation.io support

Note: Adding CORS headers to your Vercel configuration will NOT fix CORS errors from external APIs. The external API server must allow CORS.

### Issue: Build Fails

**Problem:** Deployment fails during the build step

**Solution:**
1. Check the deployment logs in Vercel
2. Verify `vercel.json` is properly formatted
3. Ensure all dependencies are listed in `package.json`
4. Try running `npm run build` locally to reproduce the issue

## GitHub Actions CI

For GitHub Actions deployments, the workflow automatically handles API key replacement using GitHub Secrets. No additional configuration needed if you've already set up the `IPGEOLOCATION_API_KEY` secret in your repository settings.

## Additional Resources

- [IPGEOLOCATION_SETUP.md](./IPGEOLOCATION_SETUP.md) - Detailed setup guide
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [ipgeolocation.io Documentation](https://ipgeolocation.io/documentation.html)
