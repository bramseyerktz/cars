modules = {
    application {
        resource url:'js/application.js'
    }

    search {
        resource url:'js/search.js', disposition: head
        resource url:'js/pagination.js', disposition: head
    }
}