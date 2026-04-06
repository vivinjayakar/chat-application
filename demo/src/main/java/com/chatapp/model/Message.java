package com.chatapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Data
public class Message {

    @Id
    private String id;

    private String content;
    private LocalDateTime timestamp;

    private boolean deleted = false;
    private boolean pinned = false;
}