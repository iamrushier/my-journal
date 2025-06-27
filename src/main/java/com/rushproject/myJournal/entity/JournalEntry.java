package com.rushproject.myJournal.entity;

import com.rushproject.myJournal.enums.Sentiment;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

// POJO class - Plain Old Java Object
@Document(collection = "journal_entries")
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class JournalEntry {
    @Id
    private ObjectId id;
    @NonNull
    private String title;
    private String content;
    private LocalDateTime date;
    private Sentiment sentiment;
}
