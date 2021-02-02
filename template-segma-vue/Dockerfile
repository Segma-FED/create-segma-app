FROM hub.segma.tech/library/nginx:1.15-alpine-scripts

# 输入参数
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html/
