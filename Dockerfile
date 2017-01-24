FROM nginx
MAINTAINER ssaracut <ssaracut@gmail.com>

ENV NGINX_PORT 80

# Copy dist items into dir
COPY build/ /usr/share/nginx/html
COPY .nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
