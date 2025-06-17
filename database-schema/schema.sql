--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_chats (
    id integer NOT NULL,
    user_id integer,
    message text NOT NULL,
    response text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ai_chats OWNER TO postgres;

--
-- Name: ai_chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ai_chats_id_seq OWNER TO postgres;

--
-- Name: ai_chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_chats_id_seq OWNED BY public.ai_chats.id;


--
-- Name: calorie_tracker; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calorie_tracker (
    id integer NOT NULL,
    user_id integer,
    food_id integer,
    meal_type character varying(50),
    quantity integer DEFAULT 1,
    calories_consumed integer,
    calories_burned integer DEFAULT 0,
    tracked_date date DEFAULT CURRENT_DATE,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.calorie_tracker OWNER TO postgres;

--
-- Name: calorie_tracker_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calorie_tracker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calorie_tracker_id_seq OWNER TO postgres;

--
-- Name: calorie_tracker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calorie_tracker_id_seq OWNED BY public.calorie_tracker.id;


--
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    muscle_group character varying(100),
    difficulty character varying(50),
    video_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercises_id_seq OWNER TO postgres;

--
-- Name: exercises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;


--
-- Name: favorite_exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_exercises (
    id integer NOT NULL,
    user_id integer,
    exercise_id integer,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorite_exercises OWNER TO postgres;

--
-- Name: favorite_exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorite_exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorite_exercises_id_seq OWNER TO postgres;

--
-- Name: favorite_exercises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorite_exercises_id_seq OWNED BY public.favorite_exercises.id;


--
-- Name: foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foods (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    calories integer NOT NULL,
    protein double precision,
    carbohydrates double precision,
    fats double precision,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.foods OWNER TO postgres;

--
-- Name: foods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foods_id_seq OWNER TO postgres;

--
-- Name: foods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    id integer NOT NULL,
    user_id integer,
    height double precision,
    weight double precision,
    birth_date date,
    gender character varying(10),
    bmi double precision,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_profiles_id_seq OWNER TO postgres;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_profiles_id_seq OWNED BY public.user_profiles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'USER'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ai_chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats ALTER COLUMN id SET DEFAULT nextval('public.ai_chats_id_seq'::regclass);


--
-- Name: calorie_tracker id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calorie_tracker ALTER COLUMN id SET DEFAULT nextval('public.calorie_tracker_id_seq'::regclass);


--
-- Name: exercises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);


--
-- Name: favorite_exercises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_exercises ALTER COLUMN id SET DEFAULT nextval('public.favorite_exercises_id_seq'::regclass);


--
-- Name: foods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);


--
-- Name: user_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles ALTER COLUMN id SET DEFAULT nextval('public.user_profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: ai_chats ai_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_pkey PRIMARY KEY (id);


--
-- Name: calorie_tracker calorie_tracker_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calorie_tracker
    ADD CONSTRAINT calorie_tracker_pkey PRIMARY KEY (id);


--
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- Name: favorite_exercises favorite_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_exercises
    ADD CONSTRAINT favorite_exercises_pkey PRIMARY KEY (id);


--
-- Name: favorite_exercises favorite_exercises_user_id_exercise_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_exercises
    ADD CONSTRAINT favorite_exercises_user_id_exercise_id_key UNIQUE (user_id, exercise_id);


--
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ai_chats ai_chats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: calorie_tracker calorie_tracker_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calorie_tracker
    ADD CONSTRAINT calorie_tracker_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.foods(id);


--
-- Name: calorie_tracker calorie_tracker_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calorie_tracker
    ADD CONSTRAINT calorie_tracker_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favorite_exercises favorite_exercises_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_exercises
    ADD CONSTRAINT favorite_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;


--
-- Name: favorite_exercises favorite_exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_exercises
    ADD CONSTRAINT favorite_exercises_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

