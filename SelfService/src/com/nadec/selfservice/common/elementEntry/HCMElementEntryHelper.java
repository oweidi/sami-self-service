package com.nadec.selfservice.common.elementEntry;

import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.businesstrip.EmployeeDetails;
import com.nadec.selfservice.common.bipreports.BIPReports;
import com.nadec.selfservice.common.bipreports.BIReportModel;
import com.nadec.selfservice.common.hdl.HDLHelper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Calendar;
import java.util.Date;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.codec.binary.Base64;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.json.XML;

import utilities.EncodeBased64Binary;

public class HCMElementEntryHelper {

    public static final String ELEMENT_HEADER =
        "METADATA|ElementEntry|SourceSystemOwner|SourceSystemId|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|EntryType|CreatorType";
    public static final String ELEMENT_LINE =
        "METADATA|ElementEntryValue|SourceSystemOwner|SourceSystemId|ElementEntryId(SourceSystemId)|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|InputValueName|ScreenEntryValue";
    //
    public static final String ELEMENT_HEADER_ALLOWANCE =
        "METADATA|WorkTerms|SourceSystemOwner|SourceSystemId|PeriodOfServiceId(SourceSystemId)|ActionCode|AssignmentNumber|AssignmentStatusTypeCode|AssignmentType|EffectiveStartDate|EffectiveEndDate|EffectiveSequence|EffectiveLatestChange|SystemPersonType|BusinessUnitShortCode|LegalEmployerName|PersonTypeCode|PersonNumber";
    public static final String ELEMENT_LINE_ALLOWANCE =
           "METADATA|Assignment|SourceSystemOwner|SourceSystemId|WorkTermsAssignmentId(SourceSystemId)|PeriodOfServiceId(SourceSystemId)|ActionCode|AssignmentNumber|WorkTermsNumber|AssignmentStatusTypeCode|AssignmentType|EffectiveStartDate|EffectiveEndDate|BusinessUnitShortCode|SystemPersonType|PersonTypeCode|LegalEmployerName|EffectiveSequence|EffectiveLatestChange|ReasonCode|PersonNumber|WorkAtHomeFlag|ManagerFlag|HourlySalariedCode|NormalHours|Frequency|AssignmentCategory|PeopleGroup";
    
    public static final String ELEMENT_HEADER_WORKER_NO_PG =
        "METADATA|WorkTerms|SourceSystemOwner|SourceSystemId|PeriodOfServiceId(SourceSystemId)|ActionCode|AssignmentNumber|AssignmentStatusTypeCode|AssignmentType|EffectiveStartDate|EffectiveEndDate|EffectiveSequence|EffectiveLatestChange|SystemPersonType|BusinessUnitShortCode|LegalEmployerName|PersonTypeCode|PersonNumber";
    public static final String ELEMENT_LINE_WORKER_NO_PG=
           "METADATA|Assignment|SourceSystemOwner|SourceSystemId|WorkTermsAssignmentId(SourceSystemId)|PeriodOfServiceId(SourceSystemId)|ActionCode|AssignmentNumber|WorkTermsNumber|AssignmentStatusTypeCode|AssignmentType|EffectiveStartDate|EffectiveEndDate|BusinessUnitShortCode|SystemPersonType|PersonTypeCode|LegalEmployerName|EffectiveSequence|EffectiveLatestChange|ReasonCode|PersonNumber|WorkAtHomeFlag|ManagerFlag|HourlySalariedCode|NormalHours|Frequency";
    
    public static final String ELEMENT_HEADER_WORKER_PERSON_ABSENCE =
        "METADATA|PersonAbsenceEntry|Employer|PersonNumber|AbsenceType|AbsenceStatus|ApprovalStatus|StartDate|EndDate|SourceSystemOwner|SourceSystemId";
    
    public HCMElementEntryHelper() {
        super();
    }

    public static String uploadAndLoadFile(String path, String fileContent,
                                           String toBytes) {
        return uploadAndLoadFile(path, fileContent, toBytes, "NA", "NA",null,null);
    }

