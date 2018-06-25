package com.nadec.selfservice.common.hdl;

import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.common.restHelper.RestHelper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import java.io.FileWriter;
import java.io.IOException;

import java.io.InputStream;
import java.io.PrintWriter;

import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.codec.binary.Base64;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import utilities.EncodeBased64Binary;

public class HDLHelper {

    public HDLHelper() {
        super();
    }

    public static String insertHDLFile(String processID, String ssId,
                                       String ssType, String status,
                                       String ucmId, String fileContent,
                                       String personNumber,String toBytes,
                                       String path,EmployeeBean employeeDetails,
                                       String latestAnnualLeave,
                                       String filename) throws JSONException {

        JSONObject body = new JSONObject();
        body.put("PROCESS_ID", processID);
        body.put("SS_ID", ssId);
        body.put("SS_TYPE", ssType);
        body.put("STATUS", status);
        body.put("UCM_ID", ucmId);
        body.put("FILE_CONTENT", fileContent);
        body.put("PERSON_NUMBER", personNumber);
        body.put("FILE_PATH", path);
        body.put("FILE_BYTES", toBytes);
        
        //Add Person Details Info.
        body.put("FULL_NAME", employeeDetails.getDisplayName());
        body.put("HIRE_DATE", employeeDetails.getHireDate());
        body.put("POSITION_NAME", employeeDetails.getPositionName());
        body.put("GRADE_NAME", employeeDetails.getGrade());
        body.put("ASSIGNMENT_STATUS_TYPE", employeeDetails.getAssignmentStatusTypeId());
        body.put("FILE_NAME",filename);
        
        //Add latest Annual Leave
        if(latestAnnualLeave != null) {
            JSONObject latestAnnualLeavebody = new JSONObject(latestAnnualLeave);
            body.put("START_DATE", latestAnnualLeavebody.getString("START_DATE"));
            body.put("END_DATE", latestAnnualLeavebody.getString("END_DATE"));
            body.put("ADVANCED_LEAVE", (latestAnnualLeavebody.getString("START_DATE") != null && !latestAnnualLeavebody.getString("START_DATE").isEmpty() ) ? "YES" : "NO" ); 
        }
        
        
        return RestHelper.callPostRest("https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/HDL",
                                       null, "application/json",
                                       body.toString());
    }

    public static String updateHDLFile(String processID, String id,
                                       String status,String UCM_ID) throws JSONException {

        JSONObject body = new JSONObject();
        body.put("P_PROCESS_ID", processID);
        if (UCM_ID != null) {
            body.put("UCM_ID", UCM_ID);    
        }
        
        body.put("P_STATUS", status);
        body.put("ID", id);

        return RestHelper.callPutRest("https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/HDL",
                                      null, "application/json",
                                      body.toString());
    }

    public static String getHDLFile(String id) throws JSONException {

        return RestHelper.callGetRest("https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/HDL",
                                      id);
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
    
    private static String objToString(Object var) {
        
        if(var == null || var.equals("null")) {
            return "";
        }
        
        return var.toString().equals("null") ? ""  : var.toString();
    }
}
