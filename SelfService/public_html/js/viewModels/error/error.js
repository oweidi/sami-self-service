define(['knockout', 'appController'], function (ko, app) {

    function errorViewModel () {
        var self = this;
        
        self.resolveError = function() {
            var lastScreen = app.router._navHistory[app.router._navHistory.length - 1];
            app.hasErrorOccured(false);
            app.router.go(lastScreen);
        };
    }

    return new errorViewModel ();
});