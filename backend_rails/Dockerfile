FROM ruby:3.3.0

# インストール可能なパッケージの更新 開発パッケージの一式ダウンロード
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# backend_railsディレクトリもアプリと同じく作成する。そうしなければ、Could not locate Gemfile or .bundle/ directoryとなり、Gemfileを見つけれなくなる
ENV APP_PATH /date-course-api
# WORKDIRは指定するディレクトリがもし存在しない場合は作成してくれる。そのためRUN mkdir /date-course-apiを省略
WORKDIR $APP_PATH

COPY Gemfile $APP_PATH/Gemfile
COPY Gemfile.lock $APP_PATH/Gemfile.lock
RUN apt-get update -qq && \
    apt-get install -y build-essential && \
    gem install bundler

RUN bundle install

COPY . $APP_PATH

RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

EXPOSE 7777

CMD bin/setup \
    && bin/rails db:seed \
    && rm -f tmp/pids/server.pid \
    && bundle exec rails s -p 7777 -b '0.0.0.0'
