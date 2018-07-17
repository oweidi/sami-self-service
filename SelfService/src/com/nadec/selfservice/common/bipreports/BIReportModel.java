package com.nadec.selfservice.common.bipreports;


import com.nadec.selfservice.common.restHelper.RestHelper;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;

import java.net.HttpURLConnection;
import java.net.URL;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;

import org.w3c.dom.Document;

import org.xml.sax.InputSource;


public class BIReportModel extends RestHelper {


    public static enum REPORT_NAME {
        FND_LOOKUP_REPORT("LookupTypeReport"),
        UDT_REPORT("UDTReport"),
        TERRITORIES_LIST_REPORT("TerritoriesListReport"),
        ALL_UDT_REPORT("UDTReport"),
        AOR_REPORT("AORReport"),
        GRADE_RATE_REPORT("GradeRateReport"),
        GET_POSITION_EMAIL_REPORT("GetPositionEmailsReport"),
        PERSON_ABSENCE_REPORT("PersonAbsenceReport"),
        FUSE_REPORT("FuseReport"),
        PERSON_FUSE_REPORT("PersonFuseReport"),
        PERSON_PAY_PERIOD_REPORT("PersonPayPeriodReport"),
        IDENTIFICATION_LETTERS_REPORT("ID_LETTER_REPORT"),
        GET_AOR_EMAILS("GetAOREMails"),
        DEPENDENT_REPORT("DependentsReport"),
        GratuityAccruedReport2("GratuityAccruedReport2"),
        PART_OF_EOS_SUM_REPORT("PartofEOSSumReport"),
        PERSON_ELEMENT_ENTRY_REPORT("PersonElementEntryReport"),
        EMPLOYEE_FUSE_REPORT("PersonFuseReport"),
        GET_LATEST_ANNUAL_LEAVE("GetLatestAnnualLeaveReport"),
        EMPLOYEE_PAYROLL_REPORT("Employee Payrol Report"),
        HR_CITIES_AND_COUNTRIES("CityReport"),
        Num_Of_Employee_Ticket("NumberOfEmployeeTicketReport"),
        Employee_Prepayment_In_Period("EmployeePrepaymentInPeriodReport"),
        GET_ALL_POSITIONS("GetAllPositions"),
        PartEndOfServiceElementDateReport("PartEndOfServiceElementDateReport"),
        NumOfMonthsRemaining("EmployeeRemainingMonths");

        private String value;

        private REPORT_NAME(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }

    public static enum ATTRIBUTE_TEMPLATE {


        ATTRIBUTE_TEMPLATE_XML("DEFAULT"),
        ATTRIBUTE_TEMPLATE_PDF("PDF");
        private String value;

        private ATTRIBUTE_TEMPLATE(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }

    public static enum ATTRIBUTE_FORMAT {


        ATTRIBUTE_FORMAT_XML("xml"),
        ATTRIBUTE_FORMAT_PDF("pdf"); //keep in small caps
        private String value;

        private ATTRIBUTE_FORMAT(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }

    public static enum UDT_REPORT_PARAM {
        P_TABLE_NAME("P_TABLE_NAME"),
        P_INFORMATION_TYPE("P_INFORMATION_TYPE"),
        P_ROW_NAME("P_ROW_NAME");

        private String value;

