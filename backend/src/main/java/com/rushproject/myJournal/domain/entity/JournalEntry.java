package com.rushproject.myJournal.domain.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.rushproject.myJournal.domain.enums.Sentiment;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

// POJO class - Plain Old Java Object
@Document(collection = "journal_entries")
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class JournalEntry {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    private String title;

    private String content;

    private LocalDateTime date;

    private Sentiment sentiment;
}
