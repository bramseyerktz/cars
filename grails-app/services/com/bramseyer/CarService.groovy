package com.bramseyer

import grails.transaction.Transactional

class CarException extends RuntimeException{ //Forces transaction to roll back if exception occur
    String message
    Car car
}

@Transactional
class CarService {

    def Car addCar(Car car) {
        if (car.hasErrors()) {
            println(car.errors)
            println(car)
            println("ACA ESTA LOS ERROREEEEEEEEES")
            throw new CarException(
                    message: "Invalid or empty car", car: car)
        }
        else {
            car.save(failOnError: true)
            return car
        }
    }

    def searchCar(params) {
        def query = {
            and {
                if (params.year && params.year.toString().isInteger()) {
                    def year = params.year as Integer
                    def radio = (params.radio && params.radio.toString().isInteger() && params.radio > 0) ? params.radio as Integer : 0

                    if (radio == 0)
                        eq("year", year)
                    else
                        between("year", year - radio, year + radio)
                }
                if (params.make)
                    like("make", '%' + params.make + '%')
                if (params.model)
                    like("model", '%' + params.model + '%')
                if (params.plate)
                    like("plate", '%' + params.plate + '%')
                if (params.owner)
                    owner {
                        if (params.owner.toString().isInteger())
                            eq("dni", params.int('owner'))
                        else
                            or {
                                like("nombre", '%' + params.owner + '%')
                                like("apellido", '%' + params.owner + '%')
                            }
                    }
            }
            if (params.sort)
                order(params.sort, params.order == 'desc' ? 'desc' : 'asc')
        }

        def max = 0
        if (params.max)
            max = params.max.toString().isInteger() ? params.int('max') : 100

        def offset = 0
        if (params.offset)
            offset = params.offset.toString().isInteger() ? params.int('offset') : 0

        def criteria = Car.createCriteria()
        def cars = criteria.list(query, max: Math.min(max > 0 ? max : 20, 1000) , offset: offset > 0 ? offset : 0)
        return [cars: cars, carsTotal: cars.totalCount, filters: [
                    year: params.year,
                    radio: params.radio,
                    make: params.make,
                    model: params.model,
                    owner: params.owner,
                    max: params.max,
                    offset: params.offset
                ]
            ]
    }
}

