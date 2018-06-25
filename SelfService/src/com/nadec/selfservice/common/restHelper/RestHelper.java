package com.nadec.selfservice.common.restHelper;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.HttpURLConnection;
import java.net.URL;
import javax.net.ssl.X509TrustManager;
import java.security.cert.CertificateException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
/*
 * This Helper to call rest webservice either from REST HCM API/CLOUD REST
 */
public class RestHelper {
    
    public final static HostnameVerifier DO_NOT_VERIFY = new HostnameVerifier() {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    };
    final String SAAS_URL_IP = "https://ejdu-dev1.fa.em2.oraclecloud.com:443";
    final String SAAS_URL = "https://ejdu-dev1.fa.em2.oraclecloud.com";
    
    /**
     *
     * @param serverUrl Target Server URL
     * @param jwttoken JWT TOKEN for autharization
     * @param requestMethod GET/POST/DELETE/PUT
     * @param contentType ex : APPLICATION/JSON
     * 
     * @return response as String buffer
     */
    public StringBuffer getDataFromRestAPI(String serverUrl, String jwttoken,
                                           String requestMethod,
                                           String contentType) {
        HttpsURLConnection https = null;
        HttpURLConnection connection = null;
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
            connection = (HttpsURLConnection)url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            connection.setRequestMethod(requestMethod);
            connection.setRequestProperty("Content-Type", contentType);
            //connection.addRequestProperty("Authorization","Bearer " + jwttoken);
            connection.addRequestProperty("Authorization","Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public String getLovName(StringBuffer respone, String fieldName) {
        JSONObject objDep;
        try {
            objDep = new JSONObject(respone.toString());
            JSONArray arrDep = objDep.getJSONArray("items");
            for (int i1 = 0; i1 < arrDep.length(); i1++) {
                return arrDep.getJSONObject(i1).getString(fieldName);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public static void trustAllHosts() {
        // Create a trust manager that does not validate certificate chains
        TrustManager[] trustAllCerts =
            new TrustManager[] { new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return new java.security.cert.X509Certificate[] { };
                }

                public void checkClientTrusted(java.security.cert.X509Certificate[] chain,
                                               String authType) throws CertificateException {
                }

                public void checkServerTrusted(java.security.cert.X509Certificate[] chain,
                                               String authType) throws CertificateException {
                }
            } };

        // Install the all-trusting trust manager
        try {
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    public static String callPostRest(String serverUrl, String jwttoken,
                                       String contentType,String body) {
        try {

            URL url = new URL(serverUrl);
            HttpsURLConnection https = null;
                HttpURLConnection conn = null;
                if (url.getProtocol().toLowerCase().equals("https")) {
                    trustAllHosts();
                    https = (HttpsURLConnection)url.openConnection();
                    https.setHostnameVerifier(DO_NOT_VERIFY);
                    conn = https;
                } else {
                    conn = (HttpURLConnection)url.openConnection();
                }
            
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", contentType);
            
            
            OutputStream os = conn.getOutputStream();
            os.write(body.getBytes());
            os.flush();
            

            
            BufferedReader br = new BufferedReader(new InputStreamReader(
                            (conn.getInputStream())));
            
            String output = br.readLine();
            System.out.println("Output from Server .... \n");

            
            conn.disconnect();
            
            return output;
            } catch (MalformedURLException e) {
            
            e.printStackTrace();
            
            } catch (IOException e) {
            
            e.printStackTrace();
            
            }
        return null;
    }
    
    public static String callPutRest(String serverUrl, String jwttoken,
                                       String contentType,String body) {
        try {

            URL url = new URL(serverUrl);
            HttpsURLConnection https = null;
                HttpURLConnection conn = null;
                if (url.getProtocol().toLowerCase().equals("https")) {
                    trustAllHosts();
                    https = (HttpsURLConnection)url.openConnection();
                    https.setHostnameVerifier(DO_NOT_VERIFY);
                    conn = https;
                } else {
                    conn = (HttpURLConnection)url.openConnection();
                }
            
            conn.setDoOutput(true);
            conn.setRequestMethod("PUT");
            conn.setRequestProperty("Content-Type", contentType);
            
            
            OutputStream os = conn.getOutputStream();
            os.write(body.getBytes());
            os.flush();
            

            
            BufferedReader br = new BufferedReader(new InputStreamReader(
                            (conn.getInputStream())));
            
            String output = br.readLine();
            System.out.println("Output from Server .... \n");

            
            conn.disconnect();
            
            return output;
            } catch (MalformedURLException e) {
            
            e.printStackTrace();
            
            } catch (IOException e) {
            
            e.printStackTrace();
            
            }
        return null;
    }
    
    public String getStringFromInputStream(InputStream is) {

               BufferedReader br = null;
               StringBuffer sb = new StringBuffer();

               String line;
               try {

                       br = new BufferedReader(new InputStreamReader(is));
                       while ((line = br.readLine()) != null) {
                               sb.append(line);
                       }

               } catch (IOException e) {
                       e.printStackTrace();
               } finally {
                       if (br != null) {
                               try {
                                       br.close();
                               } catch (IOException e) {
                                       e.printStackTrace();
                               }
                       }
               }

               return sb.toString();

       }

    public static String callGetRest(String serverUrl,String id) {
        try {

            URL url = new URL(serverUrl);
            HttpsURLConnection https = null;
            HttpURLConnection conn = null;
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                conn = https;
            } else {
                conn = (HttpURLConnection)url.openConnection();
            }

            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestProperty("id", id);
            
            BufferedReader in =
                new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            return response.toString();
        } catch (MalformedURLException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }
        return null;
    }
}
