-- ========================================================
-- STUDENT PORTAL SYSTEM: DATABASE SCHEMA
-- Target Database: MySQL 8.0+
-- Encoding: UTF8MB4
-- Engine: InnoDB
-- ========================================================

DROP DATABASE IF EXISTS student_portal_db;
CREATE DATABASE student_portal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_portal_db;

-- 1. Users Table
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    avatar_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- 2. Departments Table
CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Faculty Table
CREATE TABLE faculty (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    department_id VARCHAR(50) NOT NULL,
    designation VARCHAR(80) NOT NULL,
    cabin_number VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Students Table
CREATE TABLE students (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    department_id VARCHAR(50) NOT NULL,
    program VARCHAR(100) NOT NULL,
    semester INT NOT NULL DEFAULT 1,
    admission_year INT NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    attendance_pct DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    total_credits INT NOT NULL DEFAULT 0,
    earned_credits INT NOT NULL DEFAULT 0,
    blood_group VARCHAR(10),
    contact_number VARCHAR(25),
    advisor_faculty_id VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    FOREIGN KEY (advisor_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL,
    INDEX idx_student_id (student_id)
) ENGINE=InnoDB;

-- 5. Courses Table
CREATE TABLE courses (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    department_id VARCHAR(50) NOT NULL,
    credits INT NOT NULL DEFAULT 4,
    semester INT NOT NULL DEFAULT 1,
    schedule VARCHAR(100),
    faculty_id VARCHAR(50),
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. Course Enrollments
CREATE TABLE enrollments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ENROLLED', 'DROPPED', 'COMPLETED') DEFAULT 'ENROLLED',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uk_student_course (student_id, course_id)
) ENGINE=InnoDB;

-- 7. Attendance Records
CREATE TABLE attendance (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    session_date DATE NOT NULL,
    status ENUM('PRESENT', 'ABSENT', 'LATE', 'EXCUSED') NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_att_date (session_date)
) ENGINE=InnoDB;

-- 8. Marks & Grades Table
CREATE TABLE marks (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    internal_marks DECIMAL(5,2) DEFAULT 0.00,
    internal_max DECIMAL(5,2) DEFAULT 30.00,
    midterm_marks DECIMAL(5,2) DEFAULT 0.00,
    midterm_max DECIMAL(5,2) DEFAULT 20.00,
    assignment_marks DECIMAL(5,2) DEFAULT 0.00,
    assignment_max DECIMAL(5,2) DEFAULT 10.00,
    lab_marks DECIMAL(5,2) DEFAULT 0.00,
    lab_max DECIMAL(5,2) DEFAULT 20.00,
    end_sem_marks DECIMAL(5,2) DEFAULT 0.00,
    end_sem_max DECIMAL(5,2) DEFAULT 20.00,
    total_marks DECIMAL(5,2) DEFAULT 0.00,
    total_max DECIMAL(5,2) DEFAULT 100.00,
    grade VARCHAR(20) DEFAULT 'P',
    grade_point DECIMAL(3,1) DEFAULT 0.0,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uk_student_mark (student_id, course_id)
) ENGINE=InnoDB;

-- 9. Assignments Table
CREATE TABLE assignments (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATETIME NOT NULL,
    priority ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'MEDIUM',
    estimated_hours DECIMAL(4,1) DEFAULT 3.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. Submissions Table
CREATE TABLE submissions (
    id VARCHAR(50) PRIMARY KEY,
    assignment_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_url VARCHAR(255),
    grade VARCHAR(20),
    feedback TEXT,
    status ENUM('SUBMITTED', 'GRADED', 'REJECTED') DEFAULT 'SUBMITTED',
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY uk_asg_student (assignment_id, student_id)
) ENGINE=InnoDB;

-- 11. Timetable Slots
CREATE TABLE timetable (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    day_of_week ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50) NOT NULL,
    building VARCHAR(100) NOT NULL,
    session_type ENUM('LECTURE', 'LAB', 'TUTORIAL') NOT NULL DEFAULT 'LECTURE',
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 12. Notices Table
CREATE TABLE notices (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('ACADEMIC', 'EXAMINATION', 'EVENTS', 'PLACEMENT', 'GENERAL', 'EMERGENCY') NOT NULL DEFAULT 'GENERAL',
    priority ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'MEDIUM',
    author_id VARCHAR(50) NOT NULL,
    published_date DATE NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 13. Fees & Transactions
CREATE TABLE fee_records (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester INT NOT NULL,
    total_fee DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    remaining_amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('PAID', 'PARTIAL', 'PENDING') DEFAULT 'PENDING',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE fee_transactions (
    id VARCHAR(50) PRIMARY KEY,
    fee_record_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(80) NOT NULL,
    reference_no VARCHAR(100) NOT NULL UNIQUE,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'SUCCESS',
    FOREIGN KEY (fee_record_id) REFERENCES fee_records(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 14. Library System
CREATE TABLE library_books (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    total_copies INT NOT NULL DEFAULT 1,
    available_copies INT NOT NULL DEFAULT 1,
    shelf_location VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE library_transactions (
    id VARCHAR(50) PRIMARY KEY,
    book_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status ENUM('BORROWED', 'RETURNED', 'OVERDUE') DEFAULT 'BORROWED',
    FOREIGN KEY (book_id) REFERENCES library_books(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 15. Messages Table (Student-Faculty Communication)
CREATE TABLE messages (
    id VARCHAR(50) PRIMARY KEY,
    sender_id VARCHAR(50) NOT NULL,
    receiver_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_msg_pair (sender_id, receiver_id)
) ENGINE=InnoDB;

-- ================= SEED DEMO DATA =================

INSERT INTO departments VALUES ('dept_cse', 'CSE', 'Computer Science & Engineering', 'Dr. Alan Turing', NOW());

INSERT INTO users (id, name, email, password_hash, role, avatar_url) VALUES 
('usr_student_1', 'Saikat Khanra', 'saikat.cse26@university.edu', '$2a$10$7sWfC8b4VjN/W5u68xG.OODZ7vF6Y6P9uT0P8qF1d0A7.jF2B3B.m', 'STUDENT', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'),
('usr_faculty_1', 'Prof. Elena Rostova', 'elena.rostova@university.edu', '$2a$10$7sWfC8b4VjN/W5u68xG.OODZ7vF6Y6P9uT0P8qF1d0A7.jF2B3B.m', 'FACULTY', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'),
('usr_admin_1', 'Dean Marcus Vance', 'admin.vance@university.edu', '$2a$10$7sWfC8b4VjN/W5u68xG.OODZ7vF6Y6P9uT0P8qF1d0A7.jF2B3B.m', 'ADMIN', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250');

INSERT INTO faculty (id, user_id, employee_id, department_id, designation, cabin_number) VALUES
('fac_1', 'usr_faculty_1', 'FAC8812', 'dept_cse', 'Associate Professor', 'Cabin 304');

INSERT INTO students (id, user_id, student_id, department_id, program, semester, admission_year, cgpa, attendance_pct, total_credits, earned_credits, blood_group, contact_number, advisor_faculty_id) VALUES
('std_1', 'usr_student_1', 'CSE2026042', 'dept_cse', 'B.Tech Computer Science & Engineering', 4, 2024, 9.94, 87.40, 24, 24, 'O+', '+91 98765 43210', 'fac_1');
