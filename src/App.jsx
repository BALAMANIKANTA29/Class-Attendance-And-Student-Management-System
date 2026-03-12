import React, { useState } from 'react';
import { Calendar, UserCheck, LogOut, Menu, X, CheckCircle, Users, Settings, BookOpen, BarChart2, PhoneCall, Info } from 'lucide-react';

import { DailyMarkingView } from './components/DailyMarkingView';
import { PrintReportView } from './components/PrintReportView';
import { DailyAttendanceLogView } from './components/DailyAttendanceLogView';
import { ClassMembersView } from './components/ClassMembersView';
import { AdminSettingsView } from './components/AdminSettingsView';
import { LoginView } from './components/LoginView';
import { BacklogsView } from './components/BacklogsView';
import { SubjectWiseView } from './components/SubjectWiseView';
import { ParentDetailsView } from './components/ParentDetailsView';
import { StudentInfoView } from './components/StudentInfoView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { studentInfoData as defaultStudentInfoData } from './data/studentInfoData';

const mockClassStudents = [
  { id: '23B21A4517', name: 'MANCHALA JYOTSNA', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A4518', name: 'VELAMA SYAMALA', backlogCount: 3, s11: '', s12: 'DE&VC', s21: '', s22: 'SMDS', s31: '' },
  { id: '23B21A4519', name: 'NALLE TRINAINI VIJAYA LEELA', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A4520', name: 'MAMILLAPALLI MONIKA', backlogCount: 4, s11: '', s12: '', s21: '', s22: '', s31: 'CN,IOT,AI,COA' },
  { id: '23B21A4521', name: 'JAGGAMSETTI JAHNAVI DEVI', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A4522', name: 'GADDAM MANASA PRIYA', backlogCount: 5, s11: 'LAC,PHY,EG', s12: 'DE&VC', s21: 'DMGT', s22: '', s31: '' },
  { id: '23B21A4523', name: 'SADI NAVYA SRI', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A4524', name: 'KUTCHU SHIVA MANI', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A4525', name: 'DASARI RAMYA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A4526', name: 'GALLA DURGA BHAVANI', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A4527', name: 'CHITTIBOYINA PUJITHA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A4530', name: 'GUTTULA DEVI SRI', backlogCount: 8, s11: 'LAC,PHY,EG', s12: 'DE&VC', s21: 'DMGT,JAVA', s22: 'SMDS', s31: 'COA' },
  { id: '23B21A4531', name: 'MODI PRANATHI SRI', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A0', name: 'NOMULA TEJA', backlogCount: 2, s11: 'PHY,EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A2', name: 'KRISHTIPATI RAMANA REDDY', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A3', name: 'BALLA PURNA KUMAR', backlogCount: 2, s11: '', s12: 'DE&VC', s21: 'JAVA', s22: '', s31: '' },
  { id: '23B21A45A4', name: 'MAGANTI PRASAD', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A5', name: 'NUNNA KARTHIK', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A6', name: 'MANDADI NAGARATNAKAR', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A7', name: 'KALLEPALLI CHANDRASEKHAR', backlogCount: 4, s11: 'PHY,BEEE', s12: 'DE&VC', s21: 'JAVA', s22: '', s31: '' },
  { id: '23B21A45A8', name: 'TUMPALA JAGAN', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45A9', name: 'BODDUPALLI PRASANTH', backlogCount: 4, s11: 'EG', s12: 'DE&VC,CHE', s21: '', s22: 'SMDS', s31: '' },
  { id: '23B21A45B0', name: 'TAMARANA PAVAN KUMAR', backlogCount: 13, s11: 'LAC,EG', s12: 'DE&VC,BCME,CHE', s21: 'DMGT,ADS,JAVA,DBMS', s22: 'OS,SE,OT', s31: 'CN' },
  { id: '23B21A45B2', name: 'PAILA PRADEEP', backlogCount: 4, s11: 'EG', s12: 'DE&VC', s21: 'JAVA', s22: 'SMDS', s31: '' },
  { id: '23B21A45B3', name: 'TALAVALASA SAI KUMAR', backlogCount: 5, s11: '', s12: 'DE&VC,CHE', s21: 'JAVA', s22: 'OS,SMDS', s31: '' },
  { id: '23B21A45B4', name: 'VANAMA AKHIL', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A45B5', name: 'KOLUSU AVINASH', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45B6', name: 'PERAM JAYA PRAKASH', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45B7', name: 'NIMMAGADDA GIRISH', backlogCount: 3, s11: 'EG', s12: 'DE&VC', s21: '', s22: 'SMDS', s31: '' },
  { id: '23B21A45B8', name: 'BANKA MADHU', backlogCount: 3, s11: 'EG', s12: 'CHE', s21: 'JAVA', s22: '', s31: '' },
  { id: '23B21A45B9', name: 'NAGABATHULA SYAMKUMAR', backlogCount: 11, s11: 'LAC,IP,PHY,BEEE,EG', s12: 'DE&VC', s21: 'ADS,JAVA', s22: 'OT,SE', s31: 'CN' },
  { id: '23B21A45C0', name: 'SUDAGANI SAI PHANINDRA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },

  { id: '23B21A45C3', name: 'BAMMIDI WILLIAM CAREY', backlogCount: 6, s11: 'PHY', s12: 'DE&VC', s21: 'DMGT,JAVA', s22: 'SE,SMDS', s31: '' },

  { id: '23B21A45C5', name: 'KUNDETI YASWANTH SINHA', backlogCount: 3, s11: 'LAC,EG', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A45C6', name: 'NERSU NAGA VAMSI KRISHNA', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A45C7', name: 'GHANTASALA SAIRAJGOPAL', backlogCount: 5, s11: 'LAC,PHY,EG', s12: 'CHE', s21: 'SMDS', s22: '', s31: '' },
  { id: '23B21A45C8', name: 'KONAKALLA DILEEP KUMAR', backlogCount: 4, s11: 'EG', s12: 'DE&VC', s21: 'ADS,JAVA', s22: '', s31: '' },
  { id: '23B21A45C9', name: 'NARADALA BALA MANIKANTA', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },

  { id: '23B21A45D1', name: 'BOJANKI JASWANTH KUMAR', backlogCount: 10, s11: 'LAC,PHY,EG', s12: 'DE&VC,CHE', s21: 'DMGT,JAVA', s22: '', s31: 'EDVC' },
  { id: '23B21A45D2', name: 'PALUGULLA SWAMI RANGA REDDY', backlogCount: 1, s11: '', s12: 'DE&VC', s21: '', s22: '', s31: '' },
  { id: '23B21A45D3', name: 'REDDYBOINA VENKATA HIMACHANDRA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45D4', name: 'GOGADA SHANMUKA ESWARA RAO', backlogCount: 5, s11: 'LAC,EG', s12: 'DE&VC,CHE', s21: '', s22: 'SMDS', s31: '' },
  { id: '23B21A45D6', name: 'ANDHE AAKASH', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '23B21A45D7', name: 'CHAKIRI KRISHNA SAI DURGA PAVAN KUMAR', backlogCount: 1, s11: '', s12: '', s21: '', s22: 'SE', s31: '' },
  { id: '23B21A45D8', name: 'GUDE SAI KIRAN', backlogCount: 7, s11: 'PHY,BEEE,EG', s12: 'DE&VC,CHE', s21: 'DMGT,ADS', s22: '', s31: '' },
  { id: '23B21A45G2', name: 'ANKAMREDDY BHANU PRASAD', backlogCount: 3, s11: 'EG', s12: 'EWS', s21: '', s22: '', s31: '' },
  { id: '24B25A4504', name: 'AYYANKI THANUSHA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '24B25A4507', name: 'ARJAMPUDI MOKSHA VARSHITHA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '24B25A4516', name: 'GADDIPATI KARTHIK', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '236Q1A4503', name: 'DASAMSETTI ABHICHANDANA', backlogCount: 14, s11: 'LAC,IP,PHY,BEEE,EG', s12: 'DE&VC,DS,CHE', s21: 'DMGT,ADS,JAVA', s22: 'OS,SE,SMDS', s31: '' },
  { id: '236Q1A4504', name: 'SANAPATHI SUSMITHA', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '236Q1A4520', name: 'DESINA NAGARJUNA', backlogCount: 20, s11: 'LAC,IP,PHY,BEEE,EG', s12: 'CHE', s21: 'DMGT,JAVA,DBMS', s22: 'SMDS', s31: 'CN,EDVC,IOT,AI,COA' },
  { id: '236Q1A4521', name: 'TADICHARLA RATHNAM RAJU', backlogCount: 6, s11: 'EG,BEEE', s12: 'DS', s21: 'DBMS', s22: 'SMDS', s31: 'EDVC' },
  { id: '236Q1A4522', name: 'KONDI YUVARAJU', backlogCount: 2, s11: '', s12: '', s21: '', s22: 'OS', s31: 'COA' },
  { id: '236Q1A4523', name: 'RAVADA HARSHA VARDHAN', backlogCount: 7, s11: 'PHY,EG', s12: 'DE&VC,CHE', s21: 'JAVA', s22: 'SMDS', s31: 'AI' },
  { id: '236Q1A4524', name: 'RAJANA RAJA SEKHAR', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '236Q1A4525', name: 'RAMISETTI HEMANTH', backlogCount: 0, s11: '', s12: '', s21: '', s22: '', s31: '' },
  { id: '236Q1A4526', name: 'REGETI SATISH KUMAR', backlogCount: 9, s11: 'LAC,PHY,BEEE,EG', s12: 'DE&VC,DS,CHE,BCME', s21: '', s22: '', s31: '' },
  { id: '236Q1A4527', name: 'VEMULA LOHITH KUMAR', backlogCount: 1, s11: 'EG', s12: '', s21: '', s22: '', s31: '' },
  { id: '236Q1A4528', name: 'PENUBOYINA RAVI KUMAR', backlogCount: 13, s11: 'LAC,IP,BEEE,EG', s12: 'DE&VC,CHE', s21: 'DMGT,JAVA', s22: 'OS,SE,SMDS,OT,IDS', s31: '' },

  { id: '236Q1A4530', name: 'JYOTHULA DANI VICTOR', backlogCount: 5, s11: '', s12: 'DE&VC,BCME', s21: 'JAVA', s22: 'OS,SMDS', s31: '' },
  { id: '236Q1A4531', name: 'YERIPILLI DHANUSH RAJA', backlogCount: 15, s11: 'LAC,IP,PHY,BEEE,EG', s12: 'DS,CHE,BCME', s21: 'DMGT,JAVA,ADS,DBMS', s22: 'SMDS,OS', s31: 'COA' },
  { id: '236Q1A4532', name: 'PEDDINTI HARISH KUMAR', backlogCount: 6, s11: 'LAC,IP,BEEE,EG', s12: 'DE&VC', s21: '', s22: 'SMDS', s31: '' },
];

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dailyMarking');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [students, setStudents] = useLocalStorage(
    'students',
    mockClassStudents.map(s => ({ ...s, status: null }))
  );

  React.useEffect(() => {
    // If local storage 'students' is missing backlog properties due to previous reverts, sync them from mock data
    setStudents(prev => {
      let changed = false;
      const merged = prev.map(s => {
        const mockS = mockClassStudents.find(m => m.id === s.id);
        if (!mockS) return s;

        const updated = { ...s };
        // Sync backlogCount if undefined or 0 (assuming mock data has backlogs)
        if (!updated.backlogCount && mockS.backlogCount) {
            updated.backlogCount = mockS.backlogCount;
            changed = true;
        }

        // Sync sem properties
        const sems = ['s11', 's12', 's21', 's22', 's31'];
        for (const sem of sems) {
            if (!updated[sem] && mockS[sem]) {
                updated[sem] = mockS[sem];
                changed = true;
            }
        }
        return updated;
      });
      return changed ? merged : prev;
    });
  }, []);

  const [attendanceHistory, setAttendanceHistory] = useLocalStorage('attendanceHistory', {});
  const [lastSubmittedReport, setLastSubmittedReport] = useLocalStorage('lastSubmittedReport', null);

  const [classInfo, setClassInfo] = useLocalStorage('classInfo', {
    name: 'K12AIDHA',
    semester: 'Fall',
    academicYear: ''
  });

  const [attendancePolicy, setAttendancePolicy] = useLocalStorage('attendancePolicy', {
    minimumAttendance: 75,
    warningThreshold: 60,
    semesterStartMonth: 1,
    semesterEndMonth: 6
  });

  const [studentInfoData, setStudentInfoData] = useLocalStorage('studentInfoData', defaultStudentInfoData);
  const [parentDataOverrides, setParentDataOverrides] = useLocalStorage('parentDataOverrides', {});
  // parentDataOverrides is a map of hno -> updated record; merged in ParentDetailsView via the setParentData approach

  const [semesters, setSemesters] = useLocalStorage('semesters', [
    { key: 's11', label: '1-1' },
    { key: 's12', label: '1-2' },
    { key: 's21', label: '2-1' },
    { key: 's22', label: '2-2' },
    { key: 's31', label: '3-1' },
  ]);

  const clearAttendanceHistory = () => {
    setAttendanceHistory({});
    setLastSubmittedReport(null);
    alert('Attendance history has been cleared.');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dailyMarking');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dailyMarking');
    setMobileMenuOpen(false);
  };

  const handleSubmissionSuccess = (reportData) => {
    setAttendanceHistory(prevHistory => {
      const dateKey = reportData.date;
      return {
        ...prevHistory,
        [dateKey]: [...(prevHistory[dateKey] || []), reportData]
      };
    });
    setLastSubmittedReport(reportData);
    setCurrentView('printReport');
  };

  const handleNewMarking = () => {
    setLastSubmittedReport(null);
    setCurrentView('dailyMarking');
    setStudents(prev => prev.map(s => ({ ...s, status: null })));
  };

  const handleSelectReport = (report) => {
    setLastSubmittedReport(report);
    setCurrentView('printReport');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dailyMarking':
        return (
          <DailyMarkingView
            students={students}
            setStudents={setStudents}
            onSubmissionSuccess={handleSubmissionSuccess}
            attendanceHistory={attendanceHistory}
          />
        );
      case 'classMembers':
        return (
          <ClassMembersView
            students={students}
            setStudents={setStudents}
          />
        );
      case 'dailyLog':
        return (
          <DailyAttendanceLogView
            attendanceHistory={attendanceHistory}
            setAttendanceHistory={setAttendanceHistory}
            onSelectReport={handleSelectReport}
            userRole="admin"
          />
        );
      case 'printReport':
        return (
          <PrintReportView
            reportData={lastSubmittedReport}
            onNewMarking={handleNewMarking}
          />
        );
      case 'backlogs':
        return (
          <BacklogsView students={students} setStudents={setStudents} semesters={semesters} setSemesters={setSemesters} />
        );
      case 'subjectWise':
        return (
          <SubjectWiseView students={students} setStudents={setStudents} semesters={semesters} setSemesters={setSemesters} />
        );
      case 'adminSettings':
        return (
          <AdminSettingsView
            students={students}
            setStudents={setStudents}
            classInfo={classInfo}
            setClassInfo={setClassInfo}
            attendancePolicy={attendancePolicy}
            setAttendancePolicy={setAttendancePolicy}
            clearAttendanceHistory={clearAttendanceHistory}
          />
        );
      case 'parentDetails':
        return <ParentDetailsView parentDataOverrides={parentDataOverrides} setParentDataOverrides={setParentDataOverrides} />;
      case 'studentInfo':
        return <StudentInfoView studentInfoData={studentInfoData} setStudentInfoData={setStudentInfoData} />;
      default:
        return (
          <DailyMarkingView
            students={students}
            setStudents={setStudents}
            onSubmissionSuccess={handleSubmissionSuccess}
            attendanceHistory={attendanceHistory}
          />
        );
    }
  };

  const navItems = [
    { id: 'dailyMarking', label: 'Mark Attendance', icon: UserCheck },
    { id: 'classMembers', label: 'Manage Class Members', icon: Users },
    { id: 'dailyLog', label: 'Attendance Log', icon: Calendar },
    { id: 'backlogs', label: 'Backlogs', icon: BookOpen },
    { id: 'subjectWise', label: 'Sub-wise Backlog Count', icon: BarChart2 },
    { id: 'parentDetails', label: 'Parent Details', icon: PhoneCall },
    { id: 'studentInfo', label: 'Student Info & ABC IDs', icon: Info },
    { id: 'adminSettings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-20 print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-indigo-600">AID-H Attendance Portal</h1>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-100 text-pink-800">
              ADMIN
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:inline">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </header>

      {/* Mobile Tabbed Navigation */}
      <nav className="sm:hidden bg-white shadow-inner p-2 border-b border-gray-200 sticky top-16 z-10 print:hidden overflow-x-auto">
        <div className="flex justify-around whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 flex flex-col items-center text-xs font-medium rounded-lg transition-colors 
                  ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-600'}`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                {item.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden sm:block w-64 bg-white border-r border-gray-200 sticky top-20 h-fit print:hidden">
          <div className="p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</p>
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full text-left flex items-center p-3 rounded-xl transition-colors duration-200 
                    ${isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <hr className="my-4" />
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Content View */}
        <div className="flex-1 min-h-screen bg-gray-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
