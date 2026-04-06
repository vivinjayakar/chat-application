package com.chatapp.service;

import com.chatapp.model.Message;
import com.chatapp.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository repo;

    public MessageService(MessageRepository repo) {
        this.repo = repo;
    }

    public Message sendMessage(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }
        Message msg = new Message();
        msg.setContent(content);
        msg.setTimestamp(LocalDateTime.now());
        return repo.save(msg);
    }

    public List<Message> getMessages() {
        return repo.findAll();
    }

    public Message deleteForEveryone(String id) {
        Message msg = repo.findById(id).orElseThrow();
        msg.setContent("This message was deleted");
        msg.setDeleted(true);
        return repo.save(msg);
    }

    public Message pinMessage(String id) {
        Message msg = repo.findById(id).orElseThrow();

        if (msg.isPinned()) {
            msg.setPinned(false);
            return repo.save(msg);
        }

        List<Message> all = repo.findAll();
        for (Message m : all) {
            m.setPinned(false);
        }
        repo.saveAll(all);

        msg.setPinned(true);
        return repo.save(msg);
    }
}