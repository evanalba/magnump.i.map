FROM debian:12-slim
FROM node:23-slim

WORKDIR /usr/app
# Copy package requirements and install
RUN apt-get update
COPY package.json .
RUN npm install

# Copy current directory items over
COPY . .
EXPOSE 8080

# Run index.js
CMD ["node", "index.js"]