package com.campus.portal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getStudentProfile(@PathVariable String id) {
        Map<String, Object> student = new HashMap<>();
        student.put("id", id);
        student.put("name", "Saikat Khanra");
        student.put("studentId", "CSE2026042");
        student.put("department", "Computer Science & Engineering");
        student.put("program", "B.Tech Computer Science & Engineering");
        student.put("semester", 4);
        student.put("cgpa", 9.94);
        student.put("attendancePercentage", 87.4);
        student.put("academicMomentum", 82);
        student.put("advisorName", "Prof. Elena Rostova");
        student.put("bloodGroup", "O+");
        student.put("totalCredits", 24);
        student.put("earnedCredits", 24);

        return ResponseEntity.ok(student);
    }
}
