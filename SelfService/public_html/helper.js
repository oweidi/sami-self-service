function addFuseModelToIndexedDB(services, app, rootViewModel, commonhelper) {
    services.getFuseModelReport().then(function (data) {
        rootViewModel.globalFuseModel([]);
        rootViewModel.globalFuseModel(jQuery.parseJSON(data));

        populateGlobalValues(rootViewModel, commonhelper);

    },
    app.failCbFn);

}

function addGlobalPersonFuseModel(services, app, rootViewModel, commonhelper) {
    services.getPersonFuseModelReport(rootViewModel.personDetails().personId()).then(function (data) {
        var documents = jQuery.parseJSON(data);
        rootViewModel.globalPersonFuseModel.personNumber(documents.PERSON_NUMBER);
        rootViewModel.globalPersonFuseModel.personId(documents.PERSON_ID);
        rootViewModel.globalPersonFuseModel.fullName(documents.FULL_NAME);
        rootViewModel.globalPersonFuseModel.nationality(documents.NATIONALITY);
        rootViewModel.globalPersonFuseModel.profession(documents.PROFESSION);
        rootViewModel.globalPersonFuseModel.childGradeAmtValue(documents.CHILD_AMT_GRADE_VALUE);
        rootViewModel.globalPersonFuseModel.childGradeNoValue(documents.CHILD_NO_GRADE_VALUE);
        rootViewModel.globalPersonFuseModel.arabicName(documents.ARABIC_NAME);
        rootViewModel.globalPersonFuseModel.bankIBAN(documents.IBAN_NUM);
    },
    app.failCbFn);

}

function populateGlobalValues(rootViewModel, commonhelper) {
    
    rootViewModel.globalYesNo([]);
    rootViewModel.globalHRCYesNo([]);
    rootViewModel.globalHRIdentification([]);
    rootViewModel.globalMailType([]);
    rootViewModel.globalTypes([]);

    for (var i = 0;i < rootViewModel.globalFuseModel().length;i++) {
       
       if (rootViewModel.globalFuseModel()[i].DATA_TYPE === commonhelper.REPORT_DATA_TYPE.LOOKUP && rootViewModel.globalFuseModel()[i].LOOKUP_TYPE === commonhelper.YES_NO) {
            rootViewModel.globalYesNo.push( {
                "value" : rootViewModel.globalFuseModel()[i].LOOKUP_CODE, "label" : rootViewModel.globalFuseModel()[i].MEANING
            });
        }

        else if (rootViewModel.globalFuseModel()[i].DATA_TYPE === commonhelper.REPORT_DATA_TYPE.LOOKUP && rootViewModel.globalFuseModel()[i].LOOKUP_TYPE === commonhelper.BTRIP_TYPE) {
            rootViewModel.globalTypes.push( {
                "value" : rootViewModel.globalFuseModel()[i].LOOKUP_CODE, "label" : rootViewModel.globalFuseModel()[i].MEANING
            });
        }

        else if (rootViewModel.globalFuseModel()[i].DATA_TYPE === commonhelper.REPORT_DATA_TYPE.LOOKUP && rootViewModel.globalFuseModel()[i].LOOKUP_TYPE === commonhelper.HRC_YES_NO) {
            rootViewModel.globalHRCYesNo.push( {
                "value" : rootViewModel.globalFuseModel()[i].LOOKUP_CODE, "label" : rootViewModel.globalFuseModel()[i].MEANING
            });
        }
        else if (rootViewModel.globalFuseModel()[i].DATA_TYPE === commonhelper.REPORT_DATA_TYPE.LOOKUP && rootViewModel.globalFuseModel()[i].LOOKUP_TYPE === commonhelper.NADEC_HR_IDENTIFICATION_LANG) {
            rootViewModel.globalHRIdentification.push( {
                "value" : rootViewModel.globalFuseModel()[i].LOOKUP_CODE, "label" : rootViewModel.globalFuseModel()[i].MEANING
            });
        }
        else if (rootViewModel.globalFuseModel()[i].DATA_TYPE === commonhelper.REPORT_DATA_TYPE.LOOKUP && rootViewModel.globalFuseModel()[i].LOOKUP_TYPE === commonhelper.NADEC_HR_ID_MAIL_TYPE) {
            rootViewModel.globalMailType.push( {
                "value" : rootViewModel.globalFuseModel()[i].LOOKUP_CODE, "label" : rootViewModel.globalFuseModel()[i].MEANING
            });
        }
    }

}

