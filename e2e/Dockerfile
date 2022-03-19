FROM cypress/base:14
WORKDIR /e2eApp
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
RUN yarn run cypress:verify