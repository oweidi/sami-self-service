package com.nadec.selfservice.common.selfservicetypes;

public class Type {
    
    public static enum SERVICE_NAME { 
            ADVANCE_HOUSING("AH"), 
            BUSINESS_TRIP("BT"),
            FAMILY_VISA_REFUND("FVR"),
            BUSNIESS_TRIP_DRIVER("BTD"),
            EMPLOYEE_ALLOWANCE("EA"),
            CHILDREN_EDUCTION_EXPENSE("CEE"),
            REWARD_REQUEST_SERVICE("RRS"),
            BUSINESS_TRIP_RETURN("BTR"),
            EMPLOYEE_TICKET_SERVICE("TR"),
            PENALTIES_DEDUCTION("PLN"),
            EMPLOYEE_TICKET_Refund_SERVICE("TRF"),
            CHANGE_HOUSING_REQUEST("CHT"),
            STOP_ALLOWANCE_REQUEST("STA"),
            RETURN_AFTER_LEAVE("RAL"),
            ADVANCED_ANNUAL_LEAVE("AAL");
            private String value;
            
            private SERVICE_NAME(String value) {this.value = value;}
            public String getValue() {return value;}
            
    };
    public static enum ALLOWANCE_TYPE { 
            CAR_ALLOWANCE("CAR_ALLOWANCE"), 
            DUTY_ALLOWANCE("DUTY_ALLOWANCE"),
            FIELD_ALLOWANCE("FIELD_ALLOWANCE"),
            FOOD_ALLOWANCE("FOOD_ALLOWANCE"),
            HOUSING_ALLOWANCE("HOUSING_ALLOWANCE"),
            MOTIVATION_ALLOWANCE("MOTIVATION_ALLOWANCE"),
            RELOCATION_ALLOWANCE("RELOCATION_ALLOWANCE"),
            TRANSPORTATION_ALLOWANCE("TRANSPORTATION_ALLOWANCE"),
            MOBILE_ALLOWANCE("MOBILE_ALLOWANCE");
    
            private String value;
            
            private ALLOWANCE_TYPE(String value) {this.value = value;}
            public String getValue() {return value;}
            
    };
}
