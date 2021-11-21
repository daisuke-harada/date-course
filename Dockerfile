FROM ruby:2.7.2 

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq \
    && apt-get install -y nodejs yarn --no-install-recommends && rm -rf /var/lib/apt/lists/* 

# rspecでJsのテストを実装するためにchromedriverとchromeをインストール  
RUN apt-get update && apt-get install -y unzip \
    && CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` \
    && wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -P ~/ \
    && unzip ~/chromedriver_linux64.zip -d ~/ \
    && rm ~/chromedriver_linux64.zip \
    && chown root:root ~/chromedriver \
    && chmod 755 ~/chromedriver \
    && mv ~/chromedriver /usr/bin/chromedriver \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable

RUN mkdir /date_course

WORKDIR /date_course

COPY Gemfile /date_course/Gemfile
COPY Gemfile.lock /date_course/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /date_course

COPY entrypoint.sh /usr/bin/

#デプロイ時に必要
RUN mkdir -p tmp/sockets

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ${START}
