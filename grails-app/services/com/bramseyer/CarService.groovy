package com.bramseyer

import grails.transaction.Transactional

class CarException extends RuntimeException{ //Forces transaction to roll back if exception occur
    String message
    Car car
}

@Transactional
class CarService {

    Car addCar(Car car) {
        if (car.hasErrors()) {
            throw new CarException(
                    message: "Invalid or empty car", car: car)
        }
        else {
            car.save(failOnError: true)
            return car
        }
    }

    def searchCar(params){
        def cars = Car.createCriteria()

        return cars{
            if (params.year){
                like("year", params.year.toInteger())
            }
            if (params.make){
                and {like("make", params.make+'%')}
            }
            if (params.model){
                and {like("model", params.model+'%')}
            }
            if (params.plate){
                and {like("plate", params.plate+'%')}
            }
        }
    }
}

