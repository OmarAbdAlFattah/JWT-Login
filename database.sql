CREATE TABLE USERS (
    userID int SERIAL PRIMARY KEY,
    username VARCHAR(255),
    userPassword VARCHAR(255),
    token TEXT
);