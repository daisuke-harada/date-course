FROM cypress/base:14
WORKDIR /app

# dependencies will be installed only if the package files change
COPY package.json .
COPY package-lock.json .
ENV CI=1
RUN npm ci
RUN npx cypress verify