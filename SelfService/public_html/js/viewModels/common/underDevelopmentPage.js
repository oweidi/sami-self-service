define(['ojs/ojcore', 'knockout', 'jquery','appController', 'ojs/ojtrain', 'config/services','ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], 
function (oj, ko, $,app, commonUtil, services) {

    function underDevelopmentViewModel() {
        var self = this;
        var getTranslation = oj.Translations.getTranslatedString;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        
        self.thisSelfServiceStillUnderDevelopment_lng = ko.observable();
        
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
                initTranslations();
                $("#paging").ojPagingControl("refresh");
            }
        });
        
        self.handleAttached = function (info) {
            initTranslations();
        }
            
        function initTranslations() {
            // function to add translations for the home page module
            self.thisSelfServiceStillUnderDevelopment_lng(getTranslation("others.thisSelfServiceStillUnderDevelopment"));
        }
        
        return true;
    }

    return new underDevelopmentViewModel();
});