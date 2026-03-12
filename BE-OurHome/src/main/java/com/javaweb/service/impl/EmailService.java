package com.javaweb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("ourhome391s5@gmail.com");

            System.out.println("Sending email to: " + to);
            javaMailSender.send(message);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to send OTP email.", e);
        }
    }

}
