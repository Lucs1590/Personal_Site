#!/bin/bash

# Exit on error
set -e

echo "Starting Vercel build process..."

# Check if IPGEOLOCATION_API_KEY is set
if [ -z "$IPGEOLOCATION_API_KEY" ]; then
  echo "ERROR: IPGEOLOCATION_API_KEY environment variable is not set."
  echo "Please add it in Vercel Project Settings -> Environment Variables"
  exit 1
fi

echo "IPGEOLOCATION_API_KEY is set, replacing placeholder..."

# Escape special characters in the API key for use in sed
# This handles /, &, \, and other special regex characters
ESCAPED_KEY=$(printf '%s\n' "$IPGEOLOCATION_API_KEY" | sed -e 's/[\/&]/\\&/g')

# Use | as delimiter to avoid issues with / in the key
sed -i "s|\${IPGEOLOCATION_API_KEY}|$ESCAPED_KEY|g" src/environments/environment.prod.ts

echo "API key replacement complete"

# Verify the replacement worked (without exposing the key)
if grep -q '${IPGEOLOCATION_API_KEY}' src/environments/environment.prod.ts; then
  echo "ERROR: Placeholder was not replaced successfully"
  exit 1
fi

echo "Verified: placeholder successfully replaced"

# Run the Angular build
echo "Building Angular application..."
npm run build

echo "Build complete!"

