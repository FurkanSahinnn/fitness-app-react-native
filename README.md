# 🏋️‍♂️ FitnessApp - Kapsamlı Fitness Uygulaması

**FitnessApp**, React Native ve Node.js kullanılarak geliştirilmiş modern bir fitness uygulamasıdır. Kullanıcıların fitness hedeflerine ulaşmalarına yardımcı olmak için BMI hesaplama, günlük kalori ihtiyacı, egzersiz rehberi, supplement bilgileri, beslenme tavsiyeleri ve AI destekli chat özelliklerini sunar.

---

## 📱 **HAZIR APK DOSYASI**

🎯 **En önemli bilgi:** Uygulamanın hazır APK dosyası `apk-file/` klasöründe bulunmaktadır!

- **Dosya:** `apk-file/application-7e52c926-1241-40ee-8fa5-f2b606156109.apk`

### APK Kurulumu:
1. `apk-file/` klasöründen APK dosyasını Android cihazınıza kopyalayın
2. Android cihazınızda "Bilinmeyen kaynaklar" seçeneğini etkinleştirin
3. APK dosyasına tıklayıp kurulumu tamamlayın

---

## 🗄️ **VERİTABANI ŞEMASI**

PostgreSQL veritabanı şeması `database-schema/schema.sql` dosyasında hazır olarak bulunmaktadır.

### Veritabanı Tabloları:
- **users**: Kullanıcı bilgileri
- **user_profiles**: Kullanıcı profil detayları (BMI, boy, kilo vb.)
- **ai_chats**: AI sohbet geçmişi
- **exercises**: Egzersiz verileri
- **foods**: Yiyecek besin değerleri
- **calorie_tracker**: Kalori takip sistemi
- **favorite_exercises**: Favori egzersizler
#### Not: Geliştirme aşamasında tablolar için eksik feature'lar eklenecektir.

### Şema Kurulumu:
```bash
# PostgreSQL veritabanınızda şemayı çalıştırın
psql -U postgres -d fitness_app -f database-schema/schema.sql
```

---

## ⚙️ **ORTAM DEĞİŞKENLERİ (.env)**

### 🛠️ **API Server (.env dosyası)**
`api-server/` klasöründe `.env` dosyası oluşturun:

```env
# Sunucu Ayarları
PORT=3000

# Veritabanı Bağlantısı
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=fitness_app
DB_PORT=5432

# JWT Ayarları
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1d

# API Anahtarları
GEMINI_API_KEY=your_gemini_api_key
API_NINJA=your_api_ninja_key
```

### 📱 **Mobile App (.env dosyası)**
`mobile-app/` klasöründe `.env` dosyası oluşturun:

```env
# API Bağlantıları
RAPID_URL=your_rapidapi_url
X_RAPIDAPI_KEY=your_rapidapi_key

# Nutritionix API
NUTRITIONIX_ID=your_nutritionix_app_id
NUTRITIONIX_KEY=your_nutritionix_api_key

# Sunucu IP Adresi
IP_ADDRESS=your_id_address
```

---

## 🐳 **DOCKER İLE ÇALIŞTIRMA**

### Ön Gereksinimler:
- Docker ve Docker Compose yüklü olmalı
- `.env` dosyaları yukarıdaki gibi oluşturulmuş olmalı

### Kurulum:
```bash
# Projeyi klonlayın
git clone https://github.com/FurkanSahinnn/fitness-app-react-native.git
cd fitness-app-react-native

# .env dosyalarını oluşturun (yukarıdaki örneklere göre)
# api-server/.env
# mobile-app/.env

# Docker konteynerlerini çalıştırın
docker-compose up --build

# Arkaplanda çalıştırmak için:
docker-compose up -d --build
```

### Docker Servisleri:
- **postgres**: PostgreSQL veritabanı (Port: 5432)
- **api-server**: Node.js backend (Port: 3000)
- **mobile-app**: React Native Expo development server (Port: 19000-19002)

