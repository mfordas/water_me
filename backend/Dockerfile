FROM node:14-slim

WORKDIR /backend

COPY package.json /backend

RUN npm install

RUN npm install typescript -g

COPY . /backend

EXPOSE 8080

CMD [ "npm", "run", "mon" ]