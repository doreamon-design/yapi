# Build
FROM whatwewant/node:12.16-alpine as build

# @FIX node-gyp dependens python, and will be built locally
#   Reference: https://stackoverflow.com/questions/54428608/docker-node-alpine-image-build-fails-on-node-gyp
RUN apk add --no-cache python3 make g++ git wget curl grep bash

WORKDIR /client

COPY .npmrc .

COPY package.json .

COPY yarn.lock .

RUN  yarn

COPY . .

RUN  yarn run build-client

RUN  yarn run docs

# Server

FROM whatwewant/node:12.16-alpine

WORKDIR /server

COPY .npmrc .

COPY  package.json .

COPY  yarn.lock   .

RUN   yarn --production && yarn cache clean --force

COPY . .

COPY  --from=build /client/static /server/static

EXPOSE 8080

CMD yarn start
