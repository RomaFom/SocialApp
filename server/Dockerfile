# pull official base image
FROM node:14.16-alpine

RUN apk --no-cache add curl

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .


# copy project
COPY . .

RUN npm i

CMD ["npm", "run", "start"]