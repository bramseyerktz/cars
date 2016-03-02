/**
 * Created by bramseyer on 25/02/16.
 */

$(document).ready(function(){

    var dialogCar, dialogOwner,
        id = $("#idPopup"),
        make = $("#makePopup"),
        model = $("#modelPopup"),
        year = $("#yearPopup"),
        plate = $("#platePopup"),
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
                        document.getElementById("idPopup").value = id[0];
                        document.getElementById("makePopup").value = id[1];
                        document.getElementById("modelPopup").value = id[2];
                        document.getElementById("yearPopup").value = id[3];
                        document.getElementById("platePopup").value = id[4];
                        document.getElementById("idOwnerPopup").value = id[5];
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
        }
    }

    function addRowOwnersHandlers() {
        var table = document.getElementById("tableOwners");
        var rows = table.getElementsByTagName("tr");
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            var createClickOwnerHandler =
                function (row) {
                    return function () {
                        var cell = row.getElementsByTagName("td")[0];
                        var id = cell.innerHTML;
                        document.getElementById("idOwnerPopup").value = id;
                        $("#btnOpenFormOwner").click();
                    }
                };

            currentRow.onclick = createClickOwnerHandler(currentRow);
        }
    }



    //window.onload = addRowHandlers();

    $("#new").click(function(){
        document.getElementById("idPopup").value = "";
        document.getElementById("makePopup").value = "";
        document.getElementById("makePopup").value = "";
        document.getElementById("modelPopup").value = "";
        document.getElementById("yearPopup").value = "";
        document.getElementById("platePopup").value = "";
        document.getElementById("idOwnerPopup").value = "";

        dialogCar.dialog("option", "buttons", [
            {text: "Save",
             click: saveCar
            },
            {text: "Cancel",
             click: cancel
            }
        ]);
        dialogCar.dialog("open");
    });

    $("#newOwner").click(function(){
        document.getElementById("namePopup").value = "";
        document.getElementById("lastNamePopup").value = "";
        document.getElementById("dniPopup").value = "";
        document.getElementById("nationalityPopup").value = "";
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
        if (divSearch.style.display == "none"){
            divSearch.style.display = "block";//divSearch.show(); o divSearch.hide();
        } else {
            divSearch.style.display = "none";
            document.getElementById("nameSearchOwner").value = "";
            $("#allOwners").empty();
        }
    });

    $("#btnSearchOwner").click(function(){
        updateTableContent("#allOwners");
    });



    function saveCar(){
        if (checkParamsCar()) {
            $("#newCar").click();
            dialogCar.dialog("close");//cancel(); no anda el cancel vaya a saber porque
            return false;
        }
    }

    function checkParamsCar(){
        var result = true;

        if (year.val() == ""
            || isNaN(year.val())
            || year.val().length > 4
            || /^\s+$/.test(year.val())) {
            alert('El campo Year debe ser un año válido', 'Error al guardar Car');
            result = false;
        }

        if (make.val() == ""
            || make.val().length > 50
            || /^\s+$/.test(make.val())) {
            alert('[ERROR] El campo Make debe estar completo');
            result = false;
        }

        if (model.val() == ""
            || model.val().length > 50
            || /^\s+$/.test(model.val())) {
            alert('[ERROR] El campo Model debe estar completo');
            result = false;
        }

        if (plate.val() == ""
            || plate.val().length > 6
            || !(/[A-Z]{3}[0-9]{3}/.test(plate.val()))) {
            alert('[ERROR] El campo Plate debe estar completo, formato: XXX999');
            result = false;
        }

        if (owner.val() == ""){
            alert('Falta ingresar el Owner para este Car');
            result = false;
        }
        var divSearch;
        divSearch = document.getElementById("divError");
        if (divSearch.style.display == "none" && !result){
            divSearch.style.display = "block";
        } else {
            divSearch.style.display = "none";
        }

        return result;
    }


function updateTableContent(tableBodyId){
    $(tableBodyId).empty();
    var queryString = "/cars/apiOwner/" +
        "?nombre=" + $("#nameSearchOwner").val();

    $.getJSON(queryString, function(data){
        var tableBody = $(tableBodyId)
        for (var i = 0, len = data.length; i < len; i++) {
            //alert(tableElement);
            var item=data[i];
            tableBody.append($('<tr>')
                    .attr('attr-id',item.id)
                    .append($('<td>').text("[" + item.id + "]" + " " + item.nombre + " " + item.apellido))
            );
        }
        //After AJAX request
        addRowOwnersHandlers();
    });
}

});