#!/bin/bash

echo "Installing Node modules..."
npm install

if [ $? -ne 0 ]; then
  echo "Failed to install Node modules."
  exit 1
fi

echo "Setting environment variables..."
export NODE_ENV=development
export PORT=3000

echo "Running Node.js project..."
node app.js

if [ $? -ne 0 ]; then
  echo "Failed to start Node.js project."
  exit 1
fi
