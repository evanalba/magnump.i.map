FROM node:22

WORKDIR /usr/app
# Copy package requirements and install
COPY package.json .
RUN npm install

# Copy current directory items over
COPY public .
COPY src .
COPY *.js .
EXPOSE 3000

CMD ["npm", "run", "dev"]