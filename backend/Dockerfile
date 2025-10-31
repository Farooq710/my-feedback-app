FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm install

COPY . .

RUN node -e "require('./db'); console.log('db init ok')"

EXPOSE 4000
CMD ["node", "server.js"]
