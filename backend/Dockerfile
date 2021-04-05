FROM node:14-slim

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm install

RUN npm install typescript -g

COPY . ./

EXPOSE 8080

CMD [ "npm", "run", "mon" ]