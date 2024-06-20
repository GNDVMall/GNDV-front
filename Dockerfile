FROM nginx
COPY dist /usr/share/nginx/html
EXPOSE 5173
ENTRYPOINT ["nginx", "-g", "daemon off;"]
