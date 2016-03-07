import com.bramseyer.*
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        JSON.createNamedConfig("ownerByCar") { cfg ->
            cfg.registerObjectMarshaller(Car) { Car car ->
                return [ //class: Car.name,
                         id: car.id,
                         make: car.make,
                         model: car.model,
                         year: car.year,
                         plate: car.plate,
                         owner:car.owner
                ]
            }
        }

        JSON.createNamedConfig("owner") { cfg ->
            cfg.registerObjectMarshaller(Owner) { Owner owner ->
                return [
                        //class: Owner.name,
                        id: owner.id,
                        nombre: owner.nombre,
                        apellido: owner.apellido,
                        dni: owner.dni,
                        nacionalidad: owner.nacionalidad
                ]
            }
        }
    }
    def destroy = {
    }
}
