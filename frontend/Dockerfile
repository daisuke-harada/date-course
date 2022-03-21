FROM node:17.4.0-alpine as builder

ENV APP_PATH /datecourses

WORKDIR $APP_PATH

COPY package.json $APP_PATH/package.json
COPY yarn.lock $APP_PATH/yarn.lock

RUN yarn install

COPY . $APP_PATH

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

