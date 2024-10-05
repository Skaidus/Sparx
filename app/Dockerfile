FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app 

RUN npm install

EXPOSE 9009

CMD ["node", "index.js"]