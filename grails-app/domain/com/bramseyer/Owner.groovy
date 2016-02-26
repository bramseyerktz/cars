package com.bramseyer

class Owner {
    Integer dni
    String nombre
    String apellido
    String nacionalidad

    static hasMany = [cars: Car]

    static constraints = {
        dni(blank:false, maxSize: 8)
        nombre(blank: false, maxSize:25)
        apellido(blank: false, maxSize: 25)
        nacionalidad(blank: false, maxSize: 20)
    }
}
