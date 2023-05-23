# replace in static/js replace defaultMapboxToken in js folder with the actual token
sed -i "s/defaultMapboxToken/$REACT_APP_MAPBOX_ACCESS_TOKEN/g" /usr/share/nginx/html/static/js/*.js
# same with defaultLocale
sed -i "s/defaultLocale/$REACT_APP_DEFAULT_LOCALE/g" /usr/share/nginx/html/static/js/*.js
# same with defaultApiBaseUrl
sed -i "s/defaultApiBaseUrl/$REACT_APP_API_BASE_URL/g" /usr/share/nginx/html/static/js/*.js


# add the env-config.js file to the index.html file
sed -i "s/<\/head>/<script src=\"static\/js\/.env-config.js\"><\/script><\/head>/g" /usr/share/nginx/html/index.html

# start nginx
nginx -g 'daemon off;'