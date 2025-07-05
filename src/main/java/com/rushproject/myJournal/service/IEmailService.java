package com.rushproject.myJournal.service;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);
}