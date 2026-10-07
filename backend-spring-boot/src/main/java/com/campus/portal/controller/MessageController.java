package com.campus.portal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final List<Map<String, Object>> messages = new ArrayList<>();

    public MessageController() {
        Map<String, Object> m1 = new HashMap<>();
        m1.put("id", "msg_1");
        m1.put("senderId", "usr_faculty_1");
        m1.put("senderName", "Prof. Elena Rostova");
        m1.put("senderRole", "FACULTY");
        m1.put("receiverId", "usr_student_1");
        m1.put("content", "Hello Saikat, I reviewed your project proposal on B+ tree distributed indexing. Impressive research.");
        m1.put("timestamp", new Date().toString());
        messages.add(m1);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getMessages() {
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody Map<String, Object> payload) {
        payload.put("id", "msg_" + System.currentTimeMillis());
        payload.put("timestamp", new Date().toString());
        messages.add(payload);
        return ResponseEntity.ok(payload);
    }
}
