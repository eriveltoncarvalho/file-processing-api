FROM node:18.15.0-alpine3.17 AS development

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir -p /usr/file-processing-api/app && chown node:node /usr/file-processing-api/app
WORKDIR /usr/file-processing-api

COPY --chown=node:node package.json package-lock.json* ./

RUN  npm install glob rimraf

ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /usr/file-processing-api/app

COPY --chown=node:node . .

RUN npm run build

USER node

CMD ["node", "dist/main"]

FROM node:18.15.0-alpine3.17 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=3000
ENV PORT $PORT

RUN mkdir -p /usr/file-processing-api/app && chown node:node /usr/file-processing-api/app
WORKDIR /usr/file-processing-api

COPY --chown=node:node package.json package-lock.json* ./

RUN npm install --only=production --ignore-scripts

WORKDIR /usr/file-processing-api/app

COPY --chown=node:node . .

COPY --from=development /usr/file-processing-api/app/dist ./dist

USER node

CMD ["node", "dist/main"]
