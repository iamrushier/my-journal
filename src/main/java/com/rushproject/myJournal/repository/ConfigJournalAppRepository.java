package com.rushproject.myJournal.repository;

import com.rushproject.myJournal.entity.ConfigJournalAppEntity;
import com.rushproject.myJournal.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigJournalAppRepository extends MongoRepository<ConfigJournalAppEntity, ObjectId> {

}