$("#globalBody").ready(function () {

    var referrer = document.referrer;

});
$(document).ajaxComplete(function (event, xhr, settings) {
    $(".se-pre-con").fadeOut("slow");;
});

function showEmplDetails(ko, services, app, km) {

    var rootViewModel = app;
    var url = new URL(window.location.href);
    var username;
    var hosturl;
    var jwt;
    if (url.searchParams.get("jwt")) {
        if (rootViewModel.hostUrl() == null || rootViewModel.hostUrl().length == 0) {
            hosturl = url.searchParams.get("host");
            rootViewModel.hostUrl(hosturl);
        }

        if (rootViewModel.jwt() == null || rootViewModel.jwt().length == 0) {
            jwt = url.searchParams.get("jwt");;
            rootViewModel.jwt(jwt);
        }

        if (rootViewModel.username() == null || rootViewModel.username().length == 0) {
            jwtJSON = jQuery.parseJSON(atob(jwt.split('.')[1]));
            username = jwtJSON.sub;
            rootViewModel.username(username);
            displayname = username.split('.')[0] + username.split('.')[1];
        }
    }

    var getEmpDetails = function (data) {
        if (!data) {
            return false;
        }
        else {
            rootViewModel.personDetails(km.fromJSON(data));
            if (rootViewModel.personDetails().picBase64()) {
                $(".profilepic")[0].src = "data:image/png;base64," + rootViewModel.personDetails().picBase64();
                $(".profilepic")[1].src = "data:image/png;base64," + rootViewModel.personDetails().picBase64();
            }

            var getAORCbFn = function (data1) {
                rootViewModel.getNoOfNotifications();
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data1, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');

                documents.children('G_1').each(function () {
                    var aorName = $(this).find('RESPONSIBILITY_NAME').text();
                    rootViewModel.aor(aorName);
                    rootViewModel.getNoOfNotifications();
                });
                if (rootViewModel.aor() == 'Coordinator - Travel') {
                    rootViewModel.userPriviledge('T');
                }
                else {
                    rootViewModel.userPriviledge('H');

                }

            };

            if (rootViewModel.aorExecute() === false) {
                services.getAOR(rootViewModel.personDetails().personNumber()).then(getAORCbFn, app.failCbFn);
                rootViewModel.aorExecute(true);

            }
            return true;
        }
    };

    services.getEmpDetails(rootViewModel.username(), rootViewModel.jwt(), rootViewModel.hostUrl()).then(getEmpDetails, app.failCbFn);

}

function searchArray(nameKey, searchArray) {
    for (var i = 0;i < searchArray.length;i++) {
        if (searchArray[i].value === nameKey) {
            return searchArray[i].label;
        }
    }
}

function showNotify(type, msg) {
    $.notify(msg,
    {
        className : type, clickToHide : true, autoHide : true, arrowShow : true, arrowSize : 5, hideAnimation : 'slideUp', showAnimation : 'slideDown'
    });
}



function isProbationEnded(probationEndDate) {
    if (probationEndDate) {
        var d1 = new Date();
        var d2 = new Date(probationEndDate);
        if (d1.getTime() > d2.getTime()) {
            return true;
        }
        else {
            return false;
        }

    }
    else {
        return true;
    }

}

