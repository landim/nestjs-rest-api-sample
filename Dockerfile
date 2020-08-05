FROM node:10-alpine
WORKDIR /usr/src/app
ADD . .
RUN yarn install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]