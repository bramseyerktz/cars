package com.bramseyer

import grails.converters.JSON

class RestOwnerController {

    static responseFormats = ["json", "xml"]

    def index() {
        JSON.use('owner') {
            def owners = Owner.createCriteria()

            respond owners{
                if (params.nombre){
                    like("nombre", params.nombre + '%')
                }
            }
        }
    }

    def save(Owner owner){
        def newOwner = Owner.findByDni(owner.dni)
        if (newOwner || owner.hasErrors()) {
            respond status: 404
        } else {
            owner.save(failOnError: true)
            respond owner, status: 201
        }
    }

    def show(Integer id) {
        Owner owner = Owner.findById(id)

            respond owner

    }

    def update(Long id, Owner newOwner) {
        if (!newOwner.hasErrors()) {
            def owner = Owner.get(id)

            if (!owner) {
                respond message: "Not found", status: 404
                return
            }

            owner.properties = newOwner.properties
            owner.validate() && owner.save()

            respond owner
        }
        else {
            respond newOwner
        }
    }

    def delete(Long id) {
        def status
        def message

        if (Owner.exists(id)) {
            Owner.load(id).delete(failOnError: true)
            status = 200
            message="Owner with id ${id} was deleted"
        }
        else {
            message="Not Found"
            status = 404
        }

        respond message: message, status: status
    }

}
