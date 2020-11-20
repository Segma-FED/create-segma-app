#!/bin/sh
sed -i "s|\${VUE_APP_SERVER_URL}|$VUE_APP_SERVER_URL|g" /etc/nginx/conf.d/default.conf
grep '#VUE_APP_AUTH_TYPE' -rl /usr/share/nginx/html/ | xargs sed -i "s|#VUE_APP_AUTH_TYPE|$VUE_APP_AUTH_TYPE|g"
grep '#VUE_APP_AUTH_REDIRECT_URI' -rl /usr/share/nginx/html/ | xargs sed -i "s|#VUE_APP_AUTH_REDIRECT_URI|$VUE_APP_AUTH_REDIRECT_URI|g"
grep '#VUE_APP_AUTH_CLIENT_ID' -rl /usr/share/nginx/html/ | xargs sed -i "s|#VUE_APP_AUTH_CLIENT_ID|$VUE_APP_AUTH_CLIENT_ID|g"
grep '#VUE_APP_MENU_SHOW' -rl /usr/share/nginx/html/ | xargs sed -i "s|#VUE_APP_MENU_SHOW|$VUE_APP_MENU_SHOW|g"
nginx -g "daemon off;"
