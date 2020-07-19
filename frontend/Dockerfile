# Frontend Dockerfile

# Stage 1
FROM node:12-alpine as build-stage
WORKDIR /app

# Install dependencies
COPY package*.json /app/
RUN npm install
COPY . /app/

# Build static files
EXPOSE 3000
CMD [ "npm", "start" ]

# Stage 2
# FROM nginx:1.16.0-alpine
# COPY --from=build-stage /app/build /usr/share/nginx/html

# Open port 80 for connections
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]