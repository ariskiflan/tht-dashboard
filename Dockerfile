FROM node:22 AS builder

workdir /usr/app

COPY package*.json ./   

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine 

RUN npm install http-server-spa

COPY --from=builder /usr/app/dist ./    

EXPOSE 5173

CMD ["http-server-spa", "dist", "index.html","5173"]