FROM cypress/base:12

RUN apt-get install --no-install-recommends -y

ENV APP_PATH /e2e/e2e-app
WORKDIR $APP_PATH
COPY package.json APP_PATH/package.json
COPY yarn.lock APP_PATH/yarn.lock

COPY . $APP_PATH