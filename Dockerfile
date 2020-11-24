FROM node:14 as build

WORKDIR /usr/src/app

ARG BASE_PATH

ENV NODE_ENV=production
ENV TZ Europe/Oslo

RUN npm install -g gatsby-cli
COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app
RUN npm run build

FROM gatsbyjs/gatsby as runtime
COPY --from=build /usr/src/app/public /pub/arbeid
COPY --from=build /usr/src/app/public/404/index.html /pub/404.html
COPY nginx-server-rules.conf /etc/nginx/server.conf
