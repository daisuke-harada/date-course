FROM cypress/base:14
WORKDIR /app

# dependencies will be installed only if the package files change
COPY package.json .
COPY  .
RUN yarn install --frozen-lockfile
RUN yarn run cypress verify