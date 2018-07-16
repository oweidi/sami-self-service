package com.nadec.selfservice.common.servlets.bipreportsservlets;

import com.bea.xbean.util.Base64;

import com.nadec.selfservice.common.bipreports.BIPReports;

import com.nadec.selfservice.common.bipreports.BIReportModel;

import com.nadec.selfservice.common.bipreports.BIReportModel.EMPLOYEE_PAYROLL_REPORT_PARAM;

import com.nadec.selfservice.common.bipreports.BIReportModel.NumOfMonthsRemaining_PARAM;
import com.nadec.selfservice.common.bipreports.BIReportModel.PartEndOfServiceElementDateReport_PARAM;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.io.OutputStream;
import java.io.StringReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.json.JSONException;
import org.json.JSONObject;

import org.json.XML;

import org.w3c.dom.Document;

import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import org.xml.sax.InputSource;

@Path("/report")
public class BIReportRestService {

    @POST
    @Path("/commonbireport")
    @Consumes(MediaType.APPLICATION_JSON)
    public String getBiReport(InputStream incomingData, @Context
        HttpServletRequest request) {
        StringBuilder crunchifyBuilder = new StringBuilder();
        HttpSession session = request.getSession();
        try {
            BufferedReader in =
                new BufferedReader(new InputStreamReader(incomingData));
            String line = null;
            while ((line = in.readLine()) != null) {
                crunchifyBuilder.append(line);
            }
        } catch (Exception e) {
            System.out.println("Error Parsing: - ");
        }
        JSONObject jObject; // json
        String fresponse = null;
        try {
            jObject = new JSONObject(crunchifyBuilder.toString());
            String reportName = jObject.getString("reportName");
            BIPReports biPReports = new BIPReports();
            biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_XML.getValue());
            biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_XML.getValue());

            if (reportName != null) {

                if (reportName.equals(BIPReports.REPORT_NAME.GET_POSITION_EMAIL_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.POSITION_EMAIL_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.POSITION_EMAIL_REPORT_PARAM.values()[i].getValue();
                        if (jObject.getString(paramName) != null &&
                            !jObject.getString(paramName).isEmpty() &&
                            !"null".equals(jObject.getString(paramName))) {

                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_POSITION_EMAIL_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.UDT_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.UDT_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.UDT_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.UDT_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.TERRITORIES_LIST_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.TERRITORIES_LIST_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.TERRITORIES_LIST_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.TERRITORIES_LIST_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.ALL_UDT_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.ALL_UDT_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.ALL_UDT_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.ALL_UDT_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.AOR_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.AOR_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.AOR_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.AOR_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.GRADE_RATE_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.GRADE_RATE_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.GRADE_RATE_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GRADE_RATE_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.FND_LOOKUP_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.FND_LOOKUP_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.FND_LOOKUP_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.FND_LOOKUP_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.PERSON_ABSENCE_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PERSON_ABSENCE_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PERSON_ABSENCE_REPORT_PARAM.values()[i].getValue();
                        if (paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_END_DATE.getValue())) {

                            String[] enDt =
                                jObject.getString(paramName).split("-");
                            String end =
                                enDt[2] + "-" + enDt[1] + "-" + enDt[0];
                            biPReports.getParamMap().put(paramName, end);

                        } else if (paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_START_DATE.getValue())) {

                            String[] stDt =
                                jObject.getString(paramName).split("-");
                            String start =
                                stDt[2] + "-" + stDt[1] + "-" + stDt[0];
                            biPReports.getParamMap().put(paramName, start);

                        } else {
                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_ABSENCE_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.FUSE_REPORT.getValue())) {
                    String paramName = null;
                    Object resposne =
                        session.getAttribute(BIPReports.REPORT_NAME.FUSE_REPORT.getValue());
//                    System.out.println("++++++++++++++++++++ " + resposne);
                    if (resposne != null) {
                        if (!resposne.toString().isEmpty()) {
                            return resposne.toString();
                        }
                    }
                    //                    for (int i = 0;
                    //                         i < BIPReports.FUSE_REPORT_PARAM.values().length;
                    //                         i++) {
                    //                        paramName =
                    //                                BIPReports.FUSE_REPORT_PARAM.values()[i].getValue();
                    //                        biPReports.getParamMap().put(paramName,
                    //                                                     jObject.getString(paramName));
                    //                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.FUSE_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").getJSONArray("G_1").toString();

                    session.setAttribute(BIPReports.REPORT_NAME.FUSE_REPORT.getValue(),
                                         jsonString);

                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue())) {
                    String paramName = null;
                    Object resposne =
                        session.getAttribute(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue());

                    if (resposne != null) {
                        return resposne.toString();

                    }

                    for (int i = 0;
                         i < BIPReports.PERSON_FUSE_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PERSON_FUSE_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString = "";
                    if (!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) {
                        jsonString =
                                xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();
                    }
                    session.setAttribute(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue(),
                                         jsonString);
                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.PERSON_PAY_PERIOD_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PERSON_PAY_PERIOD_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PERSON_PAY_PERIOD_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_PAY_PERIOD_REPORT.getValue());

                    fresponse = biPReports.executeReports();

                } else if (reportName.contains(BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue())) {
                    String paramName = null;
                    String subReportName = jObject.getString("reportSubName");
//                    System.out.println(subReportName);
                    for (int i = 0;
                         i < BIPReports.IDENTIICATIONS_LETTER_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.IDENTIICATIONS_LETTER_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(subReportName);
                    biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_PDF.getValue());
                    biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_PDF.getValue());
                    byte[] reportBytes = biPReports.executeReportsPDF();
                    
