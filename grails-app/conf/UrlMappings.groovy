class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')

        "/search"{
            controller = "CarCrud"
            action = "search"
        }

        "/api"(resources: "restCar")

        "/apiOwner"(resources: "restOwner")
	}
}
