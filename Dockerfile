FROM node:18 as builder

# Create app directory
WORKDIR /build

# Install app dependencies
COPY package.json ./

# Install app dependencies
RUN npm install --force

#Export the target to env variable
ARG TARGET

ENV TARGET=$TARGET

# Bundle app source

COPY ./apps/shared /build/apps/shared
COPY ./.eslintrc.json /build/.eslintrc.json
COPY ./config-overrides.js /build/config-overrides.js
COPY apps/$TARGET/ /build/apps/$TARGET/
COPY tsconfig.base.json /build/tsconfig.base.json

# Echo the target
RUN echo 'TARGET is'
RUN echo $TARGET


# Creates a "dist" folder with the production build
RUN npx nx build $TARGET

FROM node:18-alpine
WORKDIR /app


# if Target is backend then copy the backend files 

# copy using the target
COPY --from=builder /build/dist/apps/$TARGET ./dist


RUN npm i @nestjs/platform-express

# Start the server using the production build
CMD [ "node", "dist/main.js" ]