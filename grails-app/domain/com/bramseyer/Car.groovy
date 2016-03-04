package com.bramseyer

class Car {
    //Integer id
    Integer year
    String make
    String model
    String plate
    //Owner owner

    static belongsTo = [owner: Owner]

    static mapping = {
        table('VehicleModelYear')
    }

    static constraints = {
        year(blank:false, max: 3000)
        make(blank:false, maxSize: 50)
        model(blank:false, maxSize: 50)
        plate(blank: false, maxSize: 6, matches: /^[A-Z]{3}[0-9]{3}$/)
    }
}
