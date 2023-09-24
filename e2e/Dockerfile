FROM cypress/base:14
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN yarn install --frozen-lockfile
CMD ["yarn", "run", "cypress", "run", "--headless"]