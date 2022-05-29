# noice_parking_js_xprs

Version: 0.0.1
First Analysis:
Major Use Cases:  
  * User able to park car. 
  * User able to unpark already parked car
  * Calculate the parking amount on unparking

Not including:
* User auth and management not included
* No use case beyond generating bill, like payment etc.

REST Resources
* /parking/spaces  
Post to create new parking space

* /parking/spaces/:id/slots  
PUT to park the car providing carPlateId  
DELETE to get car and parking amount   
    (Delete chosen as we are freeing the parking slot resource)  

Database Design
parkingSpaces -> id, totalSlots
parkingSlots -> id,spaceId,status,lastUpdatedTimestamp

Using MySQL as Database. Install docker image.

