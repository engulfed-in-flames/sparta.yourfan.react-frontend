FROM node:lts-alpine3.18 as build

WORKDIR /app

COPY package.json . 
RUN npm install

COPY . .

ARG REACT_APP_NAME
ENV REACT_APP_NAME=${REACT_APP_NAME}
RUN npm run build

############

FROM nginx:stable-alpine3.17-slim
COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY react.conf /etc/nginx/conf.d

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]