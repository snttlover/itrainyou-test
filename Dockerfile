FROM node:12.18.1-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
ENV NODE_ENV=production

COPY . ./
RUN yarn build

FROM node:12.18.1-alpine
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_ENV=production
ENV HOST=0.0.0.0

WORKDIR /app
COPY package*.json ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/build /app/build

CMD npm start