### Faydalı Docker Komutları:
```bash
# Logları görüntüle
docker-compose logs -f

# Servisleri durdur
docker-compose down

# Veritabanı verilerini temizle
docker-compose down -v
```

---

## ⚡ **MANUEL KURULUM**

### Backend (API Server):
```bash
cd api-server
npm install
npm run dev
```

### Frontend (Mobile App):
```bash
cd mobile-app
npm install
npx expo start
```

---

## 🚀 **PROJE ÖZETİ**

### 🎯 **Ana Özellikler:**
- **👤 Kullanıcı Yönetimi**: Kayıt olma, giriş yapma, profil yönetimi
- **🤖 AI Chat**: Gemini AI ile fitness danışmanlığı
- **📊 BMI Hesaplayıcı**: Vücut kitle indeksi hesaplama ve öneriler
- **🔥 Kalori Hesaplayıcı**: Günlük kalori ihtiyacı hesaplama
- **💪 Egzersiz Rehberi**: Kas gruplarına göre kategorize edilmiş egzersizler
- **💊 Supplement Bilgileri**: Detaylı supplement rehberi
- **🥗 Beslenme**: Yemek tarifleri ve besin değerleri
- **📱 Modern UI**: NativeWind ile responsive ve modern arayüz

### 🏗️ **Teknoloji Stack:**

#### Frontend:
- **React Native** (0.76.9)
- **Expo** (~52.0)
- **NativeWind** (Tailwind CSS)
- **React Navigation** (7.x)
- **Formik & Yup** (Form validation)
- **Axios** (HTTP client)

#### Backend:
- **Node.js** (20.x)
- **Express.js** (5.1.0)
- **PostgreSQL** (17.x)
- **JWT** Authentication
- **Google Generative AI** (Gemini)
- **Bcrypt** (Password hashing)

#### DevOps:
- **Docker & Docker Compose**
- **ESLint & Prettier**
- **Nodemon** (Development)

### 📁 **Proje Yapısı:**
```
fitness-app-react-native/
├── apk-file/                    # 📱 Hazır APK dosyası
├── database-schema/             # 🗄️ PostgreSQL şema dosyası
├── api-server/                  # 🛠️ Node.js Backend
│   ├── src/
│   │   ├── controllers/         # API kontrolcüleri
│   │   ├── services/           # İş mantığı servisleri
│   │   ├── routes/             # API rotaları
│   │   ├── middlewares/        # Ara yazılımlar
│   │   └── config/             # Yapılandırma dosyaları
│   └── Dockerfile
├── mobile-app/                  # 📱 React Native Frontend
│   ├── app/                    # Expo Router sayfaları
│   ├── components/             # Yeniden kullanılabilir bileşenler
│   ├── services/               # API servisleri
│   ├── assets/                 # Resimler ve ikonlar
│   └── Dockerfile
└── docker-compose.yml          # 🐳 Docker yapılandırması
```

### 🎮 **Ekranlar:**
- **🏠 Ana Sayfa**: Fitness kartları ve hılız erişim
- **💬 AI Chat**: Fitness danışmanı bot
- **👤 Profil**: Kullanıcı bilgileri ve ayarlar
- **⚙️ Ayarlar**: Uygulama ayarları
- **📊 Hesaplayıcılar**: BMI ve kalori hesaplayıcıları
- **💪 Egzersizler**: Detaylı egzersiz rehberi
- **🥗 Beslenme**: Yemek tarifleri ve besin değerleri
- **💊 Supplementler**: Supplement bilgi bankası

### 🔗 **API Entegrasyonları:**
- **Gemini AI**: AI chat özelliği
- **RapidAPI**: BMI hesaplama
- **Nutritionix**: Besin değerleri
- **Spoonacular**: Yemek tarifleri
- **API Ninja**: Egzersiz verileri

---


## 👨‍💻 **KATKIDA BULUNMA**

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---
