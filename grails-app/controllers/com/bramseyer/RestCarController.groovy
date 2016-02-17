package com.bramseyer

class RestCarController {

    static responseFormats = ["xml", "json"]

    def index() {
        //def cars = Car.list()
        //respond cars
    }

    def search() {
        def cars = Car.findAll("from Car c where c.year = ${params.year}" +
                " and c.make = '${params.make}'"  +
                " and c.model = '${params.model}'")
        respond cars
    }
}
