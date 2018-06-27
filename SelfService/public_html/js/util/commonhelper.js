define([], function () {

    function commonHelper() {
        var self = this;

        self.getSaaSHost = function () {
            var host = "http://192.168.1.118:7101/EBSMobile/rest";
            return host;
        };

        self.getPaaSHost = function () {
            var host = "https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/";
            return host;
        };

        self.getAppHost = function () {
            var host = "/SamiSelfService/";
            return host;
        };

        self.BTRIP_TYPE = 'XXX_HR_BTRIP_TYPE';
        self.YES_NO = 'YES_NO';
        self.ADV_MONTHS = 'NADEC_HOUSING_IN_ADV_MONTHS';
        self.SA_BANKS ="SA_BANKS";
        self.SAUDI_NATIONALITY = 'SAUDI';
        self.EMPLOYMENT_STATUS = 'FAMILY';
        self.GRADE_ABOVE_P1 = '1';
        self.BTRIPDRIVER_TYPE = 'NADEC_BT_DRIVER_TYPE';
        self.BTRIPDRIVER_AREA = 'NADEC_BT_DRIVER_AREA';
        self.HRC_YES_NO = 'HRC_YES_NO';
        self.NADEC_HR_ID_MAIL_TYPE = 'SAMI_HR_ID_MAIL_TYPE';
        self.NADEC_HR_IDENTIFICATION_LANG = 'SAMI_HR_IDENTIFICATION_LANG';
        self.HR_GRIEVANCE_TYPE = 'XXX_HR_GRIEVANCE_TYPE';//added
        self.HR_GRIEVANCE_STATUS = 'XXX_HR_GRIEVANCE_STATUS';//added
        self.HR_MGR_GRIEVANCE_STATUS = 'XXX_HR_MGR_GRIEVANCE_STATUS';//added
        self.HR_HEAD_GRIEVANCE_STATUS = 'XXX_HR_HEAD_HR_GRI_STATUS';//added
        self.HR_HEAD_HR_GRIEVANCE_STATUS = 'XXX_HR_HEAD_HR_GRIEVANCE_STATU';
        self.EDU_YEARS = 'NADEC_HR_EDU_YEARS';
        self.EDU_SEMESTER = 'NADEC_HR_EDU_SEMESTER';
        self.HR_ALLOWANCES = 'XXX_HR_ALLOWANCES';
        self.HR_TICKETS_ROUTES = 'XXX_HR_TICKETS_ROUTES';
        self.NADEC_BTR_ROUTE_TYPE = 'NADEC_BTR_ROUTE_TYPE';
        self.HR_CITIES_AND_COUNTRIES = "XXX_HR_CITIES_AND_COUNTRIES";
        self.HR_TICKETS_REASONS = "XXX_HR_TICKETS_REASONS";
        self.HR_TICKETS_CLASS = "XXX_HR_TICKETS_CLASS";
        self.NADEC_CAR_INSIDE_LOV = "NADEC_CAR_INSIDE_LOV";
        self.HR_CAR_LOCATION = "XXX_HR_CAR_LOCATION";
        self.HR_NADEC_HOUSING_PERIOD = 'XXX_HR_NADEC_HOUSING_PERIOD';
        self.NADEC_TICKET_RAUTES_NEW_US = "NADEC_TICKET_RAUTES_NEW_US";
        self.NADEC_TICKET_REFUND = "NADEC_TICKET_REFUND";
        self.NADEC_TRIP_DIRECTION_1="NADEC_TRIP_DIRECTION_1";
        self.HR_ADMINISTRATIVE_INVESTIG="XXX_HR_ADMINISTRATIVE_INVESTIG";
        self.HR_CARD_TYPES = "XXX_HR_CARD_TYPES";
        self.NADEC_MEDICAL_INSURANCE_TYPE="NADEC_MEDICAL_INSURANCE_TYPE";
        self.NADEC_MEDICAL_INSURANCE_REASON="NADEC_MEDICAL_INSURANCE_REASON";

        self.REPORT_DATA_TYPE = {
            UDT : 'UDT', LOOKUP : 'LOOKUP', TERRITORIES : 'TERRITORIES'
        };

        self.FUSE_SERVICE_PARAM = {
            BINDLOOKUPTYPE : self.BTRIP_TYPE + ',' + self.YES_NO + ',' + self.ADV_MONTHS + ',' + self.SA_BANKS + ',' + self.BTRIPDRIVER_TYPE + ',' + self.BTRIPDRIVER_AREA + ',' + self.HRC_YES_NO + ',' + self.NADEC_HR_ID_MAIL_TYPE + ',' + self.NADEC_HR_IDENTIFICATION_LANG + ',' + self.HR_TICKETS_ROUTES + ',' + self.HR_TICKETS_REASONS + ',' + self.HR_TICKETS_CLASS + ',' + self.HR_GRIEVANCE_TYPE + ',' + self.HR_GRIEVANCE_STATUS + ',' + self.HR_MGR_GRIEVANCE_STATUS + ',' + self.HR_HEAD_GRIEVANCE_STATUS + ',' + self.EDU_YEARS + ',' + self.EDU_SEMESTER + ',' + self.HR_ALLOWANCES + ',' + self.NADEC_BTR_ROUTE_TYPE + ',' + self.HR_HEAD_HR_GRIEVANCE_STATUS + ',' + self.NADEC_CAR_INSIDE_LOV+ ',' + self.HR_CAR_LOCATION+','+ self.NADEC_TICKET_RAUTES_NEW_US+','+self.HR_NADEC_HOUSING_PERIOD+','+ self.NADEC_TICKET_REFUND+','+ self.NADEC_TRIP_DIRECTION_1+','+ self.NADEC_MEDICAL_INSURANCE_TYPE+','+ self.NADEC_MEDICAL_INSURANCE_REASON+','+self.NADEC_TICKET_RAUTES_NEW_US,
            P_TABLE_NAME : 'XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET,XXX_HR_PART_OF_EOS_AMT,XXX_HR_GLOBAL_VALUES,XXX_HR_ALLOWANCES_DETAILS,' + self.NADEC_BTR_ROUTE_TYPE, BINDLANGUAGE : 'US'
        };

        self.getBiReportServletPath = function () {
            var host = "report/commonbireport";
            return host;
        };

        self.getInternalRest = function () {
            var host = "rest/";
            return host;
        };

    }

    return new commonHelper();
});
