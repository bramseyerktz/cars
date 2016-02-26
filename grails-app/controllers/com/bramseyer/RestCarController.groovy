package com.bramseyer

import grails.converters.JSON


class RestCarController {

    static responseFormats = ["xml", "json"]

    def carService

    //show cars
    def index() {
        JSON.use('ownerByCar') {
            respond carService.searchCar(params)
        }
    }

    // show car by id
    def show(Integer id) {
        JSON.use('ownerByCar') {
            respond Car.findById(id)
        }
    }

    def save(Car car){
        def newCar = carService.addCar(car)
        if (newCar) {
            respond newCar, status: 201
        } else {
            respond status: 404
        }

    }

    def update(Integer id, Car car){
        def oldCar = Car.findById(id)
        if (!car.hasErrors()){
            oldCar.properties = car.properties
            oldCar.validate() && oldCar.save()
            respond car, status: 201
        } else {
            respond car, status: 404
        }
    }

    def delete(Integer id){
        def status
        if (Car.exists(id)){
            Car.load(id).delete(failOnError: true)
            status = 200
        } else {
            status = 404
        }
        respond status: status
    }

}
