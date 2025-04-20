FROM debian:12-slim
FROM node:23-slim

WORKDIR /usr/app
# Copy package requirements and install
RUN apt-get update && apt-get install -y postgresql-client
COPY package.json .
RUN npm install

# Copy current directory items over
COPY public .
COPY src .
COPY *.js .
EXPOSE 3000

CMD ["npm", "run", "dev"]