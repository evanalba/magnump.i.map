<p align="center"><img src="https://github.com/evanalba/magnump.i.map/blob/main/frontend/public/logo.svg" width="400" alt="Magnum P.I. Map Logo"></p>

## About Magnum P.I., Map

A map-based web application based on an 80s TV show called Magnum P.I..
You can create and plot filming locations found in Magnum P.I., learn some information about a specific film location, and more.

## Table of Contents
* [Software Stack](#Software-Stack)
* [Environment Setup](#Environment-Setup)
* [License](https://github.com/evanalba/magnump.i.map/blob/main/LICENSE)

## Software Stack
### PERN
* PostgreSQL (database)
* Express.js (application controller layer)
* React (JavaScript library) (web application presentation)
* Node.js (JavaScript runtime)

## Environment Setup
1. Install [Docker](https://www.docker.com/).
2. Clone this repository and navigate to it:
    ```bash
    git clone https://github.com/evanalba/magnump.i.map.git && cd magnump.i.map
    ```
3. Build the Multi-stage build.
    ```bash
    docker compose build --no-cache
    ```
4. Start the Multi-stage build.
    ```bash
    docker compose up
    ```
