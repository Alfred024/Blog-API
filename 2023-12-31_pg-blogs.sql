--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

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
-- Name: d_email; Type: DOMAIN; Schema: public; Owner: admin_blogs
--

CREATE DOMAIN public.d_email AS text
	CONSTRAINT d_email_check CHECK ((VALUE ~ '^[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$'::text));


ALTER DOMAIN public.d_email OWNER TO admin_blogs;

--
-- Name: ty_rol_user; Type: TYPE; Schema: public; Owner: admin_blogs
--

CREATE TYPE public.ty_rol_user AS ENUM (
    'ADMIN',
    'NORMAL'
);


ALTER TYPE public.ty_rol_user OWNER TO admin_blogs;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog; Type: TABLE; Schema: public; Owner: admin_blogs
--

CREATE TABLE public.blog (
    content text NOT NULL,
    date_last_change date,
    date_publication date NOT NULL,
    id_blogger integer,
    id_blog integer NOT NULL,
    title character varying(200) NOT NULL,
    slug character varying(50) NOT NULL,
    description character varying(150) NOT NULL
);


ALTER TABLE public.blog OWNER TO admin_blogs;

--
-- Name: blog_id_blog_seq; Type: SEQUENCE; Schema: public; Owner: admin_blogs
--

CREATE SEQUENCE public.blog_id_blog_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blog_id_blog_seq OWNER TO admin_blogs;

--
-- Name: blog_id_blog_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_blogs
--

ALTER SEQUENCE public.blog_id_blog_seq OWNED BY public.blog.id_blog;


--
-- Name: blogger; Type: TABLE; Schema: public; Owner: admin_blogs
--

CREATE TABLE public.blogger (
    id_blogger integer NOT NULL,
    name character varying(100) NOT NULL,
    first_username character varying(80) NOT NULL,
    second_username character varying(80) NOT NULL,
    id_career smallint,
    id_user_blogger integer NOT NULL
);


ALTER TABLE public.blogger OWNER TO admin_blogs;

--
-- Name: blogger_id_blogger_seq; Type: SEQUENCE; Schema: public; Owner: admin_blogs
--

CREATE SEQUENCE public.blogger_id_blogger_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blogger_id_blogger_seq OWNER TO admin_blogs;

--
-- Name: blogger_id_blogger_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_blogs
--

ALTER SEQUENCE public.blogger_id_blogger_seq OWNED BY public.blogger.id_blogger;


--
-- Name: career; Type: TABLE; Schema: public; Owner: admin_blogs
--

CREATE TABLE public.career (
    id_career smallint NOT NULL,
    key character varying(30),
    name character varying(70) NOT NULL
);


ALTER TABLE public.career OWNER TO admin_blogs;

--
-- Name: career_id_career_seq; Type: SEQUENCE; Schema: public; Owner: admin_blogs
--

CREATE SEQUENCE public.career_id_career_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.career_id_career_seq OWNER TO admin_blogs;

--
-- Name: career_id_career_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_blogs
--

ALTER SEQUENCE public.career_id_career_seq OWNED BY public.career.id_career;


--
-- Name: user_blogger; Type: TABLE; Schema: public; Owner: admin_blogs
--

CREATE TABLE public.user_blogger (
    id_user_blogger integer NOT NULL,
    email public.d_email NOT NULL,
    password text NOT NULL,
    role public.ty_rol_user DEFAULT 'NORMAL'::public.ty_rol_user NOT NULL
);


ALTER TABLE public.user_blogger OWNER TO admin_blogs;

--
-- Name: user_blogger_id_user_blogger_seq; Type: SEQUENCE; Schema: public; Owner: admin_blogs
--

CREATE SEQUENCE public.user_blogger_id_user_blogger_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_blogger_id_user_blogger_seq OWNER TO admin_blogs;

--
-- Name: user_blogger_id_user_blogger_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_blogs
--

ALTER SEQUENCE public.user_blogger_id_user_blogger_seq OWNED BY public.user_blogger.id_user_blogger;


