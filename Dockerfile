FROM node:16.20.0-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# Add support for bash & curl
RUN apk update && apk add bash \
    curl

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000

CMD ["npm", "start"]
