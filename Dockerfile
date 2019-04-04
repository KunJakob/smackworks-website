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
CMD ["nginx", "-g", "daemon off;"]