package com.nadec.selfservice.businesstrip;

//import com.bea.security.providers.xacml.entitlement.parser.Users;
//
//import java.io.BufferedReader;
//import java.io.ByteArrayOutputStream;
//
//import java.io.FileOutputStream;
import java.io.File;
import java.io.FileWriter;
//import java.io.IOException;
//import java.io.InputStream;
//
//import java.io.InputStreamReader;
//
//import javax.net.ssl.*;
//import java.io.OutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.codec.binary.Base64;

import utilities.EncodeBased64Binary;

//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.security.cert.CertificateException;
//import java.security.cert.X509Certificate;
//
//import java.util.ArrayList;
//
//import org.json.JSONArray;
//import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        createFileAndSend();
    }

    public static String createFileAndSend() {
        String resp = "Service Failed.";
        String sourceSystemOwner = "PAAS";
        String sourceSystemId = "100007_BTRIPADVANCE_10";
        String EffectiveStartDate = "2017/10/01";
        String EffectiveEndDate = "2017/10/31";
        String ElementName = "Business Trip Advance";
        String LegislativeDataGroupName = "SA Legislative Data Group";
        String AssignmentNumber = "E100007";
        String EntryType = "E";
        String CreatorType = "H";

        String lineSourceSystemOwner = sourceSystemOwner;
        String lineElementEntryId = sourceSystemId;
        String lineEffectiveStartDate = EffectiveStartDate;
        String lineEffectiveEndDate = EffectiveEndDate;
        String lineElementName = ElementName;
        String lineLegislativeDataGroupName = LegislativeDataGroupName;
        String lineAssignmentNumber = AssignmentNumber;

        String lineSourceSystemId1 = sourceSystemId + "_PAYVALUE";
        String lineInputValueName1 = "Pay Value";
        String lineScreenEntryValue1 = "1000";

        String header =
            "METADATA|ElementEntry|SourceSystemOwner|SourceSystemId|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|EntryType|CreatorType";
        String headerdata =
            "MERGE|ElementEntry|" + sourceSystemOwner + "|" + sourceSystemId +
            "|" + EffectiveStartDate + "|" + EffectiveEndDate + "|" +
            ElementName + "|" + LegislativeDataGroupName + "|" +
            AssignmentNumber + "|" + EntryType + "|" + CreatorType;
        String line =
            "METADATA|ElementEntryValue|SourceSystemOwner|SourceSystemId|ElementEntryId(SourceSystemId)|EffectiveStartDate|EffectiveEndDate|ElementName|LegislativeDataGroupName|AssignmentNumber|InputValueName|ScreenEntryValue";
        String linedata1 =
            "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
            lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
            lineScreenEntryValue1;
        String toBytes = header + "\n" +
            headerdata + "\n" +
            line + "\n" +
            linedata1 + "\n";
        //to create a file and zip it before encryption
        File f = new File(toBytes);
        byte[] bytes = toBytes.getBytes();

        ZipEntry entry = new ZipEntry("ElementEntry.zip");


        EncodeBased64Binary k = new EncodeBased64Binary();

        String output =
            k.callUCMService(Base64.encodeBase64String(bytes), "ElementEntry.dat");
        resp = output;
//        String response = k.callLoaderService(output, "");
//        resp = resp + " -----> " + response;

        try {
            PrintWriter out =
                new PrintWriter(new FileWriter("C:\\Users\\Bala\\Desktop\\ElementEntry.dat"));
            out.println(header);
            out.println(headerdata);
            //out.println("\n");
            out.println(line);
            out.println(linedata1);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }
    //
    //    private  static void service(){
    //        try{
    //        URL url = new URL("https://efgv-dev1.hcm.em3.oraclecloud.com:443/hcmCoreApi/resources/11.1.10/emps/?q=PersonNumber=100001");
    //        HttpURLConnection http = null;
    //
    //        if (url.getProtocol().toLowerCase().equals("https")) {
    //            trustAllHosts();
    //            HttpsURLConnection https = (HttpsURLConnection) url.openConnection();
    //            https.setHostnameVerifier(DO_NOT_VERIFY);
    //            http = https;
    //        } else {
    //            http = (HttpURLConnection) url.openConnection();
    //        }
    //        String SOAPAction="";
    //        http.addRequestProperty("Authorization", "Basic aGNtX2ltcGw6V2VsY29tZUAxMjM=");
    //        http.setRequestProperty("SOAPAction", SOAPAction);
    //        http.setRequestMethod("GET");
    //        http.setRequestProperty("Content-Type", "application/json;");
    //        http.setRequestProperty("Accept", "application/json");
    //        http.setDoOutput(true);
    //        http.setDoInput(true);
    //        http.setConnectTimeout(6000000);
    //        //            OutputStream out = http.getOutputStream();
    //        //            out.write(requestJson.toString().getBytes("UTF-8"));
    //        //                out.close();
    //
    //        // InputStream is = http.getInputStream();
    //        BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
    //        String inputLine;
    //        StringBuffer response = new StringBuffer();
    //
    //        while ((inputLine = in.readLine()) != null) {
    //            response.append(inputLine);
    //        }
    //        in.close();
    //
    //        //print result
    //        // String jsonResponse=response.toString();
    //        JSONObject obj = new JSONObject(response.toString());
    //        JSONArray arr = obj.getJSONArray("items");
    //
    //        for (int i = 0; i < arr.length(); i++){
    //            String DisplayName = arr.getJSONObject(i).getString("DisplayName");
    //            String HireDate = arr.getJSONObject(i).getString("HireDate");
    //            String CitizenshipLegislationCode;
    //            if(arr.getJSONObject(i).isNull("CitizenshipLegislationCode")){
    //                 CitizenshipLegislationCode = "null";
    //            }else{
    //
    //             CitizenshipLegislationCode = arr.getJSONObject(i).getString("CitizenshipLegislationCode");
    //            }
    //            String PersonNumber = arr.getJSONObject(i).getString("PersonNumber");
    //
    //            ArrayList al = new ArrayList();
    //            al.add(DisplayName);
    //            al.add(HireDate);
    //            al.add(CitizenshipLegislationCode);
    //
    //           // empDetailsmap.put(PersonNumber, al);
    //        // finalresponse=    getAssignmentDetails(empDetailsmap,jwttoken,host);
    //
    //        }
    //    }
    //    catch(Exception e){
    //        e.printStackTrace();
    //    }
    //       }
    //    private static  String getStringFromInputStream(InputStream is) {
    //
    //               BufferedReader br = null;
    //               StringBuffer sb = new StringBuffer();
    //
    //               String line;
    //               try {
    //
    //                       br = new BufferedReader(new InputStreamReader(is));
    //                       while ((line = br.readLine()) != null) {
    //                               sb.append(line);
    //                       }
    //
    //               } catch (IOException e) {
    //                       e.printStackTrace();
    //               } finally {
    //                       if (br != null) {
    //                               try {
    //                                       br.close();
    //                               } catch (IOException e) {
    //                                       e.printStackTrace();
    //                               }
    //                       }
    //               }
    //
    //               return sb.toString();
    //    }
    //
    //
    //
    //    final static HostnameVerifier DO_NOT_VERIFY = new HostnameVerifier() {
    //        public boolean verify(String hostname, SSLSession session) {
    //            return true;
    //        }
    //    };
    //
    //    private static void trustAllHosts() {
    //        // Create a trust manager that does not validate certificate chains
    //        TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
    //            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
    //                return new java.security.cert.X509Certificate[] {};
    //            }
    //
    //            public void checkClientTrusted(X509Certificate[] chain,
    //                                           String authType) throws CertificateException
    //            {
    //            }
    //
    //            public void checkServerTrusted(X509Certificate[] chain,
    //                                           String authType) throws CertificateException {
    //            }
    //        } };
    //
    //        // Install the all-trusting trust manager
    //        try {
    //            SSLContext sc = SSLContext.getInstance("SSL");
    //            sc.init(null, trustAllCerts, new java.security.SecureRandom());
    //            HttpsURLConnection
    //                    .setDefaultSSLSocketFactory(sc.getSocketFactory());
    //        } catch (Exception e) {
    //            e.printStackTrace();
    //        }
    //    }
}
