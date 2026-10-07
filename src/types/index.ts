export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  studentId?: string;
  employeeId?: string;
  department?: string;
  semester?: number;
  program?: string;
}

export interface StudentProfile extends User {
  cgpa: number;
  attendancePercentage: number;
  totalCredits: number;
  earnedCredits: number;
  bloodGroup: string;
  contactNumber: string;
  advisorName: string;
  advisorEmail: string;
  academicMomentum: number;
  admissionYear: number;
}

export interface SubjectAttendance {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  threshold: number;
  riskStatus: 'SAFE' | 'WARNING' | 'CRITICAL';
  recommendedAction?: string;
}

export interface SubjectMark {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  internalMax: number;
  midtermMarks: number;
  midtermMax: number;
  assignmentMarks: number;
  assignmentMax: number;
  labMarks?: number;
  labMax?: number;
  endSemMarks: number;
  endSemMax: number;
  totalMarks: number;
  totalMax: number;
  percentage: number;
  grade: string;
  gradePoint: number;
}

export interface SemesterTrend {
  semester: string;
  sgpa: number;
  cgpa: number;
  credits: number;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  description: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedHours: number;
  status: 'PENDING' | 'DUE_SOON' | 'SUBMITTED' | 'GRADED';
  grade?: string;
  submissionDate?: string;
  feedback?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  building: string;
  type: 'LECTURE' | 'LAB' | 'TUTORIAL';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'ACADEMIC' | 'EXAMINATION' | 'EVENTS' | 'PLACEMENT' | 'GENERAL' | 'EMERGENCY';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  author: string;
  date: string;
  read: boolean;
  department?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  facultyName: string;
  facultyEmail: string;
  syllabus: string[];
  schedule: string;
  enrolledStudentsCount: number;
  resources: { name: string; type: string; size: string; url: string }[];
}

export interface Exam {
  id: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  time: string;
  durationMinutes: number;
  roomNumber: string;
  seatNumber: string;
  building: string;
  examType: 'MIDTERM' | 'END_SEM' | 'INTERNAL' | 'LAB_PRACTICAL';
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
}

export interface FeeRecord {
  id: string;
  academicYear: string;
  semester: number;
  totalFee: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'PENDING';
  transactions: {
    id: string;
    date: string;
    amount: number;
    method: string;
    referenceNo: string;
    status: 'SUCCESS' | 'PENDING';
  }[];
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  isBorrowedByStudent?: boolean;
  dueDate?: string;
  isReserved?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'HACKATHON' | 'ACADEMIC' | 'CODING' | 'ATTENDANCE' | 'PROJECT' | 'LEADERSHIP';
  icon: string;
  unlockedAt: string;
  xpPoints: number;
  badgeLevel: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
}

export interface CampusMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface FacilityStatus {
  id: string;
  name: string;
  category: 'ACADEMIC' | 'LIBRARY' | 'LAB' | 'SPORTS' | 'ADMIN' | 'RESIDENCE' | 'CAFETERIA';
  currentOccupancy: number;
  maxCapacity: number;
  availableSeats: number;
  status: 'OPERATIONAL' | 'BUSY' | 'MAINTENANCE';
  specialMetric?: string;
  coordinates: { x: number; y: number; z: number };
}
