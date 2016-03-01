import com.bramseyer.*
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        JSON.createNamedConfig("ownerByCar") { cfg ->
            cfg.registerObjectMarshaller(Car) { Car car ->
                return [ class: Car.name,
                         id: car.id,
                         make: car.make,
                         model: car.model,
                         year: car.year,
                         plate: car.plate,
                         owner:[
                                 class: Owner.name,
                                 id: car.owner.id,
                                 nombre: car.owner.nombre,
                                 apellido: car.owner.apellido,
                                 dni: car.owner.dni,
                                 nacionalidad: car.owner.nacionalidad
                         ]
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

//        JSON.createNamedConfig("owner") { cfg ->
//            cfg.registerObjectMarshaller(Owner) {
//                def returnArray = [:]
//                returnArray['id'] = it.id
//                returnArray['nombre'] = it.nombre
//                returnArray['apellido'] = it.apellido
//                returnArray['dni'] = it.dni
//                return returnArray
//            }
//        }
    }
    def destroy = {
    }
}