    public static String uploadAndLoadFile(String path, String fileContent,
                                           String toBytes, String trsId,
                                           String ssType,String personNumber,String filename) {
        String resp = "";
        
        try {
            
            HDLHelper.insertHDLFile(null, trsId, ssType,
                                    "Upload Element File",
                                    null, fileContent,
                                    personNumber,toBytes,
                                    path,getPersonDetails(personNumber),
                                    getLatestAnnualLeave(personNumber),
                                    filename);


        }  catch (JSONException e) {
            e.printStackTrace();
        }

        return resp;
    }

    public static String CALL_UCM(String hdlId,String startDate,String path,String sstype) {

        String resp = "";
        try {
            JSONObject hdlIdJSON = new JSONObject(HDLHelper.getHDLFile(hdlId));
            JSONArray items = hdlIdJSON.getJSONArray("items");
            String filename = items.getJSONObject(0).getString("file_name");
            String fileContent = 
                items.getJSONObject(0).getString("file_content");
            String toBytes = items.getJSONObject(0).getString("file_bytes");
            
            if(sstype.equals("FVR") || sstype.equals("TRF")|| sstype.equals("BT")|| sstype.equals("XIL")|| sstype.equals("AH")) {
                toBytes =
                        toBytes.replaceAll("%EffectiveEndDate%", HCMElementEntryHelper.GET_LAST_DATE_OF_SEPECIFIC_MONTH(startDate));
                fileContent = fileContent.replaceAll("%EffectiveEndDate%",
                                        HCMElementEntryHelper.GET_LAST_DATE_OF_SEPECIFIC_MONTH(startDate));  
               
                
            } else {
                toBytes =
                        toBytes.replaceAll("%EffectiveEndDate%",  HCMElementEntryHelper.FORMAT_DATE("4712-12-31"));
                fileContent = fileContent.replaceAll("%EffectiveEndDate%",
                                        HCMElementEntryHelper.FORMAT_DATE("4712-12-31")); 
                
            }
            
            toBytes =
                    toBytes.replaceAll("%EffectiveStartDate%", HCMElementEntryHelper.FORMAT_DATE(startDate));
            
            fileContent = fileContent.replaceAll("%EffectiveStartDate%", HCMElementEntryHelper.FORMAT_DATE(startDate));
              
          
//            System.out.println(toBytes);

            try {
               
                PrintWriter outp =
                    new PrintWriter(new FileWriter(path + "/"+filename+".dat"));
                outp.println(fileContent);
                outp.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            //=========to create a zip file and encrypt
            try {
                File file = new File(path + "/"+filename+".zip");
                String zipFileName = filename + ".dat";
                ZipOutputStream out =
                    new ZipOutputStream(new FileOutputStream(file));
                ZipEntry e = new ZipEntry(zipFileName);
                out.putNextEntry(e);

                byte[] data = toBytes.toString().getBytes();
                out.write(data, 0, data.length);
                out.closeEntry();

                out.close();

            } catch (Exception e) {
                e.printStackTrace();
            }
            try {
//                System.out.println(path);
                File file = new File(path +"/"+ filename + ".zip");
                byte[] bytes = loadFile(file);


                EncodeBased64Binary k = new EncodeBased64Binary();

                String output =
                    k.callUCMService(Base64.encodeBase64String(bytes),
                                     filename+".zip");
                resp = output;
                String response = k.callLoaderService(output, "", hdlId);

                resp = resp + " -----> " + response;
            } catch (IOException ioe) {

                ioe.printStackTrace();
            } 
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;

    }

    private static byte[] loadFile(File file) throws IOException {
        InputStream is = new FileInputStream(file);

        long length = file.length();
        if (length > Integer.MAX_VALUE) {
            // File is too large


        }
        byte[] bytes = new byte[(int)length];

        int offset = 0;
        int numRead = 0;
        while (offset < bytes.length &&
               (numRead = is.read(bytes, offset, bytes.length - offset)) >=
               0) {
            offset += numRead;
        }

        if (offset < bytes.length) {
            throw new IOException("Could not completely read file " +
                                  file.getName());
        }

        is.close();
        return bytes;
    }

    public static String getFirstDayofCuurentMonth() {
        Calendar aCalendar = Calendar.getInstance();

        // set DATE to 1, so first date of previous month
        aCalendar.set(Calendar.DATE, 1);

        Date firstDateOfPreviousMonth = aCalendar.getTime();

        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
        return format.format(firstDateOfPreviousMonth);

    }

    public static String getlastDayofCuurentMonth() {
        Calendar aCalendar = Calendar.getInstance();
        // set actual maximum date of previous month
        aCalendar.set(Calendar.DATE,
                      aCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        //read it
        Date lastDateOfPreviousMonth = aCalendar.getTime();
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
        return format.format(lastDateOfPreviousMonth);

    }
    
    private static EmployeeBean getPersonDetails(String personNumber) throws JSONException {
        EmployeeDetails empDetails = new EmployeeDetails();
//        System.out.println(personNumber);
        EmployeeBean bean = empDetails.getEmpDetailsByPersonNum(personNumber, null, null);

        return bean;
    }

    public static String FORMAT_DATE(String date) {
        //read it
        String startDateString = date;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
        Date startDate;
        DateFormat df1 = new SimpleDateFormat("yyyy/MM/dd");
        try {
            startDate = df.parse(startDateString);
            return df1.format(startDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        
        return null;
    }

    public static String GET_LAST_DATE_OF_SEPECIFIC_MONTH(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat df1 = new SimpleDateFormat("yyyy/MM/dd");
        Date convertedDate;
        try {
            convertedDate = dateFormat.parse(date);
        //    System.out.println(c);
            Calendar c = Calendar.getInstance();
            c.setTime(convertedDate);
//            System.out.println(convertedDate);
            c.set(Calendar.DAY_OF_MONTH,
                  c.getActualMaximum(Calendar.DAY_OF_MONTH));

            return df1.format(c.getTime()); 
        } catch (ParseException e) {
            e.printStackTrace();
        }
       
       
        return null;
    }
    
    private static String getLatestAnnualLeave(String personNumber) throws JSONException {
        BIPReports biPReports = new BIPReports();
        biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_XML.getValue());
        biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_XML.getValue());
        biPReports.getParamMap().put("PERSON_ID", personNumber);
        biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_LATEST_ANNUAL_LEAVE.getValue());
        String fresponse = biPReports.executeReports();
        JSONObject xmlJSONObj = XML.toJSONObject(fresponse.toString());
        String jsonString = null;
        if(!xmlJSONObj.getJSONObject("DATA_DS").isNull("G_1")) { 
             jsonString =
                xmlJSONObj.getJSONObject("DATA_DS").get("G_1").toString();
        }
        

        return jsonString;
    }
    
    public static void main(String[] args) {
//        try {
//        String x= "METADATA|ElementEntry|SourceSystemOwner|SourceSystemId|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|EntryType|CreatorType\n" + 
//        "MERGE|Assignment|NADEC|23125_WORKTERMS|23125_WORKREL|23125_WORKREL|HIRE|ET23125|ET23125|ACTIVE_PROCESS|ET|%EffectiveStartDate%|%EffectiveEndDate%|KSA AGRICULTURE BU|EMP|Employee|NADEC KSA LE|1|Y|Employee|23125|Employee|N|N|N|S|KSA_AGRICULTURE|PROVIDED.......Y.1835...Y.200.......\n" + 
//        "METADATA|ElementEntryValue|SourceSystemOwner|SourceSystemId|ElementEntryId(SourceSystemId)|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|InputValueName|ScreenEntryValue\n";
//        x = x.replaceAll(Pattern.quote("%EffectiveStartDate%"),"X");
//        x= x.replaceAll("%EffectiveEndDate%",
//                               HCMElementEntryHelper.FORMAT_DATE("2050-04-08"));
        
        

        System.out.println(HCMElementEntryHelper.FORMAT_DATE("2050-04-08"));
//        } catch (JSONException e) {
//        }
        ;
        
    }
    
    
}
