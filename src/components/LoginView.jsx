import React, { useState } from 'react';
import { LogIn, Lock, CheckCircle, AlertCircle, Shield } from 'lucide-react';

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
      }, 500);
    } else {
      setError('Invalid Admin ID or password. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-600 to-violet-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Portal</h1>
            <p className="text-gray-500 text-sm">Admin access only. Enter your credentials to continue.</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">
                Admin ID
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <CheckCircle className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="adminId"
                  value={adminId}
                  onChange={(e) => { setAdminId(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Admin ID"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!adminId || !adminPassword || isLoading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${adminId && adminPassword && !isLoading
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-100'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>© K12AIDHA Attendance Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
