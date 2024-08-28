FROM node:18-alpine AS build
WORKDIR /todo/be

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 1999
CMD ["npm", "start"]
