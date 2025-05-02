CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER', -- Kullanıcı rolü, varsayılan olarak 'USER'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    height FLOAT, -- cm olarak
    weight FLOAT, -- kg olarak
    birth_date DATE,
    gender VARCHAR(10),
    bmi FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    muscle_group VARCHAR(100),
    difficulty VARCHAR(50),
    video_url TEXT, -- opsiyonel egzersiz videosu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite_exercises (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, exercise_id)
);

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL, -- kalori değeri
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calorie_tracker (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    food_id INTEGER REFERENCES foods(id),
    meal_type VARCHAR(50), -- örn: kahvaltı, öğle, akşam
    quantity INTEGER DEFAULT 1,
    calories_consumed INTEGER,
    calories_burned INTEGER DEFAULT 0,
    tracked_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_chats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

