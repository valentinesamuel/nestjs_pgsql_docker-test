FROM node:lts-alpine

# RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

# RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:dev"]
