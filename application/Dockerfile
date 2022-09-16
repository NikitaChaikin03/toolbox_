FROM node:16.17.0-alpine as node-build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:16.17.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY --from=node-build /usr/src/app/dist ./dist

RUN yarn --frozen-lockfile --production=true --non-interactive

CMD ["node", "dist/main"]