# stage: 1
FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN yarn
ENV GENERATE_SOURCEMAP=false 
RUN yarn build
# stage: 2 — the production environment
FROM nginx:alpine

COPY --from=react-build /app/build/ /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80


##add environment variable reading script
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]