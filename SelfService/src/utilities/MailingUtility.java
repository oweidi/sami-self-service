package utilities;



import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;


public class MailingUtility {
    public MailingUtility() {
        super();
    }
public static void postMail( String recipients[] , String subject, String message , String from) throws MessagingException {  
    boolean debug = false;  
    
     //Set the host smtp address  
     Properties props = new Properties();  
     props.put("mail.smtp.host", "smtp.gmail.com");  
    System.out.println("1");
    
    // create some properties and get the default Session
    System.out.println("2");
        props.put("mail.smtp.auth", "true");
               props.put("mail.smtp.host", "smtp.gmail.com");
               props.put("mail.smtp.port", "465");
               props.put("mail.transport.protocol", "smtp");
               props.put("mail.smtp.starttls.enable", "true");
               props.put("mail.smtp.starttls.enable", "true");
               props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
    
    Session session = Session.getDefaultInstance(props,
                        new javax.mail.Authenticator() {
                                protected PasswordAuthentication getPasswordAuthentication() {
                                        return new PasswordAuthentication("bala.ravilla","dipannita");
                                }
        });
    
    
    InternetAddress[] addressTo = new InternetAddress[recipients.length];
    for (int i = 0; i < recipients.length; i++)
    {
       addressTo[i] = new InternetAddress(recipients[i]);  
    }
    
    
    // create a message  
    Message msg = new MimeMessage(session);  
    System.out.println("3");
    // set the from and to address  
        msg.setFrom(new InternetAddress("bala.ravilla@gmail.com"));
        msg.setRecipients(Message.RecipientType.TO,
                        addressTo);
        msg.setSubject("Test Mail from Java");
        msg.setText("Dear Bala," +
                        "\n\n How are you?");
        System.out.println("4");
        Transport.send(msg);
        System.out.println("3");

    // Optional : You can also set your custom headers in the Email if you Want  
    msg.addHeader("MyHeaderName", "myHeaderValue");  
    
    // Setting the Subject and Content Type  
    msg.setSubject(subject);  
    msg.setContent(message, "text/plain");  
    Transport.send(msg);  
    }

    public static void main(String args[])
    {
        System.out.println("Started ------------------->");
        String[] abc={"bala.ravilla@gmail.com"};
        try {
                postMail(abc,"testmail","hello","bala.ravilla@gmail.com");
        } catch (MessagingException e) {
                // TODO Auto-generated catch block
                System.out.println("---------------------> caught exception");
                e.printStackTrace();
        }
        
    }

//
//    public static void main(String[] args) {
//    
//         int port = 465;
//         String host = "localhost";
//         String from = "bala.ravilla@gmail.com";
//        String to = "bala.ravilla@gmail.com";
//         boolean auth = true;
//         String username = "bala.ravilla@gmail.com";
//         String password = "dipannita";
////         Protocol protocol = Protocol.SMTPS;
//         boolean debug = true;
//        Properties props = new Properties();
//        props.put("mail.smtp.host", host);
//        props.put("mail.smtp.port", port);
//        props.put("mail.smtp.ssl.enable", true);
////        switch (protocol) {
////            case SMTPS:
////                props.put("mail.smtp.ssl.enable", true);
////                break;
////            case TLS:
////                props.put("mail.smtp.starttls.enable", true);
////                break;
////        }
//        
//        Authenticator authenticator = null;
//        if (auth) {
//            props.put("mail.smtp.auth", true);
//            authenticator = new Authenticator() {
//                private PasswordAuthentication pa = new PasswordAuthentication("bala.ravilla", "dipannita");
//                @Override
//                public PasswordAuthentication getPasswordAuthentication() {
//                    return pa;
//                }
//            };
//        }
//        
//        Session session = Session.getInstance(props, authenticator);
//        session.setDebug(debug);
//        
//        MimeMessage message = new MimeMessage(session);
//        try {
//            message.setFrom(new InternetAddress(from));
//            InternetAddress[] address = {new InternetAddress(to)};
//            message.setRecipients(Message.RecipientType.TO, address);
//            message.setSubject("This is the Subject Line!");
//            message.setSentDate(new Date());
//            message.setText("This is the Body Text!");
//            Transport.send(message);
//        } catch (MessagingException ex) {
//            ex.printStackTrace();
//        }
//        
//        
//        
//        
//        
//        MailingUtility mailingUtility = new MailingUtility();
////        String to = "bala.ravilla@gmail.com";
////        String from = "bala.ravilla@gmail.com";
////        String host = "localhost";
////        
////        Properties props = System.getProperties();
////        props.setProperty("mail.smtp.host", host);
////        props.setProperty("mail.user", "bala.ravilla");
////        props.setProperty("mail.password", "dipannita");
////        Session session = Session.getDefaultInstance(props);
////
////             try {
////                MimeMessage message = new MimeMessage(session);
////                message.setFrom(new InternetAddress(from));
////                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
////                message.setSubject("This is the Subject Line!");
////                message.setText("This is actual message");
////                Transport.send(message);
////                System.out.println("Sent message successfully....");
////             }catch (MessagingException mex) {
////                mex.printStackTrace();
////             }
//    }
//    
    
    
}
