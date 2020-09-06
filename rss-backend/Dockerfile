FROM node:14.9.0-alpine3.10

WORKDIR /app/rss-feed/

COPY . .

RUN npm install && npm install nodemon -g && pwd && ls -l  && pwd

CMD ["npm", "start"]