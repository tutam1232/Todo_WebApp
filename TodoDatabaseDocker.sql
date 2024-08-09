CREATE DATABASE TodoDatabase;

CREATE TABLE IF NOT EXISTS blog(
    id SERIAL,
    name varchar(100),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "role"(
    id SERIAL,
    name varchar(100),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "user"(
    id SERIAL,
    username varchar(100) UNIQUE,
    password varchar(100),
    "role" INT,

    PRIMARY KEY (id),
    FOREIGN KEY ("role") REFERENCES "role"(id)
);

CREATE TABLE IF NOT EXISTS todo(
    id SERIAL,
    name varchar(100),
    index INT,
    "uid" INT,

    PRIMARY KEY (id),
    FOREIGN KEY ("uid") REFERENCES "user"(id)
);

INSERT INTO blog (name) VALUES ('Blog 1');
INSERT INTO blog (name) VALUES ('Blog 2');
INSERT INTO blog (name) VALUES ('Blog 3');

INSERT INTO "role" (name) VALUES ('admin');
INSERT INTO "role" (name) VALUES ('user');