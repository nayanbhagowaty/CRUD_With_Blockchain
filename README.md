Key features of this setup:

Ganache container:


Runs a local blockchain
Persists blockchain data using a Docker volume
Configurable network ID and default balance


Truffle container:


Handles contract compilation and deployment
Waits for Ganache to be ready before deploying
Mounts your contracts and migrations


Webapp container:


Serves the frontend using Nginx
Configured for single-page application support
Easy to scale and modify


Development workflow:

# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild and restart a specific service
docker-compose up -d --build truffle

# Stop everything
docker-compose down

# Clean up volumes
docker-compose down -v

To interact with the running containers:

# Access Truffle console
docker-compose exec truffle truffle console

# Check Ganache logs
docker-compose logs ganache

# Rebuild and restart everything
docker-compose down && docker-compose up --build -d



Components & costs
Frontend:
- Vercel/Netlify Free Tier
  Cost: $0/month
  Limits: 100GB bandwidth/month
  CI/CD included

Smart Contract:
- Polygon Network
  Deployment: ~$0.30 one-time
  Transaction costs: ~$0.01 per user action

Optional additions:
- Custom domain: ~$10-15/year
- SSL certificate: Free with Let's Encrypt