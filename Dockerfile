FROM node:10
RUN mkdir /app && npm install bittorrent-tracker
COPY app.js /app/
WORKDIR /app
ENTRYPOINT node app.js
