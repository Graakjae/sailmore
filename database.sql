CREATE TABLE captains (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    age DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    bio VARCHAR(1000) NOT NULL,
    country VARCHAR(255) NOT NULL,
    exp INT NOT NULL
);

INSERT INTO captains
VALUES (
    NULL,
    'Martin',
    'Hansen',
    '1999-01-01',
    'hej@hej.dk',
    'hej',
    'hej',
    'hej',
    4
);

CREATE TABLE boats (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    length INT NOT NULL,
    captain_ID INT NOT NULL,
    FOREIGN KEY (captain_ID) REFERENCES captains(pk_id),
    toilet INT NOT NULL,
    shower INT NOT NULL,
    kitchen BOOLEAN NOT NULL,
    gps BOOLEAN NOT NULL,
    wifi BOOLEAN NOT NULL,
    power BOOLEAN NOT NULL,
    outlets INT NOT NULL
);

CREATE TABLE trip (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    startpoint VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price INT NOT NULL,
    crew_capacity INT NOT NULL,
    captain_ID INT NOT NULL,
    FOREIGN KEY (captain_ID) REFERENCES captains(pk_id),
    rules VARCHAR(500) NOT NULL,
    img INT NOT NULL
);

CREATE TABLE trip_img (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    trip_ID INT NOT NULL,
    FOREIGN KEY (trip_ID) REFERENCES trip(pk_id),
    img VARCHAR(255) NOT NULL
);

INSERT INTO trip_img VALUES (
    4,
    1,
    'JA HEJ DO'
),
(
    5,
    2,
    'JEEEEEEEEEEEEEEEEEEP'
),
(
    6,
    3,
    'GRAAKJÆR LÆGGER AN PÅ MIG WTF:DD'
);

DROP TABLE crewmember;

CREATE VIEW trip_card AS 
SELECT trip.title, trip.start_date, trip.end_date, trip.price, trip.img FROM trip
INNER JOIN trip_img
ON trip_img.trip_ID = trip.img;

DROP VIEW trip_card;

CREATE TABLE crewmember (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    age DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    bio VARCHAR(1000) NOT NULL,
    country VARCHAR(255) NOT NULL,
    exp INT NOT NULL,
    profilePicture VARCHAR(255) NOT NULL
);

CREATE TABLE applications (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    msg VARCHAR(500) NOT NULL,
    trip_ID INT NOT NULL,
    FOREIGN KEY (trip_ID) REFERENCES trip(pk_id),
    crewmember_ID INT NOT NULL,
    FOREIGN KEY (crewmember_ID) REFERENCES crewmember(pk_id)
);

CREATE TABLE experience (
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    exp_name VARCHAR(50) NOT NULL
);

DROP TABLE trip;
DROP TABLE trip_img;
DROP TABLE applications;
DROP TABLE boats;
DROP TABLE captains;
DROP TABLE crewmember;