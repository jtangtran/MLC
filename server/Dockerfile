FROM node:12

# Create frontend directory
RUN mkdir -p /usr/src/app/server/
WORKDIR /usr/src/app/server/

# Install dependencies
COPY package*.json /usr/src/app/server/
RUN npm install
COPY . /usr/src/app/server/

CMD [ "npm" , "run" , "start" ]