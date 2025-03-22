FROM node:18-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]