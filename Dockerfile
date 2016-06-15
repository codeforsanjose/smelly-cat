FROM elasticsearch

MAINTAINER ameyades

RUN apt-get update

RUN apt-get install -y nginx

RUN apt-get install -y nodejs npm

RUN ln -s "$(which nodejs)" /usr/bin/node

#update nodejs if necessary

RUN npm cache clean -f

RUN npm install -g n

RUN n stable

# Create app directory
RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/

# Bundle app source (in this case the outer git repo)
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 1337

EXPOSE 3000

#RUN npm start




