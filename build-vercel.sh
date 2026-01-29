#!/bin/bash

# Exit on error
set -e

echo "Starting Vercel build process..."
echo "Replacing API key placeholder..."

# Check if IPGEOLOCATION_API_KEY is set
if [ -z "$IPGEOLOCATION_API_KEY" ]; then
  echo "WARNING: IPGEOLOCATION_API_KEY is not set. Using placeholder."
else
  echo "IPGEOLOCATION_API_KEY is set, replacing placeholder..."
  # Use a more robust sed command that works on both macOS and Linux
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\${IPGEOLOCATION_API_KEY}/$IPGEOLOCATION_API_KEY/g" src/environments/environment.prod.ts
  else
    # Linux (including Vercel)
    sed -i "s/\${IPGEOLOCATION_API_KEY}/$IPGEOLOCATION_API_KEY/g" src/environments/environment.prod.ts
  fi
  echo "Replacement complete"
fi

# Display the environment file (without the actual key for security)
echo "Environment file contents (redacted):"
grep -v "apiKey" src/environments/environment.prod.ts || true
echo "ipGeolocationApiKey: [REDACTED]"

# Run the Angular build
echo "Building Angular application..."
npm run build

echo "Build complete!"
