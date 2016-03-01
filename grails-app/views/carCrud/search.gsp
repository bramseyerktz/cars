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
    <form>
        <div class="col-md-offset-1 col-md-10">
            <h1>Search</h1><br>
                <div class="form-group">
                    <label for="year">Year</label>
                    <input id="year" type="number" min="0" max="9999" name="year" class="form-control" placeholder="Year" value="${params?.year}"/>
                </div>
                <div class="form-group">
                    <label for="make">Make by...</label>
                    <input type="text" id="make" maxlength="50" name="make" class="form-control" placeholder="Make" value="${params?.make}"/>
                </div>
                <div class="form-group">
                    <label for="model">Model</label>
                    <input type="text" id="model" maxlength="50" name="model" class="form-control" placeholder="Model" value="${params?.model}"/>
                </div><br><br>
                <div class="form-group">
                    <label for="plate">Plate</label>
                    <input type="text" id="plate" maxlength="6" name="plate" class="form-control" placeholder="Plate" value="${params?.plate}"/>
                </div>
                <div class="form-group">
                    <g:submitToRemote value="Search"
                                      url="[controller: 'carCrud', action: 'searchAjax']"
                                      update="allCars" class="btn btn-default"
                                      onLoading="addRowHandlers()"
                                      onSuccess="addRowHandlers()"/>
                    <div id="new" class="btn btn-default">
                        New Car
                    </div>
                    <div id="newOwner" class="btn btn-default">
                        New Owner
                    </div>
                    <!--<button name="new" id="new" class="btn btn-default">New</button>-->
                </div><br><br>
        </div>
    </form>
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
                <th>Plate</th>
                <th>Owner</th>
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
<div id="frmEditCar" title="Car" class="form">
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
            <div class="form-group">
                <label for="platePopup">Plate</label>
                <input type="text" maxlength="6" class="form-control" name="platePopup" id="platePopup" placeholder="Plate">
            </div>
            <div class="form-group">
                <label for="idOwnerPopup">Owner</label>
                <input type="text" maxlength="25" class="form-control" name="idOwnerPopup" id="idOwnerPopup" placeholder="Owner" readonly="readonly" style="background-color:lightgrey;">
                <input type="button" value="..." id="btnOpenFormOwner" class="btn btn-default">
            </div>
            <!-- Edit car properties -->

            <!-- div for search owners -->
            <div id="divSearchOwner" style="display:none;"> <!--style="visibility: hidden;">-->
                <g:form name="formSearchOwner">
                    <div class="form-group">
                        <label for="nameSearchOwner">Name</label>
                        <input type="text" maxlength="25" class="form-control" name="nameSearchOwner" id="nameSearchOwner" placeholder="Owner's name">
                        <input type="button" value="Search" id="btnSearchOwner" class="btn btn-default">
                        <table class="table" id="tableOwners">
                            <tbody id="allOwners">
                               <g:render template="findingOwners" collection="${ownersList}" var="owner"/>
                            </tbody>
                        </table>
                    </div>
                </g:form>
            </div>


            <div style="display:none;">
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
                <g:submitToRemote value="Search Owner" id="searchOwner"
                                  url="[controller: 'carCrud', action: 'searchOwner']"
                                  update="allOwners" class="btn btn-default"/>
            </div>
        </fieldset>
    </g:form>
</div>


<!-- FORM FOR NEW OWNER-->
<div id="frmNewOwner" title="Owner" class="form">
    <g:form name="formEdit">
        <fieldset>
            <div class="form-group">
                <label for="dniPopup">DNI</label>
                <input type="number" name="dniPopup" maxlength="8" class="form-control" id="dniPopup" placeholder="DNI">
            </div>
            <div class="form-group">
                <label for="namePopup">Name</label>
                <input type="text" maxlength="25" class="form-control" name="namePopup" id="namePopup" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="lastNamePopup">Last Name</label>
                <input type="text" maxlength="25" class="form-control" name="lastNamePopup" id="lastNamePopup" placeholder="Last Name">
            </div>
            <div class="form-group">
                <label for="nationalityPopup">Nationality</label>
                <input type="text" maxlength="20" class="form-control" name="nationalityPopup" id="nationalityPopup" placeholder="Nationality">
            </div>
            <!-- New owner properties -->
            <div style="display:none">
                <!--<g:submitToRemote value="New" id="newOwner"
                                  url="[controller: 'carCrud', action: 'newCar']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>-->
            </div>
        </fieldset>
    </g:form>
</div>


</body>
</html>