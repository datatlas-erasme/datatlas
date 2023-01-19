ARG TARGET

FROM node:18 as builder

# Create app directory
WORKDIR /build

# Install app dependencies
COPY package.json ./

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY apps/backend/ /build/apps/backend/
COPY tsconfig.base.json /build/tsconfig.base.json

RUN ls -la

# Creates a "dist" folder with the production build
RUN npx nx build backend

FROM node:18-alpine
WORKDIR /app

# if Target is backend then copy the backend files 

COPY --from=builder /build/dist/apps/backend ./dist

RUN npm i @nestjs/platform-express

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
