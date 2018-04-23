#!/bin/bash
./wait_for_it.sh proxyserver:8000 -- echo "Postgres is up."

# Start server
echo "Starting server"
npm install
node app.js