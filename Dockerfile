FROM node:12.18.1-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
ENV NODE_ENV=production

COPY . ./
RUN npm run build

FROM node:12.18.1-alpine
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_ENV=production
ENV HOST=0.0.0.0

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY --from=builder /app/build /app/build

CMD npm start
