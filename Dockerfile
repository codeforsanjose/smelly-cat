FROM elasticsearch

MAINTAINER ameyades

RUN apt-get update

RUN apt-get install -y nodejs npm

# Create app directory
RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install


