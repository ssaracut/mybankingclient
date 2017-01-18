FROM nginx
MAINTAINER ssaracut <ssaracut@gmail.com>

ENV NGINX_PORT 80

# Copy dist items into dir
WORKDIR /usr/share/nginx/html
COPY dist/ /usr/share/nginx/html
COPY .nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
