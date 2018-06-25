package com.nadec.selfservice.common.login;

import com.nadec.selfservice.common.restHelper.RestHelper;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import java.io.StringReader;

import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;

import org.xml.sax.InputSource;

public class Login extends RestHelper{
    public Login() {
        super();
    }

    public boolean validateLogin(String userName, String password) {
        String output = "";
        try {
           
            String soapRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:pub=\"http://xmlns.oracle.com/oxp/service/PublicReportService\">\n" + 
            "   <soapenv:Header/>\n" + 
            "   <soapenv:Body>\n" + 
            "      <pub:validateLogin>\n" + 
            "         <pub:userID>"+userName+"</pub:userID>\n" + 
            "         <pub:password>"+password+"</pub:password>\n" + 
            "      </pub:validateLogin>\n" + 
            "   </soapenv:Body>\n" + 
            "</soapenv:Envelope>";
            
            System.setProperty("DUseSunHttpHandler", "true");
            

            byte[] buffer = new byte[soapRequest.length()];
            buffer = soapRequest.getBytes();
            ByteArrayOutputStream bout = new ByteArrayOutputStream();
            bout.write(buffer);
            byte[] b = bout.toByteArray();
            java.net.URL url = new URL(null, "https://ejdu-dev1.fa.em2.oraclecloud.com/xmlpserver/services/PublicReportService",new sun.net.www.protocol.https.Handler());
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
            
            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            InputSource src = new InputSource();
            src.setCharacterStream(new StringReader(responseXML));

            Document doc = builder.parse(src);
            String data = doc.getElementsByTagName("validateLoginReturn").item(0).getTextContent();
            return new Boolean(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
