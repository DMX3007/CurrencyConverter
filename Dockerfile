FROM node:21-alpine3.18

ENV NODE_ENV development

WORKDIR /app

COPY package.json ./ 

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]