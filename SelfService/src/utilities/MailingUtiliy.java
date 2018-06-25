package utilities;

import com.nadec.selfservice.common.restHelper.RestHelper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.io.OutputStream;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import org.json.JSONException;
import org.json.JSONObject;

public class MailingUtiliy extends RestHelper{
    public MailingUtiliy() {
        super();
    }

    public static void main(String[] args) throws JSONException {
        JSONObject jsonObj= new JSONObject();
        jsonObj.put("toAddress", "abdullah.oweidi@appspro-me.com");
        jsonObj.put("fromAddress", "amro.alfares@appspro-me.com");
        jsonObj.put("textBody", "Automated Email conten");
        jsonObj.put("htmlBody", "<html><body>Automated Email</body></html>");
        jsonObj.put("subject", "Automatedmail from PaaS");
//        var jsonBody = {
 //             toAddress : "bala.ravilla@gmail.com" ,
//              fromAddress : "bala.ravilla@gmail.com",
 //             textBody : "Automated Email content",
 //              htmlBody: "<html><body>Automated Email</body></html>",
//              subject:"Automatedmail from PaaS"
 //         };
       sendMail(jsonObj);
    }
    
    public static String sendMail(JSONObject jsonObj) throws JSONException {
        String output="Failed to send due to Internal error";
        
        String to=jsonObj.getString("toAddress");
        String from=jsonObj.getString("fromAddress");
        String textBody=jsonObj.getString("textBody");
        String htmlBody=jsonObj.getString("htmlBody");
        String subject=jsonObj.getString("subject");
        
//        output=sendNotification(to,from,textBody,htmlBody,subject);
        
        return output;
    }
    final static HostnameVerifier DO_NOT_VERIFY = new HostnameVerifier() {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    };
    public static String sendNotification(String body){
           String output = null;
           try {

               String serverUrl ="https://apex-hcuk.db.em2.oraclecloudapps.com/apex/myservice/sendmail/";
               URL url = new URL(null, serverUrl, new sun.net.www.protocol.https.Handler());
               HttpURLConnection conn = null;
               HttpsURLConnection https = null;
               if (url.getProtocol().toLowerCase().equals("https")) {
                   trustAllHosts();
                   https = (HttpsURLConnection)url.openConnection();
                   https.setHostnameVerifier(DO_NOT_VERIFY);
                   conn = https;
               } else {
                   conn = (HttpURLConnection)url.openConnection();
               }
               conn.setRequestMethod("POST");
               conn.setRequestProperty("Accept", "application/json");            
               conn.setRequestProperty( "User-Agent", "Mozilla/5.0" );
               conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");            
               conn.setDoOutput(true);
               conn.setDoInput(true);
               
              
               conn.setRequestProperty("Content-Length", String.valueOf(body.getBytes().length));
               
               OutputStream writer = conn.getOutputStream();
               writer.write(body.getBytes());
               writer.flush();
               writer .close();
               System.out.println(body);
               if (conn.getResponseCode() != 200) {
                   throw new RuntimeException("Failed : HTTP error code : " +
                                              conn.getResponseCode());
               }

               BufferedReader br =  new BufferedReader(new InputStreamReader((conn.getInputStream())));


               System.out.println("Output from Server .... \n");
               while ((output = br.readLine()) != null) {
                   System.out.println(output);
               }           
               conn.disconnect();

           } catch (MalformedURLException e) {
               e.printStackTrace();

           } catch (IOException e) {
               e.printStackTrace();
           }
           return output;
    }

}
