package com.rushproject.myJournal.common.cache;

import com.rushproject.myJournal.domain.entity.ConfigJournalAppEntity;
import com.rushproject.myJournal.repository.ConfigJournalAppRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AppCache {
    private final ConfigJournalAppRepository configJournalAppRepository;

    @Autowired
    public AppCache(ConfigJournalAppRepository configJournalAppRepository) {
        this.configJournalAppRepository = configJournalAppRepository;
    }

    public Map<String, String> APP_CACHE;

    @PostConstruct
    public void init() {
        APP_CACHE = new HashMap<>();
        List<ConfigJournalAppEntity> all = configJournalAppRepository.findAll();
        for (ConfigJournalAppEntity configJournalAppEntity : all) {
            APP_CACHE.put(configJournalAppEntity.getKey(), configJournalAppEntity.getValue());
        }
    }
}
