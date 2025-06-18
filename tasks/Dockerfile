# frontend/tasks/Dockerfile

FROM node:18 AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