                    fresponse = javax.xml.bind.DatatypeConverter.printBase64Binary(new Base64().decode(reportBytes));

                } else if (reportName.equals(BIPReports.REPORT_NAME.GET_AOR_EMAILS.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.GET_AOR_EMAILS_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.GET_AOR_EMAILS_PARAM.values()[i].getValue();
                        if (jObject.getString(paramName) != null &&
                            !jObject.getString(paramName).isEmpty() &&
                            !"null".equals(jObject.getString(paramName))) {

                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_AOR_EMAILS.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.GratuityAccruedReport2.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.GRATUITY_ACCRUED_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.GRATUITY_ACCRUED_REPORT_PARAM.values()[i].getValue();
                        if (jObject.getString(paramName) != null &&
                            !jObject.getString(paramName).isEmpty() &&
                            !"null".equals(jObject.getString(paramName))) {

                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GratuityAccruedReport2.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.PART_OF_EOS_SUM_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PART_OF_EOS_SUM_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PART_OF_EOS_SUM_REPORT_PARAM.values()[i].getValue();
                        if (jObject.getString(paramName) != null &&
                            !jObject.getString(paramName).isEmpty() &&
                            !"null".equals(jObject.getString(paramName))) {

                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PART_OF_EOS_SUM_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.DEPENDENT_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.DEPENDENT_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.DEPENDENT_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.DEPENDENT_REPORT.getValue());

                    fresponse = biPReports.executeReports();

                } else if (reportName.equals(BIPReports.REPORT_NAME.PERSON_ELEMENT_ENTRY_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PERSON_ELEMENT_ENTRY_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PERSON_ELEMENT_ENTRY_REPORT_PARAM.values()[i].getValue();
                        if (paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_START_DATE.getValue())) {

                            String[] stDt =
                                jObject.getString(paramName).split("-");
                            String start =
                                stDt[2] + "-" + stDt[1] + "-" + stDt[0];
                            biPReports.getParamMap().put(paramName, start);

                        } else {
                            biPReports.getParamMap().put(paramName,
                                                         jObject.getString(paramName));
                        }

                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_ELEMENT_ENTRY_REPORT.getValue());
                    fresponse = biPReports.executeReports();

                } else if (reportName.equals("EMPLOYEE_FUSE_REPORT")) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PERSON_FUSE_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PERSON_FUSE_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString = "";
                    if (!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) {
                        jsonString =
                                xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();
                    }
                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.EMPLOYEE_PAYROLL_REPORT.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.EMPLOYEE_PAYROLL_REPORT_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.EMPLOYEE_PAYROLL_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.EMPLOYEE_PAYROLL_REPORT.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();
                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.HR_CITIES_AND_COUNTRIES.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.HR_CITIES_AND_COUNTRIES_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.HR_CITIES_AND_COUNTRIES_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.HR_CITIES_AND_COUNTRIES.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();

                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.GET_LATEST_ANNUAL_LEAVE.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.GET_LATEST_ANNUAL_LEAVE_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.GET_LATEST_ANNUAL_LEAVE_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_LATEST_ANNUAL_LEAVE.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());

                    String jsonString = "";
                    if (!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) {
                        jsonString =
                                xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();
                    }


                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.Num_Of_Employee_Ticket.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.Num_Of_Employee_Ticket_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.Num_Of_Employee_Ticket_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.Num_Of_Employee_Ticket.getValue());
                    fresponse = biPReports.executeReports();
