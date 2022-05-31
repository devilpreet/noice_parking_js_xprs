# noice_parking_js_xprs
Dockerized setup
Swapable InMemory / Postgres store
Testing: jest and supertest
Database: Docker, PGAdmin, Setup Scripts

## Setup

### Option A: Docker Compose
Two containers are created.  
One for postgres database with sample data.  
Other for REST parking api
Refer [docker-compose.yml](./docker-compose.yml)  

To only setup database refer [setup README](./setup/README.md)

### Option B: Running Docker Containers Manually
Use [Dockerfile](./Dockerfile) to build image and start local container

### Local Run
```sh
npm install
node index.js
```

## TESTING
`jest` Framework is used for unit testing.  
`supertest` Frameework is used for endpoint testing.
```sh
npm test
```

## Endpoints
Parking Spaces are called `Spaces` (id,totalSlots)  
Each Space consist of `Slots`. (id,spaceId,slotNo,slotStatus)  
Parking `Tickets` are issued against a parking Slot.

> #### /parking/spaces
`POST` creates a parking space
`GET` lists all parking spaces

> #### /parking/spaces/:spaceId/slots
`PUT` parks the car giving `ticketid` for unparking

> #### /parking/:ticketId
`DELETE` unparks the car generating amout  
* Assumption: Unparking should not be concerned with accessing relevant parking space
* Helps to find car, providing spaceId and slotNo on checkout

## Database Design

`Spaces (id,totalSlots)`  
`Slots (id,spaceId,slotNo,slotStatus)`  
`Tickets (id, slotId, amount, inTime, outTime)`  

### Considerations
* Tables have important keys as Primary or Foreign. Indexes are automatically created.
* Spaces are only created once. No updates required
* SlotStatus 0 (Unparked/Available) 1(Parked) can allow for futher extension in case of other states
* Tickets can be cleaned and moved to historical table for optimization

### Worklog

> Version: 0.0.1
First Analysis:
Major Use Cases:  
  * User able to park car. 
  * User able to unpark already parked car
  * Calculate the parking amount on unparking
  * Design included just parking and slots.

Not Included
* No use case beyond generating bill, like payment etc.

REST Resources
* /parking/spaces  
Get to get all parking spaces
Post to create new parking space

* /parking/spaces/:id/slots  
PUT to park the car providing carPlateId  
DELETE to get car and parking amount   
    (Delete chosen as we are freeing the parking slot resource)

Worklog:
* Simple memory based model implementaion
* Docker upgrade -> OS Upgrade -> Brew installations
* PGAdmin Docker installation
* Basic model service refactoring
* Choosing jest as testing module

> Version 0.0.2

Database Design
spaces -> id, totalSlots
slots -> id,spaceId,slotNo,status
tickets -> id,slotId,inTime,outTime,amount

Using PostgresDB as Database. Install docker image.
Setup file in scripts/Dockerfile

Evaluating ORMS. Choose against it.
Designing simple Postgres model layer

> Review
* Dockerized setup completed
* Basic Error Handling Added / Categories of error can be divided if needed
? User management 
? Validation Layer  
? Add swagger ui  



