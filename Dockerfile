FROM node:12.14.0-alpine
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

ENV NODE_ENV=production

COPY package*.json ./
RUN npm i
COPY server.js ./server.js
COPY public ./public
COPY src/ ./src

RUN npm i
COPY .next/ ./.next

CMD npm start
