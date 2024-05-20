FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
