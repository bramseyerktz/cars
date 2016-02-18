<%--
  Created by IntelliJ IDEA.
  User: bramseyer
  Date: 17/02/16
  Time: 13:45
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Find a car</title>
    <meta name="layout" content="main"/>
</head>

<body>
    <div class="form">
        <div class="col-md-4">
            <h1>Search</h1>
            <g:form action="searchCar">
                <div class="form-group">
                    <label for="year">Year</label>
                    <g:textField name="year" value="${params?.year}" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="make">Make by...</label>
                    <g:textField name="make" value="${params?.make}" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="model">Model</label>
                    <g:textField name="model" value="${params?.model}" class="form-control"/>
                </div>
                <div class="form-group">
                    <g:submitButton name="search" value="Search" class="btn btn-default"/>
                </div>
            </g:form>
        </div>
    </div>
</body>
</html>