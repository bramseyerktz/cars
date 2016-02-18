package com.bramseyer

class RestCarController {

    static responseFormats = ["xml", "json"]

    //show all cars
    def index() {
        def cars = Car.list()
        respond cars
    }

    // show car by id
    def show(Integer id) {
        respond Car.findById(id)
    }


    def search(){

    }

    def searchCar() {
        def cars = Car.findAll("from Car c where c.year = ${params.year}" +
                " and c.make = '${params.make}'"  +
                " and c.model = '${params.model}'")
        respond cars
    }
}
