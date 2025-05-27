# api-server Dockerfile (development için)
FROM node:20-alpine

# Çalışma dizini oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Nodemon global değil, local kurulu olduğu için npx ile çalıştıracağız

# Tüm kodu kopyala
COPY . .

# Geliştirme için nodemon ile başlat
CMD ["npx", "nodemon", "src/index.js"] 