package com.nadec.selfservice.common.servlets;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.http.*;  
import javax.servlet.ServletException;  
 
  
public class LogoutServlet extends HttpServlet {  
  
    public void init(ServletConfig config) throws ServletException {  
        super.init(config);  
    }  
  
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        request.getSession().invalidate();  
        String serverName =request.getScheme()+"://" + request.getServerName();
        
        if(!serverName.contains(".com")) {
            serverName += ":" + request.getServerPort();
        }
        
        serverName += request.getContextPath() + "/index.jsp";
        //System.out.println(serverName);
        response.sendRedirect( "https://myservices.em2.oraclecloud.com/oamsso/logout.html?end_url="+serverName);
    }  
}