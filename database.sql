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
ALTER TABLE captains
MODIFY COLUMN exp VARCHAR(255) NOT NULL;

INSERT INTO captains (firstname, lastname, age, email, password, bio, country, exp)
VALUES
('John', 'Doe', 35, 'john.doe@example.com', 'hashed_password_1', 'Experienced captain with a passion for sailing.', 'United States', 10),
('Jane', 'Smith', 28, 'jane.smith@example.com', 'hashed_password_2', 'Adventurous soul with a love for the sea.', 'Canada', 7),
('Michael', 'Johnson', 40, 'michael.johnson@example.com', 'hashed_password_3', 'Veteran captain with a career spanning two decades.', 'Australia', 15);


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

CREATE TABLE CrewMembersTest(
    pk_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR (255) NOT NULL,
    age INT NOT NULL,
    experience VARCHAR (255) NOT NULL
);
INSERT INTO CrewMembersTest (firstname, age, experience) VALUES
    ('John Doe', 25, 'no experience'),
    ('Jane Smith', 30, 'inexperience'),
    ('Bob Johnson', 28, 'experienced'),
    ('Alice Williams', 35, 'experienced'),
    ('Charlie Brown', 22, 'inexperience');


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

INSERT INTO trip (title, description, startpoint, destination, start_date, end_date, price, crew_capacity, rules)
VALUES
('Island Adventure', 'Explore beautiful islands and hidden coves on this exciting voyage.', 'Miami', 'Bahamas', '2023-06-15', '2023-06-25', 2000, 10, 'No smoking on board. Follow safety guidelines.'),
('Northern Lights Expedition', 'Sail to the Arctic Circle and witness the mesmerizing Northern Lights.', 'Reykjavik', 'Arctic Circle', '2023-09-10', '2023-09-20', 3000, 8, 'Cold weather precautions in effect. Wildlife observation rules apply.'),
('Mediterranean Escape', 'Experience the charm of the Mediterranean with stops in Greece and Italy.', 'Barcelona', 'Santorini', '2023-07-05', '2023-07-15', 2500, 12, 'Respect local customs. No fishing in protected areas.'),
('Caribbean Dream Cruise', 'Sail through the crystal-clear waters of the Caribbean and enjoy the vibrant marine life.', 'Puerto Rico', 'St. Lucia', '2023-08-20', '2023-08-30', 1800, 15, 'Limit alcohol consumption. Eco-friendly practices encouraged.'),
('Pacific Paradise Expedition', 'Embark on a journey to the Pacific Islands with stops in Hawaii and Fiji.', 'Los Angeles', 'Fiji', '2023-10-05', '2023-10-15', 2800, 10, 'Strictly no littering. Follow diving regulations.'),
('Baltic Sea Discovery', 'Discover the beauty of the Baltic Sea with visits to Stockholm and Copenhagen.', 'Helsinki', 'Copenhagen', '2023-07-25', '2023-08-04', 2200, 8, 'Mindful of local wildlife. No loud music after 10 PM.'),
('South American Adventure', 'Sail along the coast of South America and explore the rich culture of Brazil and Argentina.', 'Rio de Janeiro', 'Buenos Aires', '2023-11-01', '2023-11-11', 2600, 14, 'Respect indigenous communities. No plastic waste allowed.');

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

INSERT INTO crewmember (firstname, lastname, age, email, password, bio, country, exp, profilePicture)
VALUES
('Emily', 'Johnson', '1990-03-15', 'emily.johnson@example.com', 'hashed_password_4', 'Enthusiastic sailor with a background in marine biology.', 'United States', 5, 'profile_pic_emily.jpg'),
('Daniel', 'Nguyen', '1985-08-22', 'daniel.nguyen@example.com', 'hashed_password_5', 'Dedicated crew member with expertise in navigation.', 'Canada', 8, 'profile_pic_daniel.jpg'),
('Sofia', 'Garcia', '1993-12-10', 'sofia.garcia@example.com', 'hashed_password_6', 'Passionate about maritime traditions and safety procedures.', 'Spain', 3, 'profile_pic_sofia.jpg');


INSERT INTO crewmember (firstname, lastname, age, email, password, bio, country, exp, profilePicture)
VALUES
('Alex', 'Smith', '1992-06-28', 'alex.smith@example.com', 'hashed_password_7', 'Energetic crew member with a love for sailing and teamwork.', 'Australia', 6, 'profile_pic_alex.jpg'),
('Olivia', 'Martinez', '1988-02-18', 'olivia.martinez@example.com', 'hashed_password_8', 'Experienced sailor with a focus on maritime safety and first aid.', 'United Kingdom', 9, 'profile_pic_olivia.jpg'),
('Connor', 'Kim', '1995-11-03', 'connor.kim@example.com', 'hashed_password_9', 'Adventurous spirit with a background in marine engineering.', 'South Korea', 4, 'profile_pic_connor.jpg'),
('Isabella', 'Wang', '1987-09-14', 'isabella.wang@example.com', 'hashed_password_10', 'Detail-oriented crew member with skills in navigation and logistics.', 'China', 7, 'profile_pic_isabella.jpg'),
('Liam', 'Gomez', '1991-04-25', 'liam.gomez@example.com', 'hashed_password_11', 'Passionate about sailing and marine conservation efforts.', 'Mexico', 5, 'profile_pic_liam.jpg'),
('Ava', 'Chen', '1989-07-07', 'ava.chen@example.com', 'hashed_password_12', 'Skilled deckhand with expertise in sail handling and rigging.', 'Singapore', 8, 'profile_pic_ava.jpg'),
('Noah', 'Fernandez', '1994-01-30', 'noah.fernandez@example.com', 'hashed_password_13', 'Enthusiastic sailor with a background in weather forecasting.', 'Brazil', 6, 'profile_pic_noah.jpg');

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

ALTER TABLE applications ADD COLUMN status VARCHAR(255) DEFAULT 'pending';

ALTER TABLE applications DROP COLUMN status;