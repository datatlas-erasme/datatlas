FROM node:lts as builder

# Create app directory
WORKDIR /datatlas

# Install app dependencies
COPY ./ /datatlas/

RUN npm install --force

FROM node:lts-alpine

COPY  --from=builder /datatlas /datatlas

WORKDIR /datatlas

# Install app dependencies
RUN npm install @nrwl/cli -g

CMD [ "npx", "nx", "serve" ]
