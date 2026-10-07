import {
  User,
  StudentProfile,
  SubjectAttendance,
  SubjectMark,
  SemesterTrend,
  Assignment,
  TimetableSlot,
  Notice,
  Course,
  Exam,
  FeeRecord,
  LibraryBook,
  Achievement,
  CampusMessage,
  FacilityStatus,
  UserRole
} from '../types';

const BASE_URL = '/api';

export const api = {
  // Auth
  async login(role: UserRole, email?: string, password?: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async getCurrentUser(): Promise<StudentProfile> {
    const res = await fetch(`${BASE_URL}/auth/me`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  // Students
  async getStudents(): Promise<StudentProfile[]> {
    const res = await fetch(`${BASE_URL}/students`);
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
  },

  async createStudent(studentData: Partial<StudentProfile>): Promise<{ success: boolean; student: StudentProfile }> {
    const res = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return res.json();
  },

  async deleteStudent(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${BASE_URL}/students/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Attendance
  async getAttendance(): Promise<{
    overallPercentage: number;
    totalAttended: number;
    totalClasses: number;
    subjects: SubjectAttendance[];
  }> {
    const res = await fetch(`${BASE_URL}/attendance`);
    return res.json();
  },

  async markAttendance(subjectCode: string, studentId: string, status: 'PRESENT' | 'ABSENT'): Promise<any> {
    const res = await fetch(`${BASE_URL}/attendance/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectCode, studentId, status }),
    });
    return res.json();
  },

  // Marks
  async getMarks(): Promise<{
    cgpa: number;
    sgpa: number;
    semesterTrends: SemesterTrend[];
    subjects: SubjectMark[];
  }> {
    const res = await fetch(`${BASE_URL}/marks`);
    return res.json();
  },

  async updateMark(data: Partial<SubjectMark>): Promise<any> {
    const res = await fetch(`${BASE_URL}/marks/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    const res = await fetch(`${BASE_URL}/assignments`);
    return res.json();
  },

  async submitAssignment(id: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/assignments/${id}/submit`, { method: 'POST' });
    return res.json();
  },

  async createAssignment(data: Partial<Assignment>): Promise<any> {
    const res = await fetch(`${BASE_URL}/assignments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Timetable
  async getTimetable(): Promise<TimetableSlot[]> {
    const res = await fetch(`${BASE_URL}/timetable`);
    return res.json();
  },

  async addTimetableSlot(slot: Partial<TimetableSlot>): Promise<any> {
    const res = await fetch(`${BASE_URL}/timetable/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slot),
    });
    return res.json();
  },

  // Notices
  async getNotices(): Promise<Notice[]> {
    const res = await fetch(`${BASE_URL}/notices`);
    return res.json();
  },

  async createNotice(notice: Partial<Notice>): Promise<any> {
    const res = await fetch(`${BASE_URL}/notices/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice),
    });
    return res.json();
  },

  async markNoticeAsRead(id: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/notices/${id}/read`, { method: 'PATCH' });
    return res.json();
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    const res = await fetch(`${BASE_URL}/courses`);
    return res.json();
  },

  // Exams
  async getExams(): Promise<Exam[]> {
    const res = await fetch(`${BASE_URL}/exams`);
    return res.json();
  },

  // Fees
  async getFees(): Promise<FeeRecord> {
    const res = await fetch(`${BASE_URL}/fees`);
    return res.json();
  },

  async payFee(amount: number, method: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/fees/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, method }),
    });
    return res.json();
  },

  // Library
  async getLibraryBooks(): Promise<LibraryBook[]> {
    const res = await fetch(`${BASE_URL}/library`);
    return res.json();
  },

  async reserveBook(bookId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/library/reserve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
    return res.json();
  },

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    const res = await fetch(`${BASE_URL}/achievements`);
    return res.json();
  },

  // Messages
  async getMessages(): Promise<CampusMessage[]> {
    const res = await fetch(`${BASE_URL}/messages`);
    return res.json();
  },

  async sendMessage(msg: Partial<CampusMessage>): Promise<any> {
    const res = await fetch(`${BASE_URL}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });
    return res.json();
  },

  // Facilities
  async getFacilities(): Promise<FacilityStatus[]> {
    const res = await fetch(`${BASE_URL}/campus/facilities`);
    return res.json();
  },

  // AI Assistant
  async askCampusAi(prompt: string): Promise<{ reply: string }> {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return res.json();
  },
};
