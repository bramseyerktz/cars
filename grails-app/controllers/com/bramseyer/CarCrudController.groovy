package com.bramseyer

import grails.converters.JSON
import wslite.rest.ContentType
import wslite.rest.RESTClient

class CarCrudController {

    def carService
    def restClient = new RESTClient("http://localhost:8080/cars/api")

    def index() { }

    //searcher for cars
    def search(){
        //[carsList: carService.searchCar(params)]
    }

    def searchAjax(){
        def response = restClient.get(path: "/", accept: ContentType.JSON, query: [make: params.make, model: params.model, year: params.year, plate: params.plate])
        def carsList = response.json
        render template: 'findingCars', collection: carsList, var: 'car'
    }

    def updateCar(){
        //println(params.idPopup + " " + params.makePopup + " " + params.modelPopup + " " + params.yearPopup)
        restClient.httpClient.sslTrustAllCerts = true

        def response = restClient.post() {
            charset "UTF-8"
            urlenc id: params.idPopup, make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup
        }

        searchAjax()
    }

    def deleteCar(){
        //restClient.httpClient.sslTrustAllCerts = true

        def response = restClient.delete(accept: ContentType.JSON,
                path: "/" + params.idPopup)

        searchAjax()
    }

    def newCar() {
        def response = restClient.post (){
            charset "UTF-8"
            urlenc make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup
        }
    }
}
