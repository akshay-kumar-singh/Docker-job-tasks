# Backend
FROM node:18

WORKDIR /app

# Install DNS utilities for SRV support
# RUN apt-get update && apt-get install -y dnsutils

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD ["npx", "nodemon", "index.js"]
