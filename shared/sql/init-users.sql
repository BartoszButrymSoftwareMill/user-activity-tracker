-- Reader user
CREATE USER reader_user WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE activity_tracker TO reader_user;

-- Writer user
CREATE USER writer_user WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE activity_tracker TO writer_user;