# Build
FROM node:12.16-alpine as build

WORKDIR /client

COPY .npmrc .

COPY package.json .

COPY yarn.lock .

RUN  yarn

COPY . .

RUN  yarn run build-client

# Server

FROM node:12.16-alpine

WORKDIR /server

COPY .npmrc .

COPY  package.json .

COPY  yarn.lock   .

RUN   yarn --production && yarn cache clean --force

COPY . .

COPY  --from=build /client/static /server/static

EXPOSE 8080

CMD yarn start