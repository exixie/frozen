FROM ubuntu:20.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/www/* && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/www/my_project/img
COPY index.html /var/www/my_project/
COPY img/olaf.webp /var/www/my_project/img/
COPY script-nearest-star.js /var/www/my_project/

RUN chmod -R 755 /var/www/my_project

RUN groupadd -r elsa_frozen && \
    useradd --no-log-init -r -g elsa_frozen elsa && \
    chown -R elsa:elsa_frozen /var/www/my_project

RUN sed -i 's/\/var\/www\/html/\/var\/www\/my_project/g' /etc/nginx/sites-enabled/default && \
    nginx_user_file=$(grep -rl 'user .*;' /etc/nginx/) && \
    sed -i 's/user .*;/user elsa elsa_frozen;/g' "$nginx_user_file"

CMD ["nginx", "-g", "daemon off;"]
