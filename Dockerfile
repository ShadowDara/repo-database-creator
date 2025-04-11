FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install next

COPY . .

CMD ["npm", "run dev"]
