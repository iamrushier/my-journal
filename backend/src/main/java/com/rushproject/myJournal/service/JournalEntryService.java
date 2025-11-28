package com.rushproject.myJournal.service;

import com.rushproject.myJournal.domain.entity.JournalEntry;
import com.rushproject.myJournal.domain.entity.User;
import com.rushproject.myJournal.repository.IJournalEntryRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class JournalEntryService {
    private final IJournalEntryRepository journalEntryRepository;
    private final UserService userService;

    @Autowired
    public JournalEntryService(IJournalEntryRepository journalEntryRepository, UserService userService) {
        this.journalEntryRepository = journalEntryRepository;
        this.userService = userService;
    }

    //    @Transactional
    public void saveEntry(JournalEntry journalEntry, String userName) {
        journalEntry.setDate(LocalDateTime.now());
        User user = userService.findByUserName(userName);
        JournalEntry saved = journalEntryRepository.save(journalEntry);
        user.getJournalEntries().add(saved);
        userService.saveUser(user);
    }

    public void saveEntry(JournalEntry journalEntry) {
        try {
            journalEntryRepository.save(journalEntry);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
    }

    public List<JournalEntry> getAll() {
        return journalEntryRepository.findAll();
    }

    public Optional<JournalEntry> findById(ObjectId id) {
        return journalEntryRepository.findById(id);
    }

//    @Transactional
    public boolean deleteById(ObjectId id, String userName) {
        boolean removed = false;
        try {
            User user = userService.findByUserName(userName);
            removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));
            if (removed) {
                userService.saveUser(user);
                journalEntryRepository.deleteById(id);
            }
            return removed;
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while deleting entry: " + e);
        }
    }
}
