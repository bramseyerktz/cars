package com.bramseyer

import wslite.rest.ContentType
import wslite.rest.RESTClient

class RestCarController {

    static responseFormats = ["xml", "json"]

    def carService
    def restClient = new RESTClient("http://localhost:8080/cars/api")

    //show cars
    def index() {
        respond carService.searchCar(params)
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
        [carsList: carService.searchCar(params)]
    }

    def searchAjax(){
        def response = restClient.get(path: "/", accept: ContentType.JSON, query: [make: params.make, model: params.model, year: params.year])
        def carsList = response.json
        render template: 'findingCars', collection: carsList, var: 'car'
    }

    def updateCar(){
        //println(params.idPopup + " " + params.makePopup + " " + params.modelPopup + " " + params.yearPopup)
        restClient.httpClient.sslTrustAllCerts = true

        def response = restClient.post() {
            charset "UTF-8"
            urlenc id: params.idPopup, make: params.makePopup, model: params.modelPopup, year: params.yearPopup
        }

        searchAjax()
    }

}
