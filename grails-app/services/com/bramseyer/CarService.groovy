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
}

