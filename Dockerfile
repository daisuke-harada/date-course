FROM ruby:2.7.2 

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq \
    && apt-get install -y nodejs yarn --no-install-recommends && rm -rf /var/lib/apt/lists/* \
    && mkdir /date_course

WORKDIR /date_course

COPY Gemfile /date_course/Gemfile
COPY Gemfile.lock /date_course/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /date_course

COPY entrypoint.sh /usr/bin/

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
