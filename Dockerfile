FROM nginx:alpine

ENV PROXY_PASS=""

COPY configure.sh /
COPY dist/ui/ www/ui
COPY config/nginx.conf etc/nginx/nginx.conf
#COPY docs www/docs
#COPY media www/media
#CMD ./configure.sh
RUN ["chmod", "+x", "./configure.sh"]
