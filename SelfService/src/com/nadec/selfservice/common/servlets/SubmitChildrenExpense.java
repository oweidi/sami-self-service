package com.nadec.selfservice.common.servlets;

import com.nadec.selfservice.businesstrip.EmployeeDetails;

import com.nadec.selfservice.common.elementEntry.HCMElementEntryHelper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;

import org.json.JSONException;
import org.json.JSONObject;

import utilities.EncodeBased64Binary;

public class SubmitChildrenExpense extends HttpServlet {
    private static final String CONTENT_TYPE =
        "text/html; charset=windows-1252";


    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException,
                                                            IOException {

        String payloadRequest = getBody(request);
        JSONObject jsonObj;

        try {
            jsonObj = new JSONObject(payloadRequest);
            response.setContentType(CONTENT_TYPE);

            PrintWriter out = response.getWriter();

            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            String path = context.getRealPath(request.getContextPath());

            if (null != path && path.contains("SamiSelfService")) {
                path = path.split("SamiSelfService")[0] + "/images";
            } else {
                path = System.getProperty("java.scratch.dir");
            }
            
            
            out.write(createHelper(path, jsonObj));
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public static String getBody(HttpServletRequest request) throws IOException {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader =
                        new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }


    private String createHelper(String path, JSONObject jsonObj) {
        String resp = "Service Failed.";
        try {

                                              

            String sourceSystemOwner = "PAAS";
            //jsonObj.getString("sourceSystemOwner");
            String sourceSystemId = jsonObj.getString("id"); ////100002_HA_10
            //jsonObj.getString("personId")+ "HA"+jsonObj.getString("id");//100002_HA_10
            //jsonObj.getString("sourceSystemId");
            String EffectiveStartDate = HCMElementEntryHelper.getFirstDayofCuurentMonth();
            String EffectiveEndDate = HCMElementEntryHelper.getlastDayofCuurentMonth();
            String ElementName = "Education Claim Payment SAR";
            String LegislativeDataGroupName = "SA Legislative Data Group";
            String AssignmentNumber = "E" + jsonObj.getString("personNumber");
            String EntryType = "E";
            String CreatorType = "H";
            //
            String lineSourceSystemOwner = "PAAS";
            String lineElementEntryId = jsonObj.getString("id");
            ;
            String lineEffectiveStartDate = HCMElementEntryHelper.getFirstDayofCuurentMonth();
            String lineEffectiveEndDate = HCMElementEntryHelper.getlastDayofCuurentMonth();
            String lineElementName = "Education Claim Payment SAR";//
            String lineLegislativeDataGroupName = "SA Legislative Data Group";
            String lineAssignmentNumber =
                "E" + jsonObj.getString("personNumber");


            String lineSourceSystemId1 =
            jsonObj.getString("personNumber") + "_CEE_" +
            jsonObj.getString("id") + "_AMOUNT";
            String lineInputValueName1 = "Amount";
            String lineScreenEntryValue1 =
            jsonObj.getString("amountNumber");

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
                linedata2 + "\n" ;            
            String fileContent = HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" + headerdata + "\r\n" + HCMElementEntryHelper.ELEMENT_LINE + "\r\n" + linedata1 + "\r\n" + linedata2 ;
           // resp = HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes,trsId,"CEE",null);
            

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

}
