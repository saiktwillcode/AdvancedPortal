import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, StudentProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isLoading: boolean;
  login: (role: UserRole, email?: string, password?: string) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Preset demo users
const DEMO_ACCOUNTS: Record<UserRole, User> = {
  STUDENT: {
    id: 'usr_student_1',
    name: 'Saikat Khanra',
    email: 'saikat.cse26@university.edu',
    role: 'STUDENT',
    studentId: 'CSE2026042',
    department: 'Computer Science & Engineering',
    semester: 4,
    program: 'B.Tech Computer Science & Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  FACULTY: {
    id: 'usr_faculty_1',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@university.edu',
    role: 'FACULTY',
    employeeId: 'FAC8812',
    department: 'Computer Science & Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  },
  ADMIN: {
    id: 'usr_admin_1',
    name: 'Dean Marcus Vance',
    email: 'admin.vance@university.edu',
    role: 'ADMIN',
    employeeId: 'ADM001',
    department: 'Office of Academic Affairs',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sps_user');
    return saved ? JSON.parse(saved) : DEMO_ACCOUNTS.STUDENT;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('sps_token') || 'demo_token_active';
  });
  const [isLoading, setIsLoading] = useState(false);

  const role: UserRole = user?.role || 'STUDENT';

  useEffect(() => {
    if (user) {
      localStorage.setItem('sps_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sps_user');
    }
  }, [user]);

  const login = async (selectedRole: UserRole, email?: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(selectedRole, email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('sps_token', res.token);
    } catch {
      // Fallback to local demo profile
      const demoUser = DEMO_ACCOUNTS[selectedRole];
      setUser(demoUser);
      setToken(`demo_token_${selectedRole}`);
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = async (newRole: UserRole) => {
    await login(newRole);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sps_user');
    localStorage.removeItem('sps_token');
  };

  return (
    <AuthContext.Provider value={{ user, role, token, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
