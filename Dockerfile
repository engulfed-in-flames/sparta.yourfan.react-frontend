FROM node:lts-alpine3.18

WORKDIR /app

COPY package.json . 
RUN npm install --silent

COPY . .

RUN npm run build