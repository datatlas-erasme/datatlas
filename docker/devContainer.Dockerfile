FROM node:18.16.1-bullseye-slim

RUN apt update && apt install git nano docker.io docker-compose -y 

WORKDIR /app

COPY ./  /app

RUN npm install --force

RUN npm install @nrwl/cli -g
