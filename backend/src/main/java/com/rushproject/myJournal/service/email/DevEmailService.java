package com.rushproject.myJournal.service.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
@Slf4j
public class DevEmailService implements IEmailService {
    @Override
    public void sendEmail(String to, String subject, String body) {
        log.info("ProdEmailService: Simulating sending email to {} with subject '{}' and body '{}'", to, subject, body);
    }
}