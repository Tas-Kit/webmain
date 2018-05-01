#!/bin/bash
./wait_for_it.sh proxyserver:8000 -- echo "Proxyserver is up."

# Start server
npm install
npm run build
echo "Starting server"
node app.js