//                    System.out.println(fresponse);
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString = null;
                    if(!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) {
                     jsonString =
                           xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();    
                    }

                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.Employee_Prepayment_In_Period.getValue())) {


                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.Employee_Prepayment_In_Period.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();

                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.GET_ALL_POSITIONS.getValue())) {


                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_ALL_POSITIONS.getValue());
                    fresponse = biPReports.executeReports();
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString().replaceAll("VALUE",
                                                                                             "value").replaceAll("LABEL",
                                                                                                                 "label");

                    return jsonString;

                } else if (reportName.equals(BIPReports.REPORT_NAME.PartEndOfServiceElementDateReport.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.PartEndOfServiceElementDateReport_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.PartEndOfServiceElementDateReport_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PartEndOfServiceElementDateReport.getValue());
                    fresponse = biPReports.executeReports();
//                    System.out.println(fresponse);
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    
                    String jsonString = null;
                    if(!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) {
                     jsonString =
                           xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();    
                    }
                    

                    return null;

                } else if (reportName.equals(BIPReports.REPORT_NAME.NumOfMonthsRemaining.getValue())) {
                    String paramName = null;

                    for (int i = 0;
                         i < BIPReports.NumOfMonthsRemaining_PARAM.values().length;
                         i++) {
                        paramName =
                                BIPReports.NumOfMonthsRemaining_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName,
                                                     jObject.getString(paramName));
                    }

                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.NumOfMonthsRemaining.getValue());
                    fresponse = biPReports.executeReports();
