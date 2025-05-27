# mobile-app Dockerfile (development için)
FROM node:20-alpine

# Çalışma dizini oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Expo CLI'yı global kur
RUN npm install -g expo-cli

# Tüm kodu kopyala
COPY . .

# Geliştirme için Expo başlat
CMD ["npx", "expo", "start", "--tunnel", "--clear"] 