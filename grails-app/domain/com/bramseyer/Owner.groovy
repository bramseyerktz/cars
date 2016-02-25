package com.bramseyer

class Owner {
    Integer dni
    String nombre
    String apellido
    String nacionalidad

    static hasMany = [cars: Car]

    static constraints = {
    }
}
