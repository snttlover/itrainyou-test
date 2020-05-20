FROM node:12.14.0-alpine as builder
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

COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM node:12.14.0-alpine

ENV NODE_ENV=production
ENV BACKEND_URL=$BACKEND_URL

COPY --from=builder package*.json ./
RUN npm i
COPY --from=builder public ./public
COPY --from=builder src/ ./src
COPY --from=builder .next/ ./.next

CMD npm start
