package com.nadec.selfservice.common.servlets.elemententryservlets;

import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.businesstrip.EmployeeDetails;
import com.nadec.selfservice.common.bipreports.BIPReports;
import com.nadec.selfservice.common.bipreports.BIReportModel;
import com.nadec.selfservice.common.elementEntry.HCMElementEntryHelper;

import org.json.JSONObject;

import com.nadec.selfservice.common.selfservicetypes.Type;

import java.util.HashMap;
import java.util.Map;

public class ElementEntryHelper {


    protected String createHelperAH(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName =
                "Housing in Advance Driven"; //Business Trip Driver Payment
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Housing in Advance Driven"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");
            //100002_HA_10_INSTALLMENT
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 = jsonObj.getString("housingAmount");

            String lineSourceSystemId6 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_NO_MONTH_REMAIN";
            String lineInputValueName6 = "Number Of Housing";
            String lineScreenEntryValue6 =
                jsonObj.getString("nrOfMonthRemInContract");

            //100002_HA_10_HOUSINGAMOUNT
            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_PAY_DATE";
            String lineInputValueName2 = "Payment Date"; //    Area
            String lineScreenEntryValue2 = jsonObj.getString("payDate");


            //            100002_HA_10_REQUESTID
            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_FIRST_INST_DATE";
            String lineInputValueName3 = "First Installment Date";
            String lineScreenEntryValue3 = jsonObj.getString("firstInsDate");

            //100002_HA_10_INITIALAMOUNT
            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_NO_OF_INST";
            String lineInputValueName4 = "Number Of Installment";
            String lineScreenEntryValue4 =
                jsonObj.getString("numbersOfMonthsDesired");

            //100002_HA_10_HOUSINGMONTH
            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_TRANS_ID";
            String lineInputValueName5 = "TRANSACTION_ID";
            String lineScreenEntryValue5 = jsonObj.getString("id");

            String lineSourceSystemId7 =
                jsonObj.getString("personNumber") + "_HA_" +
                jsonObj.getString("id") + "_INIT_AMOUNT";
            String lineInputValueName7 = "Initial Amount";
            String lineScreenEntryValue7 = jsonObj.getString("initialAmount");

            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;
            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;
            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;
            String linedata6 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId6 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName6 + "|" +
                lineScreenEntryValue6;

            String linedata7 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId7 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName7 + "|" +
                lineScreenEntryValue7;
            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n" +
                linedata6 + "\n" +
                linedata7;

            //            //100002_HA_10_INSTALLMENT
            //            String lineSourceSystemId1 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_INSTALLMENT";
            //            String lineInputValueName1 = "Installment Amount";
            //            String lineScreenEntryValue1 =
            //                jsonObj.getString("installmentAmount");
            //
            //            //100002_HA_10_HOUSINGAMOUNT
            //            String lineSourceSystemId2 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_HOUSINGAMOUNTT";
            //            String lineInputValueName2 = "Housing Amount";//    Area
            //            String lineScreenEntryValue2 = jsonObj.getString("housingAmount");
            //
            //
            //            //            100002_HA_10_REQUESTID
            //            String lineSourceSystemId3 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_REQUESTID";
            //            String lineInputValueName3 = "Request ID";
            //            String lineScreenEntryValue3 = jsonObj.getString("id");
            //
            //            //100002_HA_10_INITIALAMOUNT
            //            String lineSourceSystemId4 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_INITIALAMOUNT";
            //            String lineInputValueName4 = "Initial Amount";
            //            String lineScreenEntryValue4 = jsonObj.getString("initialAmount");
            //
            //            //100002_HA_10_HOUSINGMONTH
            //            String lineSourceSystemId5 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_HOUSINGMONTH";
            //            String lineInputValueName5 = "Housing Month No";
            //            String lineScreenEntryValue5 =
            //                jsonObj.getString("numbersOfMonthsDesired");
            //
            //            String trsId = jsonObj.getString("trsId");
            //             String headerdata =
            //                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
            //                sourceSystemId + "|" + EffectiveStartDate + "|" +
            //                EffectiveEndDate + "|" + ElementName + "|" +
            //                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
            //                EntryType + "|" + CreatorType;
            //              String linedata1 =
            //                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            //                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
            //                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            //                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            //                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
            //                lineScreenEntryValue1;
            //            String linedata2 =
            //                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            //                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
            //                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            //                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            //                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
            //                lineScreenEntryValue2;
            //            String linedata3 =
            //                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            //                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
            //                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            //                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            //                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
            //                lineScreenEntryValue3;
            //            String linedata4 =
            //                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            //                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
            //                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            //                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            //                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
            //                lineScreenEntryValue4;
            //            String linedata5 =
            //                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            //                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
            //                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            //                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            //                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
            //                lineScreenEntryValue5;
            //
            //            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
            //                headerdata + "\n" +
            //                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
            //                linedata1 + "\n" +
            //                linedata2 + "\n" +
            //                linedata3 + "\n" +
            //                linedata4 + "\n" +
            //                linedata5 + "\n";

