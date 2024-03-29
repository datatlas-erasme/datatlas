#!/bin/sh
# This is a sandbox testing file to helps with the creation of the `docker/nginx/entrypoint.sh`.
SED_GLOB="/usr/share/nginx/html/static/js/*.js  /usr/share/nginx/html/index.html"
grep -v '^#' .env.default | while IFS= read -r line; do
  default_value=${line#*=}
  name=${line%%=*}
  eval "value=\$$name"
  echo "$value"
  if [ -z "$value" ]
  then
    echo "Environment variable $name is empty. Skipping default value substitution..."
  else
    echo "Substituting $name default value '$default_value' with environment value '$value' in $SED_GLOB"
    echo "sed -i \"s#$default_value#$value#g\" $SED_GLOB"
  fi
done
