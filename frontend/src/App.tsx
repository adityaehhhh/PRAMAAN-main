import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth, UserRole } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { TopGovStrip } from './components/TopGovStrip';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { NotificationModal } from './components/NotificationModal';

// Pages
import { LoginPage } from './pages/LoginPage';
import { AicteDashboardPage } from './pages/AicteDashboardPage';
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { StudentUploadPage } from './pages/StudentUploadPage';
import { StudentRegistryPage } from './pages/StudentRegistryPage';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { ValidationCentrePage } from './pages/ValidationCentrePage';
import { DuplicateDetectionPage } from './pages/DuplicateDetectionPage';
import { IntakeCompliancePage } from './pages/IntakeCompliancePage';
import { InstitutionsListPage } from './pages/InstitutionsListPage';
import { InstitutionProfilePage } from './pages/InstitutionProfilePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { VerificationPortalPage } from './pages/VerificationPortalPage';
import { StateCollegeLocator } from './components/StateCollegeLocator';
import { apiClient } from './api/client';

/** Returns the default route for a given role */
function defaultRouteForRole(role: UserRole): string {
  if (role === 'AICTE_ADMIN') return '/aicte/dashboard';
  if (role === 'INSTITUTION') return '/institution/dashboard';
  if (role === 'VERIFIER') return '/verification';
  return '/aicte/dashboard';
}

const MainApp: React.FC = () => {
  const { user, switchRole } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string>(() =>
    user ? defaultRouteForRole(user.role) : '/login'
  );
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<number | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Load notifications only when route changes (not on role change to avoid double-fetch)
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await apiClient.getNotifications(user?.role);
        setNotifications(res.notifications || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) {
      fetchNotifs();
    }
  }, [currentRoute]);

  /** Role switch + route change happen atomically in one event — no stacking */
  const handleSwitchRole = (role: UserRole) => {
    switchRole(role);
    setCurrentRoute(defaultRouteForRole(role));
    setSelectedStudentId(null);
    setSelectedInstitutionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (route: string) => {
    // Parse institution ID from route like /institutions/3
    const instMatch = route.match(/^\/institutions\/(\d+)$/);
    if (instMatch) {
      setSelectedInstitutionId(parseInt(instMatch[1], 10));
    } else {
      setSelectedInstitutionId(null);
    }
    // Parse student ID from route like /students/5
    const stuMatch = route.match(/^\/students\/(\d+)$/);
    if (stuMatch) {
      setSelectedStudentId(parseInt(stuMatch[1], 10));
    } else {
      setSelectedStudentId(null);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStudent = (id: number) => {
    setSelectedStudentId(id);
    setCurrentRoute(`/students/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInstitution = (id: number) => {
    setSelectedInstitutionId(id);
    setCurrentRoute(`/institutions/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user || currentRoute === '/login') {
    return (
      <div className="min-h-screen flex flex-col bg-[#f4f6f9]">
        <TopGovStrip />
        <Header onOpenNotifications={() => {}} unreadNotificationsCount={0} onSwitchRole={handleSwitchRole} />
        <main id="main-content" className="flex-1">
          <LoginPage
            onLoginSuccess={(role?: UserRole) => {
              const targetRole = role || user?.role || 'AICTE_ADMIN';
              setCurrentRoute(defaultRouteForRole(targetRole));
            }}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Determine the single active page — only ONE renders at a time
  const renderPage = () => {
    if (currentRoute === '/aicte/dashboard') return <AicteDashboardPage onNavigate={handleNavigate} />;
    if (currentRoute === '/institution/dashboard') return <InstitutionDashboardPage onNavigate={handleNavigate} />;
    if (currentRoute === '/geo-colleges') return <StateCollegeLocator onNavigateToInstitution={handleSelectInstitution} />;
    if (currentRoute === '/institution/upload') return <StudentUploadPage onNavigate={handleNavigate} />;
    if (currentRoute === '/students') return <StudentRegistryPage onSelectStudent={handleSelectStudent} />;
    if (currentRoute.startsWith('/students/') && selectedStudentId) {
      return <StudentDetailPage studentId={selectedStudentId} onBack={() => handleNavigate('/students')} />;
    }
    if (currentRoute === '/institutions') return <InstitutionsListPage onSelectInstitution={handleSelectInstitution} />;
    if (currentRoute.startsWith('/institutions/') && selectedInstitutionId) {
      return <InstitutionProfilePage institutionId={selectedInstitutionId} onBack={() => handleNavigate('/institutions')} />;
    }
    if (currentRoute === '/validation') return <ValidationCentrePage />;
    if (currentRoute === '/duplicates') return <DuplicateDetectionPage />;
    if (currentRoute === '/intake-compliance') return <IntakeCompliancePage />;
    if (currentRoute === '/verification') return <VerificationPortalPage />;
    if (currentRoute === '/analytics') return <AnalyticsPage />;
    if (currentRoute === '/audit') return <AuditTrailPage />;
    // Fallback to role default
    return <AicteDashboardPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9]">
      <TopGovStrip />
      <Header
        onOpenNotifications={() => setIsNotifOpen(true)}
        unreadNotificationsCount={notifications.filter((n) => !n.is_read).length}
        onSwitchRole={handleSwitchRole}
      />
      <Navigation currentRoute={currentRoute} onRouteChange={handleNavigate} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Breadcrumb strip */}
        <div className="mb-4 text-xs text-slate-500 font-medium flex items-center space-x-1.5">
          <span className="text-slate-400">Home</span>
          <span>/</span>
          <span className="text-slate-700 capitalize font-semibold">
            {currentRoute.replace(/^\//, '').replace(/-/g, ' ') || 'Dashboard'}
          </span>
        </div>

        {/* Only ONE page renders at any given time */}
        {renderPage()}
      </main>

      <Footer />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
