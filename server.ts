import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-Memory Database Store for Full Interactivity & Demo
const db = {
  users: [
    {
      id: 'usr_student_1',
      name: 'Saikat Khanra',
      email: 'saikat.cse26@university.edu',
      role: 'STUDENT',
      studentId: 'CSE2026042',
      department: 'Computer Science & Engineering',
      semester: 4,
      program: 'B.Tech Computer Science & Engineering',
      cgpa: 9.94,
      attendancePercentage: 87,
      totalCredits: 24,
      earnedCredits: 24,
      bloodGroup: 'O+ Positive',
      contactNumber: '+91 98765 43210',
      advisorName: 'Prof. Elena Rostova',
      advisorEmail: 'elena.rostova@university.edu',
      academicMomentum: 82,
      admissionYear: 2024,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: 'usr_faculty_1',
      name: 'Prof. Elena Rostova',
      email: 'elena.rostova@university.edu',
      role: 'FACULTY',
      employeeId: 'FAC8812',
      department: 'Computer Science & Engineering',
      specialization: 'Database Systems & High-Performance Computing',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    },
    {
      id: 'usr_admin_1',
      name: 'Dean Marcus Vance',
      email: 'admin.vance@university.edu',
      role: 'ADMIN',
      employeeId: 'ADM001',
      department: 'Academic Affairs & Campus Infrastructure',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    },
  ],

  attendance: [
    {
      id: 'att_1',
      subjectCode: 'CS401',
      subjectName: 'Data Structures & Algorithms',
      facultyName: 'Dr. Alan Turing',
      totalClasses: 36,
      attendedClasses: 33,
      percentage: 92,
      threshold: 75,
      riskStatus: 'SAFE',
    },
    {
      id: 'att_2',
      subjectCode: 'CS402',
      subjectName: 'Database Management Systems',
      facultyName: 'Prof. Elena Rostova',
      totalClasses: 34,
      attendedClasses: 30,
      percentage: 88,
      threshold: 75,
      riskStatus: 'SAFE',
    },
    {
      id: 'att_3',
      subjectCode: 'CS403',
      subjectName: 'Operating Systems',
      facultyName: 'Dr. Linus Vance',
      totalClasses: 32,
      attendedClasses: 26,
      percentage: 81,
      threshold: 75,
      riskStatus: 'WARNING',
      recommendedAction: 'Your attendance is approaching the minimum 75% threshold. Attend the next 3 consecutive classes.',
    },
    {
      id: 'att_4',
      subjectCode: 'CS404',
      subjectName: 'Computer Networks',
      facultyName: 'Prof. Radia Perlman',
      totalClasses: 35,
      attendedClasses: 30,
      percentage: 86,
      threshold: 75,
      riskStatus: 'SAFE',
    },
    {
      id: 'att_5',
      subjectCode: 'MA401',
      subjectName: 'Discrete Mathematics & Graph Theory',
      facultyName: 'Dr. Srinivasa Rao',
      totalClasses: 30,
      attendedClasses: 27,
      percentage: 90,
      threshold: 75,
      riskStatus: 'SAFE',
    },
  ],

  marks: [
    {
      id: 'mrk_1',
      subjectCode: 'CS401',
      subjectName: 'Data Structures & Algorithms',
      credits: 4,
      internalMarks: 29,
      internalMax: 30,
      midtermMarks: 20,
      midtermMax: 20,
      assignmentMarks: 10,
      assignmentMax: 10,
      labMarks: 20,
      labMax: 20,
      endSemMarks: 19,
      endSemMax: 20,
      totalMarks: 98,
      totalMax: 100,
      percentage: 98,
      grade: 'O (Outstanding)',
      gradePoint: 10.0,
    },
    {
      id: 'mrk_2',
      subjectCode: 'CS402',
      subjectName: 'Database Management Systems',
      credits: 4,
      internalMarks: 28,
      internalMax: 30,
      midtermMarks: 19,
      midtermMax: 20,
      assignmentMarks: 10,
      assignmentMax: 10,
      labMarks: 19,
      labMax: 20,
      endSemMarks: 19,
      endSemMax: 20,
      totalMarks: 95,
      totalMax: 100,
      percentage: 95,
      grade: 'O (Outstanding)',
      gradePoint: 10.0,
    },
    {
      id: 'mrk_3',
      subjectCode: 'CS403',
      subjectName: 'Operating Systems',
      credits: 4,
      internalMarks: 27,
      internalMax: 30,
      midtermMarks: 18,
      midtermMax: 20,
      assignmentMarks: 9,
      assignmentMax: 10,
      labMarks: 19,
      labMax: 20,
      endSemMarks: 18,
      endSemMax: 20,
      totalMarks: 91,
      totalMax: 100,
      percentage: 91,
      grade: 'A+ (Excellent)',
      gradePoint: 9.8,
    },
    {
      id: 'mrk_4',
      subjectCode: 'CS404',
      subjectName: 'Computer Networks',
      credits: 4,
      internalMarks: 28,
      internalMax: 30,
      midtermMarks: 19,
      midtermMax: 20,
      assignmentMarks: 10,
      assignmentMax: 10,
      labMarks: 20,
      labMax: 20,
      endSemMarks: 19,
      endSemMax: 20,
      totalMarks: 96,
      totalMax: 100,
      percentage: 96,
      grade: 'O (Outstanding)',
      gradePoint: 10.0,
    },
    {
      id: 'mrk_5',
      subjectCode: 'MA401',
      subjectName: 'Discrete Mathematics & Graph Theory',
      credits: 4,
      internalMarks: 29,
      internalMax: 30,
      midtermMarks: 20,
      midtermMax: 20,
      assignmentMarks: 10,
      assignmentMax: 10,
      labMarks: 0,
      labMax: 0,
      endSemMarks: 39,
      endSemMax: 40,
      totalMarks: 98,
      totalMax: 100,
      percentage: 98,
      grade: 'O (Outstanding)',
      gradePoint: 10.0,
    },
  ],

  semesterTrends: [
    { semester: 'Semester 1', sgpa: 9.82, cgpa: 9.82, credits: 24 },
    { semester: 'Semester 2', sgpa: 9.90, cgpa: 9.86, credits: 24 },
    { semester: 'Semester 3', sgpa: 9.96, cgpa: 9.90, credits: 24 },
    { semester: 'Semester 4', sgpa: 9.98, cgpa: 9.94, credits: 24 },
  ],

  assignments: [
    {
      id: 'asg_1',
      title: 'Relational Schema Normalization (3NF & BCNF)',
      subjectCode: 'CS402',
      subjectName: 'Database Management Systems',
      description: 'Decompose relational tables into 3NF and Boyce-Codd Normal Form with functional dependency preservation proofs.',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      priority: 'HIGH',
      estimatedHours: 2.5,
      status: 'PENDING',
    },
    {
      id: 'asg_2',
      title: 'Multithreaded Kernel Scheduling Simulation',
      subjectCode: 'CS403',
      subjectName: 'Operating Systems',
      description: 'Implement a Round-Robin and Priority Preemptive scheduler in C++ with context switching benchmarks.',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'MEDIUM',
      estimatedHours: 4.0,
      status: 'DUE_SOON',
    },
    {
      id: 'asg_3',
      title: 'Eulerian Paths and Planar Graph Theorems',
      subjectCode: 'MA401',
      subjectName: 'Discrete Mathematics',
      description: 'Solve mathematical proofs for Four Color theorem corollaries and Hamiltonian cycle reductions.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'LOW',
      estimatedHours: 2.0,
      status: 'PENDING',
    },
    {
      id: 'asg_4',
      title: 'Socket Programming & TCP Flow Control Window',
      subjectCode: 'CS404',
      subjectName: 'Computer Networks',
      description: 'Build a client-server socket buffer with selective repeat ARQ and packet retransmission monitoring.',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'HIGH',
      estimatedHours: 3.5,
      status: 'GRADED',
      grade: '10/10 (A+)',
      feedback: 'Flawless TCP congestion simulation and well-commented source code.',
    },
  ],

  timetable: [
    { id: 'tt_1', day: 'MONDAY', startTime: '09:00', endTime: '10:30', subjectCode: 'CS401', subjectName: 'Data Structures & Algorithms', facultyName: 'Dr. Alan Turing', roomNumber: 'Hall 301', building: 'Turing Computing Center', type: 'LECTURE' },
    { id: 'tt_2', day: 'MONDAY', startTime: '11:00', endTime: '12:30', subjectCode: 'CS402', subjectName: 'Database Management Systems', facultyName: 'Prof. Elena Rostova', roomNumber: 'Lab B-2', building: 'Information Systems Tower', type: 'LAB' },
    { id: 'tt_3', day: 'MONDAY', startTime: '14:00', endTime: '15:30', subjectCode: 'CS403', subjectName: 'Operating Systems', facultyName: 'Dr. Linus Vance', roomNumber: 'Hall 105', building: 'Academic Hall Alpha', type: 'LECTURE' },

    { id: 'tt_4', day: 'TUESDAY', startTime: '09:00', endTime: '10:30', subjectCode: 'MA401', subjectName: 'Discrete Mathematics', facultyName: 'Dr. Srinivasa Rao', roomNumber: 'Hall 204', building: 'Science Complex', type: 'LECTURE' },
    { id: 'tt_5', day: 'TUESDAY', startTime: '11:00', endTime: '12:30', subjectCode: 'CS404', subjectName: 'Computer Networks', facultyName: 'Prof. Radia Perlman', roomNumber: 'Hall 402', building: 'Academic Hall Alpha', type: 'LECTURE' },
    { id: 'tt_6', day: 'TUESDAY', startTime: '14:00', endTime: '16:00', subjectCode: 'CS401', subjectName: 'DSA Practical Lab', facultyName: 'Dr. Alan Turing', roomNumber: 'Lab A-1', building: 'Turing Computing Center', type: 'LAB' },

    { id: 'tt_7', day: 'WEDNESDAY', startTime: '09:30', endTime: '11:00', subjectCode: 'CS402', subjectName: 'Database Systems', facultyName: 'Prof. Elena Rostova', roomNumber: 'Hall 301', building: 'Information Systems Tower', type: 'LECTURE' },
    { id: 'tt_8', day: 'WEDNESDAY', startTime: '11:30', endTime: '13:00', subjectCode: 'CS403', subjectName: 'Operating Systems Lab', facultyName: 'Dr. Linus Vance', roomNumber: 'Kernel Lab 4', building: 'Academic Hall Alpha', type: 'LAB' },

    { id: 'tt_9', day: 'THURSDAY', startTime: '09:00', endTime: '10:30', subjectCode: 'MA401', subjectName: 'Discrete Mathematics Tutorial', facultyName: 'Dr. Srinivasa Rao', roomNumber: 'Hall 204', building: 'Science Complex', type: 'TUTORIAL' },
    { id: 'tt_10', day: 'THURSDAY', startTime: '11:00', endTime: '12:30', subjectCode: 'CS404', subjectName: 'Computer Networks Lab', facultyName: 'Prof. Radia Perlman', roomNumber: 'NetLab 2', building: 'Information Systems Tower', type: 'LAB' },

    { id: 'tt_11', day: 'FRIDAY', startTime: '10:00', endTime: '11:30', subjectCode: 'CS401', subjectName: 'Advanced Algorithms', facultyName: 'Dr. Alan Turing', roomNumber: 'Hall 301', building: 'Turing Computing Center', type: 'LECTURE' },
    { id: 'tt_12', day: 'FRIDAY', startTime: '14:00', endTime: '16:00', subjectCode: 'PROJ4', subjectName: 'Capstone Project Review & Mentorship', facultyName: 'Prof. Elena Rostova', roomNumber: 'Innovation Studio', building: 'Tech Hub', type: 'TUTORIAL' },
  ],

  notices: [
    {
      id: 'not_1',
      title: 'Mid-Semester Examination Schedule Announced (Fall 2026)',
      content: 'The Office of Academic Affairs has published the official midterm schedule. Students are advised to verify their seating assignments and download revised hall tickets.',
      category: 'EXAMINATION',
      priority: 'HIGH',
      author: 'Dean Marcus Vance',
      date: '2026-10-01',
      read: false,
    },
    {
      id: 'not_2',
      title: 'DBMS Assignment 3 Submission Deadline Reminder',
      content: 'All B.Tech CSE Semester 4 students must submit their BCNF Normalization assignments via the portal by tomorrow at 23:59 IST.',
      category: 'ACADEMIC',
      priority: 'HIGH',
      author: 'Prof. Elena Rostova',
      date: '2026-10-02',
      read: true,
    },
    {
      id: 'not_3',
      title: 'Annual Campus Hackathon & Innovation Expo 2026',
      content: 'Registrations are open for the 36-hour National Hackathon. Top winning teams receive incubation grants and tech mentorship from industry sponsors.',
      category: 'EVENTS',
      priority: 'MEDIUM',
      author: 'Student Council & Tech Club',
      date: '2026-09-28',
      read: false,
    },
    {
      id: 'not_4',
      title: 'Google & Microsoft Campus Placement Drive Registration',
      content: 'Pre-final and final year eligible candidates (CGPA >= 8.5) must register their profiles and submit updated resumes by October 15th.',
      category: 'PLACEMENT',
      priority: 'HIGH',
      author: 'Placement & Career Cell',
      date: '2026-09-27',
      read: true,
    },
  ],

  courses: [
    {
      id: 'crs_1',
      code: 'CS401',
      name: 'Data Structures & Algorithms',
      department: 'Computer Science',
      semester: 4,
      credits: 4,
      facultyName: 'Dr. Alan Turing',
      facultyEmail: 'alan.turing@university.edu',
      schedule: 'Mon, Tue, Fri',
      enrolledStudentsCount: 128,
      syllabus: ['Advanced Trees (AVL, Red-Black)', 'Graph Traversal & Shortest Path Algorithms', 'Dynamic Programming Patterns', 'Disjoint Set Union & Network Flows'],
      resources: [
        { name: 'Lecture-01-Tree-Rotations.pdf', type: 'PDF', size: '2.4 MB', url: '#' },
        { name: 'Graph-Algorithms-Codebase.zip', type: 'ZIP', size: '5.1 MB', url: '#' },
      ],
    },
    {
      id: 'crs_2',
      code: 'CS402',
      name: 'Database Management Systems',
      department: 'Computer Science',
      semester: 4,
      credits: 4,
      facultyName: 'Prof. Elena Rostova',
      facultyEmail: 'elena.rostova@university.edu',
      schedule: 'Mon, Wed',
      enrolledStudentsCount: 128,
      syllabus: ['Relational Model & Relational Algebra', 'SQL Optimization & Indexing (B+ Trees)', 'Functional Dependencies & Normalization (3NF/BCNF)', 'ACID Transactions & Two-Phase Locking'],
      resources: [
        { name: 'SQL-Query-Optimization-Guide.pdf', type: 'PDF', size: '3.8 MB', url: '#' },
        { name: 'Transactions-Isolation-Levels.pdf', type: 'PDF', size: '1.9 MB', url: '#' },
      ],
    },
    {
      id: 'crs_3',
      code: 'CS403',
      name: 'Operating Systems',
      department: 'Computer Science',
      semester: 4,
      credits: 4,
      facultyName: 'Dr. Linus Vance',
      facultyEmail: 'linus.vance@university.edu',
      schedule: 'Mon, Wed',
      enrolledStudentsCount: 128,
      syllabus: ['Processes, Threads & Concurrency Primitives', 'Deadlock Detection & Banker Algorithm', 'Virtual Memory & Page Replacement Strategies', 'File System Architecture & Inodes'],
      resources: [
        { name: 'OS-Kernel-Architecture-Notes.pdf', type: 'PDF', size: '4.2 MB', url: '#' },
      ],
    },
    {
      id: 'crs_4',
      code: 'CS404',
      name: 'Computer Networks',
      department: 'Computer Science',
      semester: 4,
      credits: 4,
      facultyName: 'Prof. Radia Perlman',
      facultyEmail: 'radia.perlman@university.edu',
      schedule: 'Tue, Thu',
      enrolledStudentsCount: 128,
      syllabus: ['OSI & TCP/IP Model', 'Data Link Protocols & Spanning Tree', 'Routing Algorithms (OSPF, BGP)', 'Transport Layer (TCP Congestion Control)'],
      resources: [
        { name: 'TCP-Congestion-Control-DeepDive.pdf', type: 'PDF', size: '2.1 MB', url: '#' },
      ],
    },
  ],

  exams: [
    {
      id: 'ex_1',
      subjectCode: 'CS403',
      subjectName: 'Operating Systems (Midterm Exam)',
      date: '2026-10-12',
      time: '10:00 AM - 12:00 PM',
      durationMinutes: 120,
      roomNumber: 'Auditorium Hall B',
      seatNumber: 'B-34',
      building: 'Academic Hall Alpha',
      examType: 'MIDTERM',
      status: 'UPCOMING',
    },
    {
      id: 'ex_2',
      subjectCode: 'CS402',
      subjectName: 'Database Management Systems (Internal Test)',
      date: '2026-10-18',
      time: '02:00 PM - 04:00 PM',
      durationMinutes: 120,
      roomNumber: 'Hall 301',
      seatNumber: 'A-12',
      building: 'Information Systems Tower',
      examType: 'INTERNAL',
      status: 'UPCOMING',
    },
    {
      id: 'ex_3',
      subjectCode: 'CS401',
      subjectName: 'Data Structures Practical Lab Exam',
      date: '2026-10-25',
      time: '09:00 AM - 12:00 PM',
      durationMinutes: 180,
      roomNumber: 'Lab A-1',
      seatNumber: 'PC-18',
      building: 'Turing Computing Center',
      examType: 'LAB_PRACTICAL',
      status: 'UPCOMING',
    },
  ],

  fees: {
    id: 'fee_2026',
    academicYear: '2026-2027',
    semester: 4,
    totalFee: 120000,
    paidAmount: 90000,
    remainingAmount: 30000,
    dueDate: '2026-10-31',
    status: 'PARTIAL',
    transactions: [
      { id: 'txn_101', date: '2026-07-15', amount: 50000, method: 'Net Banking (HDFC)', referenceNo: 'REF-TXN-902831', status: 'SUCCESS' },
      { id: 'txn_102', date: '2026-08-20', amount: 40000, method: 'UPI Instant (GPay)', referenceNo: 'REF-UPI-481920', status: 'SUCCESS' },
    ],
  },

  libraryBooks: [
    { id: 'bk_1', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest, Stein', isbn: '978-0262033848', category: 'Computer Science', totalCopies: 15, availableCopies: 4, shelfLocation: 'Section CS-2, Shelf 4', isBorrowedByStudent: true, dueDate: '2026-10-10' },
    { id: 'bk_2', title: 'Database System Concepts', author: 'Silberschatz, Korth, Sudarshan', isbn: '978-0073523323', category: 'Database Systems', totalCopies: 12, availableCopies: 2, shelfLocation: 'Section CS-3, Shelf 1', isBorrowedByStudent: false, isReserved: false },
    { id: 'bk_3', title: 'Operating System Concepts', author: 'Abraham Silberschatz, Peter Galvin', isbn: '978-1118063330', category: 'Operating Systems', totalCopies: 18, availableCopies: 7, shelfLocation: 'Section CS-3, Shelf 5', isBorrowedByStudent: false, isReserved: false },
    { id: 'bk_4', title: 'Computer Networks: A Systems Approach', author: 'Larry Peterson, Bruce Davie', isbn: '978-0123850591', category: 'Networking', totalCopies: 10, availableCopies: 0, shelfLocation: 'Section CS-4, Shelf 2', isBorrowedByStudent: false, isReserved: true },
    { id: 'bk_5', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell, Peter Norvig', isbn: '978-0134610993', category: 'AI & Data Science', totalCopies: 20, availableCopies: 8, shelfLocation: 'Section CS-5, Shelf 3', isBorrowedByStudent: false, isReserved: false },
  ],

  achievements: [
    { id: 'ach_1', title: 'Hackathon Champion', description: 'Won 1st Place at National Smart Campus Hackathon 2026', category: 'HACKATHON', icon: '🏆', unlockedAt: '2026-08-14', xpPoints: 500, badgeLevel: 'PLATINUM' },
    { id: 'ach_2', title: 'Academic Titan', description: 'Maintained 9.9+ CGPA across 3 consecutive semesters', category: 'ACADEMIC', icon: '⭐', unlockedAt: '2026-06-30', xpPoints: 400, badgeLevel: 'GOLD' },
    { id: 'ach_3', title: 'Algorithmic Prodigy', description: 'Solved 250+ LeetCode problems & topped Data Structures contest', category: 'CODING', icon: '💻', unlockedAt: '2026-07-22', xpPoints: 300, badgeLevel: 'GOLD' },
    { id: 'ach_4', title: 'Perfect Attendance Star', description: 'Achieved 100% attendance in Data Structures lab sessions', category: 'ATTENDANCE', icon: '🎯', unlockedAt: '2026-09-15', xpPoints: 200, badgeLevel: 'SILVER' },
  ],

  messages: [
    { id: 'msg_1', senderId: 'usr_faculty_1', senderName: 'Prof. Elena Rostova', senderRole: 'FACULTY', receiverId: 'usr_student_1', receiverName: 'Saikat Khanra', content: 'Hello Saikat, I reviewed your project proposal on B+ tree distributed indexing. Impressive research. Are you free for a brief sync tomorrow after DBMS lecture?', timestamp: '2026-10-02T10:15:00.000Z', read: true },
    { id: 'msg_2', senderId: 'usr_student_1', senderName: 'Saikat Khanra', senderRole: 'STUDENT', receiverId: 'usr_faculty_1', receiverName: 'Prof. Elena Rostova', content: 'Thank you Professor! Yes, absolutely. I will meet you at the Faculty Cabin 304 right at 12:45 PM.', timestamp: '2026-10-02T10:22:00.000Z', read: true },
    { id: 'msg_3', senderId: 'usr_faculty_1', senderName: 'Prof. Elena Rostova', senderRole: 'FACULTY', receiverId: 'usr_student_1', receiverName: 'Saikat Khanra', content: 'Sounds great. Please bring the preliminary benchmark logs for write throughput.', timestamp: '2026-10-02T10:25:00.000Z', read: true },
  ],

  facilities: [
    { id: 'fac_1', name: 'Central University Library', category: 'LIBRARY', currentOccupancy: 342, maxCapacity: 500, availableSeats: 158, status: 'OPERATIONAL', specialMetric: '126 Books Issued Today • Air Quality: Optimal', coordinates: { x: -20, y: 0, z: -15 } },
    { id: 'fac_2', name: 'Turing Computer Lab & Cloud Center', category: 'LAB', currentOccupancy: 86, maxCapacity: 120, availableSeats: 34, status: 'OPERATIONAL', specialMetric: 'GPU Cluster: 92% Utilized • 64 Pods Running', coordinates: { x: 18, y: 0, z: -25 } },
    { id: 'fac_3', name: 'Academic Block Alpha', category: 'ACADEMIC', currentOccupancy: 610, maxCapacity: 800, availableSeats: 190, status: 'OPERATIONAL', specialMetric: '18 Active Lectures • Ambient Temp: 22°C', coordinates: { x: 0, y: 0, z: 0 } },
    { id: 'fac_4', name: 'Indoor Sports & Fitness Complex', category: 'SPORTS', currentOccupancy: 45, maxCapacity: 150, availableSeats: 105, status: 'OPERATIONAL', specialMetric: 'Badminton Courts: 2 Available • Pool Open', coordinates: { x: 35, y: 0, z: 15 } },
    { id: 'fac_5', name: 'Administrative Governance Tower', category: 'ADMIN', currentOccupancy: 110, maxCapacity: 200, availableSeats: 90, status: 'OPERATIONAL', specialMetric: 'Registrar & Exam Helpdesk Open', coordinates: { x: -30, y: 0, z: 20 } },
    { id: 'fac_6', name: 'Campus Central Dining & Cafeteria', category: 'CAFETERIA', currentOccupancy: 280, maxCapacity: 400, availableSeats: 120, status: 'BUSY', specialMetric: 'Lunch Rush • Estimated Wait: 4 Mins', coordinates: { x: 15, y: 0, z: 30 } },
  ],
};

// ================= API ROUTES =================

// Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { role, email, password } = req.body;
  
  // Find matching user by role or email
  let matchedUser = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!matchedUser) {
    matchedUser = db.users.find(u => u.role === (role || 'STUDENT'));
  }

  if (!matchedUser) {
    matchedUser = db.users[0]; // fallback to student
  }

  res.json({
    token: `jwt_token_${matchedUser.id}_${Date.now()}`,
    user: matchedUser,
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  // Return the default student profile or authorization-based user
  res.json(db.users[0]);
});

// Students
app.get('/api/students', (req: Request, res: Response) => {
  res.json(db.users.filter(u => u.role === 'STUDENT'));
});

app.get('/api/students/:id', (req: Request, res: Response) => {
  const user = db.users.find(u => u.id === req.params.id) || db.users[0];
  res.json(user);
});

app.post('/api/students', (req: Request, res: Response) => {
  const newStudent = {
    id: `usr_student_${Date.now()}`,
    name: req.body.name || 'New Student',
    email: req.body.email || `student.${Date.now()}@university.edu`,
    role: 'STUDENT',
    studentId: req.body.studentId || `CSE2026${Math.floor(100 + Math.random() * 900)}`,
    department: req.body.department || 'Computer Science & Engineering',
    semester: req.body.semester || 4,
    program: 'B.Tech CSE',
    cgpa: req.body.cgpa ? parseFloat(req.body.cgpa) : 8.5,
    attendancePercentage: req.body.attendancePercentage ? parseInt(req.body.attendancePercentage, 10) : 85,
    totalCredits: 24,
    earnedCredits: 24,
    bloodGroup: 'B+',
    contactNumber: '+91 99999 88888',
    advisorName: 'Prof. Elena Rostova',
    advisorEmail: 'elena.rostova@university.edu',
    academicMomentum: 80,
    admissionYear: 2024,
  };
  db.users.push(newStudent as any);
  res.json({ success: true, student: newStudent });
});

app.delete('/api/students/:id', (req: Request, res: Response) => {
  const idx = db.users.findIndex(u => u.id === req.params.id);
  if (idx !== -1) {
    db.users.splice(idx, 1);
  }
  res.json({ success: true });
});

// Faculty
app.get('/api/faculty', (req: Request, res: Response) => {
  res.json(db.users.filter(u => u.role === 'FACULTY'));
});

// Attendance
app.get('/api/attendance', (req: Request, res: Response) => {
  res.json({
    overallPercentage: 87,
    totalAttended: 146,
    totalClasses: 167,
    subjects: db.attendance,
  });
});

app.post('/api/attendance/mark', (req: Request, res: Response) => {
  const { subjectCode, studentId, status } = req.body;
  const target = db.attendance.find(a => a.subjectCode === subjectCode);
  if (target) {
    target.totalClasses += 1;
    if (status === 'PRESENT') {
      target.attendedClasses += 1;
    }
    target.percentage = Math.round((target.attendedClasses / target.totalClasses) * 100);
    target.riskStatus = target.percentage < 75 ? 'CRITICAL' : target.percentage < 82 ? 'WARNING' : 'SAFE';
  }
  res.json({ success: true, updatedAttendance: target });
});

// Marks
app.get('/api/marks', (req: Request, res: Response) => {
  res.json({
    cgpa: 9.94,
    sgpa: 9.98,
    semesterTrends: db.semesterTrends,
    subjects: db.marks,
  });
});

app.post('/api/marks/update', (req: Request, res: Response) => {
  const { subjectCode, internalMarks, midtermMarks, assignmentMarks, labMarks, endSemMarks } = req.body;
  const mark = db.marks.find(m => m.subjectCode === subjectCode);
  if (mark) {
    if (internalMarks !== undefined) mark.internalMarks = Number(internalMarks);
    if (midtermMarks !== undefined) mark.midtermMarks = Number(midtermMarks);
    if (assignmentMarks !== undefined) mark.assignmentMarks = Number(assignmentMarks);
    if (labMarks !== undefined) mark.labMarks = Number(labMarks);
    if (endSemMarks !== undefined) mark.endSemMarks = Number(endSemMarks);
    
    mark.totalMarks = (mark.internalMarks || 0) + (mark.midtermMarks || 0) + (mark.assignmentMarks || 0) + (mark.labMarks || 0) + (mark.endSemMarks || 0);
    mark.percentage = Math.round((mark.totalMarks / mark.totalMax) * 100);
    mark.gradePoint = mark.percentage >= 90 ? 10.0 : mark.percentage >= 80 ? 9.0 : 8.0;
    mark.grade = mark.percentage >= 95 ? 'O (Outstanding)' : mark.percentage >= 90 ? 'A+ (Excellent)' : 'A (Very Good)';
  }
  res.json({ success: true, updatedMark: mark });
});

// Assignments
app.get('/api/assignments', (req: Request, res: Response) => {
  res.json(db.assignments);
});

app.post('/api/assignments/:id/submit', (req: Request, res: Response) => {
  const asg: any = db.assignments.find(a => a.id === req.params.id);
  if (asg) {
    asg.status = 'SUBMITTED';
    asg.submissionDate = new Date().toISOString();
  }
  res.json({ success: true, assignment: asg });
});

app.post('/api/assignments/create', (req: Request, res: Response) => {
  const newAsg = {
    id: `asg_${Date.now()}`,
    title: req.body.title || 'New Course Assignment',
    subjectCode: req.body.subjectCode || 'CS402',
    subjectName: req.body.subjectName || 'Database Systems',
    description: req.body.description || '',
    dueDate: req.body.dueDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: req.body.priority || 'MEDIUM',
    estimatedHours: req.body.estimatedHours || 3,
    status: 'PENDING' as const,
  };
  db.assignments.unshift(newAsg);
  res.json({ success: true, assignment: newAsg });
});

// Timetable
app.get('/api/timetable', (req: Request, res: Response) => {
  res.json(db.timetable);
});

app.post('/api/timetable/add', (req: Request, res: Response) => {
  const newSlot = {
    id: `tt_${Date.now()}`,
    day: req.body.day || 'MONDAY',
    startTime: req.body.startTime || '16:00',
    endTime: req.body.endTime || '17:30',
    subjectCode: req.body.subjectCode || 'CS_EXT',
    subjectName: req.body.subjectName || 'Elective / Lab',
    facultyName: req.body.facultyName || 'Staff',
    roomNumber: req.body.roomNumber || 'Room 101',
    building: req.body.building || 'Campus Core',
    type: req.body.type || 'LECTURE',
  };
  db.timetable.push(newSlot as any);
  res.json({ success: true, slot: newSlot });
});

// Notices
app.get('/api/notices', (req: Request, res: Response) => {
  res.json(db.notices);
});

app.post('/api/notices/create', (req: Request, res: Response) => {
  const newNotice = {
    id: `not_${Date.now()}`,
    title: req.body.title || 'Campus Announcement',
    content: req.body.content || '',
    category: req.body.category || 'ACADEMIC',
    priority: req.body.priority || 'MEDIUM',
    author: req.body.author || 'Dean Office',
    date: new Date().toISOString().split('T')[0],
    read: false,
  };
  db.notices.unshift(newNotice as any);
  res.json({ success: true, notice: newNotice });
});

app.patch('/api/notices/:id/read', (req: Request, res: Response) => {
  const notice = db.notices.find(n => n.id === req.params.id);
  if (notice) {
    notice.read = true;
  }
  res.json({ success: true });
});

// Courses
app.get('/api/courses', (req: Request, res: Response) => {
  res.json(db.courses);
});

// Exams
app.get('/api/exams', (req: Request, res: Response) => {
  res.json(db.exams);
});

// Fees
app.get('/api/fees', (req: Request, res: Response) => {
  res.json(db.fees);
});

app.post('/api/fees/pay', (req: Request, res: Response) => {
  const { amount, method } = req.body;
  const payAmt = Math.min(Number(amount) || 10000, db.fees.remainingAmount);
  db.fees.paidAmount += payAmt;
  db.fees.remainingAmount -= payAmt;
  if (db.fees.remainingAmount <= 0) {
    db.fees.status = 'PAID';
  }
  const txn = {
    id: `txn_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: payAmt,
    method: method || 'Instant Payment Gateway (Card/UPI)',
    referenceNo: `REF-SP-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'SUCCESS' as const,
  };
  db.fees.transactions.unshift(txn);
  res.json({ success: true, fee: db.fees, transaction: txn });
});

// Library
app.get('/api/library', (req: Request, res: Response) => {
  res.json(db.libraryBooks);
});

app.post('/api/library/reserve', (req: Request, res: Response) => {
  const book = db.libraryBooks.find(b => b.id === req.body.bookId);
  if (book) {
    book.isReserved = true;
    if (book.availableCopies > 0) {
      book.availableCopies -= 1;
    }
  }
  res.json({ success: true, book });
});

// Achievements
app.get('/api/achievements', (req: Request, res: Response) => {
  res.json(db.achievements);
});

// Messages
app.get('/api/messages', (req: Request, res: Response) => {
  res.json(db.messages);
});

app.post('/api/messages/send', (req: Request, res: Response) => {
  const { senderId, senderName, senderRole, receiverId, receiverName, content } = req.body;
  const newMsg = {
    id: `msg_${Date.now()}`,
    senderId: senderId || 'usr_student_1',
    senderName: senderName || 'Saikat Khanra',
    senderRole: senderRole || 'STUDENT',
    receiverId: receiverId || 'usr_faculty_1',
    receiverName: receiverName || 'Prof. Elena Rostova',
    content: content || '',
    timestamp: new Date().toISOString(),
    read: false,
  };
  db.messages.push(newMsg);
  res.json({ success: true, message: newMsg });
});

// Facilities (Campus Command Center)
app.get('/api/campus/facilities', (req: Request, res: Response) => {
  res.json(db.facilities);
});

// ================= AI ACADEMIC ASSISTANT (Gemini) =================
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const academicContext = `
You are "CAMPUS AI", an intelligent, highly supportive academic mentor and digital university assistant built directly into the Student Portal System.
Student Profile:
- Name: Saikat Khanra (Student ID: CSE2026042)
- Program: B.Tech Computer Science & Engineering, Semester 4
- Current CGPA: 9.94 (Outstanding performance)
- Overall Attendance: 87% (Total: 146 / 167 classes attended)
- Attendance Breakdown:
  * CS401 Data Structures & Algorithms: 92% (Safe)
  * CS402 Database Management Systems: 88% (Safe)
  * CS403 Operating Systems: 81% (Approaching threshold 75% - Warning! Needs next 3 classes)
  * CS404 Computer Networks: 86% (Safe)
  * MA401 Discrete Mathematics: 90% (Safe)
- Pending Deadlines & Assignments:
  * CS402 Relational Schema Normalization (3NF & BCNF) - Due TOMORROW (Priority: HIGH)
  * CS403 Multithreaded Kernel Scheduling Simulation - Due in 4 days (Priority: MEDIUM)
  * MA401 Discrete Math Proofs - Due in 7 days (Priority: LOW)
- Upcoming Exams:
  * CS403 Operating Systems Midterm: Oct 12, 10:00 AM (Auditorium Hall B, Seat B-34)
  * CS402 Database Systems Internal Test: Oct 18, 02:00 PM
- Academic Momentum Score: 82 / 100 (Strong Momentum)
- Faculty Advisor: Prof. Elena Rostova

Instructions:
1. Provide concise, clear, motivating, and highly practical academic advice.
2. Formulate realistic schedule breakdowns, exam revision strategies, or answers directly referencing the student's actual grades, subjects, and deadlines.
3. Use formatted markdown with clear headers or bullet points.
4. Keep the tone professional, futuristic, and encouraging.
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${academicContext}\n\nStudent Query: ${prompt}`,
      });
      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini API execution error:', err?.message || err);
      // Fall through to smart contextual fallback
    }
  }

  // High-fidelity fallback when API key is pending or network is restricted
  const lower = (prompt || '').toLowerCase();
  let fallbackReply = '';

  if (lower.includes('study plan') || lower.includes('schedule') || lower.includes('exam')) {
    fallbackReply = `### 📅 Personalized 7-Day High-Impact Study Plan

Based on your upcoming **Operating Systems Midterm on Oct 12** and **DBMS Assignment due tomorrow**:

* **Monday (Today)**:
  * \`17:00 - 19:30\`: **DBMS Normalization** (3NF & BCNF functional dependencies) — *Submit on portal before 23:59!*
* **Tuesday**:
  * \`16:30 - 18:30\`: **Operating Systems** (Process Synchronization, Mutex, Semaphores & Deadlock)
* **Wednesday**:
  * \`17:00 - 19:00\`: **Computer Networks** (TCP Sliding Window & Go-Back-N analysis)
* **Thursday**:
  * \`16:00 - 18:00\`: **Operating Systems Lab** (Thread scheduling benchmarks)
* **Friday**:
  * \`18:00 - 20:00\`: **Discrete Mathematics** (Planar graphs & Four color theorem)
* **Saturday**:
  * \`10:00 - 13:00\`: **OS Full Midterm Mock Test** & Past Papers Review
* **Sunday**:
  * \`11:00 - 12:30\`: **Concept Polish & Cheat Sheet Synthesis**

💡 *Pro-Tip: Your attendance in Operating Systems is currently 81%. Attending Wednesday's lecture will raise your safe buffer.*`;
  } else if (lower.includes('attendance') || lower.includes('risk')) {
    fallbackReply = `### ⚠️ Attendance Risk Diagnostic

* **Overall Standing**: **87%** (146 of 167 sessions attended)
* **Subject-Level Alerts**:
  * 🔴 **Operating Systems (CS403)**: **81.2%** (Approaching the 75% institutional limit).
  * 🟢 **Data Structures (CS401)**: **92%** (Safe buffer).
  * 🟢 **Discrete Math (MA401)**: **90%** (Safe buffer).
* **Actionable Directive**:
  * Attend the next **3 consecutive OS lectures** (Mon, Wed, Fri) to restore your safety margin above 85%. Missing just 2 more classes will put you at risk of hall ticket debarment.`;
  } else if (lower.includes('dbms') || lower.includes('marks') || lower.includes('cgpa')) {
    fallbackReply = `### 📊 Academic Performance Breakdown (CGPA: 9.94)

* **Current CGPA**: **9.94 / 10.0** (Top 0.5% of Department).
* **DBMS (CS402)**:
  * Internal Score: **28 / 30**
  * Midterm: **19 / 20**
  * Assignments: **10 / 10**
  * Project Review: **Pending with Prof. Elena Rostova**
* **Target Forecast**:
  * Scoring **18+ / 20** on your end-semester paper will lock in a **10.0 SGPA** for Semester 4, keeping your cumulative standing at 9.95+.`;
  } else if (lower.includes('assignment') || lower.includes('deadline')) {
    fallbackReply = `### 🎯 Smart Priority Deadline Radar

Here are your live pending deliverables:
1. 🟥 **HIGH**: Relational Schema Normalization (*DBMS*) — **Due Tomorrow** (Est. 2.5 hrs remaining).
2. 🟧 **MEDIUM**: Kernel Scheduler Simulation (*OS*) — **Due in 4 days** (Est. 4.0 hrs).
3. 🟩 **LOW**: Planar Graph Theorems (*Math*) — **Due in 7 days** (Est. 2.0 hrs).

Recommendation: Clear the DBMS normalization proofs tonight so you can allocate the entire weekend to the OS kernel lab!`;
  } else {
    fallbackReply = `Hello Saikat! 👋 I am your Campus AI assistant.

Your current status:
* **CGPA**: 9.94 (Semester 4)
* **Academic Momentum**: 82/100 (Strong)
* **Urgent Notice**: DBMS Assignment due tomorrow, and OS Internal Exam scheduled for Oct 12.

Ask me anything such as:
1. *"Create a 7-day study plan for my exams"*
2. *"Show my attendance risk analysis"*
3. *"Prioritize my pending assignments"*
4. *"Simulate what happens to my CGPA if I score 95% in OS"*`;
  }

  res.json({ reply: fallbackReply });
});

// Setup Vite middleware for local development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Portal System running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
