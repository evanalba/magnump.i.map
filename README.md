<p align="center"><img src="https://github.com/evanalba/magnump.i.map/blob/main/frontend/public/logo.svg" width="400" alt="Magnum P.I. Map Logo"></p>

## About Magnum, P.I. Map

A map-based web application based on a 1980s TV show called Magnum P.I. You can create and plot filming locations found in Magnum P.I., learn some information about a specific film location, and more.

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
5. Hop on to the login page of pgAdmin: http://localhost:5050/

6. Login using the credentials found in the pgadmin service of `compose.yaml`:<br><br>
**Email Address / Username:**<br>
admin@pgadmin.com<br>
**Password:**<br>
password

7. Right click **Servers** button found in the Object Explorer section.

8. Highlight over the **Server** button.

9. Click on **Server...** button.

10. In the **General** tab of the pop-up, in the box coresponding to name, put **"*magnum*"**.

11. Click on the **Connection** tab.

12. Now, put the following credentials which are found in `backend/index.js` in the coresponding boxes:<br><br>
**Host name/address:** *postgres*<br>
**Port:** *5432*<br>
**Maintenance database:** *mydb*<br>
**Username:** *myuser*<br>
**Passowrd:** *mypassword*<br>

13. Open the submenu until you locate *magnum/Databases/mydb/Schemas/Tables*

14. Right click **Tables** button and click Query Tool.

15. Execute this SQL code
```sql
CREATE TABLE public.locations (
    "name" text NOT NULL,
    "address" text NOT NULL,
    "latitude" double precision NOT NULL,
    "longitude" double precision NOT NULL,
    "image" text NOT NULL,
    "biography" text NOT NULL,
    "episodes" jsonb NOT NULL,
    "seasons" integer[] NOT NULL,
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT locations_pkey PRIMARY KEY (id),
    CONSTRAINT max_8_seasons CHECK (array_length(seasons, 1) <= 8)
);
```
16. Go down the Open the *Tables* submenu.

17. Right click the **Import/Export data** button

18. Import in the file `magnum_locations.csv`.<br>
**Note:** Make sure before you click the **OK** button to go into the **Options** tab and turn on the *header* button.

19. You are done! Go to http://localhost:3000/. Enjoy! :)
