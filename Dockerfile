# Build stage: Use Node.js to build the Vue.js application
FROM node:16 AS build

WORKDIR /app  

# Copy package.json and install dependencies
COPY package*.json ./  
RUN npm install  

# Copy source code and build the application
COPY . .  
RUN npm run build  

# Production stage: Serve the built application with Nginx
FROM nginx:alpine AS production  

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html  

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80  

CMD ["nginx", "-g", "daemon off;"]
