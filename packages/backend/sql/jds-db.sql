--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-16 22:55:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16419)
-- Name: common; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA common;


ALTER SCHEMA common OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16432)
-- Name: jobs; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.jobs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    assigned_user_id integer
);


ALTER TABLE common.jobs OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16431)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE common.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 216
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.jobs_id_seq OWNED BY common.jobs.id;


--
-- TOC entry 215 (class 1259 OID 16421)
-- Name: users; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE common.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16420)
-- Name: users_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE common.users_id_seq OWNER TO postgres;

--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.users_id_seq OWNED BY common.users.id;


--
-- TOC entry 3179 (class 2604 OID 16435)
-- Name: jobs id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.jobs ALTER COLUMN id SET DEFAULT nextval('common.jobs_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16424)
-- Name: users id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.users ALTER COLUMN id SET DEFAULT nextval('common.users_id_seq'::regclass);


--
-- TOC entry 3332 (class 0 OID 16432)
-- Dependencies: 217
-- Data for Name: jobs; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.jobs (id, title, description, assigned_user_id) FROM stdin;
1	job1	test job1 description	\N
2	job2	test job1 description	\N
3	job3	test job2 description	1
4	job3	test job2 description	2
\.


--
-- TOC entry 3330 (class 0 OID 16421)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.users (id, email, password) FROM stdin;
1	test@email.com	123
2	test1@email	123
3	test2@email	123
\.


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 216
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.jobs_id_seq', 4, true);


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.users_id_seq', 3, true);


--
-- TOC entry 3185 (class 2606 OID 16439)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3181 (class 2606 OID 16430)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3183 (class 2606 OID 16428)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16440)
-- Name: jobs assigned_user_id_fkey; Type: FK CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.jobs
    ADD CONSTRAINT assigned_user_id_fkey FOREIGN KEY (assigned_user_id) REFERENCES common.users(id) ON DELETE CASCADE;


-- Completed on 2023-03-16 22:55:29

--
-- PostgreSQL database dump complete
--

