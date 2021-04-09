FROM node:14-slim

WORKDIR /water_me_frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "startReact" ]
