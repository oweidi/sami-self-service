<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=windows-1252"%>
<%@ page import="com.nadec.selfservice.businesstrip.Main" %>


<%

out.println(Main.createFileAndSend());

response.sendRedirect("index.jsp");

%>