function buildHomeNavigationPage(oj, rootViewModel) {
    var getTranslation = oj.Translations.getTranslatedString;
    var navDataLeft = [];
    navDataLeft.push( {
        name : getTranslation("pages.home"), id : 'home', iconClass : 'oj-navigationlist-item-icon fa fa-home'

    });
    navDataLeft.push( {
        name : getTranslation("pages.identificationLetters"), id : 'summaryIdentificationLetter', iconClass : 'oj-navigationlist-item-icon fa fa-file-pdf-o'
    });
    
    
    return navDataLeft;
}

function buildNotificationNavigationPage(oj) {
    var getTranslation = oj.Translations.getTranslatedString;
    var navDataLeft = [];
    navDataLeft = [
    {
        name : getTranslation("pages.notifications"), id : 'notifications', iconClass : 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
    }
];

    return navDataLeft;
}

function buildSpecialistNavigationPage(oj) {
    var getTranslation = oj.Translations.getTranslatedString;
    var navDataLeft = [];
    navDataLeft = [
    {
        name : getTranslation("pages.searchEmployee"), id : 'searchEmployee', iconClass : 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
    },
    {
        name : getTranslation("pages.statistics"), id : 'statistics', iconClass : 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
    }
];
    return navDataLeft;
}

function buildTopNavigationPage(oj) {
    var getTranslation = oj.Translations.getTranslatedString;
    var navDataLeft = [];

    navDataLeft = [
    {
        name : getTranslation("pages.home"), id : 'home', style : 'font-size: -webkit-xxx-large', iconClass : 'textwhite oj-tabbar-item-icon demo-home-icon-24 demo-icon-font-24'
    },
    {
        name : getTranslation("pages.notifications"), id : 'notifications', iconClass : 'textwhite oj-tabbar-item-icon fa fa-bell'
    }
//    },
//    {
//        name : getTranslation("pages.specialist"), id : 'specialist', iconClass : 'textwhite oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
//    }
//    {
//        name : getTranslation("pages.payroll"), id : 'payroll', iconClass : 'textwhite oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
//    }
];
    return navDataLeft;
}

function buildRouter(oj) {
    var router = {
        'home' :  {
            label : 'Home', value : 'common/home', isDefault : true, title : 'Home'
        },
        
'notifications' :  {
            label : 'Notifications', value : 'notifications/notifications', title : 'Notifications'
        },
'review' :  {
            label : 'Review', value : 'notifications/review', title : 'Notifications'
        },
'loader' :  {
            label : 'Loader', value : 'common/loader'
        },
'summaryIdentificationLetter' :  {
            label : 'Summary Identification Letters', value : 'identificationLetter/summaryIdentificationLetter', title : 'Identification Letters'
        },
'createIdentificationLetter' :  {
            label : 'Create Identification Letters', value : 'identificationLetter/createIdentificationLetter', title : 'Identification Letters'
        },
'editIdentificationLetter' :  {
            label : 'Edit Identification Letters', value : 'identificationLetter/editIdentificationLetter', title : 'Identification Letters'
        },
'viewIdentificationLetter' :  {
            label : 'View Identification Letters', value : 'identificationLetter/viewIdentificationLetter', title : 'Identification Letters'
        },
'reviewIdentificationLetter' :  {
            label : 'Review Identification Letters', value : 'identificationLetter/reviewIdentificationLetter'

        },
        ///**--------add specialist to identification letters
'summaryIdentificationLetterSpecialist' :  {
            label : 'Summary Identification Letters', value : 'identificationLetter/summaryIdentificationLetter', title : 'Identification Letters'
        },
'createIdentificationLetterSpecialist' :  {
            label : 'Create Identification Letters', value : 'identificationLetter/createIdentificationLetter', title : 'Identification Letters'
        },
'editIdentificationLetterSpecialist' :  {
            label : 'Edit Identification Letters', value : 'identificationLetter/editIdentificationLetter', title : 'Identification Letters'
        },
'viewIdentificationLetterSpecialist' :  {
            label : 'View Identification Letters', value : 'identificationLetter/viewIdentificationLetter', title : 'Identification Letters'
        } ,
'summaryChildrenEductionExpense' :  {
            label : 'Summary Children Eduction Expense', value : 'childrenEductionExpense/summaryChildrenEductionExpense', title : 'Children Eduction Expense'
        },
'createChildrenEductionExpense' :  {
            label : 'Create Children Eduction Expense', value : 'childrenEductionExpense/createChildrenEductionExpense', title : 'Children Eduction Expense'
        },
'editChildrenEductionExpense' :  {
            label : 'Edit Children Eduction Expense', value : 'childrenEductionExpense/editChildrenEductionExpense', title : 'Children Eduction Expense'
        },
'viewChildrenEductionExpense' :  {
            label : 'View Children Eduction Expense', value : 'childrenEductionExpense/viewChildrenEductionExpense', title : 'Children Eduction Expense'
        },
'reviewChildrenEductionExpense' :  {
            label : 'Review Children Eduction Expense', value : 'childrenEductionExpense/reviewNotificationChildrenEductionExpense', title : 'Children Eduction Expense'
        }   
    };

    return router;
}

