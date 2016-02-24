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
        <g:form> <!--action="search">-->
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
                <g:submitToRemote value="SearchJQuery"
                                  url="[controller: 'carCrud', action: 'searchAjax']"
                                  update="allCars" class="btn btn-default"
                                  onLoading="addRowHandlers()"
                                  onSuccess="addRowHandlers()"/>
                <!--<g:submitButton name="search" value="Search" class="btn btn-default"/>-->
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
                <input type="text" name="idPopup" id="idPopup" readonly="readonly" style="background-color:lightgrey;">
            </div>
            <div class="form-group">
                <label for="makePopup">Make</label>
                <input type="text" name="makePopup" id="makePopup">
            </div>
            <div class="form-group">
                <label for="modelPopup">Model</label>
                <input type="text" name="modelPopup" id="modelPopup">
            </div>
            <div class="form-group">
                <label for="yearPopup">Year</label>
                <input type="text" name="yearPopup" id="yearPopup">
            </div>
            <!-- Edit car properties -->
            <!--<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">-->
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
            </div>
        </fieldset>
    </g:form>
</div>

<script>
    var dialog,
            form,
            id = $("#idPopup")
    make = $("#makePopup"),
            model = $("#modelPopup"),
            year = $("#yearPopup");

    dialog = $("#frmEditCar").dialog({
        autoOpen: false,
        height: 430,
        width: 300,
        modal: true,
        buttons: {
            "Update": updateCar,
            "Delete": deleteCar,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        updateCar();
    });

    function deleteCar(){
        $("#deleteCar").click();
        dialog.dialog("close");
        return false;
    }

    function updateCar(){
        if (make.val() != ""
                && model.val() != ""
                && year.val() != "") {
            //alert("hasta acá bien");
//                VER COMO VALIDAR LOS DATOS que se envían
            $("#updateCar").click();
            dialog.dialog("close");
            return false;
        }

    }

    function addRowHandlers() {
        var table = document.getElementById("tableCars");
        var rows = table.getElementsByTagName("tr");
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            var createClickHandler =
                    function(row)
                    {
                        return function() {
                            var id = [];
                            for (j=0; j < 4; j++) {
                                var cell = row.getElementsByTagName("td")[j];
                                id[j] = cell.innerHTML;
                            };
                            document.getElementById("idPopup").setAttribute("value",id[0])
                            document.getElementById("makePopup").setAttribute("value",id[1]);
                            document.getElementById("modelPopup").setAttribute("value",id[2]);
                            document.getElementById("yearPopup").setAttribute("value",id[3]);
                            dialog.dialog("open");
                        };
                    };

            currentRow.onclick = createClickHandler(currentRow);
        }}

    window.onload = addRowHandlers();

</script>
</body>
</html>