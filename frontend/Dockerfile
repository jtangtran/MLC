FROM node:12

# Create frontend directory
RUN mkdir -p /usr/src/app/frontend/
WORKDIR /usr/src/app/frontend/

# Install dependencies
COPY package*.json /usr/src/app/frontend/
RUN npm install
COPY . /usr/src/app/frontend/

CMD [ "npm" , "start" ]