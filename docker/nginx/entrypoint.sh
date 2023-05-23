# create an .env-config.js file in the static/js folder
echo "window._env_ = {" > /usr/share/nginx/html/static/js/.env-config.js 
echo "  REACT_APP_MAPBOX_ACCESS_TOKEN: \"$REACT_APP_MAPBOX_ACCESS_TOKEN\"," >> /usr/share/nginx/html/static/js/.env-config.js
echo "  REACT_APP_DEFAULT_LOCALE: \"$REACT_APP_DEFAULT_LOCALE\"," >> /usr/share/nginx/html/static/js/.env-config.js
echo "  REACT_APP_API_BASE_URL: \"$REACT_APP_API_BASE_URL\"" >> /usr/share/nginx/html/static/js/.env-config.js
echo "};" >> /usr/share/nginx/html/static/js/.env-config.js


# add the env-config.js file to the index.html file
sed -i "s/<\/head>/<script src=\"static\/js\/.env-config.js\"><\/script><\/head>/g" /usr/share/nginx/html/index.html

# start nginx
nginx -g 'daemon off;'