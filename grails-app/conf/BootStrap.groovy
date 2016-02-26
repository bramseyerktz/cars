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
                                 class: Owner.name, //'com.myedro.training.Owner',
                                 id: car.owner.id,
                                 nombre: car.owner.nombre,
                                 apellido: car.owner.apellido,
                                 dni: car.owner.dni,
                                 nacionalidad: car.owner.nacionalidad
                         ]
                ]
            }
        }
    }
    def destroy = {
    }
}
