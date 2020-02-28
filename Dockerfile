FROM node:12.14.0-alpine as builder

COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM node:12.14.0-alpine

ENV NODE_ENV=production

COPY --from=builder package*.json ./
RUN npm i --production
COPY --from=builder public/ ./public
COPY --from=builder .build/ ./.build

CMD npm start
