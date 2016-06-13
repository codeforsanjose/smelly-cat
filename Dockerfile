FROM elasticsearch

MAINTAINER ameyades

RUN apt-get update

RUN apt-get install -y nodejs npm

RUN ln -s "$(which nodejs)" /usr/bin/node

#update nodejs if necessary

RUN npm cache clean -f

RUN npm install -g n

RUN n stable

#RUN npm install npm -g
#purposeful redundancy

#RUN npm install npm -g

# Create app directory
RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/

# Bundle app source (in this case the outer git repo)
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install


