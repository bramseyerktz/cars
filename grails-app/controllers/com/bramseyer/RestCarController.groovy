package com.bramseyer

class RestCarController {

    static responseFormats = ["xml", "json"]

    def index() {
        def cars = Car.list()
        respond cars
    }
}
