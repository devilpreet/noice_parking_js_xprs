FROM node:18
WORKDIR /noice

COPY package.json .
RUN npm install

COPY . .
CMD npm start