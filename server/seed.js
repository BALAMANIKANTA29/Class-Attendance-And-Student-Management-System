import db from './db.js';
import { studentInfoData } from '../src/data/studentInfoData.js';
import { mockClassStudents } from './backlog_data.js';

const insertStudent = db.prepare(`
  INSERT OR REPLACE INTO students (
    roll, name, team, cls, room, phone, parentName, p1, p2, email, 
    backlogs, backlogSubs, laptop, club, abcId, project,
    s11, s12, s21, s22, s31
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertSettings = db.prepare(`
  INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
`);

const seed = () => {
  try {
    // 1. Seed Students
    const studentStmt = db.transaction((students) => {
      for (const s of students) {
        // Find detailed backlog data if it exists
        const backlogInfo = mockClassStudents.find(m => m.id === s.roll);
        
        insertStudent.run(
          s.roll, s.name, s.team, s.cls, s.room, s.phone, s.parentName, 
          s.p1 || null, s.p2 || null, s.email || null, 
          backlogInfo ? backlogInfo.backlogCount : (s.backlogs || 0), 
          s.backlogSubs || null, s.laptop || null, 
          s.club || null, s.abcId || null, s.project || null,
          backlogInfo ? backlogInfo.s11 : null,
          backlogInfo ? backlogInfo.s12 : null,
          backlogInfo ? backlogInfo.s21 : null,
          backlogInfo ? backlogInfo.s22 : null,
          backlogInfo ? backlogInfo.s31 : null
        );
      }
    });
    studentStmt(studentInfoData);
    console.log(`Seeded ${studentInfoData.length} students with restored backlog data.`);

    // 2. Seed Settings
    insertSettings.run('classInfo', JSON.stringify({ name: 'K12AIDHA', semester: 'Fall', academicYear: '' }));
    insertSettings.run('attendancePolicy', JSON.stringify({ minimumAttendance: 75, warningThreshold: 60, semesterStartMonth: 1, semesterEndMonth: 6 }));
    insertSettings.run('semesters', JSON.stringify([
      { key: 's11', label: '1-1' },
      { key: 's12', label: '1-2' },
      { key: 's21', label: '2-1' },
      { key: 's22', label: '2-2' },
      { key: 's31', label: '3-1' },
    ]));

    console.log('Seeded settings.');
    console.log('Database is ready!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seed();
