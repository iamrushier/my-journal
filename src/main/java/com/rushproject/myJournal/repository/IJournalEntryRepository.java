package com.rushproject.myJournal.repository;

import com.rushproject.myJournal.entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IJournalEntryRepository extends MongoRepository<JournalEntry, ObjectId> {
}
