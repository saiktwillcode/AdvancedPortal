package com.campus.portal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String role = request.getOrDefault("role", "STUDENT");
        String email = request.getOrDefault("email", "saikat.cse26@university.edu");

        Map<String, Object> response = new HashMap<>();
        response.put("token", "jwt_token_" + System.currentTimeMillis());

        Map<String, Object> user = new HashMap<>();
        user.put("email", email);
        user.put("role", role);

        if ("STUDENT".equalsIgnoreCase(role)) {
            user.put("id", "usr_student_1");
            user.put("name", "Saikat Khanra");
            user.put("studentId", "CSE2026042");
            user.put("department", "Computer Science & Engineering");
            user.put("semester", 4);
            user.put("cgpa", 9.94);
        } else if ("FACULTY".equalsIgnoreCase(role)) {
            user.put("id", "usr_faculty_1");
            user.put("name", "Prof. Elena Rostova");
            user.put("employeeId", "FAC8812");
            user.put("department", "Computer Science & Engineering");
        } else {
            user.put("id", "usr_admin_1");
            user.put("name", "Dean Marcus Vance");
            user.put("employeeId", "ADM001");
            user.put("department", "Office of Academic Affairs");
        }

        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> res = new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("message", "JWT token invalidated successfully.");
        return ResponseEntity.ok(res);
    }
}
