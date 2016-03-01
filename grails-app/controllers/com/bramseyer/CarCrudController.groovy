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
        def resp = restClient.get(path: "/", accept: ContentType.JSON, query: [make: params.make, model: params.model, year: params.year, plate: params.plate])
        def carsList = resp.json
        println(carsList.getClass())
        println(carsList)
        render template: 'findingCars', collection: carsList, var: 'car'
    }

    def updateCar(){
        //println(params.idPopup + " " + params.makePopup + " " + params.modelPopup + " " + params.yearPopup)
        restClient.httpClient.sslTrustAllCerts = true

        def resp = restClient.post() {
            charset "UTF-8"
            urlenc id: params.idPopup, make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup
        }

        searchAjax()
    }

    def deleteCar(){
        //restClient.httpClient.sslTrustAllCerts = true

        def resp = restClient.delete(accept: ContentType.JSON,
                path: "/" + params.idPopup)

        searchAjax()
    }

    def newCar() {
        def resp = restClient.post (){
            charset "UTF-8"
            urlenc make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup
        }
    }

    def searchOwner(){
        def restClientOwner = new RESTClient("http://localhost:8080/cars/apiOwner")

        def resp = restClientOwner.get(path: "/", accept: ContentType.JSON, query: [nombre: params.nameSearchOwner])
        def ownersList = resp.json
        render view: "allOwners", collection: ownersList, var: 'owner'
    }
}
