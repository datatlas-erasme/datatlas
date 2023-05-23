# replace in static/js replace defaultMapboxToken in js folder with the actual token
echo "Replacing defaultMapboxToken with $REACT_APP_MAPBOX_ACCESS_TOKEN"
sed -i "s/defaultMapboxToken/$REACT_APP_MAPBOX_ACCESS_TOKEN/g" /usr/share/nginx/html/static/js/*.js
# same with defaultLocale
echo "Replacing defaultLocale with $REACT_APP_DEFAULT_LOCALE"
sed -i "s/defaultLocale/$REACT_APP_DEFAULT_LOCALE/g" /usr/share/nginx/html/static/js/*.js
# same with defaultApiBaseUrl for ex https://dev-back-datatlas.datagora.erasme.org it should avoid using slash in the sed command
echo "Replacing defaultApiBaseUrl with $REACT_APP_API_BASE_URL"
sed -i "s#defaultApiBaseUrl#$REACT_APP_API_BASE_URL#g" /usr/share/nginx/html/static/js/*.js

# start nginx
nginx -g 'daemon off;'