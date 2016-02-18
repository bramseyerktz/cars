package com.bramseyer

class RestCarController {

    static responseFormats = ["xml", "json"]

    def carService

    //show cars
    def index() {
        searchCar()
    }

    // show car by id
    def show(Integer id) {
        respond Car.findById(id)
    }

    def save(Car car){
        /*if (car.hasErrors()) {
            respond car
        }
        else {
            car.save(failOnError: true)
            respond car, status: 201
        }*/
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
            Car.load(id).delete()
            status = 200
        } else {
            status = 404
        }
        respond status
    }

    //searcher for cars
    def search(){

    }

    def searchCar() {
        def cars = Car.createCriteria()

        respond cars{
            if (params.year){
                like("year", params.year.toInteger())
            }
            if (params.make){
                and {like("make", params.make)}
            }
            if (params.model){
                and {like("model", params.model)}
            }
        }
        /*def cars = Car.findAll("from Car c where c.year = ${params.year}" +
                " and c.make = '${params.make}'"  +
                " and c.model = '${params.model}'")*/
        //respond cars
    }
}
