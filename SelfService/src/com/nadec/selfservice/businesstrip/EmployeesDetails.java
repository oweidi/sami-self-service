package com.nadec.selfservice.businesstrip;
import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.bean.GradeBean;
import com.nadec.selfservice.common.restHelper.RestHelper;

import java.awt.image.BufferedImage;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.io.UnsupportedEncodingException;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import org.json.JSONArray;
import org.json.JSONObject;
public class EmployeesDetails extends RestHelper
{
    
    final String SAAS_URL_IP = "https://ejdu-dev1.fa.em2.oraclecloud.com:443";
    final String SAAS_URL = "https://ejdu-dev1.fa.em2.oraclecloud.com";
    public EmployeesDetails() 
    {
        super();
    }
    
    
    public ArrayList<EmployeeBean> getEmployees(String username, String jwt,
                                          String host)
    {

        ArrayList<EmployeeBean> employeesList = new ArrayList<EmployeeBean>();
       HttpsURLConnection https = null;
       HttpURLConnection connection = null;
       String serverUrl =
           SAAS_URL_IP  + "/hcmCoreApi/resources/latest/emps";

       try {
           URL url =
               new URL(null, serverUrl, new sun.net.www.protocol.https.Handler());
           if (url.getProtocol().toLowerCase().equals("https")) {
               trustAllHosts();
               https = (HttpsURLConnection)url.openConnection();
               https.setHostnameVerifier(DO_NOT_VERIFY);
               connection = https;
           } else {
               connection = (HttpURLConnection)url.openConnection();
           }
           String SOAPAction =SAAS_URL_IP;
           connection.setDoOutput(true);
           connection.setDoInput(true);
           connection.setRequestMethod("GET");
           connection.setRequestProperty("Content-Type", "application/json;");
           connection.setRequestProperty("Accept", "application/json");
           connection.setConnectTimeout(6000000);
           connection.setRequestProperty("SOAPAction", SOAPAction);
           //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
           connection.setRequestProperty("Authorization",
                                         "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");

           BufferedReader in =
               new BufferedReader(new InputStreamReader(connection.getInputStream()));
           String inputLine;
           StringBuffer response = new StringBuffer();

           while ((inputLine = in.readLine()) != null) {
               response.append(inputLine);
           }
           in.close();

           JSONObject obj = new JSONObject(response.toString());
           JSONArray arr = obj.getJSONArray("items");
           for (int i = 0; i < arr.length(); i++) {
               EmployeeBean bean = new EmployeeBean();
               JSONObject empObj = arr.getJSONObject(i);
                   bean.setPersonId(empObj.getString("PersonId"));
                   bean.setPersonNumber(empObj.getString("PersonNumber"));
                   bean.setDisplayName(empObj.getString("DisplayName"));
               
                 employeesList.add(bean);
               }
       }
       catch (Exception e) {
                   e.printStackTrace();
               }
       
        return employeesList;
   }
    
    
}
