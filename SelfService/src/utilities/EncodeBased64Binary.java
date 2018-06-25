package utilities;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import java.net.URL;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;


import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import org.apache.commons.io.IOUtils;

import org.apache.commons.codec.binary.Base64;

import com.oracle.xmlns.apps.hcm.common.dataloader.core.dataloaderintegrationservice.HCMDataLoaderSoapHttpPortClient;
//import org.eclipse.persistence.internal.oxm.conversion.Base64;

public class EncodeBased64Binary {
    public EncodeBased64Binary() {
        super();
    }

    public static void main(String[] args) {
        EncodeBased64Binary inst = new EncodeBased64Binary();
        try {
            String attachment_string =
                inst.encodeFileToBase64Binary("D:/fromDesktop/AppsPro/hcm/dataHBL/PayrollInterfaceInboundRecord_-_All_Contexts.zip");
        } catch (IOException e) {
        }
    }

    public String callUCMService(String data, String filename) {
        String status = "Can not upload at this time, Please try again!";
        status = data;
        String xml1 =
            "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ucm=\"http://www.oracle.com/UCM\">\n" +
            "   <soapenv:Header/>\n" +
            "   <soapenv:Body>\n" +
            "      <ucm:GenericRequest webKey=\"cs\">\n" +
            "         <ucm:Service IdcService=\"CHECKIN_UNIVERSAL\">\n" +
            "            <ucm:Document>\n" +
            "               <!--Zero or more repetitions:-->\n" +
            "               <ucm:Field name=\"dDocTitle\">";
        String part2 = "</ucm:Field>\n" +
            "              <ucm:Field name=\"dDocType\">Document</ucm:Field>\n" +
            "               <ucm:Field name=\"dSecurityGroup\">FAFusionImportExport</ucm:Field>\n" +
            "               <ucm:Field name=\"dDocAuthor\">hcmuser</ucm:Field>\n" +
            "               <ucm:Field name=\"dDocAccount\">hcm$/dataloader$/export$</ucm:Field>\n" +
            "               <ucm:File name=\"primaryFile\" href=\"PayrollInterfaceInboundRecordAllContexts.zip\">\n" +
            "                  <ucm:Contents>";
        String xml2 = "</ucm:Contents>\n" +
            "               </ucm:File>\n" +
            "            </ucm:Document>\n" +
            "         </ucm:Service>\n" +
            "      </ucm:GenericRequest>\n" +
            "   </soapenv:Body>\n" +
            "</soapenv:Envelope>";

        String input = xml1 + filename + part2 + data + xml2;
        try {
            //=====================================================
            String url1 =
                "https://efgv-dev4.fs.em3.oraclecloud.com:443/idcws/GenericSoapPort";
            java.net.URL wsURL =
                new URL(null, url1, new sun.net.www.protocol.https.Handler());

            URL url = new URL(wsURL, url1);

            //URLConnection connection = url.openConnection();
            HttpsURLConnection httpConn =
                (HttpsURLConnection)url.openConnection();
            ByteArrayOutputStream bout = new ByteArrayOutputStream();

            byte[] buffer = new byte[input.length()];
            buffer = input.getBytes();
            bout.write(buffer);
            byte[] b = bout.toByteArray();

            String SOAPAction = "https://efgv-dev4.fs.em3.oraclecloud.com:443";
            // httpConn.setHostnameVerifier(new AllowAllHostnameVerifier());
            // Set the appropriate HTTP parameters.
            httpConn.setRequestProperty("Content-Length",
                                        String.valueOf(b.length));
            httpConn.setRequestProperty("Content-Type",
                                        "text/xml; charset=utf-8");
            httpConn.setRequestProperty("SOAPAction", SOAPAction);
            httpConn.setRequestMethod("POST");

            HostnameVerifier defaultVerifier = new HostnameVerifier() {

                public boolean verify(String hostname, SSLSession session) {
                    // TODO: add verify logic here
                    if (hostname == "oracledemos.com:443") {
                        return true;
                    } else
                        return true;

                }

            };
            HostnameVerifier hv = defaultVerifier;
            httpConn.setDefaultHostnameVerifier(hv);
            String userPassword = "hcmuser" + ":" + "Welcome@123";

            byte encoding[] = Base64.encodeBase64(userPassword.getBytes());
            String encodedPwd = new String(encoding);
            httpConn.setRequestProperty("Authorization",
                                        "Basic " + encodedPwd);
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            httpConn.setConnectTimeout(6000000);

            OutputStream out = httpConn.getOutputStream();
            out.write(b);
            out.close();
            InputStream is = httpConn.getInputStream();
            String responseXML = getStringFromInputStream(is);
            int start = responseXML.indexOf("dDocName:");
            status = responseXML.substring(start + 9, start + 22);
        } catch (Exception e) {
        } 
        return status;
    }

    public String callLoaderService(String ucmref, String path,String hdlId) {
        HCMDataLoaderSoapHttpPortClient c =
            new HCMDataLoaderSoapHttpPortClient();
        String response = "Error in Loader service";

        Long processId = Long.valueOf(c.loadDataService(ucmref, path,hdlId));
        response = processId.toString();
        
        return response; 
    }

    public String encodeFileToBase64Binary(String fileName) throws IOException {

        File file = new File(fileName);
        byte[] bytes = loadFile(file);
        byte[] encoded = Base64.encodeBase64(bytes);
        String encodedString = new String(encoded);
        return encodedString;
    }

    public String encodeFileToBase64Binary2(byte[] bits) throws IOException {

        // File file = new File(fileName);
        byte[] bytes = bits;
        byte[] encoded = Base64.encodeBase64(bytes);
        String encodedString = new String(encoded);
        return encodedString;
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

    private String getStringFromInputStream(InputStream is) {

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
}