--
-- Name: blog id_blog; Type: DEFAULT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blog ALTER COLUMN id_blog SET DEFAULT nextval('public.blog_id_blog_seq'::regclass);


--
-- Name: blogger id_blogger; Type: DEFAULT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blogger ALTER COLUMN id_blogger SET DEFAULT nextval('public.blogger_id_blogger_seq'::regclass);


--
-- Name: career id_career; Type: DEFAULT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.career ALTER COLUMN id_career SET DEFAULT nextval('public.career_id_career_seq'::regclass);


--
-- Name: user_blogger id_user_blogger; Type: DEFAULT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.user_blogger ALTER COLUMN id_user_blogger SET DEFAULT nextval('public.user_blogger_id_user_blogger_seq'::regclass);


--
-- Data for Name: blog; Type: TABLE DATA; Schema: public; Owner: admin_blogs
--

COPY public.blog (content, date_last_change, date_publication, id_blogger, id_blog, title, slug, description) FROM stdin;
<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    <title>Blog demo</title>\r\n</head>\r\n<body>\r\n    <h1>El blog demo</h1>\r\n</body>\r\n</html>	2023-12-27	2023-12-27	2	2	Blog updated 	/slug-falso	Este es un registro para probar la API.
\.


--
-- Data for Name: blogger; Type: TABLE DATA; Schema: public; Owner: admin_blogs
--

COPY public.blogger (id_blogger, name, first_username, second_username, id_career, id_user_blogger) FROM stdin;
2	Chanclon	Van	Dam	1	2
\.


--
-- Data for Name: career; Type: TABLE DATA; Schema: public; Owner: admin_blogs
--

COPY public.career (id_career, key, name) FROM stdin;
1	987654321	Ing. en Sistemas Computacionales
2	9876543210	Ing. Industrial
\.


--
-- Data for Name: user_blogger; Type: TABLE DATA; Schema: public; Owner: admin_blogs
--

COPY public.user_blogger (id_user_blogger, email, password, role) FROM stdin;
2	user_demo2@gmail.com	$2b$05$mOO//cl6K5LBnbRkLUOwa.xpZcs9wt6vPgTkZqYPUlXbtsG3aDQ0a	ADMIN
\.


--
-- Name: blog_id_blog_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_blogs
--

SELECT pg_catalog.setval('public.blog_id_blog_seq', 2, true);


--
-- Name: blogger_id_blogger_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_blogs
--

SELECT pg_catalog.setval('public.blogger_id_blogger_seq', 2, true);


--
-- Name: career_id_career_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_blogs
--

SELECT pg_catalog.setval('public.career_id_career_seq', 2, true);


--
-- Name: user_blogger_id_user_blogger_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_blogs
--

SELECT pg_catalog.setval('public.user_blogger_id_user_blogger_seq', 5, true);


--
-- Name: blog blog_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_pkey PRIMARY KEY (id_blog);


--
-- Name: blogger blogger_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blogger
    ADD CONSTRAINT blogger_pkey PRIMARY KEY (id_blogger);


--
-- Name: career career_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.career
    ADD CONSTRAINT career_pkey PRIMARY KEY (id_career);


--
-- Name: user_blogger user_blogger_email_key; Type: CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.user_blogger
    ADD CONSTRAINT user_blogger_email_key UNIQUE (email);


--
-- Name: user_blogger user_blogger_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.user_blogger
    ADD CONSTRAINT user_blogger_pkey PRIMARY KEY (id_user_blogger);


--
-- Name: blog blog_id_blogger_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_id_blogger_fkey FOREIGN KEY (id_blogger) REFERENCES public.blogger(id_blogger);


--
-- Name: blogger blogger_id_career_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blogger
    ADD CONSTRAINT blogger_id_career_fkey FOREIGN KEY (id_career) REFERENCES public.career(id_career);


--
-- Name: blogger blogger_id_user_blogger_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin_blogs
--

ALTER TABLE ONLY public.blogger
    ADD CONSTRAINT blogger_id_user_blogger_fkey FOREIGN KEY (id_user_blogger) REFERENCES public.user_blogger(id_user_blogger);


--
-- PostgreSQL database dump complete
--

