FROM node:18 as builder

# Create app directory
WORKDIR /build

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install --force

#Export the target to env variable
ARG COPY_PATH

ENV COPY_PATH=$COPY_PATH

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Bundle app source
COPY ./libs /build/libs
COPY ./.eslintrc.json /build/.eslintrc.json
COPY ./config-overrides.js /build/config-overrides.js
COPY apps/$COPY_PATH/ /build/apps/$COPY_PATH/
COPY tsconfig.base.json /build/tsconfig.base.json
COPY .babelrc /build/.babelrc
COPY nx.json /build/nx.json


# if frontend create a .env file with the env variable REACT_APP_MAPBOX_ACCESS_TOKEN="defaultMapboxToken"
RUN if [ "$COPY_PATH" = "frontend" ]; then echo 'REACT_APP_MAPBOX_ACCESS_TOKEN="defaultMapboxToken"' > .env; fi


# Creates a "dist" folder with the production build
RUN npx nx build $COPY_PATH

FROM node:18-alpine as backend

WORKDIR /app

# copy using the target
COPY --from=builder /build/dist/apps/$COPY_PATH/* ./dist


RUN npm i @nestjs/platform-express

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

FROM nginx:1.21.3-alpine as frontend

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copy the production build from the builder stage
COPY --from=builder /build/dist/apps/$COPY_PATH/* /usr/share/nginx/html

# Copy the nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

#copy entrypoint.sh
COPY docker/nginx/entrypoint.sh /entrypoint.sh

## add permissions for nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

ENTRYPOINT ["sh", "/entrypoint.sh"]
