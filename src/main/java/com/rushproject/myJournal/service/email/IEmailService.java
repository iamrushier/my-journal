package com.rushproject.myJournal.service.email;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);
}