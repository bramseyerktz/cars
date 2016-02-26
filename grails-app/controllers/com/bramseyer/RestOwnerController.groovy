package com.bramseyer

import grails.converters.JSON

class RestOwnerController {

    static responseFormats = ["json", "xml"]

    def index() { }

    def save(Owner owner){
        def newOwner = Owner.findByDni(owner.dni)
        if (newOwner || owner.hasErrors()) {
            respond status: 404
        } else {
            owner.save(failOnError: true)
            respond owner, status: 201
        }
    }

}
