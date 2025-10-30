FROM node:18-alpine

WORKDIR /app
COPY package.json package.json
RUN npm install --production

COPY . .

# Ensure DB file exists
RUN node -e "require('./db'); console.log('db init ok')"

EXPOSE 4000
CMD ["node", "server.js"]
