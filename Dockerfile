
FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p uploads

COPY . .

EXPOSE 3024

CMD ["npm", "start"]