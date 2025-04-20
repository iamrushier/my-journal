package com.rushproject.myJournal.controller;

import com.rushproject.myJournal.entity.JournalEntry;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/journal") // Apply mapping to whole class
public class JournalEntryController {

    private Map<Long, JournalEntry> journalEntries = new HashMap<>();

    // End points as methods

    @GetMapping // /journal/abc
    public List<JournalEntry> getAll() { // localhost:8080/journal GET
        return new ArrayList<>(journalEntries.values());
    }

    @PostMapping
    public boolean createEntry(@RequestBody JournalEntry myEntry) { // localhost:8080/journal POST
        journalEntries.put(myEntry.getId(), myEntry);
        return true;
    }

    @GetMapping("id/{myId}")
    public JournalEntry getJournalEntryById(@PathVariable long myId) {
        return journalEntries.get(myId);
    }

    @DeleteMapping("id/{myId}")
    public boolean deleteJournalEntryById(@PathVariable long myId) {
        journalEntries.remove(myId);
        return true;
    }

    @PutMapping("id/{myId}")
    public JournalEntry updateJournalEntryById(@PathVariable long myId, @RequestBody JournalEntry myEntry) {

        return journalEntries.put(myId, myEntry);

    }
}
