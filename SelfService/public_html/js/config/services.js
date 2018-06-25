/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['config/serviceconfig', 'util/commonhelper'], function (serviceConfig, commonHelper) {

    /**
     * The view model for managing all services
     */
    function services() {

        var self = this;

        var servicesHost = commonHelper.getSaaSHost();
        var paasServiceHost = commonHelper.getPaaSHost();
        var appServiceHost = commonHelper.getAppHost();
        var biReportServletPath = commonHelper.getBiReportServletPath();
        var restPath = commonHelper.getInternalRest();

        // POST example
        self.authenticate = function (userName, password) {
            var serviceURL = appServiceHost + restPath + "login/login";
            var payload = {
                "userName" : userName, "password" : password
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        // GET example
        self.getExampleDetails = function () {
            // var serviceURL = servicesHost + apiVersion + "profile";
            var serviceURL = servicesHost + 'exampleService';
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, true);
        };

        self.getNotification = function (headers) {
            var serviceURL = paasServiceHost + 'workflowApproval/';
            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.workflowAction = function (payload) {
            var serviceURL = paasServiceHost + 'workflowApproval/';
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getAOR = function (personNumber) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "P_PERSON" : personNumber, "reportName" : "AORReport"
            };

            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getLookupTypes = function (lookupType, lang) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "bindLookupType" : lookupType, "bindLanguage" : lang, "reportName" : LookupTypeReport
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, false, headers);
        };

        self.getApprovalList = function (trsId, selfType) {
            var serviceURL = paasServiceHost + "/approvalList";
            var headers = {
                "TRS_ID" : trsId, "SELF_TYPE" : selfType
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getNoOfNotification = function (headers) {
            var serviceURL = paasServiceHost + "notification/";

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.updateNotification = function (notiId) {
            var serviceURL = paasServiceHost + "notification/";
            var payload = {
                "notiId" : notiId
            };
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getFuseModelReport = function () {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "reportName" : "FuseReport"
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, false, headers);
        };

        self.getElementEntry = function () {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);

        };
        self.addElementEntry = function (payload) {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.editElementEntry = function (payload) {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callPutApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getElementEntry = function () {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);

        };
        self.addElementEntry = function (payload) {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.editElementEntry = function (payload) {
            var serviceURL = paasServiceHost + "elementEntry";
            var headers = {
            };

            return serviceConfig.callPutApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getElementEnteryById = function (id) {
            var serviceURL = paasServiceHost + "elementEntery/" + id;
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getElementEntryValue = function () {
            var serviceURL = paasServiceHost + "elementEnteryValue";
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);

        };
        self.addElementEntryValue = function (payload) {
            var serviceURL = paasServiceHost + "elementEnteryValue";
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.editElementEntryValue = function (payload) {
            var serviceURL = paasServiceHost + "elementEnteryValue";
            var headers = {
            };

            return serviceConfig.callPutApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getPositionEmails = function (positionCode, personId) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "positionCode" : positionCode, "personId" : personId, "reportName" : "GetPositionEmailsReport"
            }
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.addIdentificationLetters = function (payload) {
            var serviceURL = paasServiceHost + "identificationLetters";
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.editIdentificationLetters = function (payload) {
            var serviceURL = paasServiceHost + "identificationLetters";
            var headers = {
            };

            return serviceConfig.callPutApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getIdentificationLettersbyId = function (id) {
            var serviceURL = paasServiceHost + "identificationLetters/" + id;
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getIdentificationLetters = function (personNumber) {
            var serviceURL = paasServiceHost + "identificationLetters";
            var headers = {
                "personNumber" : personNumber
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getIdentificationLettersReport = function (withSalary, language, personNum, directTo) {
            var reportName = '';
            if (withSalary !== 'Yes') {
                if (language !== 'AR') {
                    reportName = 'ID_LETTER_ENG_NO_SAL_REPORT'
                }
                else {
                    reportName = 'ID_LETTER_AR_NO_SAL_REPORT'
                }
            }
            else {
                if (language == 'EN') {
                    reportName = 'ID_LETTER_REPORT'
                }
                else {
                    reportName = 'ID_LETTER_AR_REPORT'
                }
            }

            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "reportName" : "ID_LETTER_REPORT", "reportSubName" : reportName, "EMP_NO" : personNum, "CF_DIRECTTO" : directTo
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getEmpDetails = function (username2, token, hostURL) {

            var serviceURL = restPath + "emp/info?username2=" + username2 + "&token=" + token + "&hostURL=" + hostURL;
            var headers = {
            };
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.sendEmail = function (notiType, ssType, reciverEmail) {

            var serviceURL = restPath + "mail/sendNotification";
            payload = {
                "NOTI_TYPE" : notiType, "SS_TYPE" : ssType, "TO" : reciverEmail
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getEmpDetailsbyPersonId = function (personId, token, hostURL) {

            var serviceURL = restPath + "emp/infoById?personId=" + personId + "&token=" + token + "&hostURL=" + hostURL;
            var headers = {
            };
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.searchEmployees = function (name, nationalId, personNumber, managerId, effectiveAsof, token, hostURL) {

            var serviceURL = restPath + "emp/searchEmployees?name=" + name + "&nationalId=" + nationalId + "&personNumber=" + personNumber + "&managerId=" + managerId + "&effectiveAsof=" + effectiveAsof + "&token=" + token + "&hostURL=" + hostURL;
            var headers = {
            };
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.submitElementEntry = function (payload) {
            var serviceURL = appServiceHost + restPath + "upload/elementEntry";
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getGrades = function (userName, token, hostURL) {
            var serviceURL = restPath + "graderest/grades?username=" + name + "&token=" + token + "&hostURL=" + hostURL;
            var headers = {
            };
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };
        self.getEmployees = function (userName, token, hostURL) {
            var serviceURL = restPath + "emp/getEmployees?username=" + name + "&token=" + token + "&hostURL=" + hostURL;
            var headers = {
            };
            return serviceConfig.callGetService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getEmployeeFuseModelReport = function (personId) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "person_id" : personId, "reportName" : "EMPLOYEE_FUSE_REPORT"
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getHDLFiles = function (id, ssType, personNumber, effectiveDate, processedInPayroll, assigment) {
            var serviceURL = paasServiceHost + "HDL";
            var headers = {

            };

            if (id) {
                headers.id = id;
            }

            if (ssType) {
                headers.SS_TYPE = ssType;
            }

            if (effectiveDate) {
                headers.CREATION_DATE = effectiveDate;
            }

            if (personNumber) {
                headers.PERSON_NUMBER = personNumber;
            }

            if (processedInPayroll) {
                headers.STATUS = processedInPayroll;
            }

            if (assigment) {
                headers.ASSIGNMENT_STATUS_TYPE = assigment;
            }

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.processElementEntry = function (payload) {
            var serviceURL = appServiceHost + restPath + "upload/elementEntry";
            var headers = {

            };
            return serviceConfig.callPutService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getWprkFlowAppovalList = function (ServiceTtype) {
            var serviceURL = paasServiceHost + "WprkFlowAppovalList";
            var headers = {
                "ServiceTtype" : ServiceTtype
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getApexLookup = function (name) {
            var serviceURL = paasServiceHost + "lookupValue";
            var headers = {

            };
            if (name) {
                headers.NAME = name;
            }

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getPasSLookup = function () {
            var serviceURL = paasServiceHost + "LOOKUP";
            var headers = {

            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };
        self.editApprovals = function (payload) {
            var serviceURL = paasServiceHost + "updateApprovals";
            var headers = {
            };

            return serviceConfig.callPutApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getEmployeePayrollReport = function (personId) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "personID" : personId, "reportName" : "Employee Payrol Report"

            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getLastStepApproval = function (id, ssType) {
            var serviceURL = paasServiceHost + "getLastApprovalStep";
            var headers = {
                "TransactionId" : id, "serviceType" : ssType
            };
            console.log(headers);

            //            headers.Authorization = "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA=="
            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.getReport = function (reportName) {
            var serviceURL = paasServiceHost + "report";
            var headers = {
                "reportName" : reportName
            };

            //            headers.Authorization = "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA=="
            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };
        //
        self.deleteSelfService = function (headers) {
            var serviceURL = paasServiceHost + "deleteSelfService";
            var payload = {
            };
            //  headers.Authorization = "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA==";
            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
            //return serviceConfig.callDeleteApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };
        self.getPayrollReport = function (personId) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "reportName" : "EmployeePrepaymentInPeriodReport"
            };

            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };
        self.getWorkflowApprovalPAAS = function (id) {
            var serviceURL = paasServiceHost + "workflowApprovalPAAS";
            var headers = {
            };

            //            headers.Authorization = "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA=="
            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };

        self.updateWorkflowApprovalPAAS = function (payload) {
            var serviceURL = paasServiceHost + 'workflowApprovalPAAS';
            var headers = {
            };

            return serviceConfig.callPostApexService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, true, headers);
        };

        self.getAllPositions = function () {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "reportName" : "GetAllPositions"

            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, false, headers);
        };

        self.getElementNames = function (id) {
            var serviceURL = paasServiceHost + "ElementName";
            var headers = {
            };

            return serviceConfig.callGetApexService(serviceURL, serviceConfig.contentTypeApplicationJSON, headers, true);
        };
        
        self.getPersonFuseModelReport = function (personId) {
            var serviceURL = appServiceHost + restPath + biReportServletPath;
            var payload = {
                "person_id" : personId, "reportName" : "PersonFuseReport"
            };
            var headers = {

            };
            return serviceConfig.callPostService(serviceURL, payload, serviceConfig.contentTypeApplicationJSON, false, headers);
        };

    };

    return new services();
});