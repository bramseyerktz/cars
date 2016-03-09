modules = {
    application {
        resource url:'js/app/application.js'
    }

    search {
        resource url:'js/app/search.js', disposition: head
        resource url:'js/app/pagination.js', disposition: head
        resource url:'js/app/templates.js', disposition: head
        resource url:'css/chico.min.css', disposition: head
    }
}