package com.nadec.selfservice.common.servlets;

import java.io.BufferedReader;
import java.io.InputStream;

import java.io.InputStreamReader;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import utilities.MailingUtiliy;

@Path("/mail")
public class MailRestService {

            @POST
            @Path("/sendNotification")
            @Consumes(MediaType.APPLICATION_JSON)
            public Response gethrmessage(String incomingData) {

                String serviceOutput = MailingUtiliy.sendNotification(incomingData);
                // return HTTP response 200 in case of success
                return Response.status(200).entity("Success").build();
            }
}
