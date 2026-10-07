import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { StudentInnovationPage } from './pages/student/StudentInnovationPage';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { StudentMarksPage } from './pages/student/StudentMarksPage';
import { StudentTimetablePage } from './pages/student/StudentTimetablePage';
import { StudentAssignmentsPage } from './pages/student/StudentAssignmentsPage';
import { StudentNoticesPage } from './pages/student/StudentNoticesPage';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentExamsPage } from './pages/student/StudentExamsPage';
import { StudentFeesPage } from './pages/student/StudentFeesPage';
import { StudentLibraryPage } from './pages/student/StudentLibraryPage';
import { StudentAchievementsPage } from './pages/student/StudentAchievementsPage';
import { StudentAnalyticsPage } from './pages/student/StudentAnalyticsPage';
import { StudentAiPage } from './pages/student/StudentAiPage';
import { StudentCampusPage } from './pages/student/StudentCampusPage';
import { StudentMessagesPage } from './pages/student/StudentMessagesPage';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyStudentsPage } from './pages/faculty/FacultyStudentsPage';
import { FacultyAttendancePage } from './pages/faculty/FacultyAttendancePage';
import { FacultyMarksPage } from './pages/faculty/FacultyMarksPage';
import { FacultyAssignmentsPage } from './pages/faculty/FacultyAssignmentsPage';
import { FacultyNoticesPage } from './pages/faculty/FacultyNoticesPage';
import { FacultyAnalyticsPage } from './pages/faculty/FacultyAnalyticsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCommandCenterPage } from './pages/admin/AdminCommandCenterPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminFacultyPage } from './pages/admin/AdminFacultyPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const AppContent: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/' ? window.location.pathname : '/';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync browser url
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);

    // Global keyboard shortcut Ctrl+K / Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Role Protection check
  useEffect(() => {
    if (currentPath.startsWith('/faculty') && role !== 'FACULTY') {
      switchRole('FACULTY');
    } else if (currentPath.startsWith('/admin') && role !== 'ADMIN') {
      switchRole('ADMIN');
    } else if (currentPath.startsWith('/student') && role !== 'STUDENT') {
      switchRole('STUDENT');
    }
  }, [currentPath]);

  const isLanding = currentPath === '/';
  const isLogin = currentPath === '/login';

  const renderActivePage = () => {
    switch (currentPath) {
      // Student
      case '/student':
        return <StudentDashboard onNavigate={navigate} />;
      case '/student/profile':
        return <StudentProfilePage onNavigate={navigate} />;
      case '/student/attendance':
        return <StudentAttendancePage />;
      case '/student/marks':
        return <StudentMarksPage />;
      case '/student/timetable':
        return <StudentTimetablePage />;
      case '/student/assignments':
        return <StudentAssignmentsPage />;
      case '/student/notices':
        return <StudentNoticesPage />;
      case '/student/courses':
        return <StudentCoursesPage />;
      case '/student/exams':
        return <StudentExamsPage />;
      case '/student/fees':
        return <StudentFeesPage />;
      case '/student/library':
        return <StudentLibraryPage />;
      case '/student/achievements':
        return <StudentAchievementsPage />;
      case '/student/analytics':
        return <StudentAnalyticsPage />;
      case '/student/ai':
        return <StudentAiPage />;
      case '/student/innovation':
        return <StudentInnovationPage />;
      case '/student/campus':
        return <StudentCampusPage />;
      case '/student/messages':
        return <StudentMessagesPage />;

      // Faculty
      case '/faculty':
        return <FacultyDashboard onNavigate={navigate} />;
      case '/faculty/students':
        return <FacultyStudentsPage />;
      case '/faculty/attendance':
        return <FacultyAttendancePage />;
      case '/faculty/marks':
        return <FacultyMarksPage />;
      case '/faculty/assignments':
        return <FacultyAssignmentsPage />;
      case '/faculty/notices':
        return <FacultyNoticesPage />;
      case '/faculty/analytics':
        return <FacultyAnalyticsPage />;
      case '/faculty/messages':
        return <StudentMessagesPage />;

      // Admin
      case '/admin':
        return <AdminDashboard onNavigate={navigate} />;
      case '/admin/command':
        return <AdminCommandCenterPage />;
      case '/admin/students':
        return <AdminStudentsPage />;
      case '/admin/faculty':
        return <AdminFacultyPage />;
      case '/admin/courses':
        return <AdminCoursesPage />;
      case '/admin/notices':
        return <StudentNoticesPage />;
      case '/admin/users':
        return <AdminUsersPage />;
      case '/admin/analytics':
        return <AdminAnalyticsPage />;
      case '/admin/settings':
        return <AdminSettingsPage />;

      default:
        // Default to student dashboard or landing page
        if (currentPath.startsWith('/student')) return <StudentDashboard onNavigate={navigate} />;
        if (currentPath.startsWith('/faculty')) return <FacultyDashboard onNavigate={navigate} />;
        if (currentPath.startsWith('/admin')) return <AdminDashboard onNavigate={navigate} />;
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onNavigate={navigate}
        unreadCount={3}
      />

      {isLanding ? (
        <LandingPage onNavigate={navigate} />
      ) : isLogin || currentPath.startsWith('/login') ? (
        <LoginPage onNavigate={navigate} />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Role-Specific Sidebar */}
          <Sidebar
            currentPath={currentPath}
            onNavigate={navigate}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full transition-all">
            {renderActivePage()}
          </main>
        </div>
      )}

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* Slideout Notification Center */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
