package com.nadec.selfservice.common.servlets.bipreportsservlets;

import com.nadec.selfservice.common.bipreports.BIPReports;


import com.nadec.selfservice.common.bipreports.BIReportModel;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.HashMap;

import java.util.Map;

import javax.servlet.*;
import javax.servlet.http.*;

public class GetBIReportData extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html; charset=windows-1252";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException,
                                                           IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        String reportName = request.getParameter("reportName");
        BIPReports biPReports = new BIPReports();
        biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_XML.getValue());
        biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_XML.getValue());
        String fresponse = null;
        if(reportName != null) {
            
            if(reportName.equals(BIPReports.REPORT_NAME.GET_POSITION_EMAIL_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.POSITION_EMAIL_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.POSITION_EMAIL_REPORT_PARAM.values()[i].getValue();
                    if(request.getParameter(paramName) != null  &&
                        !request.getParameter(paramName).isEmpty() &&
                    !"null".equals(request.getParameter(paramName))) {
                        
                        biPReports.getParamMap().put(paramName, request.getParameter(paramName).equals("KSA Payroll Specialist") ? "NADEC_KSA_PAYROLL_SPECIALIST": request.getParameter(paramName));    
                    }
                    
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_POSITION_EMAIL_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.UDT_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.UDT_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.UDT_REPORT_PARAM.values()[i].getValue();
                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.UDT_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.TERRITORIES_LIST_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.TERRITORIES_LIST_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.TERRITORIES_LIST_REPORT_PARAM.values()[i].getValue();
                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.TERRITORIES_LIST_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.ALL_UDT_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.ALL_UDT_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.ALL_UDT_REPORT_PARAM.values()[i].getValue();
                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.ALL_UDT_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.AOR_REPORT.getValue())) {
                String paramName = null;
                if(request.getSession().getAttribute(request.getParameter(BIPReports.AOR_REPORT_PARAM.P_PERSON.getValue())) == null) {

                    for (int i = 0 ; i < BIPReports.AOR_REPORT_PARAM.values().length; i ++) {
                        paramName = BIPReports.AOR_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                    }
                    
                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.AOR_REPORT.getValue());
                    fresponse = biPReports.executeReports();
                    request.getSession().setAttribute(request.getParameter(BIPReports.AOR_REPORT_PARAM.P_PERSON.getValue()),fresponse);
                }
                fresponse = request.getSession().getAttribute(request.getParameter(BIPReports.AOR_REPORT_PARAM.P_PERSON.getValue())).toString();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.GRADE_RATE_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.GRADE_RATE_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.GRADE_RATE_REPORT_PARAM.values()[i].getValue();
                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GRADE_RATE_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.FND_LOOKUP_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.FND_LOOKUP_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.FND_LOOKUP_REPORT_PARAM.values()[i].getValue();
                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                }
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.FND_LOOKUP_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.PERSON_ABSENCE_REPORT.getValue())) {
                String paramName = null;
                
                for (int i = 0 ; i < BIPReports.PERSON_ABSENCE_REPORT_PARAM.values().length; i ++) {
                    paramName = BIPReports.PERSON_ABSENCE_REPORT_PARAM.values()[i].getValue();
                    if(paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_END_DATE.getValue())) {
                        
                        String[] enDt = request.getParameter(paramName).split("-");
                        String end=enDt[2]+"-"+enDt[1]+"-"+enDt[0];
                        biPReports.getParamMap().put(paramName, end);
                        
                    } else if(paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_START_DATE.getValue())) {
                    
                        String[] stDt = request.getParameter(paramName).split("-");
                        String start=stDt[2]+"-"+stDt[1]+"-"+stDt[0];
                        biPReports.getParamMap().put(paramName, start); 
                        
                    } else {
                        biPReports.getParamMap().put(paramName, request.getParameter(paramName));    
                    }
                    
                }
                
                
                
                biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_ABSENCE_REPORT.getValue());
                fresponse = biPReports.executeReports();
                
            } else if(reportName.equals(BIPReports.REPORT_NAME.FUSE_REPORT.getValue())) {
                    String paramName = null;
                    if(request.getSession().getAttribute(BIPReports.REPORT_NAME.FUSE_REPORT.getValue()) == null) {
                        for (int i = 0 ; i < BIPReports.FUSE_REPORT_PARAM.values().length; i ++) {
                            paramName = BIPReports.FUSE_REPORT_PARAM.values()[i].getValue();
                            biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                        }
                        
                        biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.FUSE_REPORT.getValue());
                        fresponse = biPReports.executeReports();
                        request.getSession().setAttribute(BIPReports.REPORT_NAME.FUSE_REPORT.getValue(),fresponse);
                    }
                    
                    fresponse = request.getSession().getAttribute(BIPReports.REPORT_NAME.FUSE_REPORT.getValue()).toString();
                    
                    
                } else if(reportName.equals(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue())) {
                    String paramName = null;
                    if(request.getSession().getAttribute(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue()) == null) {
                        for (int i = 0 ; i < BIPReports.PERSON_FUSE_REPORT_PARAM.values().length; i ++) {
                            paramName = BIPReports.PERSON_FUSE_REPORT_PARAM.values()[i].getValue();
                            biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                        }
                        
                        biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue());
                        fresponse = biPReports.executeReports();
                        request.getSession().setAttribute(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue(),fresponse);
                    }
                    
                    fresponse = request.getSession().getAttribute(BIPReports.REPORT_NAME.PERSON_FUSE_REPORT.getValue()).toString();
                    
                } else if(reportName.equals(BIPReports.REPORT_NAME.PERSON_PAY_PERIOD_REPORT.getValue())) {
                    String paramName = null;
                    
                    for (int i = 0 ; i < BIPReports.PERSON_PAY_PERIOD_REPORT_PARAM.values().length; i ++) {
                        paramName = BIPReports.PERSON_PAY_PERIOD_REPORT_PARAM.values()[i].getValue();
                        biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                    }
                    
                    biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_PAY_PERIOD_REPORT.getValue());

                    fresponse = biPReports.executeReports();
                    
                }
                 else if(reportName.contains(BIPReports.REPORT_NAME.IDENTIFICATION_LETTERS_REPORT.getValue())) {
                               String paramName = null;
                               
                   for (int i = 0 ; i < BIPReports.IDENTIICATIONS_LETTER_REPORT_PARAM.values().length; i ++) {
                       paramName = BIPReports.IDENTIICATIONS_LETTER_REPORT_PARAM.values()[i].getValue();
                       biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                   }
                               
                   biPReports.setReportAbsolutePath(reportName);
                   biPReports.setAttributeFormat(BIPReports.ATTRIBUTE_FORMAT.ATTRIBUTE_FORMAT_PDF.getValue());
                   biPReports.setAttributeTemplate(BIPReports.ATTRIBUTE_TEMPLATE.ATTRIBUTE_TEMPLATE_PDF.getValue());
                   fresponse = biPReports.executeReports();
            }
            else if(reportName.equals(BIPReports.REPORT_NAME.DEPENDENT_REPORT.getValue())) {
                                String paramName = null;
                                
                                for (int i = 0 ; i < BIPReports.DEPENDENT_REPORT_PARAM.values().length; i ++) {
                                    paramName = BIPReports.DEPENDENT_REPORT_PARAM.values()[i].getValue();
                                    biPReports.getParamMap().put(paramName, request.getParameter(paramName));
                                }
                                
                               // biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.DEPENDENT_REPORT.getValue());
                               biPReports.setReportAbsolutePath(reportName);
                                fresponse = biPReports.executeReports();
//                                System.out.println(fresponse);
                                
                            }
                               
                     else if (reportName.equals(BIPReports.REPORT_NAME.GET_AOR_EMAILS.getValue())) {
                        String paramName = null;
                        
                        for (int i = 0 ; i < BIPReports.GET_AOR_EMAILS_PARAM.values().length; i ++) {
                            paramName = BIPReports.GET_AOR_EMAILS_PARAM.values()[i].getValue();
                            if(request.getParameter(paramName) != null  &&
                                !request.getParameter(paramName).isEmpty() &&
                            !"null".equals(request.getParameter(paramName))) {
                                
                                biPReports.getParamMap().put(paramName, request.getParameter(paramName));    
                            }
                            
                        }
                        
                        biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_AOR_EMAILS.getValue());
                        fresponse = biPReports.executeReports();
                        
                    } 
               else if(reportName.equals(BIPReports.REPORT_NAME.PERSON_ELEMENT_ENTRY_REPORT.getValue())) {
                           String paramName = null;
                           
                           for (int i = 0 ; i < BIPReports.PERSON_ELEMENT_ENTRY_REPORT_PARAM.values().length; i ++) {
                               paramName = BIPReports.PERSON_ELEMENT_ENTRY_REPORT_PARAM.values()[i].getValue();
                              if(paramName.equals(BIPReports.PERSON_ABSENCE_REPORT_PARAM.P_START_DATE.getValue())) {
                               
                                   String[] stDt = request.getParameter(paramName).split("-");
                                   String start=stDt[2]+"-"+stDt[1]+"-"+stDt[0];
                                   biPReports.getParamMap().put(paramName, start); 
                                   
                               } else {
                                   biPReports.getParamMap().put(paramName, request.getParameter(paramName));    
                               }
                               
                           }
                           biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.PERSON_ELEMENT_ENTRY_REPORT.getValue());
                           fresponse = biPReports.executeReports();
                           
                       }
        }
        out.write(fresponse);
        out.close();
    }
    
    public static void main(String[] args) {
        BIPReports biPReports = new BIPReports();
        Map<String,String> requestParam = new HashMap<String,String>();
        requestParam.put("positionCode", "NADEC_KSA_TICKET_AGENT");
        for (int i = 0 ; i < BIPReports.POSITION_EMAIL_REPORT_PARAM.values().length; i ++) {
            String paramName = BIPReports.POSITION_EMAIL_REPORT_PARAM.values()[i].getValue();
            biPReports.getParamMap().put(paramName, requestParam.get(paramName));
        }
        biPReports.setReportAbsolutePath(BIPReports.REPORT_NAME.GET_POSITION_EMAIL_REPORT.getValue());
        System.out.println(biPReports.executeReports());
    }
}