//                    System.out.println(fresponse);
                    JSONObject xmlJSONObj =
                        XML.toJSONObject(fresponse.toString());
                    String jsonString =
                        xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();

                    return jsonString;

                }
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        // return HTTP response 200 in case of success
        return fresponse;
    }

    public static void main(String[] args) {

        
//            String reportName =
//                BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue();
//            BIPReports biPReports = new BIPReports();
//
//            if (reportName != null) {
//
//                if (reportName.contains(BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue())) {
//
//
//                    biPReports.setReportAbsolutePath(reportName);
//                    biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_PDF.getValue());
//                    biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_PDF.getValue());
//                    String x = biPReports.executeReports();
////                    javax.ws.rs.core.Response.ResponseBuilder responseBuilder =
////                        javax.ws.rs.core.Response.ok((Object)x);
////                    responseBuilder.type("application/pdf");
////                    System.out.println(x);
////                    responseBuilder.header("Content-Disposition",
////                                           "filename=test.pdf");
//                    System.out.println(x);
//
//                }
//            }
 
        try {
            OutputStream out = new FileOutputStream("E:\\out.pdf");
            
            out.write(new Base64().decode("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bmNvZGluZyAvV2luQW5zaUVuY29kaW5nDQo+Pg0KZW5kb2JqDQo4IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL0Jhc2VGb250IC9IZWx2ZXRpY2ENCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nDQo+Pg0KZW5kb2JqDQo5IDAgb2JqDQpbIDUgMCBSIC9YWVogMjIwLjA0NCAxNDQuMzA0IG51bGwgXQ0KZW5kb2JqDQoxMCAwIG9iag0KWyA1IDAgUiAvWFlaIDIyMC4wNDQgMTQ0LjMwNCBudWxsIF0NCmVuZG9iag0KeHJlZg0KMCAxMQ0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAxNDQ3IDAwMDAwIG4NCjAwMDAwMDE1MDIgMDAwMDAgbg0KMDAwMDAwMTU3MyAwMDAwMCBuDQowMDAwMDAxNjQxIDAwMDAwIG4NCjAwMDAwMDAwMTAgMDAwMDAgbg0KMDAwMDAwMDE2OCAwMDAwMCBuDQowMDAwMDAxNzI4IDAwMDAwIG4NCjAwMDAwMDE4MzggMDAwMDAgbg0KMDAwMDAwMTk0MyAwMDAwMCBuDQowMDAwMDAxOTk3IDAwMDAwIG4NCnRyYWlsZXINCjw8DQovU2l6ZSAxMQ0KL1Jvb3QgMSAwIFINCi9JbmZvIDIgMCBSDQovSUQgWzw3MGE4ZTRhZjRlZDg2NWJkZDg2OWI3ZmJjMTU2MGFlYj48NzBhOGU0YWY0ZWQ4NjViZGQ4NjliN2ZiYzE1NjBhZWI+XQ0KPj4NCnN0YXJ0eHJlZg0KMjA1Mg0KJSVFT0YNCg==".getBytes()));
            out.close();
        } catch (FileNotFoundException e) {
        } catch (IOException e) {
        }

    }

    @GET
    @Path("/commonbireport")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public javax.ws.rs.core.Response getBiReportPDF(InputStream incomingData,
                                                    @Context
        HttpServletRequest request) {

        String reportName =
            BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue();
        BIPReports biPReports = new BIPReports();

        if (reportName != null) {

            if (reportName.contains(BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue())) {


                biPReports.setReportAbsolutePath(reportName);
                biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_PDF.getValue());
                biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_PDF.getValue());
                byte[] x = biPReports.executeReportsPDF();
                FileWriter fstream;
                try {
                    fstream = new FileWriter("E:\\testReport.pdf");
                } catch (IOException e) {
                }
                OutputStream out=null;
                try {
                    out = new FileOutputStream("E:\\testReport.pdf");
                } catch (FileNotFoundException e) {
                }

                //closing the output stream
                try {
                    out.write(x);
                } catch (IOException e) {
                }
                try {
                    out.close();
                } catch (IOException e) {
                }
                javax.ws.rs.core.Response.ResponseBuilder responseBuilder =
                    javax.ws.rs.core.Response.ok((Object)new Base64().decode(x));
                responseBuilder.type("application/pdf");
//                System.out.println(x);
                responseBuilder.header("Content-Disposition",
                                       "filename=test.pdf");
                return responseBuilder.build();

            }
        }


        // return HTTP response 200 in case of success
        return null;
    }
    
    

    public static void doSomething(Node node) {
        // do something with the current node instead of System.out
        System.out.println(node.getNodeName() + "++++++++   " +
                           node.getTextContent());
        String xx = node.getNodeName();
        if (node.getNodeName().equals("G_1")) {
            for (int i = 0; i < node.getChildNodes().getLength(); i++) {
                Node currentNode = node.getChildNodes().item(i);

                System.out.println(currentNode.getTextContent());
            }
        }


        NodeList nodeList = node.getChildNodes();
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node currentNode = nodeList.item(i);
            if (currentNode.getNodeType() == Node.ELEMENT_NODE) {
                //calls this method for all the children which is Element
                doSomething(currentNode);
            }
        }
    }

}
