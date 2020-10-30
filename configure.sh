#! /bin/sh
echo "$PROXY_PASS"
#sed -i 's#PROXY_PASS#'"$PROXY_PASS#g"'' /etc/nginx/nginx.conf
nginx -g 'daemon off;'
