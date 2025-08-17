# Stage 1: build
FROM node:22 AS builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: serve
FROM node:22-alpine

WORKDIR /usr/app

# Install http-server-spa secara global
RUN npm install -g http-server-spa

# Copy hasil build dari stage builder
COPY --from=builder /usr/app/dist ./dist

EXPOSE 5173

CMD ["http-server-spa", "dist", "index.html", "5173"]
