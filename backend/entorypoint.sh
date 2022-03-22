#!/bin/bash

bin/setup
rm -f tmp/pids/server.pid
bundle exec rails s -p 7777 -b '0.0.0.0'