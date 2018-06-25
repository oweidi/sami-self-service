package com.nadec.selfservice.businesstrip;


import com.nadec.selfservice.bean.GradeBean;
import com.nadec.selfservice.common.restHelper.RestHelper;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.HttpURLConnection;
import java.net.URL;

import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

import org.json.JSONArray;
import org.json.JSONObject;


public class GradeDetails extends RestHelper {
    public GradeDetails() {
        super();
    }
    
    final String SAAS_URL_IP = "https://ejdu-dev1.fa.em2.oraclecloud.com:443";
    final String SAAS_URL = "https://ejdu-dev1.fa.em2.oraclecloud.com";
    
    public ArrayList<GradeBean> getGrades(String username, String jwt,
                                          String host) {

        ArrayList<GradeBean> gradeList = new ArrayList<GradeBean>();
        HttpsURLConnection https = null;
        HttpURLConnection connection = null;
        String serverUrl =
           SAAS_URL_IP +  "/hcmCoreSetupApi/resources/latest/grades";

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
                GradeBean bean = new GradeBean();
                JSONObject gradeObj = arr.getJSONObject(i);
                bean.setGradeId(gradeObj.getString("GradeId"));
                bean.setEffectiveStartDate(gradeObj.getString("EffectiveStartDate"));
                bean.setEffectiveEndDate(gradeObj.getString("EffectiveEndDate"));
                bean.setSetId(gradeObj.getString("SetId"));
                bean.setGradeName(gradeObj.getString("GradeName"));
                bean.setGradeCode(gradeObj.getString("GradeCode"));
                bean.setActiveStatus(gradeObj.getString("ActiveStatus"));
                bean.setCreationDate(gradeObj.getString("CreationDate"));
                bean.setLastUpdateDate(gradeObj.getString("LastUpdateDate"));
                gradeList.add(bean);
            }


        } catch (Exception e) {
            e.printStackTrace();
        }

        return gradeList;
    }
}
