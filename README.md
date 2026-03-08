# Class Attendance and Student Management System

A comprehensive, responsive web application for managing student attendance records, academic backlogs, and contact information. Built with React, Vite, and Tailwind CSS.

## Features

### 📊 Academic Management
- **Backlogs Tracking**: Detailed view of student backlogs across multiple semesters (1-1 to 3-1).
- **Subject-wise Analysis**: Visualization of backlog counts per subject to identify challenging areas.
- **Export to Excel**: Generate and download detailed backlog reports for the entire department.

### 👨‍💼 Admin & Faculty Tools
- **Attendance Marking**: Fast and easy daily attendance logging for the K12AIDHA room.
- **Parent Contact Portal**: Searchable database of parent contact details for quick communication.
- **Student Information**: Management of vital student data including ABC IDs and laptop availability.
- **Admin Settings**: Configuration for attendance policies and data management.

### 📋 Attendance Log
- **Historical Records**: Review and filter past attendance reports by date.
- **Report Retrieval**: Instant access to previously submitted attendance sheets.

### 🖨️ Professional Reporting
- **Print-Ready Reports**: High-quality formatted attendance sheets ready for printing or PDF export.
- **Dept Summary**: Automatic calculation of present/absent statistics for department records.

### 🔐 Secure Access
- **Admin Authentication**: Protected access with specific credentials (ID: k12AIDHA).
- **Session Management**: Secure logout and persistent session handling.

### 💾 Data Integrity
- **Local Persistence**: All data is saved to browser storage (LocalStorage), ensuring no data loss on page refresh.
- **Reactive UI**: State-of-the-art UI updates instantly as you modify records.

## Tech Stack

- **Frontend**: React 18.2 (Hooks, Functional Components)
- **Design**: Tailwind CSS 3.3 (Modern, responsive, mobile-first)
- **Icons**: Lucide React
- **Data Handling**: XLSX (Excel export integration)
- **Build System**: Vite 5.0 (Ultra-fast development environment)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BALAMANIKANTA29/Class-Attendance-And-Student-Management-System.git
   cd Class-Attendance-And-Student-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── BacklogsView.jsx        # Backlog management
│   │   ├── SubjectWiseView.jsx     # Subject analytics
│   │   ├── DailyMarkingView.jsx    # Attendance marking
│   │   ├── ParentDetailsView.jsx   # Contact management
│   │   ├── StudentInfoView.jsx     # ABC ID tracking
│   │   └── LoginView.jsx           # Admin portal entry
│   ├── data/
│   │   └── studentInfoData.js      # Core student database
│   ├── App.jsx                     # Main application logic
│   └── index.css                   # Tailwind styles
```

## Admin Access
To access the management tools, use the following credentials:
- **Admin ID**: `k12AIDHA`
- **Password**: `k12AIDHA`

---



