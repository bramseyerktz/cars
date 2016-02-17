package com.bramseyer

class Car {
    //Integer id
    Integer year
    String make
    String model

    static mapping = {
        table('VehicleModelYear')
        //id column: 'id'
        year column: 'year'
        make column: 'make'
        model column: 'model'
    }

    static constraints = {
        year(blank:false, max: 3000)
        make(blank:false, maxSize: 50)
        model(blank:false, maxSize: 50)
    }
}
