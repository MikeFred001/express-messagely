\echo 'Delete and recreate messagely db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE messagely;
CREATE DATABASE messagely;
\connect messagely


CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  join_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  from_username TEXT NOT NULL REFERENCES users,
  to_username TEXT NOT NULL REFERENCES users,
  body TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE);

/********************************* DB SEEDS *********************************/

INSERT INTO users ( username,
                    password,
                    first_name,
                    last_name,
                    phone,
                    join_at,
                    last_login_at)
    VALUES ('mikefred',
            'password123',
            'mike',
            'fred',
            '555-555-5555',
            current_timestamp,
            current_timestamp),

            ('didiwu',
            'password123',
            'didi',
            'wu',
            '555-555-5555',
            current_timestamp,
            current_timestamp),

            ('johnsmith',
            'password123',
            'john',
            'smith',
            '555-555-5555',
            current_timestamp,
            current_timestamp);


INSERT INTO messages ( from_username, to_username, body, sent_at, read_at)
    VALUES ('mikefred',
            'didiwu',
            'from mike to didi',
            current_timestamp,
            current_timestamp),

            ('didiwu',
            'mikefred',
            'from didi to mike',
            current_timestamp,
            current_timestamp),

            ('johnsmith',
            'didiwu',
            'from john to didi',
            current_timestamp,
            current_timestamp);



\echo 'Delete and recreate messagely_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE messagely_test;
CREATE DATABASE messagely_test;
\connect messagely_test

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  join_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  from_username TEXT NOT NULL REFERENCES users,
  to_username TEXT NOT NULL REFERENCES users,
  body TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE);

