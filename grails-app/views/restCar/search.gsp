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
    <div class="form-inline">
        <div class="col-md-offset-1 col-md-11">
            <h1>Search</h1>
            <g:form action="search">
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

        <div class="col-md-offset-1 col-md-10">
            <h1>Result</h1>
        </div>

        <div class="row">
            <div class="col-md-offset-1 col-md-10">
                <table class="table">
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                    <g:each in="${carsList}" var="car">
                        <tr>
                            <td class="success">${car.year}</td>
                            <td class="success">${car.make}</td>
                            <td class="success">${car.model}</td>
                        </tr>
                    </g:each>
                </table>
            </div>
        </div>
</body>
</html>