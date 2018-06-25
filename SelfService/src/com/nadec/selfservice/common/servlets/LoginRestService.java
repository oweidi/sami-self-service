package com.nadec.selfservice.common.servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.businesstrip.EmployeeDetails;
import com.nadec.selfservice.common.login.Login;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

@Path("/login")
public class LoginRestService {

    @POST
    @Consumes("application/json")
    @Path("/login")
    public String getEmpDetails(String body,
                                @Context HttpServletRequest request) {
        String jsonInString = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode actualObj = mapper.readTree(body);
            String userName = actualObj.get("userName").asText();
            String password = actualObj.get("password").asText();
            Login login = new Login();
            boolean result = login.validateLogin(userName, password);
            jsonInString = "{'result':"+result+"}";
            if(result) {
                HttpSession session = request.getSession();
                EmployeeBean obj = new EmployeeBean();
                EmployeeDetails det = new EmployeeDetails();
                
                if(session.getAttribute("EmpDetails") != null) {
                    obj = (EmployeeBean)session.getAttribute("EmpDetails");
                } else {
                    if(userName != null &&
                       !userName.isEmpty() ) {
                        obj = det.getEmpDetails(userName,null,null);
                        session.setAttribute("EmpDetails", obj);
                    } else {
                        return "";
                    }

                }   
            }
            
            
            return jsonInString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonInString;
    }

    public LoginRestService() {
        super();
    }
}
