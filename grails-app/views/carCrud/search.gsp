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
    <g:javascript library="search"/>
</head>

<body>
<div class="form-inline">
    <div class="col-md-offset-1 col-md-11">
        <h1>Search</h1>
        <g:form> <!--action="search">-->
            <div class="form-group">
                <label for="year">Year</label>
                <input id="year" type="number" min="0" max="9999" name="year" class="form-control" placeholder="Year" value="${params?.year}"/>
            </div>
            <div class="form-group">
                <label for="make">Make by...</label>
                <!--<g:textField name="make" value="${params?.make}" class="form-control"/>-->
                <input type="text" id="make" maxlength="50" name="make" class="form-control" placeholder="Make" value="${params?.make}"/>
            </div>
            <div class="form-group">
                <label for="model">Model</label>
                <!--<g:textField name="model" value="${params?.model}" class="form-control"/>-->
                <input type="text" id="model" maxlength="50" name="model" class="form-control" placeholder="Model" value="${params?.model}"/>
            </div>
            <div class="form-group">
                <g:submitToRemote value="Search"
                                  url="[controller: 'carCrud', action: 'searchAjax']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>
                <div id="new" class="btn btn-default">
                    New
                </div>
                <!--<button name="new" id="new" class="btn btn-default">New</button>-->
            </div>
        </g:form>
    </div>
</div>

<div class="col-md-offset-1 col-md-10">
    <h1>Result</h1>
</div>


<div class="row">
    <div class="col-md-offset-1 col-md-10">
        <table class="table" id="tableCars">
            <tr>
                <th>Id</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
            </tr>
            <!--<g:each in="${carsList}" var="car">
                <tr>
                    <td class="success">${car.make}</td>
                        <td class="success">${car.model}</td>
                        <td class="success">${car.year}</td>
                    </tr>
            </g:each>-->
            <tbody id="allCars">
            <g:render template="findingCars" collection="${carsList}" var="car"/>
            </tbody>
        </table>
    </div>
</div>

<!-- FORM FOR EDIT CAR-->
<div id="frmEditCar" title="Edit car" class="form">
    <g:form name="formEdit">
        <fieldset>
            <div class="form-group">
                <label for="idPopup">Id</label>
                <input type="text" name="idPopup" id="idPopup" class="form-control" readonly="readonly" style="background-color:lightgrey;">
            </div>
            <div class="form-group">
                <label for="makePopup">Make</label>
                <input type="text" name="makePopup" maxlength="50" class="form-control" id="makePopup" placeholder="Make">
            </div>
            <div class="form-group">
                <label for="modelPopup">Model</label>
                <input type="text" maxlength="50" class="form-control" name="modelPopup" id="modelPopup" placeholder="Model">
            </div>
            <div class="form-group">
                <label for="yearPopup">Year</label>
                <input type="number" min="0" max="9999" class="form-control" name="yearPopup" id="yearPopup" placeholder="Year">
            </div>
            <!-- Edit car properties -->
            <div style="display:none">
                <g:submitToRemote value="Update" id="updateCar"
                                  url="[controller: 'carCrud', action: 'updateCar']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>
                <g:submitToRemote value="Delete" id="deleteCar"
                                  url="[controller: 'carCrud', action: 'deleteCar']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>
                <g:submitToRemote value="New" id="newCar"
                                  url="[controller: 'carCrud', action: 'newCar']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>
            </div>
        </fieldset>
    </g:form>
</div>

</body>
</html>