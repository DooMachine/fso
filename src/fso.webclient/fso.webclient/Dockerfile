FROM node:9-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /tmp/

RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm run build:ssr
EXPOSE 10575
CMD npm run serve:ssr