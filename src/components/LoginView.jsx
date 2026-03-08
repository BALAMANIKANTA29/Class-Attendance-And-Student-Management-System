import React, { useState } from 'react';
import { LogIn, Lock, CheckCircle, AlertCircle, Shield, User, KeyRound } from 'lucide-react';

export const LoginView = ({ onLogin }) => {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!adminId || !adminPassword) {
      setError('Please enter both Admin ID and password.');
      return;
    }
    if (adminId === 'k12AIDHA' && adminPassword === 'k12AIDHA') {
      setIsLoading(true);
      setError('');
      setTimeout(() => {
        onLogin('admin');
        setIsLoading(false);
      }, 800);
    } else {
      setError('Invalid credentials. Please double-check and try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen font-['Times_New_Roman',_serif] relative overflow-hidden bg-gray-50 flex items-center justify-center p-4">
      {/* Animated Background Orbs - Green Tones */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-teal-50/50 rounded-full blur-[80px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_50px_rgba(16,185,129,0.1)] p-10 space-y-8 overflow-hidden relative">
          {/* Subtle Glow inside the card */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>

          {/* Header */}
          <div className="text-center space-y-4 relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-800 tracking-tight">
                Attendance Portal
              </h1>
              <p className="text-gray-500 text-sm font-medium">Administrator Login Only</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="adminId" className="block text-xs font-bold uppercase tracking-widest text-emerald-700 ml-1">
                Admin ID
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="adminId"
                  value={adminId}
                  onChange={(e) => { setAdminId(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Your admin ID"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="adminPassword" className="block text-xs font-bold uppercase tracking-widest text-emerald-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!adminId || !adminPassword || isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group ${adminId && adminPassword && !isLoading
              ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Secure Access</span>
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-emerald-900/40 text-xs font-semibold tracking-wide uppercase">
            © K12AIDHA Student Management
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-emerald-900/10"></span>
            <div className="flex items-center gap-1.5 text-emerald-800/30 text-[10px] font-bold tracking-widest uppercase">
              <Lock className="w-3 h-3" />
              <span>Encrypted Session</span>
            </div>
            <span className="w-8 h-[1px] bg-emerald-900/10"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
