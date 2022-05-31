CREATE DATABASE noice_parking;
\c noice_parking;

CREATE SCHEMA parking;

CREATE TABLE IF NOT EXISTS parking.spaces (
    id SERIAL PRIMARY KEY,
    totalSlots int not null
);

CREATE TABLE IF NOT EXISTS parking.slots (
    id SERIAL PRIMARY KEY,
    spaceId integer REFERENCES parking.spaces(id),
    slotNo integer not null,
    slotStatus integer not null
);

CREATE TABLE IF NOT EXISTS parking.tickets (
    id SERIAL PRIMARY KEY,
    slotId integer REFERENCES parking.slots(id),
    amount integer not null,
    inTime varchar(50) not null,
    outTime varchar(50)
);