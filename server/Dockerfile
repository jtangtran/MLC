# Server Dockerfile

# Stage 1
FROM node:12-alpine as build-stage
WORKDIR /app

# Install dependencies
COPY package*.json /app/
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /app/

# Open port 3001 for connections
EXPOSE 3001
CMD ["npm", "run", "start"]