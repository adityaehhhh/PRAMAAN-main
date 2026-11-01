import React from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Bell, ShieldCheck, Building2, UserCheck, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onSwitchRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications, unreadNotificationsCount, onSwitchRole }) => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  return (
    <header className="bg-white border-b border-slate-200">
      {/* Indian National Tricolor Thin Accent Bar */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#d97706]"></div>
        <div className="h-full w-1/3 bg-white border-y border-slate-200"></div>
        <div className="h-full w-1/3 bg-[#059669]"></div>
      </div>

      {/* Main Institutional Header Strip */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Left: AICTE Institutional Identity & Emblem */}
        <div className="flex items-center space-x-3.5 min-w-0">
          {/* National Emblem Logo */}
          <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-500/80 p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
            <img
              src="/india.webp"
              alt="Government of India Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              {language === 'hi' ? 'अखिल भारतीय तकनीकी शिक्षा परिषद' : 'All India Council for Technical Education'}
            </div>
            <h1 className="text-xl font-extrabold text-[#0b2545] tracking-tight leading-tight">
              {language === 'hi'
                ? 'प्रमाण – शैक्षणिक निगरानी एवं प्रमाणीकरण मंच'
                : 'PRAMAAN'}
            </h1>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
              {language === 'hi'
                ? 'विश्वसनीय शैक्षणिक निगरानी, प्रमाणीकरण और प्रवेश नेटवर्क का मंच'
                : 'Platform for Reliable Academic Monitoring, Authentication & Admissions Network'}
            </div>
            <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
              <span>{language === 'hi' ? 'केंद्रीय विनियामक निगरानी पोर्टल' : 'Central Regulatory Governance Portal'}</span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-600">AY 2026–27</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Prototype Demo Role Switcher & User Profile */}
        <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto flex-shrink-0">
          {/* Quick Demo Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-md border border-slate-300 text-xs">
            <span className="text-slate-500 font-semibold px-2">Demo Role:</span>
            <button
              onClick={() => onSwitchRole('AICTE_ADMIN')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition ${
                user?.role === 'AICTE_ADMIN'
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AICTE Official</span>
            </button>

            <button
              onClick={() => onSwitchRole('INSTITUTION')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition ${
                user?.role === 'INSTITUTION'
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>BPIT Delhi</span>
            </button>

            <button
              onClick={() => onSwitchRole('VERIFIER')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition ${
                user?.role === 'VERIFIER'
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verifier (TCS)</span>
            </button>
          </div>

          {/* User Profile Info & Action Bar */}
          <div className="flex items-center space-x-3 text-xs text-slate-600">
            {user && (
              <div className="text-right">
                <span className="font-semibold text-slate-800">{user.full_name}</span>
                <span className="text-slate-500 ml-1.5">
                  ({user.role === 'AICTE_ADMIN' ? 'AICTE Central HQ' : user.institution_name || user.role})
                </span>
              </div>
            )}

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Official Prototype Disclaimer Strip */}
      <div className="bg-amber-50 border-t border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-bold bg-amber-600 text-white px-1.5 py-0.2 rounded text-[11px] flex-shrink-0">DEMO</span>
            <span className="leading-relaxed">
              <strong>Smart India Hackathon (SIH26263) • Team Brain--Byte (Lead: Vanshika Grover):</strong> Official regulatory demonstration environment. All institutional, student and APAAR records are synthetic test cases.
            </span>
          </div>
          <span className="font-semibold text-amber-800 hidden sm:inline flex-shrink-0 whitespace-nowrap">
            Status: Central Validation Active
          </span>
        </div>
      </div>
    </header>
  );
};
