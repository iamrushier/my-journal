package com.rushproject.myJournal.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailServiceTests {
    @Autowired
    private EmailService emailService;

    @Test
    void testSampleMail(){
        emailService.sendEmail("testing@mail.com","Testing","How r u?");
    }
}
