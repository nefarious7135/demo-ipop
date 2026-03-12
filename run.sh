#!/usr/bin/env bash
set -euo pipefail

echo "📦 Initializing Playwright + BDD Setup..."

if [[ ! -f package.json ]]; then
  echo "📁 No package.json found. Initializing project..."
  npm init -y
fi

echo "🔧 Installing Playwright..."
npm install -D playwright
npx playwright install

# Optional: check if required files exist
missing=false

[[ -f tsconfig.json ]] || { echo "❌ Missing: tsconfig.json"; missing=true; }
[[ -d features ]] || { echo "❌ Missing: features/ directory"; missing=true; }

if [[ "$missing" == true ]]; then
  echo "⚠️  One or more required files/folders are missing. Please add them and rerun."
  exit 1
fi

echo "🚀 Running BDD test with: npx playwright test --project="SIT-UI""
npx playwright test --project="SIT-UI"
