FROM node:11-alpine

WORKDIR /app

COPY package.json .

RUN npm i --production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]