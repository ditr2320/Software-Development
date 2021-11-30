DROP TABLE IF EXISTS climate CASCADE;
CREATE TABLE IF NOT EXISTS climate (
  id SERIAL,
  temperature FLOAT,
  humidity FLOAT,
  collectionDate TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO climate(temperature,humidity,collectiondate)
VALUES(21.4, 45, '2021-10-01 10:30:00'),
(31.4, 46, '2021-10-02 10:30:00'),
(41.4, 47, '2021-10-03 10:30:00'),
(51.4, 48, '2021-10-04 10:30:00'),
(65.4, 49, '2021-10-05 10:30:00'),
(71.4, 59, '2021-10-06 10:30:00'),
(41.4, 39, '2021-10-07 10:30:00');

-- added UNIQUE for register vertification

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  user_name VarChar(20) PRIMARY KEY UNIQUE,
  password VarChar(20) NOT NULL,
  firstName VarChar(20) NOT NULL,
  lastName VarChar(20) NOT NULL,
  sensor_ip VarChar(20),
  sensor_port VarChar(20)
);

INSERT INTO users(user_name,password,firstName,lastName)
VALUES('user1', 'Password1', 'Jane', 'Doe'),
('user2', 'Password2', 'John', 'Smith'),
('user3', 'Password3', 'Alex', 'Brown');


DROP TABLE IF EXISTS avgWeekly CASCADE;
CREATE TABLE IF NOT EXISTS avgWeekly (
  weekNum SERIAL,
  avTemp FLOAT,
  avHumid FLOAT,
  weekStart TIMESTAMP,
  PRIMARY KEY (weekNum)
);
DROP TABLE IF EXISTS avgMonthly CASCADE;
CREATE TABLE IF NOT EXISTS avgMonthly (
  monthNum SERIAL,
  avTemp FLOAT,
  avHumid FLOAT,
  monthStart TIMESTAMP,
  PRIMARY KEY (monthNum)
);

DROP TABLE IF EXISTS climate_real CASCADE;
CREATE TABLE IF NOT EXISTS climate_real (
  id SERIAL,
  temperature FLOAT,
  humidity FLOAT,
  collectionDate TIMESTAMP,
  PRIMARY KEY (id)
);

INSERT INTO climate_real(temperature,humidity,collectiondate)
VALUES(0, 0, '2021-10-01 10:30:00'),