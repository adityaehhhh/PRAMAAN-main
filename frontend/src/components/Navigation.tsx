import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  Upload,
  AlertOctagon,
  Copy,
  BarChart3,
  CheckCircle2,
  PieChart,
  History,
  MapPin
} from 'lucide-react';

interface NavigationProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onRouteChange }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const isAicte = user?.role === 'AICTE_ADMIN';
  const isInst = user?.role === 'INSTITUTION';
  const isVerifier = user?.role === 'VERIFIER';

  const navItems = [
    {
      key: 'nav_dashboard',
      id: isAicte ? '/aicte/dashboard' : '/institution/dashboard',
      label: t('nav_dashboard'),
      icon: LayoutDashboard,
      visible: !isVerifier // Verifier has their own Verification portal; no redundant dashboard
    },
    {
      key: 'nav_geo',
      id: '/geo-colleges',
      label: 'GIS Locator',
      icon: MapPin,
      visible: true
    },
    {
      key: 'nav_institutions',
      id: '/institutions',
      label: t('nav_institutions'),
      icon: Building2,
      visible: isAicte
    },
    {
      key: 'nav_upload',
      id: '/institution/upload',
      label: 'Upload',
      icon: Upload,
      visible: isInst || isAicte
    },
    {
      key: 'nav_students',
      id: '/students',
      label: 'Registry',
      icon: Users,
      visible: !isVerifier
    },
    {
      key: 'nav_validation',
      id: '/validation',
      label: 'Validation',
      icon: AlertOctagon,
      visible: !isVerifier
    },
    {
      key: 'nav_duplicates',
      id: '/duplicates',
      label: 'Duplicates',
      icon: Copy,
      visible: isAicte || isInst
    },
    {
      key: 'nav_intake',
      id: '/intake-compliance',
      label: 'Intake',
      icon: BarChart3,
      visible: isAicte || isInst
    },
    {
      key: 'nav_verification',
      id: '/verification',
      label: 'Verification',
      icon: CheckCircle2,
      visible: true
    },
    {
      key: 'nav_analytics',
      id: '/analytics',
      label: 'Analytics',
      icon: PieChart,
      visible: isAicte || isInst
    },
    {
      key: 'nav_audit',
      id: '/audit',
      label: 'Audit Trail',
      icon: History,
      visible: !isVerifier
    }
  ];

  return (
    <nav className="bg-[#0b2545] text-white shadow-md border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center overflow-x-auto scroll-smooth py-0.5">
        <div className="flex items-center space-x-1 sm:space-x-1.5 min-w-max pr-6">
          {navItems
            .filter((item) => item.visible)
            .map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.id ||
                (item.id.includes('dashboard') && currentRoute.includes('dashboard')) ||
                (item.id === '/students' && currentRoute.startsWith('/students/')) ||
                (item.id === '/institutions' && currentRoute.startsWith('/institutions/'));

              return (
                <button
                  key={item.key}
                  onClick={() => onRouteChange(item.id)}
                  className={`flex items-center space-x-1.5 py-2.5 px-2.5 sm:px-3 text-xs font-semibold whitespace-nowrap rounded-t-sm border-b-2 transition-all ${
                    isActive
                      ? 'border-amber-400 bg-[#133863] text-white shadow-xs'
                      : 'border-transparent text-slate-200 hover:text-white hover:bg-[#133863]/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-blue-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>
      </div>
    </nav>
  );
};
