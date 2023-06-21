FROM node:lts-alpine3.18

WORKDIR /app

COPY package.json . 
RUN npm install --silent

COPY . .

ARG REACT_APP_NAME
ENV REACT_APP_NAME=${REACT_APP_NAME}
RUN npm run build