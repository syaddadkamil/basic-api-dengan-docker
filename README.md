# BASIC API DENGAN DOCKER
ISENG AJAH

## Install
 1. docker
 2. node-js
 3. git
 4. Clone repo
 5. install dependencies
    ```bash
    npm install
    ```

 ### jalanin tanpa docker 
 1. menggunakan npm
    ```bash
    npm run dev
    ```

 ### jalanin dengan docker dengan file .env.development
 1. isi file .env.development misal NAME=SERVER-1 PORT=8080
 2. build container
    ```bash
    docker build -t api-docker:1.0 .
    ```

 3. jalanin container
    ```bash
    docker run -d --name api-docker-1 --env-file .env.development -p 8081:8080 api-docker:1.0
    ```

 ### jalanin container tanpa file .env.development
 1. pastikan file .env.development kosong
 2. build container lagi
    ```bash
    docker build -t api-docker:1.1 .
    ```

 3. jalanin docker container
    ```bash
    docker run -d --name api-docker-2 -e NAME=SERVER-2 -e PORT=8080 -p 8082:8080 api-docker:1.1
    ```

writter
[Instagram](https://www.instagram.com/bimaaxt)
