toc.dat                                                                                             0000600 0004000 0002000 00000010735 14612630477 0014457 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   .    ,                |            TodoDatabase    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    30383    TodoDatabase    DATABASE     �   CREATE DATABASE "TodoDatabase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1258';
    DROP DATABASE "TodoDatabase";
                postgres    false         �            1259    30402    blog    TABLE     W   CREATE TABLE public.blog (
    id integer NOT NULL,
    name character varying(100)
);
    DROP TABLE public.blog;
       public         heap    postgres    false         �            1259    30401    blog_id_seq    SEQUENCE     �   CREATE SEQUENCE public.blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.blog_id_seq;
       public          postgres    false    218         �           0    0    blog_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.blog_id_seq OWNED BY public.blog.id;
          public          postgres    false    217         �            1259    30395    todo    TABLE     j   CREATE TABLE public.todo (
    id integer NOT NULL,
    name character varying(100),
    index integer
);
    DROP TABLE public.todo;
       public         heap    postgres    false         �            1259    30394    todo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.todo_id_seq;
       public          postgres    false    216         �           0    0    todo_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;
          public          postgres    false    215         !           2604    30405    blog id    DEFAULT     b   ALTER TABLE ONLY public.blog ALTER COLUMN id SET DEFAULT nextval('public.blog_id_seq'::regclass);
 6   ALTER TABLE public.blog ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218                    2604    30398    todo id    DEFAULT     b   ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);
 6   ALTER TABLE public.todo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                     2604    30413 
   todo index    DEFAULT     e   ALTER TABLE ONLY public.todo ALTER COLUMN index SET DEFAULT nextval('public.todo_id_seq'::regclass);
 9   ALTER TABLE public.todo ALTER COLUMN index DROP DEFAULT;
       public          postgres    false    215    216    216         �          0    30402    blog 
   TABLE DATA           (   COPY public.blog (id, name) FROM stdin;
    public          postgres    false    218       4792.dat �          0    30395    todo 
   TABLE DATA           /   COPY public.todo (id, name, index) FROM stdin;
    public          postgres    false    216       4790.dat �           0    0    blog_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.blog_id_seq', 1, false);
          public          postgres    false    217         �           0    0    todo_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.todo_id_seq', 32, true);
          public          postgres    false    215         %           2606    30407    blog blog_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.blog DROP CONSTRAINT blog_pkey;
       public            postgres    false    218         #           2606    30400    todo todo_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.todo DROP CONSTRAINT todo_pkey;
       public            postgres    false    216                                           4792.dat                                                                                            0000600 0004000 0002000 00000000035 14612630477 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	blog2
3	blog3
1	blog1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   4790.dat                                                                                            0000600 0004000 0002000 00000000034 14612630477 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        7	fgdvf	28
23	abcde	32
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    restore.sql                                                                                         0000600 0004000 0002000 00000010020 14612630477 0015367 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

DROP DATABASE "TodoDatabase";
--
-- Name: TodoDatabase; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TodoDatabase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1258';


ALTER DATABASE "TodoDatabase" OWNER TO postgres;

\connect "TodoDatabase"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog (
    id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.blog OWNER TO postgres;

--
-- Name: blog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_id_seq OWNER TO postgres;

--
-- Name: blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blog_id_seq OWNED BY public.blog.id;


--
-- Name: todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo (
    id integer NOT NULL,
    name character varying(100),
    index integer
);


ALTER TABLE public.todo OWNER TO postgres;

--
-- Name: todo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todo_id_seq OWNER TO postgres;

--
-- Name: todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todo_id_seq OWNED BY public.todo.id;


--
-- Name: blog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog ALTER COLUMN id SET DEFAULT nextval('public.blog_id_seq'::regclass);


--
-- Name: todo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo ALTER COLUMN id SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- Name: todo index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo ALTER COLUMN index SET DEFAULT nextval('public.todo_id_seq'::regclass);


--
-- Data for Name: blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog (id, name) FROM stdin;
\.
COPY public.blog (id, name) FROM '$$PATH$$/4792.dat';

--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todo (id, name, index) FROM stdin;
\.
COPY public.todo (id, name, index) FROM '$$PATH$$/4790.dat';

--
-- Name: blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blog_id_seq', 1, false);


--
-- Name: todo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todo_id_seq', 32, true);


--
-- Name: blog blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_pkey PRIMARY KEY (id);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                