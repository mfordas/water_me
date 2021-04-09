FROM node:14-slim

WORKDIR /water_me_backend

COPY package.json .

RUN npm install

RUN npm install typescript -g

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "mon" ]