FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json. /

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

COPY ./dist ./public

ENV VITE_BACKEND=http://localhost:3030


CMD ["serve", "-s", "public"]
