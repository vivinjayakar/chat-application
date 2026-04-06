package com.chatapp.controller;

import com.chatapp.model.Message;
import com.chatapp.service.MessageService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MessageController {

    private final MessageService service;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(MessageService service, SimpMessagingTemplate messagingTemplate) {
        this.service = service;
        this.messagingTemplate = messagingTemplate;
    }

    private void broadcastUpdate() {
        messagingTemplate.convertAndSend("/topic/chat", "UPDATE");
    }

    @PostMapping("/send")
    public Message send(@RequestBody Message msg) {
        Message savedMsg = service.sendMessage(msg.getContent());
        broadcastUpdate();
        return savedMsg;
    }

    @GetMapping("/messages")
    public List<Message> getAll() {
        return service.getMessages();
    }

    @PutMapping("/delete/{id}")
    public Message delete(@PathVariable String id) {
        Message deletedMsg = service.deleteForEveryone(id);
        broadcastUpdate();
        return deletedMsg;
    }

    @PutMapping("/pin/{id}")
    public Message pin(@PathVariable String id) {
        Message pinnedMsg = service.pinMessage(id);
        broadcastUpdate();
        return pinnedMsg;
    }
}