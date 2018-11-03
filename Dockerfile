FROM node:11

WORKDIR /app

COPY package.json /app

RUN npm install && \
    npm install nodemon -g

COPY . /app

ENTRYPOINT node bin/www

EXPOSE 3000