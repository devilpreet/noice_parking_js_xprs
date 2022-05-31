# noice_parking_js_xprs

Version: 0.0.1
First Analysis:
Major Use Cases:  
  * User able to park car. 
  * User able to unpark already parked car
  * Calculate the parking amount on unparking

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

Version 0.0.2

Database Design
spaces -> id, totalSlots
slots -> id,spaceId,slotNo,status
tickets -> id,slotId,inTime,outTime,amount

Using PostgresDB as Database. Install docker image.
Setup file in scripts/Dockerfile

? Error Handling
? User management
? Validation Layer



