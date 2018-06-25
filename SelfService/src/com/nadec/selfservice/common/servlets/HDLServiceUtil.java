package com.nadec.selfservice.common.servlets;

import com.nadec.selfservice.businesstrip.EmployeeDetails;

import com.nadec.selfservice.common.elementEntry.HCMElementEntryHelper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import java.util.zip.ZipEntry;

import java.util.zip.ZipOutputStream;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.codec.binary.Base64;

import org.apache.openjpa.lib.util.Files;

import utilities.EncodeBased64Binary;

public class HDLServiceUtil extends HttpServlet {
    private static final String CONTENT_TYPE =
        "text/html; charset=windows-1252";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException,
                                                           IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        EmployeeDetails employeeDetails = new EmployeeDetails();
        if (null != request.getParameter("autocreate") &&
            request.getParameter("autocreate").equalsIgnoreCase("AUTOCREATE")) {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            String path = context.getRealPath(request.getContextPath());

            if (null != path && path.contains("SamiSelfService")) {
                path = path.split("SamiSelfService")[0] + "/images";
            } else if (null != path && path.contains("selfservice")) {
                path = System.getProperty("java.scratch.dir");
            }

            out.write("======================================");
            out.write(createHelper(path));
            out.write("======================================");

        }
        out.println("");

        out.close();
    }

    private String createHelper(String path) {
        String resp = "Service Failed.";
        String sourceSystemOwner = "PAAS";
        String sourceSystemId = "100002_BTRIPADVANCE_10";
        String EffectiveStartDate = HCMElementEntryHelper.getFirstDayofCuurentMonth();
        String EffectiveEndDate = HCMElementEntryHelper.getlastDayofCuurentMonth();
        String ElementName = "Business Trip Advance";
        String LegislativeDataGroupName = "SA Legislative Data Group";
        String AssignmentNumber = "E100002";
        String EntryType = "E";
        String CreatorType = "H";

        String lineSourceSystemOwner = sourceSystemOwner;
        String lineElementEntryId = sourceSystemId;
        String lineEffectiveStartDate = EffectiveStartDate;
        String lineEffectiveEndDate = EffectiveEndDate;
        String lineElementName = ElementName;
        String lineLegislativeDataGroupName = LegislativeDataGroupName;
        String lineAssignmentNumber = AssignmentNumber;

        String lineSourceSystemId1 = sourceSystemId + "_PAYVALUE";
        String lineInputValueName1 = "Pay Value";
        String lineScreenEntryValue1 = "700";
        
         String headerdata =
            "MERGE|ElementEntry|" + sourceSystemOwner + "|" + sourceSystemId +
            "|" + EffectiveStartDate + "|" + EffectiveEndDate + "|" +
            ElementName + "|" + LegislativeDataGroupName + "|" +
            AssignmentNumber + "|" + EntryType + "|" + CreatorType;
            String linedata1 =
            "MERGE|ElementEntryValue|" + lineSourceSystemOwner + "|" +
            lineSourceSystemId1 + "|" + lineElementEntryId + "|" +
            lineEffectiveStartDate + "|" + lineEffectiveEndDate + "|" +
            lineElementName + "|" + lineLegislativeDataGroupName + "|" +
            lineAssignmentNumber + "|" + lineInputValueName1 + "|" +
            lineScreenEntryValue1;
        String toBytes = HCMElementEntryHelper.ELEMENT_HEADER + "\n" +
            headerdata + "\n" +
            HCMElementEntryHelper.ELEMENT_LINE + "\n" +
            linedata1 + "\n";

        String fileContent = HCMElementEntryHelper.ELEMENT_HEADER + "\r\n" +
            headerdata + "\r\n" +
            HCMElementEntryHelper.ELEMENT_LINE + "\r\n" +
            linedata1;
       // resp = HCMElementEntryHelper.uploadAndLoadFile(path, fileContent, toBytes,"NA","NA",null);


        return resp;
    }


}
