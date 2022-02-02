FROM ruby:2.7.2 
# 
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# WORKDIRは指定するディレクトリがもし存在しない場合は作成してくれる。そのためRUN mkdir /date-courseを省略
ENV APP_PATH /date-course
WORKDIR $APP_PATH

COPY Gemfile $APP_PATH/Gemfile
COPY Gemfile.lock $APP_PATH/Gemfile.lock
RUN bundle install

COPY . $APP_PATH