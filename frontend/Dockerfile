FROM node:17.4.0

# cypressのために必要なテストパッケージをインストールする
RUN apt-get update -qq && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /usr/src/datecourses
