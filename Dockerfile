FROM node:14
LABEL maintainer="simon@torrentofshame.com"

RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm i --production

COPY . /usr/src/app

CMD ["npm", "start"]
