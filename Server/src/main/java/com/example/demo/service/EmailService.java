package com.example.demo.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String htmlContent =
                    "<h1><a href='" + text + "'>Click to ACTIVE Your Account</a></h1></br>" +
                    "<h2>Have a nice day</h2>";
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailForBan(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String htmlContent =
                    "<h1>You have been banned from the YourChords website</h1></br>" +
                    "<p>Reason:" + text + "</p></br>" +
                    "<h2>Thanks for joining my website</h2>";
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailForWarn(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String htmlContent =
                    "<h1>Warning message!</h1></br>" +
                            "<p>Message:" + text + "</p></br>" +
                            "<h2>Thanks for joining my website</h2>";
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendEmailForUnBan(String to, String subject) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String htmlContent =
                    "<h1>You have been unbanned from the YourChords website</h1></br>" +
                            "<h2>Thanks for joining my website</h2>";
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public ResponseEntity<String> sendEmailContact(String to, String subject, String fullName, String phone, String email, String content) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String htmlContent =
                            "<h1>From:</h1></br>" +
                            "<h2>Full Name: " + fullName + "</h2></br>" +
                            "<h2>Email: " + email + "</h2></br>" +
                            "<h2>Phone: " + phone + "</h2></br>" +
                            "<h2>Message: " + content + "</h2>";
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
            return new ResponseEntity<>("Send Mail Successfully", HttpStatus.OK);
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Send Mail Failed", HttpStatus.NOT_IMPLEMENTED);
        }
    }
}