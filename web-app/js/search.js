/**
 * Created by bramseyer on 25/02/16.
 */

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
    if (checkParams()) {
        //alert("hasta acá bien");
//                VER COMO VALIDAR LOS DATOS que se envían
        $("#updateCar").click();
        dialog.dialog("close");
        return false;
    } else {
        alert('Algún campo se encuentra con errores')
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
                    dialog.dialog("option", "buttons", [
                        {text: "Update",
                            click: updateCar
                        },
                        {text: "Delete",
                            click: deleteCar
                        },
                        {text: "Cancel",
                            click: function() {
                                dialog.dialog( "close" );
                            }
                        }
                    ]);
                    dialog.dialog("open");
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }}

window.onload = addRowHandlers();

$("#new").click(function(){
    document.getElementById("idPopup").setAttribute("value","");
    document.getElementById("makePopup").setAttribute("value","");
    document.getElementById("modelPopup").setAttribute("value","");
    document.getElementById("yearPopup").setAttribute("value","");
    dialog.dialog("option", "buttons", [{
        text: "Save",
        click: saveCar
    },
        {   text: "Cancel",
            click: function() {
                dialog.dialog( "close" );
            }
        }
    ]);
    dialog.dialog("open");
});

function saveCar(){
    if (checkParams()) {
        $("#newCar").click();
        dialog.dialog("close");
        return false;
    } else {
        alert('Algún campo se encuentra con errores')
    }
}

function checkParams(){
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

    return true;
}
