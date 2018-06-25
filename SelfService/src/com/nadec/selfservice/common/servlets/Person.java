package com.nadec.selfservice.common.servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.nadec.selfservice.bean.EmployeeBean;

import com.nadec.selfservice.bean.GradeBean;
import com.nadec.selfservice.businesstrip.EmployeeDetails;

import com.nadec.selfservice.businesstrip.GradeDetails;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/emp")
public class Person {
    
    @GET
    @Path("/info")
    public String getEmpDetails(@QueryParam("username2") String username2,
                                @QueryParam("token") String token,
                                @QueryParam("hostURL") String hostURL,
                                @Context HttpServletRequest request) {
        
        
        HttpSession session = request.getSession();
        ObjectMapper mapper = new ObjectMapper();
        EmployeeBean obj = new EmployeeBean();
        EmployeeDetails det = new EmployeeDetails();
        
        if(session.getAttribute("EmpDetails") != null) {
            obj = (EmployeeBean)session.getAttribute("EmpDetails");
        } else {
            if(username2 != null &&
               !username2.isEmpty() ) {
                obj = det.getEmpDetails(username2,token,hostURL);
                session.setAttribute("EmpDetails", obj);
            } else {
                return "";
            }

        }
        
        String jsonInString = null;
        try {
            jsonInString = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            
        }
        return jsonInString;
    }
    
      @GET
      @Path("/infoById")
      public String getEmpDetailsById(@QueryParam("personId") String personId,
                                  @QueryParam("token") String token,
                                  @QueryParam("hostURL") String hostURL) {
          
          
          
          ObjectMapper mapper = new ObjectMapper();
          EmployeeBean obj = new EmployeeBean();
          EmployeeDetails det = new EmployeeDetails();
          
          obj = det.getEmpDetailsByPersonId(personId,token,hostURL);
          
          String jsonInString = null;
          try {
              jsonInString = mapper.writeValueAsString(obj);
          } catch (JsonProcessingException e) {
              
          }
          return jsonInString;
      }
      
      @GET
      @Path("/searchEmployees")
      public String getEmployeesForSpecialists(@QueryParam("name") String name,
                                  @QueryParam("nationalId") String nationalId,
                                  @QueryParam("personNumber") String personNumber,
                                  @QueryParam("managerId") String managerId,
                                  @QueryParam("effectiveAsof") String effectiveAsof,                                  
                                  @QueryParam("token") String token,
                                  @QueryParam("hostURL") String hostURL) {
          
          
          
          ObjectMapper mapper = new ObjectMapper();
          EmployeeBean [] obj;
          EmployeeDetails det = new EmployeeDetails();
          
          obj = det.searchPersonDetails(name,nationalId,personNumber,managerId,effectiveAsof,token,hostURL);
          
          String jsonInString = null;
          try {
              jsonInString = mapper.writeValueAsString(obj);
          } catch (JsonProcessingException e) {
              
          }
          return jsonInString;
      }
      
      
      
    @GET
    @Path("/getEmployees")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<EmployeeBean> getEmplotees(@QueryParam("username2") String username2,
                                @QueryParam("token") String token,
                                @QueryParam("hostURL") String hostURL,
                                @Context HttpServletRequest request) 
    {
        
        
        
        ObjectMapper mapper = new ObjectMapper();
        EmployeeBean [] obj;
//        EmployeesDetails det = new EmployeesDetails();
          
     
       com.nadec.selfservice.businesstrip.EmployeesDetails empDetails = new com.nadec.selfservice.businesstrip.EmployeesDetails();
        String jsonInString = null;
        ArrayList<EmployeeBean> employeeList = empDetails.getEmployees(username2, token, hostURL);
        
        return employeeList;
    }
      
      

    
    
}
