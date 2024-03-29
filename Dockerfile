FROM node:18-alpine

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]