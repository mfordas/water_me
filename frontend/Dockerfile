FROM node:14 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM node:14-slim AS final

WORKDIR /app/frontend

RUN npm install -g serve
COPY --from=builder /app/build ./build

EXPOSE "3000"
CMD ["serve", "-s", "build", "-l", "3000"]
# CMD ["npm", "run", "startReact"]
