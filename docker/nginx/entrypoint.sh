#!/bin/sh
# Replace env default values with actual env values.
# See `apps/frontend/.env.default` and `Dockerfile`
SED_GLOB="/usr/share/nginx/html/**/*.(js|html)"
grep -v '^#' .env.default | while IFS= read -r line; do
  default_value=${line#*=}
  name=${line%%=*}
  eval "value=\$$name"
  if [ -z "$value" ]
  then
    echo "Environment variable $name is empty. Skipping default value substition..."
  else
    echo "sed -i \"s/$default_value/$value/g\" $SED_GLOB"
    sed -i "s/$default_value/$value/g" $SED_GLOB
  fi
done

# start nginx
nginx -g 'daemon off;'