            //            String fileContent = HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" + headerdata + "\r\n" + HCMElementEntryHelper.ELEMENT_LINE + "\r\n" + linedata1 + "\r\n" + linedata2 + "\r\n" + linedata3 + "\r\n" + linedata4 + "\r\n" + linedata5;
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata6 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5 + "\r\n" +
                linedata7;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "AH",
                                        jsonObj.getString("personNumber"),
                                        filename);


        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperBT(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {
//            System.out.println(jsonObj);
            String sourceSystemOwner = "PaaS";
            String sourceSystemId = jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = jsonObj.getString("elementName");
            String LegislativeDataGroupName =
                jsonObj.getString("legislativeDataGroupName");
            String AssignmentNumber = jsonObj.getString("assignmentNumber");
            String EntryType = jsonObj.getString("entryType");
            String CreatorType = jsonObj.getString("creatorType");

            //
            String lineSourceSystemOwner = sourceSystemOwner;
            String lineElementEntryId = sourceSystemId;
            String lineEffectiveStartDate = EffectiveStartDate;
            String lineEffectiveEndDate = EffectiveEndDate;
            String lineElementName = ElementName;
            String lineLegislativeDataGroupName = LegislativeDataGroupName;
            String lineAssignmentNumber = AssignmentNumber;
            //
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_TYPE";
            String lineInputValueName1 = "Btrip Type";
            String lineScreenEntryValue1 = jsonObj.getString("BTType");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_AREA";

            String lineInputValueName2 = "Btrip Area";
            String lineScreenEntryValue2 = jsonObj.getString("BTArea");

            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_FOOD";

            String lineInputValueName3 = "Food Type";
            String lineScreenEntryValue3 =
                jsonObj.isNull("BTFood") ? "" : jsonObj.getString("BTFood");

            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_HTYPE";

            String lineInputValueName4 = "Housing Type";
            String lineScreenEntryValue4 =
                jsonObj.isNull("BTHousing") ? "" : jsonObj.getString("BTHousing");


            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_TTYPE";

            String lineInputValueName5 = "Transportation Type";
            String lineScreenEntryValue5 =
                jsonObj.isNull("BTTransportation") ? "" :
                jsonObj.getString("BTTransportation");


            String lineSourceSystemId6 =
                jsonObj.getString("personNumber") + "_BT_" +
                jsonObj.getString("BTID") + "_Duration ";

            String lineInputValueName6 = "Duration";
            String lineScreenEntryValue6 =
                jsonObj.isNull("BTDuration") ? "" : jsonObj.getString("BTDuration");


//            String lineSourceSystemId7 =
//                jsonObj.getString("personNumber") + "_BT_" +
//                jsonObj.getString("BTID") + "_BTid ";
//
//            String lineInputValueName7 = "Transaction ID ";
//            String lineScreenEntryValue7 = jsonObj.getString("BTID");


            String trsId = jsonObj.getString("trsId");


            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;

            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;

            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;

            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;

            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;

            String linedata6 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId6 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName6 + "|" +
                lineScreenEntryValue6;

//            String linedata7 =
//                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
//                lineSourceSystemId7 + "|" + lineElementEntryId + "|" +
//                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
//                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
//                lineAssignmentNumber + "|" + lineInputValueName7 + "|" +
//                lineScreenEntryValue7;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n" +
                linedata6; //+ "\n" +
             //   linedata7 ;

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5 + "\r\n" +
                linedata6;// + "\r\n" +
               // linedata7 ;

            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "BT",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperFVR(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {

            String sourceSystemOwner = "PaaS";
            String sourceSystemId =
                "NFVR_" + jsonObj.getString("personNumber");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = "Family Visa Refund";
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";

            String lineSourceSystemOwner = "PaaS";
            String lineElementEntryId =
                "NFVR_" + jsonObj.getString("personNumber");
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Family Visa Refund";
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");


            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_FA_" +
                jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 = jsonObj.getString("amount");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_FA_" +
                jsonObj.getString("id") + "_TRANSACTION_ID";
            String lineInputValueName2 = "Transaction ID";
            String lineScreenEntryValue2 = jsonObj.getString("id");

            String trsId = jsonObj.getString("trsId");


            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;

            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "FVR",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperBTD(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PAAS";

            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId =
                jsonObj.getString("personNumber") + "BTD" + jsonObj.getString("id"); ////100002_BTD_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            //String ElementName = "Business Trip Driver Payment";//Business Trip Driver Payment
            String ElementName =
                "Business Trip Driver Allowance"; //Business Trip Driver Payment
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            // String lineElementEntryId = jsonObj.getString("id");
            String lineElementEntryId = sourceSystemId;

            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Business Trip Driver Allowance"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");


            //            //100002_HA_10_INSTALLMENT
            //            String lineSourceSystemId1 =
            //                jsonObj.getString("personNumber") + "_HA_" +
            //                jsonObj.getString("id") + "_INSTALLMENT";
            //            String lineInputValueName1 = "Installment Amount";
            //            String lineScreenEntryValue1 =
            //                jsonObj.getString("installmentAmount");

            //100002_HA_10_HOUSINGAMOUNT
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_BTD_" +
                jsonObj.getString("id") + "_COUNTRY";
            String lineInputValueName1 = "Country"; //    Area
            String lineScreenEntryValue1 = jsonObj.getString("area");
            

            //            100002_HA_10_REQUESTID
            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_BTD_" +
                jsonObj.getString("id") + "_TRANSACTIONID";
            String lineInputValueName2 = "Transaction ID";
            String lineScreenEntryValue2 = jsonObj.getString("id");
             
            //100002_HA_10_INITIALAMOUNT
            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_BTD_" +
                jsonObj.getString("id") + "_KM";
            String lineInputValueName3 = "KM";
            String lineScreenEntryValue3 = jsonObj.getString("totalKm");

            //100002_HA_10_HOUSINGMONTH
            String lineSourceSystemId4 = 
                jsonObj.getString("personNumber") + "_BTD_" +
                jsonObj.getString("id") + "_NO_TRIP";
            String lineInputValueName4 = "No_Trip";
            String lineScreenEntryValue4 = jsonObj.getString("tripsNumber");

            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;
            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;

            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "BTD",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperCEE(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = "Education Reimbursement";
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Education Reimbursement"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");


            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_CEE_" +
                jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 = jsonObj.getString("amount");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_CEE_" +
                jsonObj.getString("id") + "_REQUESTID";
            String lineInputValueName2 = "Request_ID";
            String lineScreenEntryValue2 = jsonObj.getString("id");


            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "CEE",
                                        jsonObj.getString("personNumber"),
                                        filename);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperRRS(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PaaS";
           
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = jsonObj.getString("elementName");
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PaaS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = ElementName; //
            String lineLegislativeDataGroupName = LegislativeDataGroupName;
            String lineAssignmentNumber =AssignmentNumber;
               


            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_RRS_" +
                jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 =
                jsonObj.getString("requestedAmount");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_RRS_" +
                jsonObj.getString("id") + "_REQUESTID";
            String lineInputValueName2 = "Transaction ID";
            String lineScreenEntryValue2 = jsonObj.getString("id");


            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "RRS",
                                        jsonObj.getString("personNumber"),
                                        filename);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    protected String createHelperBTR(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {
            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName =
                "Business Trip Driven"; //Business Trip Driver Payment
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Business Trip Driven"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");


            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_REQUEST_ID";
            String lineInputValueName1 = "Request ID";
            String lineScreenEntryValue1 = jsonObj.getString("id");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_TYPE";
            String lineInputValueName2 = "Type "; //    Area
            String lineScreenEntryValue2 = jsonObj.getString("typeVal");


            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_BTRIPDAYS";
            String lineInputValueName3 = "Business Trip Days";
            String lineScreenEntryValue3 = jsonObj.getString("numberofdays");

            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_ACCOMPROVIDED";
            String lineInputValueName4 = "Accommodation Provided";
            String lineScreenEntryValue4 = jsonObj.getString("accommodation");

            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_ACCOMAMOUNT";
            String lineInputValueName5 = "Accommodation Amount";
            String lineScreenEntryValue5 =
                jsonObj.getString("accomodationAmount");


            String lineSourceSystemId6 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_TRANSPROVIDED";
            String lineInputValueName6 = "Transportation Provided";
            String lineScreenEntryValue6 = jsonObj.getString("transport");

            String lineSourceSystemId7 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_TRANSAMOUNT";
            String lineInputValueName7 = "Transportation Amount";
            String lineScreenEntryValue7 =
                jsonObj.getString("transportationAmount");

            String lineSourceSystemId8 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_PERDIEM";
            String lineInputValueName8 = "Per-Diem";
            String lineScreenEntryValue8 = jsonObj.getString("perdiem");

            String lineSourceSystemId9 =
                jsonObj.getString("personNumber") + "_BTR_" +
                jsonObj.getString("id") + "_ADVAMOUNT";
            String lineInputValueName9 = "Advance Amount";
            String lineScreenEntryValue9 = jsonObj.getString("advanceamount");

            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;
            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;
            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;
            String linedata6 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId6 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName6 + "|" +
                lineScreenEntryValue6;
            String linedata7 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId7 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName7 + "|" +
                lineScreenEntryValue7;
            String linedata8 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId8 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName8 + "|" +
                lineScreenEntryValue8;
            String linedata9 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId9 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName9 + "|" +
                lineScreenEntryValue9;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n";

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5 + "\r\n" +
                linedata6 + "\r\n" +
                linedata7 + "\r\n" +
                linedata8 + "\r\n" +
                linedata9;
            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "BTR",
                                        jsonObj.getString("personNumber"),
                                        filename);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    //

    protected String createHelperEA(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        EmployeeDetails employeeDetails = new EmployeeDetails();
        
        String filename = "Worker";
        try {
            EmployeeBean emp =
                employeeDetails.getEmpDetailsByPersonNum(jsonObj.getString("personNumber"),
                                                    null, null);
            
            String sourceSystemOwner = "NADEC";
            String sourceSystemId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String AssignmentNumber = "ET" + jsonObj.getString("personNumber");
            String AssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String AssignmentType = "ET";
            String EffectiveSequence = "1";
            String EffectiveLatestChange = "Y";
            String SystemPersonType = "EMP";
            String BusinessUnitShortCode = "KSA AGRICULTURE BU";
            String LegalEmployerName = emp.getOrganizationName();
            String PersonTypeCode = "Employee";
            String PersonNumber = jsonObj.getString("personNumber");

            String lineSourceSystemOwner = "NADEC";
            String lineSourceSystemId =
                jsonObj.getString("personNumber") + "_ASSIGNEMENT";
            String lineWorkTermsAssignmentId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String linePeriodOfServiceId =
                jsonObj.getString("personNumber") + "_WORKREL";
            String lineActionCode = "HIRE";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");
            String lineWorkTermsNumber =
                "ET" + jsonObj.getString("personNumber");
            String lineAssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String lineAssignmentType = "E";
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineBusinessUnitShortCode = "KSA AGRICULTURE BU";
            String lineSystemPersonType = "EMP";
            String linePersonTypeCode = "Employee";
            String lineLegalEmployerName = emp.getOrganizationName();
            String lineEffectiveSequence = "1";
            String lineEffectiveLatestChange = "Y";
            String lineReasonCode = "NEWHIRE";
            String linePersonNumber = jsonObj.getString("personNumber");
            String lineWorkAtHomeFlag = "N";
            String lineManagerFlag = "N";
            String lineHourlySalariedCode = "S";
            String lineNormalHours = "";
            String lineFrequency = "";
            String lineAssignmentCategory = "KSA_AGRICULTURE";
            String linePeopleGroup =updatePeopleGroup(emp.getPeopleGroup(), jsonObj.getString("housingType"),jsonObj.getString("housingAllowance")); 

            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|WorkTerms|" + sourceSystemOwner + "|" + sourceSystemId +
                "|" + linePeriodOfServiceId + "|" + lineActionCode + "|" +
                AssignmentNumber + "|" + AssignmentStatusTypeCode + "|" +
                AssignmentType + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + EffectiveSequence + "|" +
                EffectiveLatestChange + "|" + SystemPersonType + "|" +
                BusinessUnitShortCode + "|" + LegalEmployerName + "|" +
                PersonTypeCode + "|" + PersonNumber;
            //

            String linedata1 =
                "MERGE|Assignment|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId + "|" + lineWorkTermsAssignmentId + "|" +
                linePeriodOfServiceId + "|" + lineActionCode + "|" +
                lineAssignmentNumber + "|" + lineWorkTermsNumber + "|" +
                lineAssignmentStatusTypeCode + "|" + lineAssignmentType + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineBusinessUnitShortCode + "|" + lineSystemPersonType + "|" +
                linePersonTypeCode + "|" + lineLegalEmployerName + "|" +
                lineEffectiveSequence + "|" + lineEffectiveLatestChange + "|" +
                lineReasonCode + "|" + linePersonNumber + "|" +
                lineWorkAtHomeFlag + "|" + lineManagerFlag + "|" +
                lineHourlySalariedCode + "|" + lineNormalHours + "|" +
                lineFrequency + "|" + lineAssignmentCategory + "|" +
                linePeopleGroup;
            //
            String toBytes =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\n" +
                linedata1 + "\n";

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\r\n" +
                linedata1;

            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "EA",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;

    }
    protected String createHelperPD(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = "Penalties Deduction";
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Penalties Deduction"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");

            
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_PD_" +
                jsonObj.getString("id") + "_TRANSACTIONID";
            String lineInputValueName1 = "Transaction ID";
            String lineScreenEntryValue1 = jsonObj.getString("trsId");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_PD_" +
                jsonObj.getString("id") + "_DEDUCTIONHOURS";
            String lineInputValueName2 = "Deduction Hours";
            String lineScreenEntryValue2 = jsonObj.getString("deductionHours");

            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_PD_" +
                jsonObj.getString("id") + "_DEDUCTIONDAYS";
            String lineInputValueName3 = "Deduction Days";
            String lineScreenEntryValue3 = jsonObj.getString("deductionDays");

            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_PD_" +
                jsonObj.getString("id") + "_OFFENCEDATE";
            String lineInputValueName4 = "Offence Date";
            String lineScreenEntryValue4 = jsonObj.getString("offenceDate");

            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_PD_" +
                jsonObj.getString("id") + "_DEDUCTIONPERCENTAGE";
            String lineInputValueName5 = "Deduction Percentage";
            String lineScreenEntryValue5 = jsonObj.getString("deductionBasicSalaryPercentage");


            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;
            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;
            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5;
            resp =
                    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                                            "PLN",
                                                            jsonObj.getString("personNumber"),
                                                            filename);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    
    //
    protected String createHelperTR(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {
//            System.out.println(jsonObj);
            String sourceSystemOwner = "PaaS";
            String sourceSystemId = jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = jsonObj.getString("elementName");
            String LegislativeDataGroupName =
                jsonObj.getString("legislativeDataGroupName");
            String AssignmentNumber = jsonObj.getString("assignmentNumber");
            String EntryType = jsonObj.getString("entryType");
            String CreatorType = jsonObj.getString("creatorType");

            //
            String lineSourceSystemOwner = sourceSystemOwner;
            String lineElementEntryId = sourceSystemId;
            String lineEffectiveStartDate = EffectiveStartDate;
            String lineEffectiveEndDate = EffectiveEndDate;
            String lineElementName = ElementName;
            String lineLegislativeDataGroupName = LegislativeDataGroupName;
            String lineAssignmentNumber = AssignmentNumber;
            //
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_InitialAmount";
            String lineInputValueName1 = "Initial Amount";
            String lineScreenEntryValue1 = jsonObj.getString("InitialAmount");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_Comp_Share_Amount";

            String lineInputValueName2 = "Comp Share Amount";
            String lineScreenEntryValue2 = jsonObj.getString("CompShare");

            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_Emp_Share_Amount";

            String lineInputValueName3 = "Emp Share Amount";
            String lineScreenEntryValue3 =
                jsonObj.isNull("EmpShare") ? "" : jsonObj.getString("EmpShare");

            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_InstallmentAmount";

            String lineInputValueName4 = "Recovery Amount";
            String lineScreenEntryValue4 =
                jsonObj.isNull("InstallmentAmount") ? "" : jsonObj.getString("InstallmentAmount");


            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_PeriodEndDate";

            String lineInputValueName5 = "Install Period End Date";
            String lineScreenEntryValue5 ="";
          

            String lineSourceSystemId6 =
                jsonObj.getString("personNumber") + "_TR_" +
                jsonObj.getString("TRID") + "_TRID ";

            String lineInputValueName6 = "TRANSACTION_ID";
            String lineScreenEntryValue6 = jsonObj.getString("TRID");


            String trsId = jsonObj.getString("trsId");


            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;

            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;

            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;

            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;

            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;

            String linedata6 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId6 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName6 + "|" +
                lineScreenEntryValue6;

           


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n" +
                linedata6 + "\n" ;

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5 + "\r\n" +
                linedata6 + "\r\n" ;

            resp =
    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "TR",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    protected String createHelperTRF(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {

            String sourceSystemOwner = "PaaS";
            String sourceSystemId = jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = jsonObj.getString("elementName");
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";

            String lineSourceSystemOwner = sourceSystemOwner;
            String lineElementEntryId =sourceSystemId;
                
            String lineEffectiveStartDate = EffectiveStartDate;
            String lineEffectiveEndDate = EffectiveEndDate;
            String lineElementName = ElementName;
            String lineLegislativeDataGroupName =LegislativeDataGroupName;
            String lineAssignmentNumber = AssignmentNumber;


            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_TRF_" +
                jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 = jsonObj.getString("totalTicketsAmount");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_TRF_" +
                jsonObj.getString("id") + "_REQUEST_ID";
            String lineInputValueName2 = "Transaction ID";
            String lineScreenEntryValue2 = jsonObj.getString("id");

            String trsId = jsonObj.getString("trsId");


            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;

            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
                linedata1 + "\r\n" +
                linedata2;
            resp =
    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "TRF",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    //change housing type element entry
    protected String createHelperCHT(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        EmployeeDetails employeeDetails = new EmployeeDetails();
        
        String filename = "Worker";
        try {
            EmployeeBean emp = employeeDetails.getEmpDetailsByPersonNum(jsonObj.getString("personNumber"),
                                                    null, null);
            
            String sourceSystemOwner = "NADEC";
            String sourceSystemId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String AssignmentNumber = "ET" + jsonObj.getString("personNumber");
            String AssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String AssignmentType = "ET";
            String EffectiveSequence = "1";
            String EffectiveLatestChange = "Y";
            String SystemPersonType = "EMP";
            String BusinessUnitShortCode = "KSA AGRICULTURE BU";
            String LegalEmployerName = emp.getOrganizationName();
            String PersonTypeCode = "Employee";
            String PersonNumber = jsonObj.getString("personNumber");

            //
            String lineSourceSystemOwner = "NADEC";
            String lineSourceSystemId =
                jsonObj.getString("personNumber") + "_ASSIGNEMENT";
            String lineWorkTermsAssignmentId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String linePeriodOfServiceId =
                jsonObj.getString("personNumber") + "_WORKREL";
            String lineActionCode = "HIRE";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");
            String lineWorkTermsNumber =
                "ET" + jsonObj.getString("personNumber");
            String lineAssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String lineAssignmentType = "E";
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineBusinessUnitShortCode = "KSA AGRICULTURE BU";
            String lineSystemPersonType = "EMP";
            String linePersonTypeCode = "Employee";
            String lineLegalEmployerName = emp.getOrganizationName();
            String lineEffectiveSequence = "1";
            String lineEffectiveLatestChange = "Y";
            String lineReasonCode = "NEWHIRE";
            String linePersonNumber = jsonObj.getString("personNumber");
            String lineWorkAtHomeFlag = "N";
            String lineManagerFlag = "N";
            String lineHourlySalariedCode = "S";
            String lineNormalHours = "";
            String lineFrequency = "";
            String lineAssignmentCategory = "KSA_AGRICULTURE";
            String linePeopleGroup =updatePeopleGroupCHT(emp.getPeopleGroup(), jsonObj.getString("newHousingType")); 
            //
//            System.out.println(linePeopleGroup);
            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|WorkTerms|" + sourceSystemOwner + "|" + sourceSystemId +
                "|" + linePeriodOfServiceId + "|" + lineActionCode + "|" +
                AssignmentNumber + "|" + AssignmentStatusTypeCode + "|" +
                AssignmentType + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + EffectiveSequence + "|" +
                EffectiveLatestChange + "|" + SystemPersonType + "|" +
                BusinessUnitShortCode + "|" + LegalEmployerName + "|" +
                PersonTypeCode + "|" + PersonNumber;
            //

            String linedata1 =
                "MERGE|Assignment|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId + "|" + lineWorkTermsAssignmentId + "|" +
                linePeriodOfServiceId + "|" + lineActionCode + "|" +
                lineAssignmentNumber + "|" + lineWorkTermsNumber + "|" +
                lineAssignmentStatusTypeCode + "|" + lineAssignmentType + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineBusinessUnitShortCode + "|" + lineSystemPersonType + "|" +
                linePersonTypeCode + "|" + lineLegalEmployerName + "|" +
                lineEffectiveSequence + "|" + lineEffectiveLatestChange + "|" +
                lineReasonCode + "|" + linePersonNumber + "|" +
                lineWorkAtHomeFlag + "|" + lineManagerFlag + "|" +
                lineHourlySalariedCode + "|" + lineNormalHours + "|" +
                lineFrequency + "|" + lineAssignmentCategory + "|" +
                linePeopleGroup;
            //
            String toBytes =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\n" +
                linedata1 + "\n";

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\r\n" +
                linedata1;

            resp =
    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "CHT",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;

    }
//
    protected String createHelperSTA(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        EmployeeDetails employeeDetails = new EmployeeDetails();
        
        String filename = "Worker";
        try {
            EmployeeBean emp =
                employeeDetails.getEmpDetailsByPersonNum(jsonObj.getString("personNumber"),
                                                    null, null);
            
            String sourceSystemOwner = "NADEC";
            String sourceSystemId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String AssignmentNumber = "ET" + jsonObj.getString("personNumber");
            String AssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String AssignmentType = "ET";
            String EffectiveSequence = "1";
            String EffectiveLatestChange = "Y";
            String SystemPersonType = "EMP";
            String BusinessUnitShortCode = emp.getBusinessUnitName();
            String LegalEmployerName = emp.getOrganizationName();
            String PersonTypeCode = "Employee";
            String PersonNumber = jsonObj.getString("personNumber");

            String lineSourceSystemOwner = "NADEC";
            String lineSourceSystemId =
                jsonObj.getString("personNumber") + "_ASSIGNEMENT";
            String lineWorkTermsAssignmentId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String linePeriodOfServiceId =
                jsonObj.getString("personNumber") + "_WORKREL";
            String lineActionCode = "HIRE";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");
            String lineWorkTermsNumber =
                "ET" + jsonObj.getString("personNumber");
            String lineAssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String lineAssignmentType = "E";
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineBusinessUnitShortCode = emp.getBusinessUnitName();
            String lineSystemPersonType = "EMP";
            String linePersonTypeCode = "Employee";
            String lineLegalEmployerName = emp.getOrganizationName();
            String lineEffectiveSequence = "1";
            String lineEffectiveLatestChange = "Y";
            String lineReasonCode = "NEWHIRE";
            String linePersonNumber = jsonObj.getString("personNumber");
            String lineWorkAtHomeFlag = "N";
            String lineManagerFlag = "N";
            String lineHourlySalariedCode = "S";
            String lineNormalHours = "";
            String lineFrequency = "";
            String lineAssignmentCategory = "KSA_AGRICULTURE";
            String linePeopleGroup =updatePeopleGroupSTA(emp.getPeopleGroup(), jsonObj.getString("allowanceType"));             
            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|WorkTerms|" + sourceSystemOwner + "|" + sourceSystemId +
                "|" + linePeriodOfServiceId + "|" + lineActionCode + "|" +
                AssignmentNumber + "|" + AssignmentStatusTypeCode + "|" +
                AssignmentType + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + EffectiveSequence + "|" +
                EffectiveLatestChange + "|" + SystemPersonType + "|" +
                BusinessUnitShortCode + "|" + LegalEmployerName + "|" +
                PersonTypeCode + "|" + PersonNumber;
            //

            String linedata1 =
                "MERGE|Assignment|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId + "|" + lineWorkTermsAssignmentId + "|" +
                linePeriodOfServiceId + "|" + lineActionCode + "|" +
                lineAssignmentNumber + "|" + lineWorkTermsNumber + "|" +
                lineAssignmentStatusTypeCode + "|" + lineAssignmentType + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineBusinessUnitShortCode + "|" + lineSystemPersonType + "|" +
                linePersonTypeCode + "|" + lineLegalEmployerName + "|" +
                lineEffectiveSequence + "|" + lineEffectiveLatestChange + "|" +
                lineReasonCode + "|" + linePersonNumber + "|" +
                lineWorkAtHomeFlag + "|" + lineManagerFlag + "|" +
                lineHourlySalariedCode + "|" + lineNormalHours + "|" +
                lineFrequency + "|" + lineAssignmentCategory + "|" +
                linePeopleGroup;
            //
            String toBytes =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\n" +
                linedata1 + "\n";

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER_ALLOWANCE + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE_ALLOWANCE + "\r\n" +
                linedata1;

            resp =
HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "STA",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;

    }

    //Return After Leave Elment Entry 
    protected String createHelperRALWorker(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        EmployeeDetails employeeDetails = new EmployeeDetails();
        
        String filename = "Worker";
        try {
            EmployeeBean emp =
                employeeDetails.getEmpDetailsByPersonNum(jsonObj.getString("personNumber"),
                                                    null, null);
            
            String sourceSystemOwner = "NADEC";
            String sourceSystemId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String AssignmentNumber = "ET" + jsonObj.getString("personNumber");
            String AssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String AssignmentType = "ET";
            String EffectiveSequence = "1";
            String EffectiveLatestChange = "Y";
            String SystemPersonType = "EMP";
            String BusinessUnitShortCode = emp.getBusinessUnitName();
            String LegalEmployerName = emp.getOrganizationName();
            String PersonTypeCode = "Employee";
            String PersonNumber = jsonObj.getString("personNumber");

            String lineSourceSystemOwner = "NADEC";
            String lineSourceSystemId =
                jsonObj.getString("personNumber") + "_ASSIGNEMENT";
            String lineWorkTermsAssignmentId =
                jsonObj.getString("personNumber") + "_WORKTERMS";
            String linePeriodOfServiceId =
                jsonObj.getString("personNumber") + "_WORKREL";
            String lineActionCode = "ASG_CHANGE";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");
            String lineWorkTermsNumber =
                "ET" + jsonObj.getString("personNumber");
            String lineAssignmentStatusTypeCode = emp.getAssignmentStatusTypeId() != null && emp.getAssignmentStatusTypeId().equals("0") ? "ACTIVE_PROCESS" :"ACTIVE_NO_PROCESS";
            String lineAssignmentType = "ET";
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineBusinessUnitShortCode = emp.getBusinessUnitName();
            String lineSystemPersonType = "EMP";
            String linePersonTypeCode = "Employee";
            String lineLegalEmployerName = emp.getOrganizationName();
            String lineEffectiveSequence = "1";
            String lineEffectiveLatestChange = "Y";
            String lineReasonCode = "NEWHIRE";
            String linePersonNumber = jsonObj.getString("personNumber");
            String lineWorkAtHomeFlag = "N";
            String lineManagerFlag = "N";
            String lineHourlySalariedCode = "S";
            String lineNormalHours = "";
            String lineFrequency = "";
            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|WorkTerms|" + sourceSystemOwner + "|" + sourceSystemId +
                "|" + linePeriodOfServiceId + "|" + lineActionCode + "|" +
                AssignmentNumber + "|" + AssignmentStatusTypeCode + "|" +
                AssignmentType + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + EffectiveSequence + "|" +
                EffectiveLatestChange + "|" + SystemPersonType + "|" +
                BusinessUnitShortCode + "|" + LegalEmployerName + "|" +
                PersonTypeCode + "|" + PersonNumber;
            //

            String linedata1 =
                "MERGE|Assignment|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId + "|" + lineWorkTermsAssignmentId + "|" +
                linePeriodOfServiceId + "|" + lineActionCode + "|" +
                lineAssignmentNumber + "|" + lineWorkTermsNumber + "|" +
                lineAssignmentStatusTypeCode + "|" + lineAssignmentType + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineBusinessUnitShortCode + "|" + lineSystemPersonType + "|" +
                linePersonTypeCode + "|" + lineLegalEmployerName + "|" +
                lineEffectiveSequence + "|" + lineEffectiveLatestChange + "|" +
                lineReasonCode + "|" + linePersonNumber + "|" +
                lineWorkAtHomeFlag + "|" + lineManagerFlag + "|" +
                lineHourlySalariedCode + "|" + lineNormalHours + "|" +
                lineFrequency ;
            //
            String toBytes =
                HCMElementEntryHelper.ELEMENT_HEADER_WORKER_NO_PG + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE_WORKER_NO_PG + "\n" +
                linedata1 + "\n";

            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER_WORKER_NO_PG + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE_WORKER_NO_PG + "\r\n" +
                linedata1;

            resp =
    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                        "RAL",
                                        jsonObj.getString("personNumber"),
                                        filename);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;

    }

    protected String createHelperAAL(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        String filename = "ElementEntry";
        try {


            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("trsId"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = "%EffectiveStartDate%";
            String EffectiveEndDate = "%EffectiveEndDate%";
            String ElementName = "Annual Leave Advanced Loan";
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("trsId");
            ;
            String lineEffectiveStartDate = "%EffectiveStartDate%";
            String lineEffectiveEndDate = "%EffectiveEndDate%";
            String lineElementName = "Annual Leave Advanced Loan"; //
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");

//            String lineSourceSystemId0 =
//                jsonObj.getString("personNumber") + "_AAL_" +
//                jsonObj.getString("id") + "_TRANSACTIONID";
//            String lineInputValueName0 = "Transaction ID";
//            String lineScreenEntryValue0 = jsonObj.getString("trsId");
            
            String lineSourceSystemId1 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_VACATIONSTARTDATE";
            String lineInputValueName1 = "Vacation Start Date";
            String lineScreenEntryValue1 = jsonObj.getString("leaveSD");

            String lineSourceSystemId2 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_VACATIONENDDATE";
            String lineInputValueName2 = "Vacation End Date";
            String lineScreenEntryValue2 = jsonObj.getString("leaveED");

            String lineSourceSystemId3 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_FIRSTINSTALLMENTDATE";
            String lineInputValueName3 = "First Installment Date";
            String lineScreenEntryValue3 = jsonObj.getString("FirstInstallmentDate");

            String lineSourceSystemId4 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_ADVANCEDPAYMENTDATE";
            String lineInputValueName4 = "Advanced Payment Date";
            String lineScreenEntryValue4 = jsonObj.getString("AdvancedPaymentDate");

            String lineSourceSystemId5 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_PERIODICITY";
            String lineInputValueName5 = "Periodicity";
            String lineScreenEntryValue5 = jsonObj.getString("periodicity");
            
            String lineSourceSystemId6 =
                jsonObj.getString("personNumber") + "_AAL_" +
                jsonObj.getString("trsId") + "_FULLTIMEEQUIVALENT";
            String lineInputValueName6 = "Full-Time Equivalent";
            String lineScreenEntryValue6 = jsonObj.getString("fullTimeEquivalent");


            String trsId = jsonObj.getString("trsId");
            String headerdata =
                "MERGE|ElementEntry|" + sourceSystemOwner + "|" +
                sourceSystemId + "|" + EffectiveStartDate + "|" +
                EffectiveEndDate + "|" + ElementName + "|" +
                LegislativeDataGroupName + "|" + AssignmentNumber + "|" +
                EntryType + "|" + CreatorType;
//            String linedata0 =
//                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
//                lineSourceSystemId0 + "|" + lineElementEntryId + "|" +
//                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
//                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
//                lineAssignmentNumber + "|" + lineInputValueName0 + "|" +
//                lineScreenEntryValue0;
            String linedata1 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
                lineScreenEntryValue1;
            String linedata2 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId2 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName2 + "|" +
                lineScreenEntryValue2;
            String linedata3 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId3 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName3 + "|" +
                lineScreenEntryValue3;
            String linedata4 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId4 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName4 + "|" +
                lineScreenEntryValue4;
            String linedata5 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId5 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName5 + "|" +
                lineScreenEntryValue5;
            String linedata6 =
                "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
                lineSourceSystemId6 + "|" + lineElementEntryId + "|" +
                lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
                lineElementName + "|" + lineLegislativeDataGroupName + "|" +
                lineAssignmentNumber + "|" + lineInputValueName6 + "|" +
                lineScreenEntryValue6;


            String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
                headerdata + "\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\n" +
//                linedata0 + "\n" +
                linedata1 + "\n" +
                linedata2 + "\n" +
                linedata3 + "\n" +
                linedata4 + "\n" +
                linedata5 + "\n" +
                linedata6 + "\n";
            String fileContent =
                HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
                headerdata + "\r\n" +
                HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
//                linedata0 + "\r\n" +
                linedata1 + "\r\n" +
                linedata2 + "\r\n" +
                linedata3 + "\r\n" +
                linedata4 + "\r\n" +
                linedata5 + "\r\n" +
                linedata6;
            resp =
                    HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes, trsId,
                                                            "AAL",
                                                            jsonObj.getString("personNumber"),
                                                            filename);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    //
    //end of elment entry


    protected String callUCM(String hdlId, String startDate, String path,String sstype) {
        return HCMElementEntryHelper.CALL_UCM(hdlId, startDate, path,sstype);
    }

    private String updatePeopleGroup(String oldPG, String allowanceType,
                                     String allowanceAmount) {
        String[] ar = oldPG.split("[.]", -1);
        Map<String, String> PEOPLE_GROUP = new HashMap<String, String>();

        PEOPLE_GROUP.put("Housing Type", ar[0]);
        PEOPLE_GROUP.put("Override Housing Percentage", ar[1]);
        PEOPLE_GROUP.put("Transportation Type", ar[2]);
        PEOPLE_GROUP.put("Override Transportation Percentage", ar[3]);
        PEOPLE_GROUP.put("Override Transportation Amount", ar[4]);
        PEOPLE_GROUP.put("Food Allowance", ar[5]);
        PEOPLE_GROUP.put("Field Work Allowance", ar[6]);
        PEOPLE_GROUP.put("Work Nature Allowance", ar[7]);
        PEOPLE_GROUP.put("Override Work Nature Allowance Amount", ar[8]);
        PEOPLE_GROUP.put("Duty Allowance", ar[9]);
        PEOPLE_GROUP.put("Duty Allowance Amount", ar[10]);
        PEOPLE_GROUP.put("Mobile Allowance", ar[11]);
        PEOPLE_GROUP.put("Mobile Allowance Amount", ar[12]);
        PEOPLE_GROUP.put("Car Allowance", ar[13]);
        PEOPLE_GROUP.put("Car Allowance Amount", ar[14]);
        PEOPLE_GROUP.put("Pension Allowance", ar[15]);
        PEOPLE_GROUP.put("Hardship Allowance", ar[16]);
        PEOPLE_GROUP.put("Hardship Allowance Amount", ar[17]);
        PEOPLE_GROUP.put("Motivation Allowance Flag", ar[18]);
        PEOPLE_GROUP.put("Override Vacation Entitlement", ar[18]);


        if ("carAllowance".equalsIgnoreCase(allowanceType)) {
            PEOPLE_GROUP.put("Car Allowance", "Y");
            PEOPLE_GROUP.put("Car Allowance Amount",
                             allowanceAmount);
        } else if ("mobileAllowance".equalsIgnoreCase(allowanceType)) {
            PEOPLE_GROUP.put("Mobile Allowance", "Y");
            PEOPLE_GROUP.put("Mobile Allowance Amount",
                             allowanceAmount);
        } else if ("transportationAlowance".equalsIgnoreCase(allowanceType)) {
            PEOPLE_GROUP.put("Override Transportation Amount",
                             allowanceAmount);
    }

        return PEOPLE_GROUP.get("Housing Type") + "." + 
        PEOPLE_GROUP.get("Override Housing Percentage") +"." + 
        PEOPLE_GROUP.get("Transportation Type") + "." +
        PEOPLE_GROUP.get("Override Transportation Percentage") + "." +
        PEOPLE_GROUP.get("Override Transportation Amount") + "." +
        PEOPLE_GROUP.get("Food Allowance") + "." +
        PEOPLE_GROUP.get("Field Work Allowance") + "." +
        PEOPLE_GROUP.get("Work Nature Allowance") + "." +
        PEOPLE_GROUP.get("Override Work Nature Allowance Amount") +"." + 
        PEOPLE_GROUP.get("Duty Allowance") + "." +
        PEOPLE_GROUP.get("Duty Allowance Amount") + "." +
        PEOPLE_GROUP.get("Mobile Allowance") + "." +
        PEOPLE_GROUP.get("Mobile Allowance Amount") + "." +
        PEOPLE_GROUP.get("Car Allowance") + "." +
        PEOPLE_GROUP.get("Car Allowance Amount") + "." +
        PEOPLE_GROUP.get("Pension Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance Amount") + "." +
        PEOPLE_GROUP.get("Motivation Allowance Flag") + "." +
        PEOPLE_GROUP.get("Override Vacation Entitlement");
}
    //update for STA
    private String updatePeopleGroupSTA(String oldPG, String allowanceType) {
        String[] ar = oldPG.split("[.]", -1);
        Map<String, String> PEOPLE_GROUP = new HashMap<String, String>();
        
        PEOPLE_GROUP.put("Housing Type", ar[0]);
        PEOPLE_GROUP.put("Override Housing Percentage", ar[1]);
        PEOPLE_GROUP.put("Transportation Type", ar[2]);
        PEOPLE_GROUP.put("Override Transportation Percentage", ar[3]);
        PEOPLE_GROUP.put("Override Transportation Amount", ar[4]);
        PEOPLE_GROUP.put("Food Allowance", ar[5]);
        PEOPLE_GROUP.put("Field Work Allowance", ar[6]);
        PEOPLE_GROUP.put("Work Nature Allowance", ar[7]);
        PEOPLE_GROUP.put("Override Work Nature Allowance Amount", ar[8]);
        PEOPLE_GROUP.put("Duty Allowance", ar[9]);
        PEOPLE_GROUP.put("Duty Allowance Amount", ar[10]);
        PEOPLE_GROUP.put("Mobile Allowance", ar[11]);
        PEOPLE_GROUP.put("Mobile Allowance Amount", ar[12]);
        PEOPLE_GROUP.put("Car Allowance", ar[13]);
        PEOPLE_GROUP.put("Car Allowance Amount", ar[14]);
        PEOPLE_GROUP.put("Pension Allowance", ar[15]);
        PEOPLE_GROUP.put("Hardship Allowance", ar[16]);
        PEOPLE_GROUP.put("Hardship Allowance Amount", ar[17]);
        PEOPLE_GROUP.put("Motivation Allowance Flag", ar[18]);
        PEOPLE_GROUP.put("Override Vacation Entitlement", ar[18]);


            if ("carAllowance".equalsIgnoreCase(allowanceType)) {
                PEOPLE_GROUP.put("Car Allowance", "");
                PEOPLE_GROUP.put("Car Allowance Amount",
                                 "");
            } else if ("mobileAllowance".equalsIgnoreCase(allowanceType)) {
                PEOPLE_GROUP.put("Mobile Allowance", "");
                PEOPLE_GROUP.put("Mobile Allowance Amount",
                                 "");
            } else if ("transportationAlowance".equalsIgnoreCase(allowanceType)) {
                PEOPLE_GROUP.put("Transportation Type", "");
                PEOPLE_GROUP.put("Override Transportation Amount","");
            }

        return PEOPLE_GROUP.get("Housing Type") + "." + 
        PEOPLE_GROUP.get("Override Housing Percentage") +"." + 
        PEOPLE_GROUP.get("Transportation Type") + "." +
        PEOPLE_GROUP.get("Override Transportation Percentage") + "." +
        PEOPLE_GROUP.get("Override Transportation Amount") + "." +
        PEOPLE_GROUP.get("Food Allowance") + "." +
        PEOPLE_GROUP.get("Field Work Allowance") + "." +
        PEOPLE_GROUP.get("Work Nature Allowance") + "." +
        PEOPLE_GROUP.get("Override Work Nature Allowance Amount") +"." + 
        PEOPLE_GROUP.get("Duty Allowance") + "." +
        PEOPLE_GROUP.get("Duty Allowance Amount") + "." +
        PEOPLE_GROUP.get("Mobile Allowance") + "." +
        PEOPLE_GROUP.get("Mobile Allowance Amount") + "." +
        PEOPLE_GROUP.get("Car Allowance") + "." +
        PEOPLE_GROUP.get("Car Allowance Amount") + "." +
        PEOPLE_GROUP.get("Pension Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance Amount") + "." +
        PEOPLE_GROUP.get("Motivation Allowance Flag") + "." +
        PEOPLE_GROUP.get("Override Vacation Entitlement");
    }
    //update for change housing type 
    private String updatePeopleGroupCHT(String oldPG, String housingType) {
        String[] ar = oldPG.split("[.]", -1);
        Map<String, String> PEOPLE_GROUP = new HashMap<String, String>();
        PEOPLE_GROUP.put("Housing Type", housingType);
        PEOPLE_GROUP.put("Override Housing Percentage", ar[1]);
        PEOPLE_GROUP.put("Transportation Type", ar[2]);
        PEOPLE_GROUP.put("Override Transportation Percentage", ar[3]);
        PEOPLE_GROUP.put("Override Transportation Amount", ar[4]);
        PEOPLE_GROUP.put("Food Allowance", ar[5]);
        PEOPLE_GROUP.put("Field Work Allowance", ar[6]);
        PEOPLE_GROUP.put("Work Nature Allowance", ar[7]);
        PEOPLE_GROUP.put("Override Work Nature Allowance Amount", ar[8]);
        PEOPLE_GROUP.put("Duty Allowance", ar[9]);
        PEOPLE_GROUP.put("Duty Allowance Amount", ar[10]);
        PEOPLE_GROUP.put("Mobile Allowance", ar[11]);
        PEOPLE_GROUP.put("Mobile Allowance Amount", ar[12]);
        PEOPLE_GROUP.put("Car Allowance", ar[13]);
        PEOPLE_GROUP.put("Car Allowance Amount", ar[14]);
        PEOPLE_GROUP.put("Pension Allowance", ar[15]);
        PEOPLE_GROUP.put("Hardship Allowance", ar[16]);
        PEOPLE_GROUP.put("Hardship Allowance Amount", ar[17]);
        PEOPLE_GROUP.put("Motivation Allowance Flag", ar[18]);
        PEOPLE_GROUP.put("Override Vacation Entitlement", ar[18]);

        return PEOPLE_GROUP.get("Housing Type") + "." + 
        PEOPLE_GROUP.get("Override Housing Percentage") +"." + 
        PEOPLE_GROUP.get("Transportation Type") + "." +
        PEOPLE_GROUP.get("Override Transportation Percentage") + "." +
        PEOPLE_GROUP.get("Override Transportation Amount") + "." +
        PEOPLE_GROUP.get("Food Allowance") + "." +
        PEOPLE_GROUP.get("Field Work Allowance") + "." +
        PEOPLE_GROUP.get("Work Nature Allowance") + "." +
        PEOPLE_GROUP.get("Override Work Nature Allowance Amount") +"." + 
        PEOPLE_GROUP.get("Duty Allowance") + "." +
        PEOPLE_GROUP.get("Duty Allowance Amount") + "." +
        PEOPLE_GROUP.get("Mobile Allowance") + "." +
        PEOPLE_GROUP.get("Mobile Allowance Amount") + "." +
        PEOPLE_GROUP.get("Car Allowance") + "." +
        PEOPLE_GROUP.get("Car Allowance Amount") + "." +
        PEOPLE_GROUP.get("Pension Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance") + "." +
        PEOPLE_GROUP.get("Hardship Allowance Amount") + "." +
        PEOPLE_GROUP.get("Motivation Allowance Flag") + "." +
        PEOPLE_GROUP.get("Override Vacation Entitlement");
    }


    public static void main(String[] args) {
        EmployeeDetails employeeDetails = new EmployeeDetails();
        EmployeeBean emp =
            employeeDetails.getEmpDetailsByPersonNum("23125",
                                                null, null);
    }
}