        private UDT_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum FND_LOOKUP_REPORT_PARAM {
        BIND_LOOKUP_TYPE("bindLookupType"),
        BIND_LANGUAGE("bindLanguage");

        private String value;

        private FND_LOOKUP_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


    public static enum POSITION_EMAIL_REPORT_PARAM {
        POSITION_CODE("positionCode"),
        PERSON_ID("personId");
        private String value;

        private POSITION_EMAIL_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


    public static enum TERRITORIES_LIST_REPORT_PARAM {
        BIND_LANGUAGE("bindLanguage");

        private String value;

        private TERRITORIES_LIST_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum ALL_UDT_REPORT_PARAM {
        P_TABLE_NAME("P_TABLE_NAME");

        private String value;

        private ALL_UDT_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum AOR_REPORT_PARAM {
        P_PERSON("P_PERSON");

        private String value;

        private AOR_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum GRADE_RATE_REPORT_PARAM {
        GRADE_ID("GradeId");

        private String value;

        private GRADE_RATE_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum PERSON_ABSENCE_REPORT_PARAM {
        P_PERSON_ID("P_PERSON_ID"),
        P_START_DATE("P_START_DATE"),
        P_END_DATE("P_END_DATE");

        private String value;

        private PERSON_ABSENCE_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum FUSE_REPORT_PARAM {
        BIND_LOOKUP_TYPE("BINDLOOKUPTYPE"),
        P_TABLE_NAME("P_TABLE_NAME"),
        BIND_LANGUAGE("BINDLANGUAGE");

        private String value;

        private FUSE_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


    public static enum PERSON_FUSE_REPORT_PARAM {
        PERSON_ID("person_id");

        private String value;

        private PERSON_FUSE_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum PERSON_PAY_PERIOD_REPORT_PARAM {
        P_PERSON_ID("P_PERSON_ID");

        private String value;

        private PERSON_PAY_PERIOD_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum IDENTIICATIONS_LETTER_REPORT_PARAM {
        CF_DIRECTTO("CF_DIRECTTO"),
        EMP_NO("EMP_NO");

        private String value;

        private IDENTIICATIONS_LETTER_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum GET_AOR_EMAILS_PARAM {
        P_RES_NAME("P_RES_NAME");

        private String value;

        private GET_AOR_EMAILS_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum DEPENDENT_REPORT_PARAM {
        personNumber("personNumber");

        private String value;

        private DEPENDENT_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum GRATUITY_ACCRUED_REPORT_PARAM {
        P_PERSON_NUMBER("personNumber");
        //  P_EFFECTIVE_DATE("effectiveDate");

        private String value;

        private GRATUITY_ACCRUED_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum PART_OF_EOS_SUM_REPORT_PARAM {
        P_PERSON_NUMBER("personNumber");


        private String value;

        private PART_OF_EOS_SUM_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum PERSON_ELEMENT_ENTRY_REPORT_PARAM {
        P_PERSON_ID("P_PERSON_ID"),
        P_START_DATE("P_START_DATE");


        private String value;

        private PERSON_ELEMENT_ENTRY_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum EMPLOYEE_PAYROLL_REPORT_PARAM {
        personID("personID");


        private String value;

        private EMPLOYEE_PAYROLL_REPORT_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static enum GET_LATEST_ANNUAL_LEAVE_PARAM {
        P_PERSON_ID("PERSON_ID");


        private String value;

        private GET_LATEST_ANNUAL_LEAVE_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


    public static enum HR_CITIES_AND_COUNTRIES_PARAM {
        tag("tag");
        private String value;

        private HR_CITIES_AND_COUNTRIES_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
    public static enum Num_Of_Employee_Ticket_PARAM {
        personId("personId");
        private String value;

        private Num_Of_Employee_Ticket_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
    public static enum Employee_Prepayment_In_Period_PARAM {
        personId("personId");
        private String value;

        private Employee_Prepayment_In_Period_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
    public static enum PartEndOfServiceElementDateReport_PARAM {
        personId("personNumber");
        private String value;

        private PartEndOfServiceElementDateReport_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
    
    public static enum NumOfMonthsRemaining_PARAM {
        EMP_NO("EMP_NO"),
        REQUEST_DATE("REQUEST_DATE");
        private String value;

        private NumOfMonthsRemaining_PARAM(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    private String reportAbsolutePath;
    private String attributeFormat;
    private String attributeTemplate;
    private String parameters;
    private Map<String, String> paramMap = new HashMap<String, String>();
    private String soapRequest = null;
    private String username = "hcmuser";
    private String password = "Welcome@123";

    public void setParamMap(Map<String, String> paramMap) {
        this.paramMap = paramMap;
    }

    public Map<String, String> getParamMap() {
        return paramMap;
    }

    public void setReportAbsolutePath(String reportAbsolutePath) {
        this.reportAbsolutePath = reportAbsolutePath;
    }

    public String getReportAbsolutePath() {
        return reportAbsolutePath;
    }

    public String getParameters() {
        Iterator it = paramMap.entrySet().iterator();
        parameters = "";
        while (it.hasNext()) {
            Map.Entry parameter = (Map.Entry)it.next();
            parameters = parameters + "             <pub:item>\n" +
                    "                <pub:name>" + parameter.getKey() +
                    "</pub:name>\n" +
                    "                 <pub:values>\n" +
                    "                    <pub:item>" + parameter.getValue() +
                    "</pub:item>\n" +
                    "                  </pub:values>\n" +
                    "             </pub:item>\n";
        }
        return parameters;
    }

    public String getSoapRequest() {
        this.soapRequest =
                "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:pub=\"http://xmlns.oracle.com/oxp/service/PublicReportService\">\n" +
                "   <soapenv:Header/>\n" +
                "   <soapenv:Body>\n" +
                "      <pub:runReport>\n" +
                "         <pub:reportRequest>\n" +
                "            <pub:attributeLocale>en-US</pub:attributeLocale>\n" +
                "            <pub:attributeTemplate>" +
                this.attributeTemplate + "</pub:attributeTemplate>\n" +
                "            <pub:attributeFormat>" + this.attributeFormat +
                "</pub:attributeFormat>\n" +
                "            <pub:reportAbsolutePath>/Custom/SAAS Extension Reports/Reports/" +
                reportAbsolutePath + ".xdo</pub:reportAbsolutePath>\n" +
                "<pub:parameterNameValues>\n" +
                " \n" +
                getParameters() + "             </pub:parameterNameValues>\n" +
                " \n" +
                "         </pub:reportRequest>\n" +
                "         <pub:userID>" + this.username + "</pub:userID>\n" +
                "         <pub:password>" + this.password +
                "</pub:password>\n" +
                "      </pub:runReport>\n" +
                "   </soapenv:Body>\n" +
                "</soapenv:Envelope>";
        return soapRequest;
    }

    public String executeReports() {
        String output = "";
        try {
            System.setProperty("DUseSunHttpHandler", "true");
            

            byte[] buffer = new byte[getSoapRequest().length()];
            buffer = getSoapRequest().getBytes();
            ByteArrayOutputStream bout = new ByteArrayOutputStream();
            bout.write(buffer);
            byte[] b = bout.toByteArray();
            java.net.URL url = new URL(null, RestHelper.SAAS_URL + "/xmlpserver/services/PublicReportService",new sun.net.www.protocol.https.Handler());
            java.net.HttpURLConnection  http;
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                java.net.HttpURLConnection  https = (HttpsURLConnection) url.openConnection();
                System.setProperty("DUseSunHttpHandler", "true");
                //https.setHostnameVerifier(DO_NOT_VERIFY);
                http = https;
            } else {
                http = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction = "";
            //            http.setRequestProperty("Content-Length", String.valueOf(b.length));
            http.setRequestProperty("Content-Length",
                                    String.valueOf(b.length));
            http.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
            http.setRequestProperty("SOAPAction", SOAPAction);
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setDoInput(true);
            OutputStream out = http.getOutputStream();
            out.write(b);
            InputStream is = http.getInputStream();
            String responseXML = getStringFromInputStream(is);

            DocumentBuilder builder =
                DocumentBuilderFactory.newInstance().newDocumentBuilder();
            InputSource src = new InputSource();
            src.setCharacterStream(new StringReader(responseXML));

            Document doc = builder.parse(src);
            String data =
                doc.getElementsByTagName("reportBytes").item(0).getTextContent();
            if (ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_XML.getValue().equals(attributeFormat)) {
                output = StringUtils.newStringUtf8(Base64.decodeBase64(data));
            } else {
                output = data;
            }
        }

        catch (Exception e) {
            e.printStackTrace();
        }
        return output;
    }
    
    public byte[] executeReportsPDF() {
        String output = "";
        try {
            System.setProperty("DUseSunHttpHandler", "true");
            

            byte[] buffer = new byte[getSoapRequest().length()];
            buffer = getSoapRequest().getBytes();
            System.out.println(getSoapRequest());
            ByteArrayOutputStream bout = new ByteArrayOutputStream();
            bout.write(buffer);
            byte[] b = bout.toByteArray();
            java.net.URL url = new URL(null, RestHelper.SAAS_URL + "/xmlpserver/services/PublicReportService",new sun.net.www.protocol.https.Handler());
            java.net.HttpURLConnection  http;
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                java.net.HttpURLConnection  https = (HttpsURLConnection) url.openConnection();
                System.setProperty("DUseSunHttpHandler", "true");
                //https.setHostnameVerifier(DO_NOT_VERIFY);
                http = https;
            } else {
                http = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction = "";
            //            http.setRequestProperty("Content-Length", String.valueOf(b.length));
            http.setRequestProperty("Content-Length",
                                    String.valueOf(b.length));
            http.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
            http.setRequestProperty("SOAPAction", SOAPAction);
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setDoInput(true);
            OutputStream out = http.getOutputStream();
            out.write(b);
            InputStream is = http.getInputStream();
            String responseXML = getStringFromInputStream(is);

            DocumentBuilder builder =
                DocumentBuilderFactory.newInstance().newDocumentBuilder();
            InputSource src = new InputSource();
            src.setCharacterStream(new StringReader(responseXML));

            Document doc = builder.parse(src);
            String data =
                doc.getElementsByTagName("reportBytes").item(0).getTextContent();
            if (ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_XML.getValue().equals(attributeFormat)) {
                output = StringUtils.newStringUtf8(Base64.decodeBase64(data));
            } else {
                output = data;
            }
        }

        catch (Exception e) {
            e.printStackTrace();
        }
        return output.getBytes();
    }


    public void setAttributeFormat(String attributeFormat) {
        this.attributeFormat = attributeFormat;
    }

    public String getAttributeFormat() {
        return attributeFormat;
    }

    public void setAttributeTemplate(String attributeTemplate) {
        this.attributeTemplate = attributeTemplate;
    }

    public String getAttributeTemplate() {
        return attributeTemplate;
    }

}
