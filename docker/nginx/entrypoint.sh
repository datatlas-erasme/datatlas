# replace in static/js replace defaultMapboxToken in js folder with the actual token
sed -i "s/defaultMapboxToken/$REACT_APP_MAPBOX_ACCESS_TOKEN/g" /usr/share/nginx/html/static/js/*.js

nginx -g 'daemon off;'