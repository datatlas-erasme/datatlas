FROM node:lts 

# Create app directory
WORKDIR /datatlas

# Install app dependencies
COPY ./ /datatlas/

RUN npm install --force

# Install app dependencies
RUN npm install @nrwl/cli -g

CMD ["tail", "-f", "/dev/null"]


