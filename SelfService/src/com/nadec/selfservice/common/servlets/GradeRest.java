package com.nadec.selfservice.common.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.nadec.selfservice.bean.GradeBean;

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

@Path("/graderest")
public class GradeRest {
    public GradeRest() {
        super();
    }
    
    @GET
    @Path("/grades")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<GradeBean>  getEmpDetails(@QueryParam("username2") String username2,
                                @QueryParam("token") String token,
                                @QueryParam("hostURL") String hostURL,
                                @Context HttpServletRequest request) {
        
        HttpSession session = request.getSession();
        ObjectMapper mapper = new ObjectMapper();
        GradeBean gradeBean = new GradeBean();
        GradeDetails gradeDetails = new GradeDetails();
        ArrayList<GradeBean> gradeList = gradeDetails.getGrades(username2,token,hostURL);
        
        
        return gradeList;
    }
}
