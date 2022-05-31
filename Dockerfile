FROM node:18
WORKDIR /noice

COPY package.json .
RUN npm install

COPY . .
EXPOSE 3000
CMD npm start