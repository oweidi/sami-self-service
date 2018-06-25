package com.nadec.selfservice.common.selfservicetypes;

public class LookupType {
    
    private String dataType;
    private String tableName;
    private String colName;
    private String rowName;
    private String udtValue;
    private String lookupCode;
    private String lookupValue;
    private String lookupType;
    private String territoryCode;
    private String territoryValue;
    


    public static enum LOOKUP_NAMES {
        BTRIP_TYPE("XXX_HR_BTRIP_TYPE"),
        YES_NO("YES_NO"),
        ADV_MONTHS("NADEC_HOUSING_IN_ADV_MONTHS"),
        SA_BANKS("SA_BANKS"),
        BTRIPDRIVER_TYPE("NADEC_BT_DRIVER_TYPE"),
        BTRIPDRIVER_AREA("NADEC_BT_DRIVER_AREA"),
        HRC_YES_NO("HRC_YES_NO"),
        NADEC_HR_ID_MAIL_TYPE("NADEC_HR_ID_MAIL_TYPE"),
        NADEC_HR_IDENTIFICATION_LANG("NADEC_HR_IDENTIFICATION_LANG"),
        HR_GRIEVANCE_TYPE("XXX_HR_GRIEVANCE_TYPE"), //added
        HR_GRIEVANCE_STATUS("XXX_HR_GRIEVANCE_STATUS"), //added
        HR_MGR_GRIEVANCE_STATUS("XXX_HR_MGR_GRIEVANCE_STATUS"), //added
        HR_HEAD_GRIEVANCE_STATUS("XXX_HR_HEAD_HR_GRI_STATUS"), //added
        HR_HEAD_HR_GRIEVANCE_STATUS("XXX_HR_HEAD_HR_GRIEVANCE_STATU"),
        EDU_YEARS("NADEC_HR_EDU_YEARS"),
        EDU_SEMESTER("NADEC_HR_EDU_SEMESTER"),
        HR_ALLOWANCES("XXX_HR_ALLOWANCES"),
        HR_TICKETS_ROUTES("XXX_HR_TICKETS_ROUTES"),
        NADEC_BTR_ROUTE_TYPE("NADEC_BTR_ROUTE_TYPE"),
        HR_CITIES_AND_COUNTRIES("XXX_HR_CITIES_AND_COUNTRIES"),
        HR_TICKETS_REASONS("XXX_HR_TICKETS_REASONS"),
        HR_TICKETS_CLASS("XXX_HR_TICKETS_CLASS"),
        NADEC_CAR_INSIDE_LOV("NADEC_CAR_INSIDE_LOV"),
        HR_CAR_LOCATION("XXX_HR_CAR_LOCATION"),
        HR_NADEC_HOUSING_PERIOD("XXX_HR_NADEC_HOUSING_PERIOD"),
        NADEC_TICKET_RAUTES_NEW_US("NADEC_TICKET_RAUTES_NEW_US"),
        NADEC_TICKET_REFUND("NADEC_TICKET_REFUND"),
        NADEC_TRIP_DIRECTION_1("NADEC_TRIP_DIRECTION_1");

        private String value;

        private LOOKUP_NAMES(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }
    
    public static enum UDT_NAMES {
        XXX_HR_REG_BTRIP_DAYS_B("XXX_HR_REG_BTRIP_DAYS_B"),
        XXX_HR_TRAIN_BTRIP_DAYS_B("XXX_HR_TRAIN_BTRIP_DAYS_B"),
        XXX_HR_REG_BTRIP_DAYS_A("XXX_HR_REG_BTRIP_DAYS_A"),
        XXX_HR_TRAIN_BTRIP_DAYS_A("XXX_HR_TRAIN_BTRIP_DAYS_A"),
        XXX_HR_REG_BTRIP_PERDIEM("XXX_HR_REG_BTRIP_PERDIEM"),
        XXX_HR_TRAIN_BTRIP_PERDIEM("XXX_HR_TRAIN_BTRIP_PERDIEM"),
        XXX_HR_REG_BTRIP_TICKET("XXX_HR_REG_BTRIP_TICKET"),
        XXX_HR_TRAIN_BTRIP_TICKET("XXX_HR_TRAIN_BTRIP_TICKET"),
        XXX_HR_PART_OF_EOS_AMT("XXX_HR_PART_OF_EOS_AMT"),
        XXX_HR_GLOBAL_VALUES("XXX_HR_GLOBAL_VALUES"),
        XXX_HR_ALLOWANCES_DETAILS("XXX_HR_ALLOWANCES_DETAILS");

        private String value;

        private UDT_NAMES(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }
    public static enum REPORT_DATA_TYPE {
        UDT("UDT"),
        LOOKUP("LOOKUP"),
        TERRITORIES("TERRITORIES");

        private String value;

        private REPORT_DATA_TYPE(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }
    

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getDataType() {
        return dataType;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setColName(String colName) {
        this.colName = colName;
    }

    public String getColName() {
        return colName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public String getRowName() {
        return rowName;
    }

    public void setUdtValue(String udtValue) {
        this.udtValue = udtValue;
    }

    public String getUdtValue() {
        return udtValue;
    }

    public void setLookupCode(String lookupCode) {
        this.lookupCode = lookupCode;
    }

    public String getLookupCode() {
        return lookupCode;
    }

    public void setLookupValue(String lookupValue) {
        this.lookupValue = lookupValue;
    }

    public String getLookupValue() {
        return lookupValue;
    }

    public void setLookupType(String lookupType) {
        this.lookupType = lookupType;
    }

    public String getLookupType() {
        return lookupType;
    }

    public void setTerritoryCode(String territoryCode) {
        this.territoryCode = territoryCode;
    }

    public String getTerritoryCode() {
        return territoryCode;
    }

    public void setTerritoryValue(String territoryValue) {
        this.territoryValue = territoryValue;
    }

    public String getTerritoryValue() {
        return territoryValue;
    }

}
