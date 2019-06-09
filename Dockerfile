FROM nginx
COPY dist/ /cr-pwa
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY static/images/ /cr-pwa/static/images
