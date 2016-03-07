package com.bramseyer

import spock.lang.*
import wslite.rest.*

class RestCarFunctionalSpec extends Specification {
    @Shared def restClient = new RESTClient("http://localhost:8080/cars/api")

    void setup() {

    }

    void "GET a car as JSON"() {
        when: "I send a GET to the cars URL requesting JSON"
        def response = restClient.get(path: '/1', accept: ContentType.JSON)

        then: "I get the expected cars as a JSON"
        response.statusCode == 200
        response.json.id == 1
        response.json.make == "Ford"
        response.json.model == "Model T"
    }

}