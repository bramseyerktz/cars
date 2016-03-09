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
    <r:require module="search"/>
</head>

<body>
<div class="form-inline">
    <form id="formSearchCars">
        <div class="col-md-offset-1 col-md-10">
            <h1>Search</h1><br>
                <div id="bubbleAlert"></div>
                <div class="ch-box-lite">
                    <div class="form-group">
                        <label for="year">Year</label>
                        <input id="year" type="number" min="1750" max="${java.util.Calendar.getInstance().get(Calendar.YEAR)}" name="year" class="form-control" placeholder="Year" value="${params?.year}"/>
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
                        <input type="text" id="plate" patern="^[A-Z]{3}[0-9]{3}$" name="plate" class="form-control" placeholder="Plate" value="${params?.plate}"/>
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
        </div>
    </form>
</div>

<div class="col-md-offset-1 col-md-10">
    <h1>Result</h1>
</div>


<div class="row">
    <div class="col-md-offset-1 col-md-10" id="allCars">
        <g:render template="tableCars" model="${model}"/>
    </div>
</div>

<!-- FORM FOR EDIT CAR-->
<div id="frmEditCar" title="Car" class="form" >
    <div class="alert alert-danger" role="alert" style="display:none;" id="divError">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Error:</span>
        Enter valid params!
    </div>
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
            </div>
        </fieldset>
    </g:form>
</div>


<!-- FORM FOR NEW OWNER-->
<div id="frmNewOwner" style="display: none;">

</div>

<script src="js/lib/chico.js"></script>
</body>
</html>