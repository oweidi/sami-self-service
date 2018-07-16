package com.nadec.selfservice.common.servlets.elemententryservlets;

import com.nadec.selfservice.common.selfservicetypes.Type;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/upload")
public class SubmitElementEntryRest extends ElementEntryHelper {
    public SubmitElementEntryRest() {
        super();
    }
    
    @POST
    @Path("/elementEntry")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response upload(InputStream incomingData,@Context HttpServletRequest request) {
        StringBuilder crunchifyBuilder = new StringBuilder();
        String respone = null;
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(incomingData));
            String line = null;
            while ((line = in.readLine()) != null) {
                crunchifyBuilder.append(line);
            }
        } catch (Exception e) {
            System.out.println("Error Parsing: - ");
        }
        JSONObject jObject;
        JSONObject jObjectRespones = null;
        try {
            jObject = new JSONObject(crunchifyBuilder.toString());
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            String path = context.getRealPath(request.getContextPath());
            
            if (null != path && path.contains("SamiSelfServiceProd")) {
                path = path.split("SamiSelfServiceProd")[0] + "/images";
            } else {
                path = System.getProperty("java.scratch.dir");
            }
            
            if(Type.SERVICE_NAME.ADVANCE_HOUSING.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                
                respone = createHelperAH(path, jObject);    
            
            } else if (Type.SERVICE_NAME.BUSINESS_TRIP.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                
                respone = createHelperBT(path, jObject);    
                
            } else if (Type.SERVICE_NAME.FAMILY_VISA_REFUND.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                
                respone = createHelperFVR(path, jObject);
            
            } else if (Type.SERVICE_NAME.BUSNIESS_TRIP_DRIVER.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
            
                respone = createHelperBTD(path, jObject);
            
            }      
            else if (Type.SERVICE_NAME.EMPLOYEE_ALLOWANCE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
            
                respone = createHelperEA(path, jObject);
            
            }             
            else if (Type.SERVICE_NAME.CHILDREN_EDUCTION_EXPENSE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperCEE(path, jObject);
            }     
            else if (Type.SERVICE_NAME.REWARD_REQUEST_SERVICE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperRRS(path, jObject);
            }
            else if (Type.SERVICE_NAME.BUSINESS_TRIP_RETURN.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperBTR(path, jObject);
            }
            else if (Type.SERVICE_NAME.EMPLOYEE_TICKET_SERVICE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperTR(path, jObject);
            }
            else if (Type.SERVICE_NAME.EMPLOYEE_TICKET_Refund_SERVICE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperTRF(path, jObject);
            }
            else if (Type.SERVICE_NAME.CHANGE_HOUSING_REQUEST.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperCHT(path, jObject);
            }
            else if (Type.SERVICE_NAME.STOP_ALLOWANCE_REQUEST.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperSTA(path, jObject);
            }
            else if (Type.SERVICE_NAME.RETURN_AFTER_LEAVE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                if(jObject.getString("assignmentStatus").equals("0") ) {
                    respone = createHelperRALWorker(path, jObject);
                }
                
                
            }
            else if (Type.SERVICE_NAME.PENALTIES_DEDUCTION.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperPD(path, jObject);
            }
            else if (Type.SERVICE_NAME.ADVANCED_ANNUAL_LEAVE.getValue().equalsIgnoreCase(jObject.getString("SSType"))) {
                respone = createHelperAAL(path, jObject);
            }
            jObjectRespones = new JSONObject("{'status' : '"+respone+"'}");
//            System.out.println(jObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        
        
        
        return Response.ok().build();
    }

    @PUT
    @Path("/elementEntry")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response submit(InputStream incomingData, @Context
        HttpServletRequest request) {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        StringBuilder crunchifyBuilder = new StringBuilder();
        String path = context.getRealPath(request.getContextPath());

        if (null != path && path.contains("SamiSelfServiceProd")) {
            path = path.split("SamiSelfServiceProd")[0] + "/images";
        } else {
            path = System.getProperty("java.scratch.dir");
        }
        
        try {
            BufferedReader in =
                new BufferedReader(new InputStreamReader(incomingData));
            String line = null;
            while ((line = in.readLine()) != null) {
                crunchifyBuilder.append(line);
            }
        } catch (Exception e) {
            System.out.println("Error Parsing: - ");
        }
        JSONArray jObject;
        try {
//            System.out.println(crunchifyBuilder.toString().replaceAll("[\\[\\]]", ""));
            jObject = new JSONArray(crunchifyBuilder.toString());//.replaceAll("[\\[\\]]", ""));
//            System.out.println(jObject);
            for (int i =0;i<jObject.length()-1;i++) {
//                System.out.println(jObject.getJSONObject(i).getString("sstype"));
                //jObject.getJSONObject(i).getString("sstype")
                callUCM(jObject.getJSONObject(i).getString("id"),jObject.getJSONObject(jObject.length()-1).getString("startDate"),path,jObject.getJSONObject(i).getString("sstype"));
            }
            
        } catch (JSONException e) {
            e.printStackTrace();
        }


        return Response.ok().build();
    }
}
