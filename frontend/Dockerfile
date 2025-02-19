# Dockerfile: A multi-stage build.

# Dependencies are for development in a Node.js project
# (and thus, which to exclude in production) by looking at the devDependencies
# section in your package.json file
FROM node:22 AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

# Each Block = A Image layer
FROM node:22 AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22 AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM build-env
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
# CMD: Specifies the default command that will be executed when a
# container is started from the image built by that Dockerfile.
CMD ["npm", "run", "start"]