package com.rushproject.myJournal.common.scheduler;

import com.rushproject.myJournal.common.cache.AppCache;
import com.rushproject.myJournal.domain.entity.JournalEntry;
import com.rushproject.myJournal.domain.entity.User;
import com.rushproject.myJournal.domain.enums.Sentiment;
import com.rushproject.myJournal.repository.UserRepositoryImpl;
import com.rushproject.myJournal.service.email.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserScheduler {
    private final IEmailService emailService;
    private final UserRepositoryImpl userRepository;
    private final AppCache appCache;

    @Autowired
    public UserScheduler(IEmailService emailService, UserRepositoryImpl userRepository, AppCache appCache) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.appCache = appCache;
    }

//    @Scheduled(cron = "0 * * * * ?")
    @Scheduled(cron = "0 0 9 * * SUN")
    public void fetchUsersAndSendSaMail() {
        List<User> users = userRepository.getUserForSA();
        for (User user : users) {
            List<JournalEntry> journalEntries = user.getJournalEntries();
            List<Sentiment> sentiments = journalEntries.stream().filter(x -> x.getDate().isAfter(LocalDateTime.now().minus(7, ChronoUnit.DAYS))).map(x -> x.getSentiment()).collect(Collectors.toList());
            Map<Sentiment, Integer> sentimentCounts = new HashMap<>();
            for (Sentiment sentiment : sentiments) {
                if (sentiment != null)
                    sentimentCounts.put(sentiment, sentimentCounts.getOrDefault(sentiment, 0) + 1);
            }
            Sentiment mostFrequentSentiment = null;
            int maxCount = 0;
            for (Map.Entry<Sentiment, Integer> entry : sentimentCounts.entrySet()) {
                if (entry.getValue() > maxCount) {
                    maxCount = entry.getValue();
                    mostFrequentSentiment = entry.getKey();
                }
            }
            if (mostFrequentSentiment != null) {
                emailService.sendEmail(user.getEmail(), "Sentiment for previous week", mostFrequentSentiment.toString());
            }
        }
    }


    @Scheduled(cron = "0 0/10 * ? * *")
    public void clearAppCache() {
        appCache.init();
    }
}
