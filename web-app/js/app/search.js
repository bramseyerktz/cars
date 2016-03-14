/**
 * Created by bramseyer on 25/02/16.
 */

//$(document).ready(function(){

/*
 * VARIABLES
 */

var id = $("#idPopup"),
    make = $("#makePopup"),
    model = $("#modelPopup"),
    year = $("#yearPopup"),
    plate = $("#platePopup"),
    owner = $("#idOwnerPopup");

var $dialogOwner = $("#frmNewOwner");

var dialogCar = $("#frmEditCar").dialog({
    autoOpen: false,
    height: 430,
    width: 300,
    modal: true,
});

var defaultOptions = {
    "width": "300px",
    "height": "430px",
    "cache": false,
    "fx": false
};

var divSearch = document.getElementById("divSearchOwner");

/*
 * EVENTS
 */

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
            click: closeDialogCar
        }
    ]);
    dialogCar.dialog("open");
});

$("#newOwner").click(function(e) {
    var modal = $dialogOwner
        .modal(defaultOptions)
        .content(templates.build(templates.temp.TEMPLATE_OWNER, {
            "::primary_button": "Save",
            "::secondary_button": "Cancel"
        }))
        .show();

    //e.preventDefault();
    $(".ch-modal").css("top", "100px");
    setTimeout(function () {
        $("#modal-primary-action").unbind("click").bind("click", addOwner);
        $("#modal-secondary-action").unbind("click").bind("click", closeModalOwner);
        //$("i.ch-close").unbind("click").bind("click", app.closeDialog);
    }, 200);
    e.stopPropagation(); // evita que se ejecute de nuevo el evento.
});

//window.onload = addRowHandlers();

$("#btnOpenFormOwner").click(function(){
    if (divSearch.style.display == "none"){
        divSearch.style.display = "block";
    } else {
        closeAndCleanSearchOwnerDiv();
    }
});

$("#btnSearchOwner").click(function(){
    updateTableContent("#allOwners");
});



/*
 * FUNCTIONS
 */

function closeAndCleanSearchOwnerDiv() {
    divSearch.style.display = "none";
    document.getElementById("nameSearchOwner").value = "";
    $("#allOwners").empty();
}

function addOwner() {
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
            closeModalOwner;
        },

        error: function(){
            alert('No se pudo insertar el Owner');
        }
    });
}

function closeDialogCar(){
    closeAndCleanSearchOwnerDiv();
    dialogCar.dialog("close");
}

function closeModalOwner(){
    $dialogOwner.modal().hide();
}

function deleteCar(){
    $("#deleteCar").click();
    closeDialogCar();
    return false;
}

function updateCar(){
    if (checkParamsCar()) {
        $("#updateCar").click();
        closeDialogCar();
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
                            click: closeDialogCar
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
                    document.getElementById("idOwnerPopup").value = cell.innerHTML;
                    $("#btnOpenFormOwner").click();
                }
            };

        currentRow.onclick = createClickOwnerHandler(currentRow);
    }
}

function saveCar(){
    if (checkParamsCar()) {
        $("#newCar").click();
        closeDialogCar;
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
        var tableBody = $(tableBodyId);
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
