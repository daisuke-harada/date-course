FROM node:17.4.0 as builder

ENV APP_PATH /usr/src/datecourses

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR $APP_PATH

COPY package.json $APP_PATH/package.json
COPY yarn.lock $APP_PATH/yarn.lock

RUN yarn install

COPY . $APP_PATH

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

