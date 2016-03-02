## Synopsis

Cars is a system for management of cars and its owners. It provides an API for access to CRUD operations.
**Cars:**
http://localhost:8080/cars/api

**Owners:**
http://localhost:8080/cars/apiOwner

Also, cars provides a simple interface for search and CRUD operations of cars and owners.
**Search:**
http://localhost:8080/cars/search


## JSON Example
JSON returned format:

{"class":"com.bramseyer.Car","id":1,"make":"Ford","model":"Model T","year":1909,"plate":"ABC123",
"owner":{"class":"com.bramseyer.Owner","id":1,"nombre":"Jose","apellido":"Perez","dni":12345678,"nacionalidad":"Argentino"}}


## Installation

For the installation of this project only must clone the git repository into your favorite GUI editor.
Make sure of get all the librarys needed.


## Librarys

**Grails 2.3.7**
**Java 1-7-0**