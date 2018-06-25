package com.nadec.selfservice.common.servlets;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.*;
import javax.servlet.http.*;

import org.json.JSONObject;

import utilities.MailingUtiliy;

public class Mailing extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html; charset=windows-1252";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException,
                                                            IOException {
        String payloadRequest = getBody(request);
        JSONObject jsonObj;
        String serviceOutput = "";
        PrintWriter out = response.getWriter();
        try {
            jsonObj = new JSONObject(payloadRequest);
            response.setContentType(CONTENT_TYPE);
           
            String action = request.getParameter("mail");
            HttpSession session = request.getSession();
           
            if (null != action && action.equalsIgnoreCase("mail")) {
                serviceOutput = MailingUtiliy.sendMail(jsonObj);
            }
        } catch (Exception e) {
         serviceOutput = e.getMessage();
        }
            out.write(serviceOutput);
            out.close();
       
        
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
}
