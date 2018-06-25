/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery'], function ($) {

    /**
     * The view model for managing service calls
     */
    function serviceConfig() {

        var self = this;
        var authCode = "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA==";
        self.contentTypeApplicationJSON = 'application/json';
        self.headers = {
        };
        self.callGetService = function (serviceUrl, contentType, headers, asynchronized) {
            var defer = $.Deferred();
            $.ajax( {
                type : "GET", 
                async : asynchronized, 
                url : serviceUrl, 
                headers : headers, 
                async : false, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.callPostService = function (serviceUrl, payload, contentType, asynchronized,headers) {
            var payloadStr = '';
            if (typeof payload === 'string' || payload instanceof String) {
                payloadStr = payload;
            }
            else {
                payloadStr = JSON.stringify(payload);
            }

            var defer = $.Deferred();
            $.ajax( {
                type : "POST", 
                async : asynchronized, 
                headers : headers,
                url : serviceUrl, 
                contentType : contentType, 
                data : payloadStr, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.callPutService = function (serviceUrl, payload, contentType, asynchronized,headers) {
            var payloadStr = '';
            if (typeof payload === 'string' || payload instanceof String) {
                payloadStr = payload;
            }
            else {
                payloadStr = JSON.stringify(payload);
            }

            var defer = $.Deferred();
            $.ajax( {
                type : "PUT", 
                async : asynchronized, 
                headers : headers,
                url : serviceUrl, 
                contentType : contentType, 
                data : payloadStr, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };
        
        self.callGetApexService = function (serviceUrl, contentType, headers, asynchronized) {
            var defer = $.Deferred();
            headers.Authorization = authCode; 
            $.ajax( {
                type : "GET", 
                async : asynchronized, 
                url : serviceUrl, 
                headers : headers, 
                async : false, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.callPostApexService = function (serviceUrl, payload, contentType, asynchronized,headers) {
            var payloadStr = '';
            headers.Authorization = authCode; 
            if (typeof payload === 'string' || payload instanceof String) {
                payloadStr = payload;
            }
            else {
                payloadStr = JSON.stringify(payload);
            }

            var defer = $.Deferred();
            $.ajax( {
                type : "POST", 
                async : asynchronized, 
                headers : headers,
                url : serviceUrl, 
                contentType : contentType, 
                data : payloadStr, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };

        self.callPutApexService = function (serviceUrl, payload, contentType, asynchronized,headers) {
            var payloadStr = '';
            headers.Authorization = authCode; 
            if (typeof payload === 'string' || payload instanceof String) {
                payloadStr = payload;
            }
            else {
                payloadStr = JSON.stringify(payload);
            }

            var defer = $.Deferred();
            $.ajax( {
                type : "PUT", 
                async : asynchronized, 
                headers : headers,
                url : serviceUrl, 
                contentType : contentType, 
                data : payloadStr, 
                success : function (data) {
                    defer.resolve(data);
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
            return $.when(defer);
        };
         self.callDeleteApexService = function (serviceUrl,payload,  contentType, headers, asynchronized) {
            var defer = $.Deferred();
            headers.Authorization = authCode; 
            $.ajax( {
                type : "DELETE", 
                async : asynchronized, 
                 url : serviceUrl,
                headers : headers,
                 data :payload,
                contentType : contentType,                
                success : function () {
                     console.log("done");
                },
                error : function (xhr, ajaxOptions, thrownError) {
                    defer.reject(xhr);
                }
            });
          
            return $.when(defer);
        };
    }

    return new serviceConfig();
});