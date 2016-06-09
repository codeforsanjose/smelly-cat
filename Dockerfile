FROM elasticsearch

MAINTAINER ameyades

RUN apt-get update

RUN apt-get install nodejs npm

RUN apt-get install express

COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app




