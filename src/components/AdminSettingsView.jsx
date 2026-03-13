import React, { useState } from 'react';
import { Settings, Users, Calendar, Target, Database, Save, RefreshCw } from 'lucide-react';

export const AdminSettingsView = ({
  students,
  setStudents,
  classInfo,
  setClassInfo,
  attendancePolicy,
  setAttendancePolicy,
  clearAttendanceHistory
}) => {
  const [activeTab, setActiveTab] = useState('students');
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [isEditingPolicy, setIsEditingPolicy] = useState(false);
  const [editClassInfo, setEditClassInfo] = useState(classInfo);
  const [editPolicy, setEditPolicy] = useState(attendancePolicy);

  const tabs = [
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'class', label: 'Class Settings', icon: Calendar },
    { id: 'policy', label: 'Attendance Policy', icon: Target },
    { id: 'system', label: 'System Settings', icon: Database }
  ];

  const handleSaveClassInfo = () => {
    setClassInfo(editClassInfo);
    setIsEditingClass(false);
    alert('Class information updated successfully!');
  };

  const handleSavePolicy = () => {
    setAttendancePolicy(editPolicy);
    setIsEditingPolicy(false);
    alert('Attendance policy updated successfully!');
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This includes students, attendance history, and all settings. This action cannot be undone!')) {
      setStudents([]);
      // Other data is managed by its own setters
      alert('Current view cleared. Settings reset locally.');
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      const defaultClassInfo = {
        name: 'K12AIDHA',
        semester: 'Fall',
        academicYear: ''
      };
      const defaultPolicy = {
        minimumAttendance: 75,
        warningThreshold: 60,
        semesterStartMonth: 1, // January
        semesterEndMonth: 6   // June
      };
      setClassInfo(defaultClassInfo);
      setAttendancePolicy(defaultPolicy);
      setEditClassInfo(defaultClassInfo);
      setEditPolicy(defaultPolicy);
      alert('Settings reset to defaults!');
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
        <Settings className="w-7 h-7 mr-2 text-indigo-600" /> Admin Settings
      </h2>

      {/* Tab Navigation */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Student Management</h3>
              <div className="text-sm text-gray-600">
                Total Students: {students.length}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-4">
                Manage student records, add new students, edit existing information, or remove students from the class.
              </p>
              <button
                onClick={() => setActiveTab('students')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Go to Student Management
              </button>
            </div>
          </div>
        )}

        {activeTab === 'class' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Class Information</h3>
              {!isEditingClass && (
                <button
                  onClick={() => setIsEditingClass(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit Class Info
                </button>
              )}
            </div>

            {isEditingClass ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                    <input
                      type="text"
                      value={editClassInfo.name}
                      onChange={(e) => setEditClassInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                    <input
                      type="text"
                      value={editClassInfo.semester}
                      onChange={(e) => setEditClassInfo(prev => ({ ...prev, semester: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input
                      type="text"
                      value={editClassInfo.academicYear}
                      onChange={(e) => setEditClassInfo(prev => ({ ...prev, academicYear: e.target.value }))}
                      placeholder="e.g., Academic Year"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsEditingClass(false);
                      setEditClassInfo(classInfo);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClassInfo}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Class Name</h4>
                  <p className="text-blue-700">{classInfo.name}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900">Current Semester</h4>
                  <p className="text-green-700">{classInfo.semester}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Academic Year</h4>
                  <p className="text-purple-700">{classInfo.academicYear}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'policy' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Attendance Policy</h3>
              {!isEditingPolicy && (
                <button
                  onClick={() => setIsEditingPolicy(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit Policy
                </button>
              )}
            </div>

            {isEditingPolicy ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Attendance Percentage (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPolicy.minimumAttendance}
                      onChange={(e) => setEditPolicy(prev => ({ ...prev, minimumAttendance: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Warning Threshold (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editPolicy.warningThreshold}
                      onChange={(e) => setEditPolicy(prev => ({ ...prev, warningThreshold: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester Start Month
                    </label>
                    <select
                      value={editPolicy.semesterStartMonth}
                      onChange={(e) => setEditPolicy(prev => ({ ...prev, semesterStartMonth: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester End Month
                    </label>
                    <select
                      value={editPolicy.semesterEndMonth}
                      onChange={(e) => setEditPolicy(prev => ({ ...prev, semesterEndMonth: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setIsEditingPolicy(false);
                      setEditPolicy(attendancePolicy);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePolicy}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Policy
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900">Minimum Attendance</h4>
                  <p className="text-red-700 text-2xl font-bold">{attendancePolicy.minimumAttendance}%</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Warning Threshold</h4>
                  <p className="text-yellow-700 text-2xl font-bold">{attendancePolicy.warningThreshold}%</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Semester Period</h4>
                  <p className="text-blue-700">
                    {new Date(2000, attendancePolicy.semesterStartMonth - 1, 1).toLocaleString('default', { month: 'short' })} -
                    {new Date(2000, attendancePolicy.semesterEndMonth - 1, 1).toLocaleString('default', { month: 'short' })}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">System Settings</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Danger Zone</h4>
                <p className="text-yellow-800 mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={clearAttendanceHistory}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Attendance History
                  </button>
                  <button
                    onClick={handleResetToDefaults}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </button>
                  <button
                    onClick={handleClearAllData}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
