package com.nadec.selfservice.businesstrip;


import com.nadec.selfservice.bean.EmployeeBean;
import com.nadec.selfservice.common.restHelper.RestHelper;

import java.awt.image.BufferedImage;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import org.json.JSONArray;
import org.json.JSONObject;


public class EmployeeDetails extends RestHelper {
    public EmployeeDetails() {
        super();
    }

    final String SAAS_URL_IP = "https://ejdu.fa.em2.oraclecloud.com:443";
    final String SAAS_URL = "ejdu.fa.em2.oraclecloud.com";
    final static HostnameVerifier DO_NOT_VERIFY = new HostnameVerifier() {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    };


    public EmployeeBean getEmpDetails(String username, String jwt,
                                      String host) {
        String finalresponse = "";
        //        String jwttoken = jwt.trim();
        EmployeeBean emp = new EmployeeBean();

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String serverUrl =
            SAAS_URL_IP + "/hcmRestApi/resources/latest/emps/?q=UserName='" +
            username +
            "'&expand=assignments,photo,assignments.peopleGroupKeyFlexfield,assignments.BusinessUnitIdLOV";

        String jsonResponse = "";
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
            String SOAPAction =
                SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            emp = getEmpAssignment(null, host, arr, emp);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (finalresponse.length() > 1) {
        } else {
            finalresponse = jsonResponse;
        }

        return emp;
    }


    public EmployeeBean getEmpDetailsByPersonId(String personId, String jwt,
                                                String host) {
        String finalresponse = "";
        //        String jwttoken = jwt.trim();
        EmployeeBean emp = new EmployeeBean();

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String serverUrl =
            SAAS_URL_IP + "/hcmRestApi/resources/latest/emps/?q=PersonId=" +
            personId +"&expand=assignments,photo,assignments.peopleGroupKeyFlexfield,assignments.BusinessUnitIdLOV";
        
        String jsonResponse = "";
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
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            emp = getEmpAssignment(null, host, arr, emp);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (finalresponse.length() > 1) {
        } else {
            finalresponse = jsonResponse;
        }

        return emp;
    }


