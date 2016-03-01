/**
 * Created by bramseyer on 25/02/16.
 */

//$(document).ready(function(){

    var dialogCar, dialogOwner,
    //    form,
        id = $("#idPopup")
        make = $("#makePopup"),
        model = $("#modelPopup"),
        year = $("#yearPopup"),
        plate = $("#platePopup")
        owner = $("#idOwnerPopup");

    dialogCar = $("#frmEditCar").dialog({
        autoOpen: false,
        height: 430,
        width: 300,
        modal: true,
        //close: function () {
        //    form[0].reset();
        //}
    });

    dialogOwner = $("#frmNewOwner").dialog({
        autoOpen: false,
        height: 430,
        width: 300,
        modal: true,
        buttons: {
            "Save Owner": addOwner,
            Cancel: cancel
        }
        //close: function () {
        //    form[0].reset();
        //}
    });

    //form = dialog.find("form").on("submit", function (event) {
    //    event.preventDefault();
    //    updateCar();
    //});

    function addOwner(){
        $.ajax({
            type: 'POST',
            url: '/cars/restOwner/save',
            dataType: 'json',
            data: {
                dni: $("#dniPopup").val(),
                nombre: $("#namePopup").val(),
                apellido: $("#lastNamePopup").val(),
                nacionalidad: $("#nationalityPopup").val()
            },

            success: function(){
                alert('Owner ingresado correctamente');
                dialogOwner.dialog("close");
            },

            error: function(){
                alert('No se pudo insertar el Owner');
            }
        });
    }


    function cancel(){
        $(this).dialog("close");
    }

    function deleteCar(){
        $("#deleteCar").click();
        cancel();
        return false;
    }

    function updateCar(){
        if (checkParamsCar()) {
            $("#updateCar").click();
            cancel();
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
                        for (j=0; j < 6; j++) {
                            var cell = row.getElementsByTagName("td")[j];
                            id[j] = cell.innerHTML;
                        };
                        document.getElementById("idPopup").setAttribute("value",id[0])
                        document.getElementById("makePopup").setAttribute("value",id[1]);
                        document.getElementById("modelPopup").setAttribute("value",id[2]);
                        document.getElementById("yearPopup").setAttribute("value",id[3]);
                        document.getElementById("platePopup").setAttribute("value",id[4]);
                        document.getElementById("idOwnerPopup").setAttribute("value",id[5]);
                        dialogCar.dialog("option", "buttons", [
                            {text: "Update",
                                click: updateCar
                            },
                            {text: "Delete",
                                click: deleteCar
                            },
                            {text: "Cancel",
                                click: cancel
                            }
                        ]);
                        dialogCar.dialog("open");
                    };
                };

            currentRow.onclick = createClickHandler(currentRow);
        }}

    //window.onload = addRowHandlers();

    $("#new").click(function(){
        document.getElementById("idPopup").setAttribute("value","");
        document.getElementById("makePopup").setAttribute("value","");
        document.getElementById("modelPopup").setAttribute("value","");
        document.getElementById("yearPopup").setAttribute("value","");
        document.getElementById("platePopup").setAttribute("value","");
        document.getElementById("idOwnerPopup").setAttribute("value","");
        dialogCar.dialog("open");
    });

    $("#newOwner").click(function(){
        document.getElementById("namePopup").setAttribute("value","");
        document.getElementById("lastNamePopup").setAttribute("value","");
        document.getElementById("dniPopup").setAttribute("value","");
        document.getElementById("nationalityPopup").setAttribute("value","");
        dialogOwner.dialog("option", "buttons", [{
            text: "Save Owner",
            click: addOwner
        },
        {   text: "Cancel",
            click: cancel
        }
        ]);
        dialogOwner.dialog("open");
    });

    $("#btnOpenFormOwner").click(function(){
        var divSearch;
        divSearch = document.getElementById("divSearchOwner");
        //if (divSearch.style.visibility == "hidden"){
        //    divSearch.style.visibility = "visible";
        //} else {
        //    divSearch.style.visibility = "hidden";
        //}
        if (divSearch.style.display == "none"){
            divSearch.style.display = "block";
        } else {
            divSearch.style.display = "none";
        }
    });

    $("#btnSearchOwner").click(function(){
        $("#searchOwner").click();
    });



    function saveCar(){
        if (checkParamsCar()) {
            $("#newCar").click();
            cancel();
            return false;
        }
    }

    function checkParamsCar(){
        if (year.val() == ""
            || isNaN(year.val())
            || year.val().length > 4
            || /^\s+$/.test(year.val())) {
            alert('[ERROR] El campo Year debe ser un año válido');
            return false;
        }

        if (make.val() == ""
            || make.val().length > 50
            || /^\s+$/.test(make.val())) {
            alert('[ERROR] El campo Make debe estar completo');
            return false;
        }

        if (model.val() == ""
            || model.val().length > 50
            || /^\s+$/.test(model.val())) {
            alert('[ERROR] El campo Model debe estar completo');
            return false;
        }

        if (plate.val() == ""
            || plate.val().length > 6
            || !(/[A-Z]{3}[0-9]{3}/.test(plate.val()))) {
            alert('[ERROR] El campo Plate debe estar completo, formato: XXX999');
            return false;
        }

        return true;
    }

//});