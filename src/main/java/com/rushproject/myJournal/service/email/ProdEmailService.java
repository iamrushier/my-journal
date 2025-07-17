package com.rushproject.myJournal.service.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Profile("prod")
@Slf4j
public class ProdEmailService implements IEmailService {
    private final JavaMailSender javaMailSender;

    @Autowired
    public ProdEmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(body);
            javaMailSender.send(mailMessage);
        } catch (Exception e) {
            log.error("Exception while sending email: ", e);
        }
    }
}