    public EmployeeBean getEmpAssignment(String jwttoken, String host,
                                         JSONArray arr, EmployeeBean emp) {

        try {

            JSONArray assignmets = new JSONArray();
            JSONArray photo = new JSONArray();
            for (int i = 0; i < arr.length(); i++) {
                if (!arr.getJSONObject(i).isNull("DisplayName")) {
                    emp.setDisplayName(arr.getJSONObject(i).get("DisplayName").toString());
                }

                if (!arr.getJSONObject(i).isNull("HireDate")) {
                    emp.setHireDate(arr.getJSONObject(i).get("HireDate").toString());
                }
                if (!arr.getJSONObject(i).isNull("DateOfBirth")) {
                    emp.setDateOfBirth(arr.getJSONObject(i).get("DateOfBirth").toString());
                }

                if (!arr.getJSONObject(i).isNull("CitizenshipLegislationCode")) {
                    emp.setCitizenshipLegislationCode(arr.getJSONObject(i).get("CitizenshipLegislationCode").toString());
                }

                if (!arr.getJSONObject(i).isNull("PersonId")) {
                    emp.setPersonId(arr.getJSONObject(i).get("PersonId").toString());
                }

                if (!arr.getJSONObject(i).isNull("PersonNumber")) {
                    emp.setPersonNumber(arr.getJSONObject(i).get("PersonNumber").toString());
                }

                if (!arr.getJSONObject(i).isNull("Country")) {
                    emp.setCountry(arr.getJSONObject(i).get("Country").toString());
                }

                if (!arr.getJSONObject(i).isNull("City")) {
                    emp.setCity(arr.getJSONObject(i).get("City").toString());
                }

                if (!arr.getJSONObject(i).isNull("Region")) {
                    emp.setRegion(arr.getJSONObject(i).get("Region").toString());
                }

                if (!arr.getJSONObject(i).isNull("NationalId")) {
                    emp.setNationalId(arr.getJSONObject(i).get("NationalId").toString());
                }

                assignmets = arr.getJSONObject(i).getJSONArray("assignments");
                if (arr.getJSONObject(0).has("photo")) {
                    photo = arr.getJSONObject(0).getJSONArray("photo");
                }
                if (!arr.getJSONObject(i).isNull("MaritalStatus")) {
                    emp.setMaritalStatus(arr.getJSONObject(i).get("MaritalStatus").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkEmail")) {
                    emp.setEmail(arr.getJSONObject(i).get("WorkEmail").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkPhoneNumber")) {
                    emp.setWorkPhone(arr.getJSONObject(i).get("WorkPhoneNumber").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkPhoneExtension")) {
                    emp.setWorkPhoneExt(arr.getJSONObject(i).get("WorkPhoneExtension").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkMobilePhoneNumber")) {
                    emp.setMobileNumber(arr.getJSONObject(i).get("WorkMobilePhoneNumber").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkFaxNumber")) {
                    emp.setFax(arr.getJSONObject(i).get("WorkFaxNumber").toString());
                }
                if (!arr.getJSONObject(i).isNull("WorkFaxExtension")) {
                    emp.setFaxExt(arr.getJSONObject(i).get("WorkFaxExtension").toString());
                }
                if (!arr.getJSONObject(i).isNull("LegalEntityId")) {
                    emp.setLegalEntityId(arr.getJSONObject(i).get("LegalEntityId").toString());
                }
                if (emp.getLegalEntityId() != null && !emp.getLegalEntityId().equals("null")) {
                    emp.setOrganizationName (getOrganizationById(emp.getLegalEntityId()));
                }

            }

            for (int i = 0; i < assignmets.length(); i++) {
                emp.setAssignmentCategory(assignmets.getJSONObject(i).getString("AssignmentCategory"));
                if (!assignmets.getJSONObject(i).isNull("JobId")) {
                    emp.setJobId(assignmets.getJSONObject(i).get("JobId").toString());
                }

                emp.setSalaryAmount(assignmets.getJSONObject(i).getString("SalaryAmount") !=
                                    null &&
                                    !"null".equals(assignmets.getJSONObject(i).getString("SalaryAmount")) ?
                                    assignmets.getJSONObject(i).getLong("SalaryAmount") :
                                    0L);


                if (!assignmets.getJSONObject(i).isNull("ManagerType")) {
                    emp.setManagerType(assignmets.getJSONObject(i).get("ManagerType").toString());
                }

                if (!assignmets.getJSONObject(i).isNull("GradeId")) {
                    emp.setGradeId(assignmets.getJSONObject(i).get("GradeId").toString());
                }
                

                if (!assignmets.getJSONObject(i).isNull("AssignmentName")) {
                    emp.setAssignmentName(assignmets.getJSONObject(i).get("AssignmentName").toString());
                }
                
                if (!assignmets.getJSONObject(i).isNull("AssignmentStatusTypeId")) {
                    emp.setAssignmentStatusTypeId(assignmets.getJSONObject(i).get("AssignmentStatusTypeId").toString());
                }
                if (!assignmets.getJSONObject(i).isNull("AssignmentStatus")) {
                    emp.setAssignmentStatus(assignmets.getJSONObject(i).get("AssignmentStatus").toString());
                }
                String peopleGroup = "";
              
                if (!assignmets.getJSONObject(i).isNull("peopleGroupKeyFlexfield") && assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").length() > 0) {
                    String housingType = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("housingType"));
                    String overrideHousingPercentage = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("overrideHousingPercentage"));
                    String transportationType = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("transportationType"));
                    String overrideTransportationPercentage = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("overrideTransportationPercen"));
                    String overrideTransportationAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("overrideTransportationAmount"));
                    String foodAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("foodAllowance"));
                    String fieldWorkAllowance  = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("fieldWorkAllowance"));      
                    String workNatureAllowance  = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("workNatureAllowance"));
                    String overrideWorkNatureAllowanceAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("overrideWorkNatureAmount"));        
                    String dutyAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("dutyAllowance"));
                    String dutyAllowanceAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("dutyAllowanceAmount"));      
                    String mobileAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("mobileAllowance"));  
                    String mobileAllowanceAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("mobileAllowanceAmount"));
                    String carAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("carAllowance"));     
                    String carAllowanceAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("carAllowanceAmount"));       
                    String pensionAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("pensionAllowance")); 
                    String hardshipAllowance = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("hardshipAllowance"));        
                    String hardshipAllowanceAmount = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("hardshipAllowanceAmount"));  
                    String motivationAllowanceFlag  = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("motivationAllowance")); 
                    String overrideVacationEntitlement = objToString(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("overrideVacationEntitlement"));


                    peopleGroup =
                            housingType + "." + overrideHousingPercentage +
                            "." + transportationType + "." +
                            overrideTransportationPercentage + "." +
                            overrideTransportationAmount + "." +
                            foodAllowance + "." + fieldWorkAllowance + "." +
                            workNatureAllowance + "." +
                            overrideWorkNatureAllowanceAmount + "." +
                            dutyAllowance + "." + dutyAllowanceAmount + "." +
                            mobileAllowance + "." + mobileAllowanceAmount +
                            "." + carAllowance + "." + carAllowanceAmount +
                            "." + pensionAllowance + "." + hardshipAllowance +
                            "." + hardshipAllowanceAmount + "." +
                            motivationAllowanceFlag + "." +
                            overrideVacationEntitlement;
                                                                      
                                  
                                  emp.setHousingType((String)assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("housingType"));
                } else {
                    peopleGroup =
                            "." +
                            "." + "." +
                            "." +
                            "." +
                             "." + "." +
                            "." +
                            "." +
                            "." + "." +
                            "." + 
                            "." +  "." + 
                            "." + "." + 
                            "." +  "." +
                            "." ;
                    
                }
                emp.setPeopleGroup(peopleGroup);
                
                if (!assignmets.getJSONObject(i).isNull("ProbationPeriodEndDate")) {
                    emp.setProbationPeriodEndDate(assignmets.getJSONObject(i).get("ProbationPeriodEndDate").toString());
                }
                if (!assignmets.getJSONObject(i).isNull("peopleGroupKeyFlexfield") && assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").length() > 0) {
                        emp.setMobileAllowance(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("mobileAllowance").toString());
                }
                if (!assignmets.getJSONObject(i).isNull("peopleGroupKeyFlexfield") && assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").length() > 0) {
                        emp.setTransportationAlowance(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("transportationType").toString());
                }
                if (!assignmets.getJSONObject(i).isNull("peopleGroupKeyFlexfield") && assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").length() > 0) {
                        emp.setCarAllowance(assignmets.getJSONObject(i).getJSONArray("peopleGroupKeyFlexfield").getJSONObject(0).get("carAllowance").toString());
                }
                String gradeName = "";

                // ++++
                if (emp.getGradeId() != null &&
                    !emp.getGradeId().equals("null")) {
                    gradeName = getGradeById(emp.getGradeId());
                }

                emp.setGrade(gradeName);
                String jobName = "";

                //++
                if (emp.getJobId() != null && !emp.getJobId().equals("null")) {
                    jobName = getJobById(emp.getJobId());
                }
                emp.setJobName(jobName);
                emp.setDepartment(assignmets.getJSONObject(i).getString("DepartmentId"));

                String departmentName = "";

                if (emp.getDepartment() != null &&
                    !emp.getDepartment().equals("null")) {
                    departmentName = getDepartmentById(emp.getDepartment());
                }
                emp.setDepartmentName(departmentName);
                emp.setPositionId(assignmets.getJSONObject(i).getString("PositionId"));

                String positionName = "";
                String positionCode = "";

                if (emp.getPositionId() != null &&
                    !emp.getPositionId().equals("null")) {
                    String ar[] = getPositionById(emp.getPositionId());
                    if(ar != null && ar.length > 0) {
                        positionName = ar[0];
                        positionCode = ar[1];    
                    }
                    
                }
                
                
                emp.setPositionName(positionName);
                emp.setPositionCode(positionCode);
                emp.setAssignmentName(positionName);
                
                if(emp.getPositionCode() != null && !emp.getPositionCode().isEmpty()) {
                    if(emp.getPositionCode() != null && !"6000010".equals(emp.getPositionCode())) {
                        emp.setPositionName(positionName + " N");
                    }    
                }
                
                emp.setManagerId(assignmets.getJSONObject(i).getString("ManagerId"));
                //++
                String managerName = "";
                if (emp.getManagerId() != null &&
                    !emp.getManagerId().isEmpty() &&
                    !emp.getManagerId().equals("null")) {
                    EmployeeBean tempEmp = getManagersById(emp.getManagerId());
                    managerName = tempEmp.getDisplayName();
                    emp.setManagerOfManager(tempEmp.getManagerId());
                    String LineManagerOfManagerStr = "";
                    if (emp.getManagerOfManager() != null &&
                        !emp.getManagerOfManager().equals("null")){
                       EmployeeBean managerOfManagerName = getManagersById(emp.getManagerOfManager());
                            LineManagerOfManagerStr = managerOfManagerName.getDisplayName();
                            emp.setManagerOfMnagerName(LineManagerOfManagerStr);
                        }
                    
                }

                emp.setManagerName(managerName);

                //++
                String locationId =
                    assignmets.getJSONObject(i).getString("LocationId");
                String employeeLocation = "";
                if (locationId != null && !locationId.isEmpty() &&
                    !locationId.equals("null")) {
                    employeeLocation = getLocationById(locationId);

                }

                emp.setEmployeeLocation(employeeLocation);
                
                String businessUnitId =
                    assignmets.getJSONObject(i).getString("BusinessUnitId");
                String businessUnitName = "";
                if (businessUnitId != null && !businessUnitId.isEmpty() &&
                    !businessUnitId.equals("null")) {
                    JSONArray businessUnitIdLOV = assignmets.getJSONObject(i).getJSONArray("BusinessUnitIdLOV");
                    for(int b = 0;b < businessUnitIdLOV.length();b++) {
                        if(businessUnitIdLOV.getJSONObject(b).getString("BusinessUnitId").equals(businessUnitId))
                            businessUnitName = businessUnitIdLOV.getJSONObject(b).getString("ShortCode");
                    }
                   
                }

                emp.setBusinessUnitName(businessUnitName);
                

            }
            HttpsURLConnection https = null;
            HttpURLConnection connection = null;
            if (photo.length() > 0) {
                JSONArray data = photo;
                JSONArray links = new JSONArray();

                links = data.getJSONObject(0).getJSONArray("links");


                String serverUrl =
                    links.getJSONObject(0).getString("href") + "/enclosure/Image";
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
                //connection = (HttpsURLConnection)url.openConnection();
                connection.setDoOutput(true);
                connection.setDoInput(true);
                connection.setRequestProperty("SOAPAction", SOAPAction);
                connection.setRequestMethod("GET");
                connection.setRequestProperty("Content-Type",
                                              "application/json; Charset=UTF-8");
                //  connection.addRequestProperty("Authorization","Bearer " + jwttoken);
                connection.addRequestProperty("Authorization",
                                              "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
                BufferedImage bi = ImageIO.read(connection.getInputStream());
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                System.out.println(bi.toString());
                ImageIO.write(bi, "jpg", baos);
                baos.flush();
                byte[] imageInByte = baos.toByteArray();
                emp.setPicBase64(javax.xml.bind.DatatypeConverter.printBase64Binary(imageInByte));
                baos.close();
            }

            return emp;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return emp;

    }

    public EmployeeBean[] searchPersonDetails(String name, String nationalId,
                                              String personNumber,
                                              String managerId,
                                              String effectiveAsof, String jwt,
                                              String host) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam = queryParam + "PersonNumber = '" + personNumber + "'";
        }
        if (name != null && !name.isEmpty()) {
            if (personNumber != null && !personNumber.isEmpty()) {
                queryParam = queryParam + " and ";
            }
            queryParam =
                    queryParam + "upper(DisplayName) like '%" + name + "%'";
        }

        if (nationalId != null && !nationalId.isEmpty()) {
            if ((personNumber != null && !personNumber.isEmpty()) ||
                (name != null && !name.isEmpty())) {
                queryParam = queryParam + " and ";
            }
            queryParam =
                    queryParam + "upper(NationalId) = '" + nationalId + "'";
        }
        if (effectiveAsof != null && !effectiveAsof.isEmpty()) {
            if ((personNumber != null && !personNumber.isEmpty()) ||
                (name != null && !name.isEmpty()) ||
                ((nationalId != null && !nationalId.isEmpty()))) {
                queryParam = queryParam + " and ";
            }
            queryParam =
                    queryParam + "EffectiveStartDate  < = '" + effectiveAsof +
                    "'";
        }

        if (managerId != null && !managerId.isEmpty()) {
            if ((personNumber != null && !personNumber.isEmpty()) ||
                (name != null && !name.isEmpty()) ||
                (nationalId != null && !nationalId.isEmpty()) ||
                ((effectiveAsof != null && !effectiveAsof.isEmpty()))) {
                queryParam = queryParam + " and ";
            }
            queryParam = queryParam + "assignments.ManagerId = " + managerId;
        }
        queryParam =
                queryParam + "&expand=assignments,photo,assignments.peopleGroupKeyFlexfield";
        try {
            URI uri;

            uri =
new URI("https", null, SAAS_URL, 443,
        "/hcmCoreApi/resources/latest/emps", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            List<EmployeeBean> employees = new ArrayList<EmployeeBean>();

            for (int i = 0; i < arr.length(); i++) {
                EmployeeBean emp = new EmployeeBean();
                JSONArray jsonArray = new JSONArray();
                jsonArray.put(arr.get(i));
                employees.add(getEmpAssignment(null, host, jsonArray, emp));
            }
            EmployeeBean[] array = new EmployeeBean[employees.size()];
            employees.toArray(array);
            return array;

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }catch (UnsupportedEncodingException e) {
          e.printStackTrace();  
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }


    public String[] getPositionById(String personNumber) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam = queryParam + "PositionId = '" + personNumber + "'";
        }

        try {
            URI uri;

            uri =
                    new URI("https", null, SAAS_URL, 443,
                    "/hcmRestApi/resources/latest/positions", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            JSONObject xx = (JSONObject)arr.get(0);
            String [] ar = new String[2];
            ar[0] = xx.getString("Name");
            ar[1] = xx.getString("PositionCode");
            return ar;

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

    public String getLocationById(String personNumber) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam = queryParam + "LocationId = '" + personNumber + "'";
        }

        try {
            URI uri;
            ////hcmRestApi/resources/11.13.17.11/locations/{locationsUniqID}
            uri =
new URI("https", null, SAAS_URL, 443,
        "/hcmRestApi/resources/latest/locations", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");

            JSONObject xx = (JSONObject)arr.get(0);
            return xx.getString("LocationName");

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

    public String getGradeById(String personNumber) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam = queryParam + "GradeId = '" + personNumber + "'";
        }

        try {
            URI uri;
            ////hcmRestApi/resources/11.13.17.11/locations/{locationsUniqID}
            uri =
                    new URI("https", null, SAAS_URL, 443,
                            "/hcmRestApi/resources/latest/grades", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");

            JSONObject xx = (JSONObject)arr.get(0);
            return xx.getString("GradeCode");

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }


    public EmployeeBean getManagersById(String personNumber) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam =
                    queryParam + "PersonId = " + personNumber + "&expand=assignments,assignments.ManagerIdLOV" +
                    "";
        }

        try {
            URI uri;
            /////hcmCoreApi/resources/latest/emps
            uri =
new URI("https", null, SAAS_URL, 443,
        "/hcmCoreApi/resources/latest/emps", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");

            JSONObject xx = (JSONObject)arr.get(0);
            JSONArray assignmets = new JSONArray();
            assignmets = arr.getJSONObject(0).getJSONArray("assignments");
            EmployeeBean emp = new EmployeeBean();

            for (int i = 0; i < assignmets.length(); i++) {
                emp.setManagerId(assignmets.getJSONObject(i).getString("ManagerId"));
            }
            
            emp.setDisplayName(xx.getString("DisplayName"));
            return emp;

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

    public String getDepartmentById(String personNumber) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (personNumber != null && !personNumber.isEmpty()) {
            queryParam =
                    queryParam + "OrganizationId = '" + personNumber + "'";
        }

        try {
            URI uri;

            uri =
new URI("https", null, SAAS_URL, 443,
        "/hcmRestApi/resources/latest/organizations", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            
            JSONObject xx = (JSONObject)arr.get(0);
            return xx.getString("Name");

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }
    
    private String objToString(Object var) {
        
        if(var == null || var.equals("null")) {
            return "";
        }
        
        return var.toString().equals("null") ? ""  : var.toString();
    }
    
    public EmployeeBean getEmpDetailsByPersonNum(String personId, String jwt,
                                                String host) {
        String finalresponse = "";
        //        String jwttoken = jwt.trim();
        EmployeeBean emp = new EmployeeBean();

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String serverUrl =
            SAAS_URL_IP + "/hcmCoreApi/resources/latest/emps/?q=PersonNumber=" + personId +
            "&expand=assignments,photo,assignments.peopleGroupKeyFlexfield,assignments.BusinessUnitIdLOV";
        String jsonResponse = "";
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
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            emp = getEmpAssignment(null, host, arr, emp);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (finalresponse.length() > 1) {
        } else {
            finalresponse = jsonResponse;
        }

        return emp;
    }
    
    
    public static void main(String[] args) {
        EmployeeDetails d = new EmployeeDetails();
        System.out.println(d.getEmpDetails("17977", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dCI6IlN5MDhXZjlzTHRWRXpaOXlseFhWRDJ3T1JVZyIsImtpZCI6InRydXN0c2VydmljZSJ9", null)); 
    }
    public String getJobById(String jobId) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (jobId != null && !jobId.isEmpty()) {
            queryParam = queryParam + "JobId = '" + jobId + "'";
        }

        try {
            URI uri;

            uri =
                    new URI("https", null, SAAS_URL, 443,
                    "/hcmRestApi/resources/latest/jobs", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            JSONObject xx = (JSONObject)arr.get(0);
            return xx.getString("Name");

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }    public String getOrganizationById(String organizationId) {

        HttpsURLConnection https = null;
        HttpURLConnection connection = null;

        String queryParam = "q=";


        if (organizationId != null && !organizationId.isEmpty()) {
            queryParam = queryParam + "OrganizationId = '" + organizationId + "'";
        }

        try {
            URI uri;

            uri =
                    new URI("https", null, SAAS_URL, 443,
                    "/hcmRestApi/resources/latest/organizations", queryParam, null);
            URL url1;
            url1 = uri.toURL();
            URL url =
                new URL(null, url1.toString(), new sun.net.www.protocol.https.Handler());
            if (url.getProtocol().toLowerCase().equals("https")) {
                trustAllHosts();
                https = (HttpsURLConnection)url.openConnection();
                https.setHostnameVerifier(DO_NOT_VERIFY);
                connection = https;
            } else {
                connection = (HttpURLConnection)url.openConnection();
            }
            String SOAPAction =SAAS_URL_IP;
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json;");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(6000000);
            connection.setRequestProperty("SOAPAction", SOAPAction);
            //connection.setRequestProperty("Authorization","Bearer " + jwttoken);
            connection.setRequestProperty("Authorization",
                                          "Basic aGNtdXNlcjpXZWxjb21lQDEyMw==");
            connection.setRequestProperty("REST-Framework-Version", "2");

            BufferedReader in =
                new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject obj = new JSONObject(response.toString());
            JSONArray arr = obj.getJSONArray("items");
            JSONObject xx = (JSONObject)arr.get(0);
           
            return xx.getString("Name");

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        catch (UnsupportedEncodingException e) {
        }

        catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

}
