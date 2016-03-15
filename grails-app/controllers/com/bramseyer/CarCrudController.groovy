package com.bramseyer

import grails.converters.JSON
import wslite.rest.ContentType
import wslite.rest.RESTClient

class CarCrudController {

    def carService
    def restClient = new RESTClient("http://localhost:8080/cars/api")

    def index() {
        redirect(controller: 'CarCrud', action: 'search')
    }

    //searcher for cars
    def search() {
        def model = [carsList: [] as List, carsTotal: 0, filters: [] as List]
        return [model: model]
    }

    def searchAjax(){
        if (!params.max || params.max.toInteger() >= 100)
            params.max = 10

        def query = params.findAll {it.value && it.value != 'null'}
        def resp = restClient.get(path: "/", accept: ContentType.JSON, query: query).json

        render template: 'tableCars', model: resp
    }

    def updateCar(){
        restClient.httpClient.sslTrustAllCerts = true
        def id = params.idOwnerPopup =~ /\d+/
        def resp = restClient.post(accept: ContentType.JSON) {
            type: ContentType.JSON
            charset "UTF-8"
            urlenc id: params.idPopup, make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup, owner: id[0]
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
        def id = params.idOwnerPopup =~ /\d+/
        if (Owner.findById(id[0])){
            def resp = restClient.post (){
                charset "UTF-8"
                urlenc make: params.makePopup, model: params.modelPopup, year: params.yearPopup, plate: params.platePopup, owner: id[0]
            }
        }
    }
}
