FROM node:17.4.0 as builder

# cypressのために必要なテストパッケージをインストールする
#RUN apt-get update -qq && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

ENV APP_PATH /datecourses

WORKDIR $APP_PATH

COPY package.json $APP_PATH/package.json
COPY yarn.lock $APP_PATH/yarn.lock

RUN yarn install

COPY . $APP_PATH

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

