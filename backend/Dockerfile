# backend/Dockerfile
FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure DB file exists
RUN node -e "require('./db'); console.log('db init ok')"

EXPOSE 4000
CMD ["node", "server.js"]
