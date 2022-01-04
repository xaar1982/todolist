ARG NODE_JS_VERSION
FROM node:${NODE_JS_VERSION}

WORKDIR .
COPY package.json .
RUN npm install
COPY . .
CMD npm start

