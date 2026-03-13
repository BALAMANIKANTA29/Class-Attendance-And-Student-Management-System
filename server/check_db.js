import Database from 'better-sqlite3';
const db = new Database('./attendance.db');
const students = db.prepare("SELECT * FROM students WHERE name LIKE '%KUSUMA%' OR parentName LIKE '%KUSUMA%' OR roll LIKE '%KUSUMA%'").all();
console.log('KUSUMA:', students);
const students2 = db.prepare("SELECT * FROM students WHERE name LIKE '%SANTHOSH%' OR parentName LIKE '%SANTHOSH%' OR roll LIKE '%SANTHOSH%'").all();
console.log('SANTHOSH:', students2);
