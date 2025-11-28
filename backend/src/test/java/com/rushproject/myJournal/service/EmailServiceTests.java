package com.rushproject.myJournal.service;

import com.rushproject.myJournal.service.email.IEmailService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled
public class EmailServiceTests {
    @Autowired
    private IEmailService emailService;

    @Test
    void testSampleMail(){
        emailService.sendEmail("surverushi45@gmail.com","Testing","How r u?");
    }
}
