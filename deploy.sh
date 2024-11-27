# deploy.sh
#!/bin/sh

# Wait for Ganache to be ready
echo "Waiting for Ganache..."
while ! nc -z ganache 8545; do
  sleep 1
done
echo "Ganache is up!"

# Deploy contracts
echo "Deploying contracts..."
truffle migrate --network docker

# Keep container running
tail -f /dev/null