function previewFile() {
    var preview = document.querySelector('.attClass');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;

    },
false);

    if (file) {
    }
}

function prev() {

    var preview = document.querySelector('.attClass');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    },
false);
    reader.addEventListener("onerror", function (error) {

    },
false);
    if (file) {
        reader.readAsDataURL(file);
    }
};
//This Functio For Cuculate precantage of completad Feiled
//PRAMETARS 1 ) MODEL IN PAGE
//PRAMETARS 2 ) MIN FEILED TO SEND REQUEST
function precantageOField(modelObj, numOfProp) {

    var foo = modelObj;
    var ol = Object.keys(foo);
    var count = 0;
    for (var i = 0;i < ol.length;i++) {
        var popalityName = ol[i]
        var a = modelObj[popalityName];
        // var a = ko.observable(self.rewardRequestModel[tt]);
        if (typeof a == "function") {
            if (a() || a() == "0") {
                count++;
            }
        }
        //        else if (typeof a == "string") {
        //            count++;
        //        }
    }
    cc = count * 100 / numOfProp
    return Math.ceil(cc);
}

function getPaaSLookup(services, app, rootViewModel) {
    var getLookup = function (data) {

        for (var i = 0;i < data.items.length;i++) {
            rootViewModel.PaaSLookup.push( {
                "ID" : data.items[i].id, "name" : data.items[i].name, "code" : data.items[i].code, "valuAr" : data.items[i].value_ar, "valuEn" : data.items[i].value_en

            })

        }

    }
    services.getPasSLookup().then(getLookup, app.failCbFn);
    // services.getEmpDetails(rootViewModel.username(),rootViewModel.jwt(),rootViewModel.hostUrl()).then(xxxx , app.failCbFn);
    //getPasSLookup
}

function buildPayrollNavigationPage(oj) {
    var getTranslation = oj.Translations.getTranslatedString;
    var navDataLeft = [];
    navDataLeft = [
    {
        name : getTranslation("pages.payroll"), id : 'payroll', iconClass : 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
    },
    {
        name : 'WorkFlow Approval', id : 'workflowApproval', iconClass : 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
    }
];
    return navDataLeft;
}

function getElementName(services, app, rootViewModel) {
    var getElementNameCBFN = function (data) {

        for (var i = 0;i < data.items.length;i++) {
            rootViewModel.elementNameARR.push( {
                "name" : data.items[i].name, "ss_type" : data.items[i].ss_type

            })

        }

    }
    services.getElementNames().then(getElementNameCBFN, app.failCbFn);
    // services.getEmpDetails(rootViewModel.username(),rootViewModel.jwt(),rootViewModel.hostUrl()).then(xxxx , app.failCbFn);
    //getPasSLookup
}
