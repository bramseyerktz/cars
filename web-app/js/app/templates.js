/**
 * Created by bramseyer on 09/03/16.
 */

var templates = {
    temp : {
        TEMPLATE_CAR : 0,
        TEMPLATE_OWNER : 1,
    },


    getTemplate : function(template){
        switch (template){
            case templates.temp.TEMPLATE_CAR:
                return templates._templateModalCar();
                break;
            case templates.temp.TEMPLATE_OWNER:
                return templates._templateModalOwner();
                break;
            default:
                console.log("Template not found.");
                return "Empty"
        }
    },

    build : function(template, params){
        var crudeTemplate = templates.getTemplate(template);

        $.each(params, function(key, value){
            crudeTemplate = crudeTemplate.replaceAll(key, value);
        });

        return crudeTemplate;
    },


    _templateModalCar : function() {
        return '<div id="frmEditCar" title="Car" class="form" >' +
                    '<div class="alert alert-danger" role="alert" style="display:none;" id="divError">' +
                        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                        '<span class="sr-only">Error:</span>' +
                        'Enter valid params!' +
                    '</div>' +
                    '<g:form name="formEdit">' +
                        '<fieldset>' +
                            '<div class="form-group">' +
                                '<label for="idPopup">Id</label>' +
                                '<input type="text" name="idPopup" id="idPopup" class="form-control" readonly="readonly" style="background-color:lightgrey;">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="makePopup">Make</label>' +
                                '<input type="text" name="makePopup" maxlength="50" class="form-control" id="makePopup" placeholder="Make">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="modelPopup">Model</label>' +
                                '<input type="text" maxlength="50" class="form-control" name="modelPopup" id="modelPopup" placeholder="Model">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="yearPopup">Year</label>' +
                                '<input type="number" min="0" max="9999" class="form-control" name="yearPopup" id="yearPopup" placeholder="Year">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="platePopup">Plate</label>' +
                                '<input type="text" maxlength="6" class="form-control" name="platePopup" id="platePopup" placeholder="Plate">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="idOwnerPopup">Owner</label>' +
                                '<input type="text" maxlength="25" class="form-control" name="idOwnerPopup" id="idOwnerPopup" placeholder="Owner" readonly="readonly" style="background-color:lightgrey;">' +
                                '<input type="button" value="..." id="btnOpenFormOwner" class="btn btn-default">' +
                            '</div>' +
                            '<div id="divSearchOwner" style="display:none;">' +
                                '<g:form name="formSearchOwner">' +
                                    '<div class="form-group">' +
                                        '<label for="nameSearchOwner">Name</label>' +
                                        '<input type="text" maxlength="25" class="form-control" name="nameSearchOwner" id="nameSearchOwner" placeholder="Owner\'s name">' +
                                        '<input type="button" value="Search" id="btnSearchOwner" class="btn btn-default">' +
                                        '<table class="table" id="tableOwners">' +
                                            '<tbody id="allOwners">' +
                                            '</tbody>' +
                                        '</table>' +
                                    '</div>' +
                                '</g:form>' +
                            '</div>' +
                            '<div class="ch-actions">' +
                                '<button id="modal-primary-action" class="ch-btn"> ::primary_button </button>' +
                                '<a href="#" id="modal-secondary-action"> ::secondary_button </a>' +
                                '<span style="display: none; float: right; margin-top: 10px;" class="ch-loading-small"></span>' +
                            '</div>' +
                        '</fieldset>' +
                    '</g:form>' +
                '</div>';
    },

    _templateModalOwner : function(){
        return '<div id="frmNewOwner" title="Owner" class="form">' +
                    '<g:form name="formEdit">' +
                        '<fieldset>' +
                            '<div class="form-group">' +
                                '<label for="dniPopup">DNI</label>' +
                                '<input type="number" name="dniPopup" maxlength="8" class="form-control" id="dniPopup" placeholder="DNI">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="namePopup">Name</label>' +
                                '<input type="text" maxlength="25" class="form-control" name="namePopup" id="namePopup" placeholder="Name">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="lastNamePopup">Last Name</label>' +
                                '<input type="text" maxlength="25" class="form-control" name="lastNamePopup" id="lastNamePopup" placeholder="Last Name">' +
                            '</div>' +
                            '<div class="form-group">' +
                                '<label for="nationalityPopup">Nationality</label>' +
                                '<input type="text" maxlength="20" class="form-control" name="nationalityPopup" id="nationalityPopup" placeholder="Nationality">' +
                            '</div>' +
                            '<div class="ch-actions">' +
                                '<button id="modal-primary-action" class="ch-btn"> ::primary_button </button>' +
                                '<a href="#" id="modal-secondary-action"> ::secondary_button </a>' +
                                '<span style="display: none; float: right; margin-top: 10px;" class="ch-loading-small"></span>' +
                            '</div>' +
                        '</fieldset>' +
                    '</g:form>' +
                '</div>';
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var str = this;
    str = str.replace(search, replacement);
    if(str.indexOf(search) >= 0){
        str = str.replaceAll(search, replacement)
    }

    return str;
}
