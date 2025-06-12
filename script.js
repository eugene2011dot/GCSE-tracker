let userData = {
    subjects: [],
    studySessions: [],
    goals: {
        weeklyTarget: 15 // hours per week
    },
    userProfile: {
        name: "Student",
        role: "GCSE",
        avatar: null,
        initials: "JS",
        gcseDate: null
    },
    timetable: {},
    resources: {
        websites: [],
        documents: [],
        videos: [],
        other: []
    },
    currentDay: new Date().getDay(),
    currentHour: new Date().getHours(),
    wellbeing: {  // Add wellbeing to initial structure
        breakReminders: true,
        reminderInterval: 50,
        lastBreakTime: null,
        mindfulnessDuration: 5,
        wakeUpTime: '07:00',
        sleepCycles: 5
    }
};

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const currentDateElement = document.getElementById('currentDate');
const subjectSelect = document.getElementById('subjectSelect');
const topicSelect = document.getElementById('topicSelect');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer');
const studySessionForm = document.getElementById('studySessionForm');
const currentSubjectDisplay = document.getElementById('currentSubject');
const currentTopicDisplay = document.getElementById('currentTopic');
const sessionStartTime = document.getElementById('sessionStartTime');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const addSubjectModal = new bootstrap.Modal(document.getElementById('addSubjectModal'));
const subjectInput = document.getElementById('subject');
const mathOptions = document.getElementById('mathOptions');
const mathSet = document.getElementById('mathSet');
const mathTier = document.getElementById('mathTier');
const saveSubjectBtn = document.getElementById('saveSubject');
const subjectAccordion = document.getElementById('subjectAccordion');
const sessionsTableBody = document.getElementById('sessionsTableBody');
const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
const userProfileForm = document.getElementById('userProfileForm');
const userNameInput = document.getElementById('userName');
const gcseDateInput = document.getElementById('gcseDate');
const avatarInput = document.getElementById('avatarInput');
const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
const generateAvatarBtn = document.getElementById('generateAvatarBtn');
const avatarPreview = document.getElementById('avatarPreview');
const avatarInitials = document.getElementById('avatarInitials');
const avatarImage = document.getElementById('avatarImage');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const userProfileSection = document.querySelector('.user-profile');
const saveTimetableBtn = document.getElementById('saveTimetableBtn');
const resetTimetableBtn = document.getElementById('resetTimetableBtn');
const subjectCards = document.getElementById('subjectCards');
const timetableBody = document.getElementById('timetableBody');

// Delete feature elements
const deleteSubjectBtn = document.getElementById('deleteSubjectBtn');
const deleteAllSubjectsBtn = document.getElementById('deleteAllSubjectsBtn');
const deleteSessionBtn = document.getElementById('deleteSessionBtn');
const deleteAllSessionsBtn = document.getElementById('deleteAllSessionsBtn');
const deleteSubjectModal = new bootstrap.Modal(document.getElementById('deleteSubjectModal'));
const deleteAllSubjectsModal = new bootstrap.Modal(document.getElementById('deleteAllSubjectsModal'));
const deleteSessionModal = new bootstrap.Modal(document.getElementById('deleteSessionModal'));
const deleteAllSessionsModal = new bootstrap.Modal(document.getElementById('deleteAllSessionsModal'));
const confirmDeleteSubject = document.getElementById('confirmDeleteSubject');
const confirmDeleteAllSubjects = document.getElementById('confirmDeleteAllSubjects');
const confirmDeleteSession = document.getElementById('confirmDeleteSession');
const confirmDeleteAllSessions = document.getElementById('confirmDeleteAllSessions');

// Stats elements
const weeklyHoursElement = document.getElementById('weeklyHours');
const weeklyChangeElement = document.getElementById('weeklyChange');
const completionRateElement = document.getElementById('completionRate');
const completionBarElement = document.getElementById('completionBar');
const behindSubjectsElement = document.getElementById('behindSubjects');
const behindSubjectsTextElement = document.getElementById('behindSubjectsText');
const totalSessionsElement = document.getElementById('totalSessions');

// Chart instances
let weeklyTimeChart = null;
let subjectProgressChart = null;
let subjectTimeChart = null;
let weeklyProgressChart = null;
let topicCompletionChart = null;

let stopwatchRunning = false;
let stopwatchTime = 0;
let stopwatchInterval = null;
let countdownRunning = false;
let countdownTime = 0;
let countdownInterval = null;
let alarmInterval = null;
const alarmSound = new Audio('GCSE%20tracker/mixkit-digital-clock-digital-alarm-buzzer-992.wav');
alarmSound.load();
// Selection variables
let multiTopicMode = false;
let selectedSubject = null;
let selectedSession = null;
// GCSE Subjects Data
const gcseSubjects = {
    "English Language": {
        examBoard: "AQA",
        topics: ["Reading", "Writing", "Creative Writing", "Non-fiction Texts", "Persuasive Writing"]
    },
    "English Literature": {
        examBoard: "AQA",
        topics: ["Shakespeare", "19th Century Fiction", "Modern Text", "Poetry", "Unseen Poetry"]
    },
    "Mathematics": {
        examBoard: "Edexcel",
        topics: ["Number", "Algebra", "Ratio & Proportion", "Geometry", "Statistics", "Probability"]
    },
    "Biology": {
        examBoard: "OCR",
        topics: ["Cell Biology", "Infection & Response", "Bioenergetics", "Homeostasis", "Inheritance", "Ecology"]
    },
    "Chemistry": {
        examBoard: "OCR",
        topics: ["Atomic Structure", "Bonding", "Quantitative Chemistry", "Chemical Changes", "Energy Changes", "Organic Chemistry"]
    },
    "Physics": {
        examBoard: "OCR",
        topics: ["Energy", "Electricity", "Particle Model", "Atomic Structure", "Forces", "Waves", "Magnetism"]
    },
    "Computer Science": {
        examBoard: "OCR",
        topics: ["Systems Architecture", "Memory", "Storage", "Networks", "System Security", "Software", "Programming", "Algorithms", "Logic"]
    },
    "Geography": {
        examBoard: "AQA",
        topics: ["Physical Landscapes", "Weather & Climate", "Ecosystems", "Urban Issues", "Economic Development", "Resource Management"]
    },
    "History": {
        examBoard: "Edexcel",
        topics: ["Medicine Through Time", "Anglo-Saxon & Norman England", "American West", "Weimar & Nazi Germany", "Cold War"]
    },
    "French": {
        examBoard: "AQA",
        topics: ["Identity & Culture", "Local Area", "School", "Future Aspirations", "International Issues"]
    },
    "Spanish": {
        examBoard: "AQA",
        topics: ["Identity & Culture", "Local Area", "School", "Future Aspirations", "International Issues"]
    },
    "Art & Design": {
        examBoard: "AQA",
        topics: ["Portfolio", "Externally Set Assignment"]
    },
    "Music": {
        examBoard: "Edexcel",
        topics: ["Performing", "Composing", "Appraising"]
    },
    "Physical Education": {
        examBoard: "AQA",
        topics: ["Anatomy & Physiology", "Movement Analysis", "Physical Training", "Sports Psychology", "Health & Fitness"]
    },
    "Religious Studies": {
        examBoard: "AQA",
        topics: ["Christianity", "Islam", "Relationships", "Life Issues", "Peace & Conflict", "Crime & Punishment"]
    },
    "Business Studies": {
        examBoard: "Edexcel",
        topics: ["Enterprise", "Marketing", "Finance", "Operations", "Human Resources"]
    }
};
const examData = {
    "AQA": {
        "name": "AQA",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-12T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-20T09:00:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Paper 1 (Non-Calculator)",
                        "datetime": "2025-05-15T09:30:00"
                    },
                    {
                        "name": "Paper 2 (Calculator)",
                        "datetime": "2025-06-04T09:30:00"
                    },
                    {
                        "name": "Paper 3 (Calculator)",
                        "datetime": "2025-06-11T09:30:00"
                    },
                    {
                        "name": "Further Maths - Paper 1",
                        "datetime": "2025-06-12T13:30:00"
                    },
                    {
                        "name": "Further Maths - Paper 2",
                        "datetime": "2025-06-18T13:30:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1 - Fiction and Creative Writing",
                        "datetime": "2025-05-15T13:30:00"
                    },
                    {
                        "name": "Paper 2 - Non-Fiction",
                        "datetime": "2025-05-18T09:00:00"
                    }
                ]
            },
            {
                "name": "Science",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology Paper 1",
                        "datetime": "2025-05-13T13:20:00"
                    },
                    {
                        "name": "Chemistry Paper 1",
                        "datetime": "2025-05-19T09:20:00"
                    },
                    {
                        "name": "Physics Paper 1",
                        "datetime": "2025-05-22T13:20:00"
                    },
                    {
                        "name": "Biology Paper 2",
                        "datetime": "2025-06-09T09:30:00"
                    },
                    {
                        "name": "Chemistry Paper 2",
                        "datetime": "2025-06-13T09:30:00"
                    },
                    {
                        "name": "Physics Paper 2",
                        "datetime": "2025-06-16T09:30:00"
                    }
                ]
            },
            {
                "name": "Geography",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-14T09:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-06T13:20:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-12T09:30:00"
                    }
                ]
            },
            {
                "name": "PE",
                "icon": "activity",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-19T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-09T13:30:00"
                    }
                ]
            },
            {
                "name": "Languages",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Speaking",
                        "datetime": "2025-03-31T08:30:00"
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-17T09:30:00"
                    },
                    {
                        "name": "Listening and Reading",
                        "datetime": "2025-06-10T09:20:00"
                    }
                ]
            },
            {
                "name": "Design and Technology",
                "icon": "hammer",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-06-18T09:30:00"
                    }
                ]
            },
            {
                "name": "Business Studies",
                "icon": "briefcase",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-09T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-05T09:00:00"
                    }
                ]
            },
            {
                "name": "Computer Science",
                "icon": "cpu",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-12T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-07T09:00:00"
                    }
                ]
            },
            {
                "name": "History",
                "icon": "clock-history",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-14T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-03T09:00:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-10T13:30:00"
                    }
                ]
            },
            {
                "name": "Psychology",
                "icon": "brain",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-16T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-06T13:30:00"
                    }
                ]
            },
            {
                "name": "Religious Studies",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-13T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-23T09:00:00"
                    }
                ]
            }
        ]
    },
    "Edexcel": {
        "name": "Edexcel",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-13T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-21T09:00:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Paper 1 (Non-Calculator)",
                        "datetime": "2025-05-15T09:00:00"
                    },
                    {
                        "name": "Paper 2 (Calculator)",
                        "datetime": "2025-06-03T09:00:00"
                    },
                    {
                        "name": "Paper 3 (Calculator)",
                        "datetime": "2025-06-10T09:00:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-23T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-05T09:00:00"
                    }
                ]
            },
            {
                "name": "Science",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology Paper 1",
                        "datetime": "2025-05-14T09:00:00"
                    },
                    {
                        "name": "Chemistry Paper 1",
                        "datetime": "2025-05-20T09:00:00"
                    },
                    {
                        "name": "Physics Paper 1",
                        "datetime": "2025-05-22T09:00:00"
                    },
                    {
                        "name": "Biology Paper 2",
                        "datetime": "2025-06-10T09:00:00"
                    },
                    {
                        "name": "Chemistry Paper 2",
                        "datetime": "2025-06-13T09:00:00"
                    },
                    {
                        "name": "Physics Paper 2",
                        "datetime": "2025-06-16T09:00:00"
                    }
                ]
            },
            {
                "name": "Geography A",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-15T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-06T09:00:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-11T09:00:00"
                    }
                ]
            },
            {
                "name": "Geography B",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-16T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-09T09:00:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-12T09:00:00"
                    }
                ]
            },
            {
                "name": "PE",
                "icon": "activity",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-20T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-11T13:30:00"
                    }
                ]
            },
            {
                "name": "French",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Listening",
                        "datetime": "2025-05-19T09:00:00"
                    },
                    {
                        "name": "Reading",
                        "datetime": "2025-05-19T10:00:00"
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-13T09:00:00"
                    },
                    {
                        "name": "Speaking",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    }
                ]
            },
            {
                "name": "Design and Technology",
                "icon": "hammer",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-06-19T09:00:00"
                    }
                ]
            },
            {
                "name": "Business Studies",
                "icon": "briefcase",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-12T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-09T09:00:00"
                    }
                ]
            },
            {
                "name": "Computer Science",
                "icon": "cpu",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-16T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-10T13:30:00"
                    }
                ]
            },
            {
                "name": "History",
                "icon": "clock-history",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-13T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-22T13:30:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-04T13:30:00"
                    }
                ]
            },
            {
                "name": "Psychology",
                "icon": "brain",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-19T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-12T09:00:00"
                    }
                ]
            },
            {
                "name": "Religious Studies A",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-16T09:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-23T13:30:00"
                    }
                ]
            },
            {
                "name": "Religious Studies B",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-14T13:30:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-03T13:30:00"
                    }
                ]
            }
        ]
    },
    "OCR": {
        "name": "OCR",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-14T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-22T09:00:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Paper 1 (Non-Calculator)",
                        "datetime": "2025-05-16T09:30:00"
                    },
                    {
                        "name": "Paper 2 (Calculator)",
                        "datetime": "2025-06-05T09:30:00"
                    },
                    {
                        "name": "Paper 3 (Calculator)",
                        "datetime": "2025-06-12T09:30:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-20T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-06T09:00:00"
                    }
                ]
            },
            {
                "name": "Science A",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology Paper 1",
                        "datetime": "2025-05-15T13:30:00"
                    },
                    {
                        "name": "Chemistry Paper 1",
                        "datetime": "2025-05-21T13:30:00"
                    },
                    {
                        "name": "Physics Paper 1",
                        "datetime": "2025-05-23T13:30:00"
                    },
                    {
                        "name": "Biology Paper 2",
                        "datetime": "2025-06-11T13:30:00"
                    },
                    {
                        "name": "Chemistry Paper 2",
                        "datetime": "2025-06-16T13:30:00"
                    },
                    {
                        "name": "Physics Paper 2",
                        "datetime": "2025-06-18T13:30:00"
                    }
                ]
            },
            {
                "name": "Science B (Twenty First Century Science)",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology Paper 1",
                        "datetime": "2025-05-16T13:30:00"
                    },
                    {
                        "name": "Chemistry Paper 1",
                        "datetime": "2025-05-22T13:30:00"
                    },
                    {
                        "name": "Physics Paper 1",
                        "datetime": "2025-05-27T09:00:00"
                    },
                    {
                        "name": "Biology Paper 2",
                        "datetime": "2025-06-12T13:30:00"
                    },
                    {
                        "name": "Chemistry Paper 2",
                        "datetime": "2025-06-17T13:30:00"
                    },
                    {
                        "name": "Physics Paper 2",
                        "datetime": "2025-06-19T13:30:00"
                    }
                ]
            },
            {
                "name": "Geography A",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-16T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-09T09:00:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-12T09:00:00"
                    }
                ]
            },
            {
                "name": "Geography B (Schools for the Future)",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-19T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-06-10T09:00:00"
                    },
                    {
                        "name": "Paper 3",
                        "datetime": "2025-06-13T09:00:00"
                    }
                ]
            },
            {
                "name": "French",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Listening",
                        "datetime": "2025-05-20T09:30:00"
                    },
                    {
                        "name": "Reading",
                        "datetime": "2025-05-20T10:15:00"
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-16T09:30:00"
                    },
                    {
                        "name": "Speaking",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    }
                ]
            },
            {
                "name": "Religious Studies",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Paper 1",
                        "datetime": "2025-05-15T09:00:00"
                    },
                    {
                        "name": "Paper 2",
                        "datetime": "2025-05-22T09:00:00"
                    }
                ]
            }
        ]
    },
    "CCEA": {
        "name": "CCEA",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Unit 1: The Novel and Drama",
                        "datetime": "2025-05-12T09:30:00"
                    },
                    {
                        "name": "Unit 2: Poetry and Prose",
                        "datetime": "2025-05-20T13:30:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Unit M5: Paper 1 (Non-Calculator)",
                        "datetime": "2025-05-15T09:30:00"
                    },
                    {
                        "name": "Unit M6: Paper 2 (Calculator)",
                        "datetime": "2025-06-03T13:30:00"
                    },
                    {
                        "name": "Unit M7: Paper 3 (Calculator)",
                        "datetime": "2025-06-10T13:30:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Unit 1: Personal Writing and Reading Non-Fiction",
                        "datetime": "2025-05-23T09:30:00"
                    },
                    {
                        "name": "Unit 2: Functional Writing and Reading Media",
                        "datetime": "2025-06-06T09:30:00"
                    }
                ]
            },
            {
                "name": "Science",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Unit 1: Biology and Chemistry",
                        "datetime": "2025-05-14T09:30:00"
                    },
                    {
                        "name": "Unit 2: Physics",
                        "datetime": "2025-05-21T09:30:00"
                    }
                ]
            },
            {
                "name": "Geography",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Unit 1: Our Natural World",
                        "datetime": "2025-05-14T13:30:00"
                    },
                    {
                        "name": "Unit 2: Our Changing World",
                        "datetime": "2025-06-06T13:30:00"
                    },
                    {
                        "name": "Unit 3: Fieldwork (Terminal Paper)",
                        "datetime": "2025-06-11T09:30:00"
                    }
                ]
            },
            {
                "name": "PE",
                "icon": "activity",
                "exams": [
                    {
                        "name": "Unit 1: Factors Underpinning Health, Well-being and Performance",
                        "datetime": "2025-05-19T09:30:00"
                    }
                ]
            },
            {
                "name": "French",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Listening",
                        "datetime": "2025-05-21T13:30:00"
                    },
                    {
                        "name": "Reading",
                        "datetime": "2025-05-21T14:15:00"
                    },
                    {
                        "name": "Speaking (Task 1)",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    },
                    {
                        "name": "Speaking (Task 2)",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-05T09:30:00"
                    }
                ]
            },
            {
                "name": "Business Studies",
                "icon": "briefcase",
                "exams": [
                    {
                        "name": "Unit 1: Starting a Business",
                        "datetime": "2025-05-09T09:30:00"
                    },
                    {
                        "name": "Unit 2: Developing a Business",
                        "datetime": "2025-05-16T09:30:00"
                    }
                ]
            },
            {
                "name": "History",
                "icon": "clock-history",
                "exams": [
                    {
                        "name": "Unit 1: Modern World History",
                        "datetime": "2025-05-16T13:30:00"
                    },
                    {
                        "name": "Unit 2: Outline Study",
                        "datetime": "2025-05-23T13:30:00"
                    }
                ]
            },
            {
                "name": "Religious Studies",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Unit 1: Introduction to Christian Ethics",
                        "datetime": "2025-05-21T09:30:00"
                    },
                    {
                        "name": "Unit 2: Introduction to Aspects of Christian Belief",
                        "datetime": "2025-06-03T09:30:00"
                    }
                ]
            },
            {
                "name": "Learning for Life and Work",
                "icon": "briefcase",
                "exams": [
                    {
                        "name": "Unit 1: Local and Global Citizenship",
                        "datetime": "2025-05-09T13:30:00"
                    },
                    {
                        "name": "Unit 2: Personal Development",
                        "datetime": "2025-05-16T13:30:00"
                    }
                ]
            }
        ]
    },
    "Eduqas": {
        "name": "Eduqas",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Component 1: Shakespeare and Poetry",
                        "datetime": "2025-05-13T09:15:00"
                    },
                    {
                        "name": "Component 2: Prose",
                        "datetime": "2025-05-21T09:15:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Component 1: Non-Calculator Mathematics",
                        "datetime": "2025-05-16T09:15:00"
                    },
                    {
                        "name": "Component 2: Calculator-Allowed Mathematics",
                        "datetime": "2025-06-04T09:15:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Component 1: Reading Non-Fiction and Transactional/Persuasive Writing",
                        "datetime": "2025-05-20T09:15:00"
                    },
                    {
                        "name": "Component 2: Reading Fiction and Creative Writing",
                        "datetime": "2025-06-06T09:15:00"
                    }
                ]
            },
            {
                "name": "Science (Double Award)",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology 1",
                        "datetime": "2025-05-14T13:15:00"
                    },
                    {
                        "name": "Chemistry 1",
                        "datetime": "2025-05-22T09:15:00"
                    },
                    {
                        "name": "Physics 1",
                        "datetime": "2025-05-27T13:15:00"
                    },
                    {
                        "name": "Biology 2",
                        "datetime": "2025-06-10T09:15:00"
                    },
                    {
                        "name": "Chemistry 2",
                        "datetime": "2025-06-17T09:15:00"
                    },
                    {
                        "name": "Physics 2",
                        "datetime": "2025-06-19T09:15:00"
                    }
                ]
            },
            {
                "name": "Geography A",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Component 1: Changing Places and Our Changing Climate",
                        "datetime": "2025-05-15T09:15:00"
                    },
                    {
                        "name": "Component 2: Distinctive Landscapes and Global Development",
                        "datetime": "2025-06-09T09:15:00"
                    },
                    {
                        "name": "Component 3: Investigating Geographical Issues (Terminal Paper)",
                        "datetime": "2025-06-12T13:15:00"
                    }
                ]
            },
            {
                "name": "Geography B",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Component 1: Living with the Physical Environment",
                        "datetime": "2025-05-16T09:15:00"
                    },
                    {
                        "name": "Component 2: Understanding Our Changing World",
                        "datetime": "2025-06-10T09:15:00"
                    },
                    {
                        "name": "Component 3: Environmental and Development Issues (Terminal Paper)",
                        "datetime": "2025-06-13T13:15:00"
                    }
                ]
            },
            {
                "name": "French",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Listening",
                        "datetime": "2025-05-22T13:15:00"
                    },
                    {
                        "name": "Reading",
                        "datetime": "2025-05-22T14:00:00"
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-17T13:15:00"
                    },
                    {
                        "name": "Speaking",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    }
                ]
            },
            {
                "name": "Religious Studies",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Component 1: Religious, Philosophical and Ethical Studies in the Modern World",
                        "datetime": "2025-05-16T13:15:00"
                    },
                    {
                        "name": "Component 2: Study of a World Religion",
                        "datetime": "2025-05-23T13:15:00"
                    }
                ]
            }
        ]
    },
    "WJEC": {
        "name": "WJEC",
        "subjects": [
            {
                "name": "English Literature",
                "icon": "book",
                "exams": [
                    {
                        "name": "Unit 1: Shakespeare and Poetry",
                        "datetime": "2025-05-13T09:30:00"
                    },
                    {
                        "name": "Unit 2: Prose, Drama and Unseen Poetry",
                        "datetime": "2025-05-21T09:30:00"
                    }
                ]
            },
            {
                "name": "Mathematics",
                "icon": "calculator",
                "exams": [
                    {
                        "name": "Unit 1: Non-Calculator Mathematics",
                        "datetime": "2025-05-16T09:30:00"
                    },
                    {
                        "name": "Unit 2: Calculator-Allowed Mathematics",
                        "datetime": "2025-06-04T09:30:00"
                    }
                ]
            },
            {
                "name": "English Language",
                "icon": "book",
                "exams": [
                    {
                        "name": "Component 1: Reading Non-Fiction and Transactional/Persuasive Writing",
                        "datetime": "2025-05-20T09:30:00"
                    },
                    {
                        "name": "Component 2: Reading Fiction and Creative Writing",
                        "datetime": "2025-06-06T09:30:00"
                    }
                ]
            },
            {
                "name": "Science (Double Award)",
                "icon": "beaker",
                "exams": [
                    {
                        "name": "Biology 1",
                        "datetime": "2025-05-14T13:30:00"
                    },
                    {
                        "name": "Chemistry 1",
                        "datetime": "2025-05-22T09:30:00"
                    },
                    {
                        "name": "Physics 1",
                        "datetime": "2025-05-27T13:30:00"
                    },
                    {
                        "name": "Biology 2",
                        "datetime": "2025-06-10T09:30:00"
                    },
                    {
                        "name": "Chemistry 2",
                        "datetime": "2025-06-17T09:30:00"
                    },
                    {
                        "name": "Physics 2",
                        "datetime": "2025-06-19T09:30:00"
                    }
                ]
            },
            {
                "name": "Geography",
                "icon": "globe",
                "exams": [
                    {
                        "name": "Unit 1: Changing Places and Our Changing Climate",
                        "datetime": "2025-05-15T09:30:00"
                    },
                    {
                        "name": "Unit 2: Distinctive Landscapes and Global Development",
                        "datetime": "2025-06-09T09:30:00"
                    },
                    {
                        "name": "Unit 3: Investigating Geographical Issues (Terminal Paper)",
                        "datetime": "2025-06-12T13:30:00"
                    }
                ]
            },
            {
                "name": "French",
                "icon": "translate",
                "exams": [
                    {
                        "name": "Listening",
                        "datetime": "2025-05-23T09:30:00"
                    },
                    {
                        "name": "Reading",
                        "datetime": "2025-05-23T10:15:00"
                    },
                    {
                        "name": "Writing",
                        "datetime": "2025-06-18T09:30:00"
                    },
                    {
                        "name": "Speaking",
                        "datetime": "2025-04-28T09:00:00" // Window starts
                    }
                ]
            },
            {
                "name": "Religious Studies",
                "icon": "book-half",
                "exams": [
                    {
                        "name": "Unit 1: Religion and Ethics",
                        "datetime": "2025-05-16T09:30:00"
                    },
                    {
                        "name": "Unit 2: Study of a World Religion",
                        "datetime": "2025-05-23T09:30:00"
                    }
                ]
            }
        ]
    }
};

// Initialize the app
function init() {
    loadUserData();
    setupNavigation();
    setupEventListeners();
    populateSubjectSelects();
    NotesManager.init();
    updateCurrentDate();
    renderSubjects();
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    initTimer();
    setupResourcesTab();
    setupResourceModal();
    renderTimetableSubjects();
    renderTimetableGrid();
    updateUserProfileDisplay();
    initMusicPlayer();
    initTracker();
    setupExamRules();

}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('gcseStudyTrackerData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        userData = parsedData;

        // Restore selections if they exist
        if (parsedData.currentSubject) {
            subjectSelect.value = parsedData.currentSubject;
            updateTopicSelect(parsedData.currentSubject);
        }
        if (parsedData.currentTopic) {
            topicSelect.value = parsedData.currentTopic;
        }
    }
    console.log("Loaded userData:", userData);
}

// Save user data to localStorage
function saveUserData() {
    const dataToSave = {
        ...userData,
        currentSubject: subjectSelect.value,  // Only save the selected subject
        currentTopic: topicSelect.value      // Only save the selected topic
    };
    localStorage.setItem('gcseStudyTrackerData', JSON.stringify(dataToSave));
}

// Update current date display
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Setup tab navigation
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            contentSections.forEach(section => section.classList.remove('active'));
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');

            if (target === 'dashboard' || target === 'progress') {
                renderCharts();
            }
        });
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Subject selection
    subjectSelect.addEventListener('change', (e) => {
        updateTopicSelect(e.target.value);
        currentSession.subject = e.target.value;
        saveUserData();  // Save on change
    });

    // Topic selection
    topicSelect.addEventListener('change', (e) => {
        currentSession.topic = e.target.value || 'General study';
        saveUserData();  // Save on change
    });

    // Keep all your existing timer and form handlers exactly as they were
    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
    studySessionForm.addEventListener('submit', logStudySession);

    // Timer controls
    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);

    // Study session form
    studySessionForm.addEventListener('submit', logStudySession);
    // Add subject button
    addSubjectBtn.addEventListener('click', () => {
        addSubjectModal.show();
    });

    // Subject selection in add form
    subjectInput.addEventListener('change', () => {
        if (subjectInput.value === "Mathematics") {
            mathOptions.classList.remove('d-none');
        } else {
            mathOptions.classList.add('d-none');
        }
    });

    // Save subject button
    saveSubjectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addSubject();
    });

    // Subject deletion
    deleteSubjectBtn.addEventListener('click', () => {
        if (!selectedSubject) {
            alert('Please select a subject to delete');
            return;
        }
        deleteSubjectModal.show();
    });

    deleteAllSubjectsBtn.addEventListener('click', () => {
        if (userData.subjects.length === 0) {
            alert('No subjects to delete');
            return;
        }
        deleteAllSubjectsModal.show();
    });

    confirmDeleteSubject.addEventListener('click', deleteSelectedSubject);
    confirmDeleteAllSubjects.addEventListener('click', deleteAllSubjects);

    // Session deletion
    deleteSessionBtn.addEventListener('click', () => {
        if (!selectedSession) {
            alert('Please select a session to delete');
            return;
        }
        deleteSessionModal.show();
    });

    deleteAllSessionsBtn.addEventListener('click', () => {
        if (userData.studySessions.length === 0) {
            alert('No sessions to delete');
            return;
        }
        deleteAllSessionsModal.show();
    });

    confirmDeleteSession.addEventListener('click', deleteSelectedSession);
    confirmDeleteAllSessions.addEventListener('click', deleteAllSessions);

    // Subject selection
    subjectAccordion.addEventListener('click', (e) => {
        const subjectItem = e.target.closest('.subject-item');
        if (subjectItem) {
            document.querySelectorAll('.subject-item').forEach(item => {
                item.classList.remove('selected');
            });
            subjectItem.classList.add('selected');
            selectedSubject = subjectItem.dataset.subjectId;
            showSubjectDetails(selectedSubject);
        }
    });

    // User profile
    userProfileSection.addEventListener('click', openUserProfileModal);
    uploadAvatarBtn.addEventListener('click', () => avatarInput.click());
    avatarInput.addEventListener('change', handleAvatarUpload);
    generateAvatarBtn.addEventListener('click', generateAvatarFromInitials);
    saveProfileBtn.addEventListener('click', saveUserProfile);

    // Timetable
    saveTimetableBtn.addEventListener('click', saveTimetable);
    resetTimetableBtn.addEventListener('click', resetTimetable);

    // Session table selection
    sessionsTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (row && !row.classList.contains('no-sessions')) {
            document.querySelectorAll('#sessionsTableBody tr').forEach(r => {
                r.classList.remove('selected');
            });
            row.classList.add('selected');
            selectedSession = row.dataset.sessionId;
        }
    });


    // Stopwatch controls
    document.getElementById('stopwatchStart')?.addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPause')?.addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchReset')?.addEventListener('click', resetStopwatch);
    document.getElementById('stopwatchLap')?.addEventListener('click', recordLap);

    // Countdown controls
    document.getElementById('countdownStart')?.addEventListener('click', startCountdown);
    document.getElementById('countdownPause')?.addEventListener('click', pauseCountdown);
    document.getElementById('countdownReset')?.addEventListener('click', resetCountdown);

    document.getElementById('addTopicBtn')?.addEventListener('click', addTopicInput);

    // Subject selection change
    subjectInput.addEventListener('change', function () {
        const subjectName = this.value;

        // Show/hide math options
        if (subjectName === "Mathematics") {
            mathOptions.classList.remove('d-none');
        } else {
            mathOptions.classList.add('d-none');
        }

        // Clear topics container
        document.getElementById('topicsContainer').innerHTML = '';

        // Add default topics if available
        if (gcseSubjects[subjectName]?.topics) {
            gcseSubjects[subjectName].topics.forEach(topic => {
                addTopicInput(topic);
            });
        }
    });
    document.getElementById('multiTopicMode').addEventListener('change', function () {
        multiTopicMode = this.checked;
        refreshTopicSelectUI();
    });

    function refreshTopicSelectUI() {
        const topicSelect = document.getElementById('topicSelect');

        // Switch between single and multi-select
        topicSelect.multiple = multiTopicMode;

        // Visual feedback
        if (multiTopicMode) {
            topicSelect.size = 4; // Show multiple options
            topicSelect.classList.add('multi-select');
        } else {
            topicSelect.size = 1;
            topicSelect.classList.remove('multi-select');
        }
    }
}
// ======================
// DARK MODE SYSTEM (2024)
// ======================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements
    const darkModeToggle = document.getElementById('darkModeBtn');
    const html = document.documentElement;

    // 2. Theme Detection
    const detectSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // 3. Theme Management
    const getSavedTheme = () => localStorage.getItem('theme');
    const saveTheme = (theme) => localStorage.setItem('theme', theme);

    // 4. Apply Theme
    const applyTheme = (theme) => {
        // Set HTML attribute (triggers CSS variable changes)
        html.setAttribute('data-theme', theme);

        // Update UI elements
        if (darkModeToggle) {
            const isDark = theme === 'dark';
            darkModeToggle.innerHTML = isDark
                ? '<i class="bi bi-sun"></i> Light Mode'
                : '<i class="bi bi-moon"></i> Dark Mode';
            darkModeToggle.className = isDark
                ? 'btn btn-sm btn-light'
                : 'btn btn-sm btn-outline-secondary';
        }
    };

    // 5. Toggle Logic
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        saveTheme(newTheme);
    };

    // 6. Initialize
    const initTheme = () => {
        const savedTheme = getSavedTheme();
        const systemTheme = detectSystemTheme();
        const initialTheme = savedTheme || systemTheme;

        applyTheme(initialTheme);

        // Set up event listeners
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleTheme);
        }

        // Watch for system theme changes (if no saved preference)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!getSavedTheme()) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    };

    // Start the system
    initTheme();

    // Debugging
    console.log('Dark Mode System initialized', {
        currentTheme: html.getAttribute('data-theme'),
        savedTheme: getSavedTheme(),
        systemPrefers: detectSystemTheme()
    });
});

// ======================
// CSS VARIABLE DEBUGGER
// ======================
function debugCSSVariables() {
    const styles = getComputedStyle(document.documentElement);
    const variables = [
        '--bg-primary',
        '--bg-secondary',
        '--text-primary',
        '--border-color',
        '--accent-color'
    ];

    console.group('CSS Variable Values');
    variables.forEach(varName => {
        console.log(`${varName}: ${styles.getPropertyValue(varName).trim()}`);
    });
    console.groupEnd();
}

// Call this if you need to check values
// debugCSSVariables();
let currentSession = {
    subject: null,
    topic: null,
    startTime: null,
    endTime: null,
    duration: 0,
    lastUpdated: null  // Added to track last update time
};

let timerStartTime = null;
let timerPausedDuration = 0;


// Initialize timer from localStorage if available
function initializeTimer() {
    const savedSession = localStorage.getItem('currentStudySession');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        currentSession = {
            ...session,
            startTime: session.startTime ? new Date(session.startTime) : null,
            endTime: session.endTime ? new Date(session.endTime) : null,
            lastUpdated: session.lastUpdated ? new Date(session.lastUpdated) : null
        };

        // Calculate time elapsed while page was closed
        if (currentSession.startTime && !currentSession.endTime) {
            const now = new Date();
            const elapsedSeconds = Math.floor((now - currentSession.lastUpdated) / 1000);
            currentSession.duration += elapsedSeconds;
            currentSession.lastUpdated = now;

            // Restart the timer
            startTimerUI();
        }

        updateTimerDisplay();
        updateSessionInfoDisplay();
    }
}

// Start study timer (updated)
// ======================
// TIMER SYSTEM (FIXED)
// ======================

// Global timer variables
let timer = {
    interval: null,
    startTime: null,
    elapsed: 0, // in seconds
    running: false,
    subject: null,
    topic: null
};

// Initialize timer when page loads
function initTimer() {
    // Load saved session if exists
    const savedSession = localStorage.getItem('studyTimer');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        if (session.running) {
            timer = {
                ...session,
                startTime: new Date(session.startTime)
            };

            // Calculate time elapsed while page was closed
            if (timer.startTime) {
                const now = new Date();
                const elapsedSeconds = Math.floor((now - timer.startTime) / 1000);
                timer.elapsed += elapsedSeconds;
                timer.startTime = now;
            }

            startTimerUI();
        }
    }

    updateSessionInfoDisplay();
}


// Start timer function
function startTimer() {
    if (timer.running) return;

    if (!subjectSelect.value) {
        alert('Please select a subject first');
        return;
    }

    timer = {
        interval: null,
        startTime: new Date(),
        elapsed: 0,
        running: true,
        subject: subjectSelect.value,
        topic: topicSelect.value
    };

    // Start updating every second
    timer.interval = setInterval(updateTimerDisplay, 1000);

    // Update UI
    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
    updateSessionInfoDisplay();
    saveTimerState();
}

// Update timer every second
function updateTimer() {
    if (!isTimerRunning) return;

    const now = new Date();
    currentSession.duration = Math.floor((now - sessionStartTimestamp) / 1000) + accumulatedDuration;
    currentSession.lastUpdated = now;

    updateTimerDisplay();
    saveSessionState();
}

// Stop timer function
function stopTimer() {
    if (!timer.running) return;

    clearInterval(timer.interval);
    timer.running = false;

    // Update UI
    stopTimerBtn.disabled = true;
    startTimerBtn.disabled = false;
    saveTimerState();
}
function updateTimerDisplay() {
    if (!timer.running) return;

    // Calculate elapsed time
    const now = new Date();
    timer.elapsed = Math.floor((now - timer.startTime) / 1000);

    // Format as HH:MM:SS
    const hours = Math.floor(timer.elapsed / 3600);
    const minutes = Math.floor((timer.elapsed % 3600) / 60);
    const seconds = timer.elapsed % 60;

    timerDisplay.textContent =
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;

    saveTimerState();
}

function saveTimerState() {
    localStorage.setItem('studyTimer', JSON.stringify({
        ...timer,
        startTime: timer.startTime.getTime()
    }));
}


// Reset timer completely
function resetTimer() {
    clearInterval(timer.interval);
    timer = {
        interval: null,
        startTime: null,
        elapsed: 0,
        running: false,
        subject: null,
        topic: null
    };

    timerDisplay.textContent = '00:00:00';
    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = true;
    updateSessionInfoDisplay();
    localStorage.removeItem('studyTimer');
}

// Save session to localStorage
function saveSessionState() {
    if (currentSession.startTime) {
        localStorage.setItem('currentStudySession', JSON.stringify({
            ...currentSession,
            startTime: currentSession.startTime.getTime(),
            endTime: currentSession.endTime?.getTime(),
            lastUpdated: new Date().getTime()
        }));
    }
}

// Clear session from localStorage
function clearSessionState() {
    localStorage.removeItem('currentStudySession');
}
function updateSessionInfoDisplay() {
    currentSubjectDisplay.textContent = timer.subject || 'Not selected';

    // Format topics
    let topicsText = 'General study';
    if (timer.topic) {
        const selectedOptions = topicSelect.selectedOptions;
        if (selectedOptions.length > 0) {
            const topics = Array.from(selectedOptions).map(opt => opt.value);
            if (topics.length === 1) {
                topicsText = topics[0];
            } else if (topics.length > 1) {
                topicsText = topics.slice(0, -1).join(', ') + ' and ' + topics.slice(-1);
            }
        } else {
            topicsText = timer.topic;
        }
    }

    currentTopicDisplay.textContent = topicsText;
    sessionStartTime.textContent = timer.startTime
        ? formatTime(timer.startTime)
        : '--:-- --';
}
// Clear session state
function clearSessionState() {
    localStorage.removeItem('currentStudySession');
}

// Log study session (updated)
function logStudySession(event) {
    event.preventDefault();

    if (!timer.startTime || timer.elapsed === 0) {
        alert('Please start and complete a session first');
        return;
    }

    // Get selected topics (works for both single and multi-select)
    const selectedOptions = topicSelect.selectedOptions;
    const selectedTopics = selectedOptions.length > 0
        ? Array.from(selectedOptions).map(opt => opt.value)
        : ['General study']; // Default if nothing selected

    // Create a session for EACH selected topic
    selectedTopics.forEach(topic => {
        userData.studySessions.push({
            date: timer.startTime.toISOString(),
            subject: timer.subject,
            topic: topic,
            duration: timer.elapsed // Duration in seconds
        });
    });

    saveUserData();
    resetTimer();

    // Update UI
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    renderSubjects();
}

const NotesManager = {
  // Safe ID generator
  generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  init() {
    this.setupEventListeners();
    this.renderSubjectOptions();
    this.renderAllNotes();
  },

  setupEventListeners() {
    // Study session tracker notes
    document.getElementById('saveCurrentNote')?.addEventListener('click', () => this.saveCurrentNote());
    document.getElementById('viewOtherNotes')?.addEventListener('click', () => this.showNotesModal());
    
    // Standalone notes form
    document.getElementById('standaloneNoteForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveStandaloneNote();
    });
    
    // Subject selection changes
    document.getElementById('noteSubjects')?.addEventListener('change', () => this.handleSubjectSelection());
  },

  handleSubjectSelection() {
    const topicSelect = document.getElementById('noteTopic');
    const selectedSubjects = Array.from(
      document.getElementById('noteSubjects').selectedOptions
    ).map(opt => opt.value);
    
    topicSelect.disabled = selectedSubjects.length > 1;
    
    if (selectedSubjects.length === 1 && selectedSubjects[0] !== 'general') {
      this.populateTopicOptions(selectedSubjects[0]);
    } else {
      topicSelect.innerHTML = '<option value="">Select topic...</option>';
    }
  },

  renderSubjectOptions() {
    const select = document.getElementById('noteSubjects');
    if (!select) return;
    
    // Clear existing options except "General Note"
    while (select.options.length > 1) {
      select.remove(1);
    }
    
    // Add user's subjects
    userData.subjects.forEach(subject => {
      const option = new Option(subject.displayName || subject.name, subject.name);
      select.add(option);
    });
  },

  populateTopicOptions(subjectName) {
    const select = document.getElementById('noteTopic');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select topic...</option>';
    
    const subjectData = gcseSubjects[subjectName];
    if (subjectData?.topics) {
      subjectData.topics.forEach(topic => {
        select.add(new Option(topic, topic));
      });
    }
  },

  saveCurrentNote() {
    const noteContent = document.getElementById('currentNote')?.value.trim();
    const currentSubject = subjectSelect.value;
    
    if (!currentSubject) {
      alert('Please select a subject first');
      return;
    }
    
    if (!noteContent) {
      alert('Note cannot be empty');
      return;
    }
    
    const newNote = {
      id: this.generateId(),
      type: 'session',
      subject: currentSubject,
      topic: topicSelect.value || 'General Study',
      content: noteContent,
      createdAt: new Date().toISOString(),
      sessionId: currentSession?.id
    };
    
    this.saveNote(newNote);
    document.getElementById('currentNote').value = '';
    
    // Visual feedback
    const btn = document.getElementById('saveCurrentNote');
    if (btn) {
      btn.textContent = '✓ Saved';
      setTimeout(() => {
        btn.textContent = 'Save';
      }, 2000);
    }
  },

  saveStandaloneNote() {
    const content = document.getElementById('noteContent')?.value.trim();
    const subjectSelect = document.getElementById('noteSubjects');
    const subjects = Array.from(subjectSelect.selectedOptions).map(opt => opt.value);
    const topic = document.getElementById('noteTopic')?.value;
    
    if (!content) {
      alert('Note content cannot be empty');
      return;
    }
    
    if (subjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
    
    const newNote = {
      id: this.generateId(),
      type: 'standalone',
      subjects: subjects,
      topic: subjects.length === 1 ? topic || null : null,
      content: content,
      createdAt: new Date().toISOString()
    };
    
    this.saveNote(newNote);
    this.renderAllNotes();
    document.getElementById('standaloneNoteForm').reset();
    
    // Visual feedback
    const btn = document.querySelector('#standaloneNoteForm [type="submit"]');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = '✓ Saved';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  },


    // Save note to storage
    saveNote(note) {
        if (!userData.notes) userData.notes = [];
        userData.notes.unshift(note);

        try {
            localStorage.setItem('gcseStudyTrackerData', JSON.stringify(userData));
            console.log("Note saved:", note);
        } catch (e) {
            console.error("Save error:", e);
            if (e.name === 'QuotaExceededError') {
                this.clearOldData();
                localStorage.setItem('gcseStudyTrackerData', JSON.stringify(userData));
            }
        }
    },

    clearOldData() {
        // Keep only recent 50 items
        ['notes', 'studySessions'].forEach(key => {
            if (userData[key] && userData[key].length > 50) {
                userData[key] = userData[key].slice(0, 50);
            }
        });
    },

// Show notes modal in study session tracker
showNotesModal() {
        const currentSubject = subjectSelect.value;
        if (!currentSubject) {
            alert('Please select a subject first');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('notesModal'));
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        // Filter notes for current subject
        const subjectNotes = (userData.notes || []).filter(note => {
            if (note.type === 'session') {
                return note.subject === currentSubject;
            } else {
                return note.subjects.includes(currentSubject);
            }
        });

        if (subjectNotes.length === 0) {
            notesList.innerHTML = '<div class="empty-state">No notes found for this subject</div>';
        } else {
            subjectNotes.forEach(note => {
                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.innerHTML = `
          <div class="note-card-content">${note.content}</div>
          <div class="note-card-meta">
            <small>${new Date(note.createdAt).toLocaleString()}</small>
            ${note.topic ? `<small>Topic: ${note.topic}</small>` : ''}
          </div>
          <button class="btn btn-sm btn-outline-danger delete-note" data-id="${note.id}">
            <i class="bi bi-trash"></i>
          </button>
        `;
                notesList.appendChild(noteCard);

                // Add click handler to insert note into current session
                noteCard.querySelector('.note-card-content').addEventListener('click', () => {
                    document.getElementById('currentNote').value = note.content;
                    modal.hide();
                });

                // Add delete handler
                noteCard.querySelector('.delete-note').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Delete this note permanently?')) {
                        this.deleteNote(note.id);
                        noteCard.remove();
                    }
                });
            });
        }

        modal.show();
    },

    // Delete a note
    deleteNote(noteId) {
        if (!userData.notes) return;
        userData.notes = userData.notes.filter(note => note.id !== noteId);
        saveUserData();
    },

    // Render all notes in notes tab
    renderAllNotes() {
        const container = document.getElementById('allNotesContainer');
        if (!container) return;

        container.innerHTML = '';

        const allNotes = (userData.notes || []).sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (allNotes.length === 0) {
            container.innerHTML = '<div class="empty-state">No notes created yet</div>';
            return;
        }

        allNotes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
        <div class="note-card-header">
          <h5>${note.type === 'session' ? note.subject : note.subjects.join(', ')}</h5>
          ${note.topic ? `<span class="badge bg-secondary">${note.topic}</span>` : ''}
          <button class="btn btn-sm btn-outline-danger delete-note" data-id="${note.id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="note-card-content">${note.content}</div>
        <div class="note-card-footer">
          <small>${new Date(note.createdAt).toLocaleString()}</small>
          <small>${note.type === 'session' ? 'Session Note' : 'Standalone Note'}</small>
        </div>
      `;
            container.appendChild(noteCard);

            // Add delete handler
            noteCard.querySelector('.delete-note').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Delete this note permanently?')) {
                    this.deleteNote(note.id);
                    noteCard.remove();
                }
            });
        });
    },

    // Search notes
    searchNotes(e) {
        const searchTerm = e.target.value.toLowerCase();
        const notes = document.querySelectorAll('#allNotesContainer .note-card');

        notes.forEach(note => {
            const content = note.querySelector('.note-card-content').textContent.toLowerCase();
            const matches = content.includes(searchTerm);
            note.style.display = matches ? 'block' : 'none';
        });
    }
};

// Helper function to format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
// Start timer UI
function startTimerUI() {
    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
    updateSessionInfoDisplay();
}
function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;

    currentSession = {
        subject: null,
        topic: null,
        startTime: null,
        endTime: null,
        duration: 0,
        lastUpdated: null
    };

    timerDisplay.textContent = '00:00:00';
    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = true;
    currentSubjectDisplay.textContent = 'Not selected';
    currentTopicDisplay.textContent = 'General study';
    sessionStartTime.textContent = '--:-- --';

    clearSessionState();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeTimer);

// Save state before page unloads
window.addEventListener('beforeunload', () => {
    if (timerInterval) {
        saveSessionState();
    }
});

function populateSubjectSelects() {
    // Clear existing options
    subjectSelect.innerHTML = '<option value="" disabled selected>Select subject</option>';

    // Add subjects to dropdown
    userData.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.displayName || subject.name;
        subjectSelect.appendChild(option);
    });
}
// Update topic select based on subject
function updateTopicSelect(subjectName) {
    topicSelect.innerHTML = '<option value="" selected>General study</option>';

    if (subjectName && gcseSubjects[subjectName]) {
        topicSelect.disabled = false;
        topicSelect.multiple = true; // Always allow multiple

        gcseSubjects[subjectName].topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicSelect.appendChild(option);
        });
    } else {
        topicSelect.disabled = true;
        topicSelect.multiple = false;
    }
}
// Add new subject
// Update the addSubject function to include exam board and custom topics
function addSubject() {
    const subjectName = subjectInput.value.trim();
    const examBoard = document.getElementById('examBoard').value;

    if (!subjectName || !examBoard) {
        alert('Please select both a subject and exam board');
        return;
    }

    // Check if subject already exists
    if (userData.subjects.some(s => s.name === subjectName)) {
        alert('This subject has already been added');
        return;
    }

    const subjectDetails = {
        name: subjectName,
        displayName: subjectName, // Default display name
        examBoard: examBoard,
        customTopics: [] // Will store any custom topics
    };

    // Special handling for Mathematics
    if (subjectName === "Mathematics") {
        const setNumber = mathSet.value;
        const tier = mathTier.value;

        if (setNumber) {
            subjectDetails.displayName = `Mathematics - Set ${setNumber}`;
            subjectDetails.set = setNumber;
        }
        if (tier) {
            subjectDetails.displayName += tier ? ` (${tier} Tier)` : '';
            subjectDetails.tier = tier;
        }
    }

    // Get custom topics
    const topicInputs = document.querySelectorAll('.topic-input');
    topicInputs.forEach(input => {
        if (input.value.trim()) {
            subjectDetails.customTopics.push(input.value.trim());
        }
    });

    userData.subjects.push(subjectDetails);
    saveUserData();

    // Update UI
    populateSubjectSelects();
    renderSubjects();
    renderTimetableSubjects();

    // Reset form and close modal
    document.getElementById('addSubjectForm').reset();
    mathOptions.classList.add('d-none');
    document.getElementById('topicsContainer').innerHTML = '';
    addSubjectModal.hide();
    document.dispatchEvent(new Event('subjectsUpdated'));
}
// Delete selected subject
function deleteSelectedSubject() {
    userData.subjects = userData.subjects.filter(subject => subject.name !== selectedSubject);

    // Also remove any sessions for this subject
    userData.studySessions = userData.studySessions.filter(session => session.subject !== selectedSubject);

    // Remove from timetable
    for (const key in userData.timetable) {
        if (userData.timetable[key] === selectedSubject) {
            delete userData.timetable[key];
        }
    }

    saveUserData();
    deleteSubjectModal.hide();
    selectedSubject = null;

    // Update UI
    renderSubjects();
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    populateSubjectSelects();
    renderTimetableSubjects();
    renderTimetableGrid();
}

// Delete all subjects
function deleteAllSubjects() {
    userData.subjects = [];
    userData.timetable = {};
    saveUserData();
    deleteAllSubjectsModal.hide();

    // Update UI
    renderSubjects();
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    populateSubjectSelects();
    renderTimetableSubjects();
    renderTimetableGrid();
}

// Delete selected session
function deleteSelectedSession() {
    userData.studySessions = userData.studySessions.filter((_, index) =>
        index !== parseInt(selectedSession)
    );

    saveUserData();
    deleteSessionModal.hide();
    selectedSession = null;

    // Update UI
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
}

// Delete all sessions
function deleteAllSessions() {
    userData.studySessions = [];
    saveUserData();
    deleteAllSessionsModal.hide();

    // Update UI
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
}

// Show subject details
function showSubjectDetails(subjectName) {
    const subject = userData.subjects.find(s => s.name === subjectName);
    const subjectData = gcseSubjects[subjectName] || {};
    const subjectDetailsContainer = document.querySelector('.subject-details');

    // Clear the container first
    subjectDetailsContainer.innerHTML = '';

    if (!subject) {
        subjectDetailsContainer.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-journal-bookmark"></i>
                <h3>Select a subject</h3>
                <p>Choose a subject from the list to view details</p>
            </div>
        `;
        return;
    }

    const completionPercentage = calculateTopicCompletion(subjectName);

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'subject-details-content';
    contentDiv.innerHTML = `
        <h3 class="subject-title">${subject.displayName || subject.name}</h3>
        
        <div class="subject-info">
            <div class="subject-info-item">
                <span class="subject-info-label">Exam Board:</span>
                <span>${subject.examBoard || 'Not specified'}</span>
            </div>
            ${subject.set ? `
            <div class="subject-info-item">
                <span class="subject-info-label">Set Number:</span>
                <span>${subject.set}</span>
            </div>
            ` : ''}
            ${subject.tier ? `
            <div class="subject-info-item">
                <span class="subject-info-label">Tier:</span>
                <span>${subject.tier}</span>
            </div>
            ` : ''}
            <div class="subject-info-item">
                <span class="subject-info-label">Topics:</span>
                <span>${(subjectData.topics?.length || 0) + (subject.customTopics?.length || 0)} total</span>
            </div>
            <div class="subject-info-item">
                <span class="subject-info-label">Completed:</span>
                <span id="completionPercentage">${completionPercentage}%</span>
            </div>
        </div>
        
        <div class="progress-container">
            <div class="progress-info">
                <span>Progress: ${completionPercentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" 
                     style="width: ${completionPercentage}%; 
                            background-color: ${getProgressColor(completionPercentage)};">
                </div>
            </div>
        </div>
        
        <div class="topics-header">
            <h4>Topics</h4>
            <div class="topic-actions">
                <button class="btn btn-sm btn-outline-primary" id="markAllComplete">Mark All Complete</button>
                <button class="btn btn-sm btn-outline-success" id="addCustomTopic">
                    <i class="bi bi-plus-lg"></i> Add Topic
                </button>
            </div>
        </div>
        
        <div class="topics-list" id="topicsList"></div>
        
        <div class="add-topic-form mt-3 d-none" id="addTopicForm">
            <div class="input-group">
                <input type="text" class="form-control" id="newTopicName" placeholder="Enter topic name">
                <button class="btn btn-success" type="button" id="saveNewTopic">
                    <i class="bi bi-check-lg"></i> Save
                </button>
                <button class="btn btn-outline-secondary" type="button" id="cancelAddTopic">
                    <i class="bi bi-x-lg"></i> Cancel
                </button>
            </div>
        </div>
    `;

    // Append the content to the container
    subjectDetailsContainer.appendChild(contentDiv);

    // Add topics with checkboxes - combine predefined and custom topics
    const allTopics = [...(subjectData.topics || []), ...(subject.customTopics || [])];

    if (allTopics.length > 0) {
        const topicsList = document.getElementById('topicsList');
        allTopics.forEach(topic => {
            const isCompleted = userData.studySessions.some(
                session => session.subject === subjectName && session.topic === topic
            );

            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            topicItem.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input topic-checkbox" type="checkbox" 
                        id="topic-${topic.replace(/\s+/g, '-')}" 
                        ${isCompleted ? 'checked' : ''}
                        data-topic="${topic}">
                    <label class="form-check-label" for="topic-${topic.replace(/\s+/g, '-')}">
                        ${topic}
                    </label>
                </div>
                <div class="topic-actions">
                    <button class="btn btn-sm btn-outline-secondary study-topic-btn" data-topic="${topic}">
                        <i class="bi bi-stopwatch"></i> Study
                    </button>
                    ${subject.customTopics?.includes(topic) ? `
                    <button class="btn btn-sm btn-outline-danger delete-topic-btn" data-topic="${topic}">
                        <i class="bi bi-trash"></i>
                    </button>
                    ` : ''}
                </div>
            `;
            topicsList.appendChild(topicItem);
        });

        // Add event listeners for checkboxes
        document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const topic = this.dataset.topic;
                if (this.checked) {
                    // Mark topic as complete by adding a study session
                    if (!userData.studySessions.some(
                        session => session.subject === subjectName && session.topic === topic
                    )) {
                        userData.studySessions.push({
                            date: new Date().toISOString(),
                            subject: subjectName,
                            topic: topic,
                            duration: 0 // 0 duration indicates manual completion
                        });
                        saveUserData();
                    }
                } else {
                    // Remove completion mark
                    userData.studySessions = userData.studySessions.filter(
                        session => !(session.subject === subjectName && session.topic === topic)
                    );
                    saveUserData();
                }

                // Update progress display
                updateCompletionDisplay(subjectName);
            });
        });

        // Add event listener for "Study Now" buttons
        document.querySelectorAll('.study-topic-btn').forEach(button => {
            button.addEventListener('click', function () {
                const topic = this.dataset.topic;
                // Set the subject and topic in the tracker
                subjectSelect.value = subjectName;
                updateTopicSelect(subjectName);
                topicSelect.value = topic;
                // Switch to tracker tab
                document.querySelector('[data-target="tracker"]').click();
            });
        });

        // Add event listener for "Delete Topic" buttons (only for custom topics)
        document.querySelectorAll('.delete-topic-btn').forEach(button => {
            button.addEventListener('click', function () {
                const topic = this.dataset.topic;
                if (confirm(`Are you sure you want to delete the topic "${topic}"?`)) {
                    // Remove from custom topics
                    subject.customTopics = subject.customTopics.filter(t => t !== topic);

                    // Remove any study sessions for this topic
                    userData.studySessions = userData.studySessions.filter(
                        session => !(session.subject === subjectName && session.topic === topic)
                    );

                    saveUserData();

                    // Refresh the view
                    showSubjectDetails(subjectName);
                }
            });
        });
    }

    // Add event listener for "Mark All Complete" button
    document.getElementById('markAllComplete')?.addEventListener('click', function () {
        const allTopics = [...(subjectData.topics || []), ...(subject.customTopics || [])];
        allTopics.forEach(topic => {
            if (!userData.studySessions.some(
                session => session.subject === subjectName && session.topic === topic
            )) {
                userData.studySessions.push({
                    date: new Date().toISOString(),
                    subject: subjectName,
                    topic: topic,
                    duration: 0
                });
            }
        });
        saveUserData();

        // Update UI
        updateCompletionDisplay(subjectName);
    });

    // Add event listeners for topic management
    document.getElementById('addCustomTopic')?.addEventListener('click', function () {
        document.getElementById('addTopicForm').classList.remove('d-none');
        document.getElementById('newTopicName').focus();
    });

    document.getElementById('cancelAddTopic')?.addEventListener('click', function () {
        document.getElementById('addTopicForm').classList.add('d-none');
        document.getElementById('newTopicName').value = '';
    });

    document.getElementById('saveNewTopic')?.addEventListener('click', function () {
        const topicName = document.getElementById('newTopicName').value.trim();
        if (topicName) {
            // Add to custom topics
            if (!subject.customTopics) {
                subject.customTopics = [];
            }

            // Check if topic already exists
            const allTopics = [...(subjectData.topics || []), ...(subject.customTopics || [])];
            if (allTopics.includes(topicName)) {
                alert('This topic already exists!');
                return;
            }

            subject.customTopics.push(topicName);
            saveUserData();

            // Reset and hide the form
            document.getElementById('newTopicName').value = '';
            document.getElementById('addTopicForm').classList.add('d-none');

            // Refresh the view
            showSubjectDetails(subjectName);
        }
    });

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger mt-3';
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Delete Subject';
    deleteBtn.id = 'deleteSubjectBtn';
    contentDiv.appendChild(deleteBtn);

    // Add delete functionality
    deleteBtn.addEventListener('click', () => {
        deleteSubjectModal.show();
    });
}

// Helper function to update completion display
function updateCompletionDisplay(subjectName) {
    const completion = calculateTopicCompletion(subjectName);
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${completion}%`;
        progressFill.style.backgroundColor = getProgressColor(completion);
    }
    const progressInfo = document.querySelector('.progress-info span');
    if (progressInfo) {
        progressInfo.textContent = `Progress: ${completion}%`;
    }
    const completionPercentageElement = document.getElementById('completionPercentage');
    if (completionPercentageElement) {
        completionPercentageElement.textContent = `${completion}%`;
    }

    // Update all checkboxes
    const subject = userData.subjects.find(s => s.name === subjectName);
    const subjectData = gcseSubjects[subjectName] || {};
    const allTopics = [...(subjectData.topics || []), ...(subject.customTopics || [])];

    document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
        const topic = checkbox.dataset.topic;
        checkbox.checked = userData.studySessions.some(
            session => session.subject === subjectName && session.topic === topic
        );
    });
}
// Helper function to get progress color based on percentage
function getProgressColor(percentage) {
    if (percentage >= 80) return '#28a745'; // Green
    if (percentage >= 50) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
}

// Calculate topic completion percentage
function calculateTopicCompletion(subjectName) {
    const subject = userData.subjects.find(s => s.name === subjectName);
    const subjectData = gcseSubjects[subjectName];

    if (!subject || !subjectData || !subjectData.topics) return 0;

    const completedTopics = subjectData.topics.filter(topic => {
        return userData.studySessions.some(
            session => session.subject === subjectName && session.topic === topic
        );
    }).length;

    const completionPercentage = Math.round((completedTopics / subjectData.topics.length) * 100);
    return isNaN(completionPercentage) ? 0 : completionPercentage;
}

// Populate subject selects
function populateSubjectSelects() {
    // Clear existing options
    subjectSelect.innerHTML = '<option value="" disabled selected>Select subject</option>';

    // Add subjects to dropdown
    userData.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.displayName || subject.name;
        subjectSelect.appendChild(option);
    });
}

// Update topic select based on subject
function updateTopicSelect(subjectName) {
    topicSelect.innerHTML = '<option value="" selected>All topics</option>';

    if (subjectName && gcseSubjects[subjectName]) {
        topicSelect.disabled = false;
        gcseSubjects[subjectName].topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicSelect.appendChild(option);
        });
    } else {
        topicSelect.disabled = true;
    }
}

// Render subjects list
function renderSubjects() {
    if (userData.subjects.length === 0) {
        subjectAccordion.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-journal-bookmark"></i>
                <h3>No subjects added</h3>
                <p>Add your first subject to get started</p>
            </div>
        `;
        document.querySelector('.subject-details').innerHTML = `
            <div class="empty-state">
                <i class="bi bi-journal-bookmark"></i>
                <h3>Select a subject</h3>
                <p>Choose a subject from the list to view details</p>
            </div>
        `;
        return;
    }

    subjectAccordion.innerHTML = '';
    userData.subjects.forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        subjectItem.dataset.subjectId = subject.name;
        subjectItem.innerHTML = `
            <div class="subject-name">${subject.displayName || subject.name}</div>
            <div class="subject-exam-board">${subject.examBoard || 'Not specified'}</div>
        `;

        // Add click event to show details
        subjectItem.addEventListener('click', () => {
            document.querySelectorAll('.subject-item').forEach(item => {
                item.classList.remove('selected');
            });
            subjectItem.classList.add('selected');
            selectedSubject = subject.name;
            showSubjectDetails(subject.name);
        });

        subjectAccordion.appendChild(subjectItem);
    });
}

// Render recent sessions
function renderRecentSessions() {
    if (userData.studySessions.length === 0) {
        sessionsTableBody.innerHTML = `
            <tr class="no-sessions">
                <td colspan="3" class="text-center">No sessions recorded yet</td>
            </tr>
        `;
        return;
    }

    // Sort sessions by date (newest first)
    const sortedSessions = [...userData.studySessions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // Show only the 5 most recent sessions
    const recentSessions = sortedSessions.slice(0, 5);

    sessionsTableBody.innerHTML = '';
    recentSessions.forEach((session, index) => {
        const row = document.createElement('tr');
        row.dataset.sessionId = index;

        const dateCell = document.createElement('td');
        dateCell.textContent = new Date(session.date).toLocaleDateString();

        const subjectCell = document.createElement('td');
        const subject = userData.subjects.find(s => s.name === session.subject);
        subjectCell.textContent = subject ? subject.displayName || subject.name : session.subject;

        const durationCell = document.createElement('td');
        const hours = Math.floor(session.duration / 3600);
        const minutes = Math.floor((session.duration % 3600) / 60);
        durationCell.textContent = `${hours}h ${minutes}m`;

        row.appendChild(dateCell);
        row.appendChild(subjectCell);
        row.appendChild(durationCell);
        sessionsTableBody.appendChild(row);
    });
}

// Update dashboard stats
function updateDashboardStats() {
    // Weekly hours
    const weeklyHours = calculateWeeklyHours();
    weeklyHoursElement.textContent = weeklyHours.toFixed(1);

    // Weekly change (placeholder - would need previous week's data)
    weeklyChangeElement.innerHTML = '<i class="bi bi-dash"></i> No comparison data';

    // Completion rate
    const completionRate = calculateCompletionRate();
    completionRateElement.textContent = `${completionRate}%`;
    completionBarElement.style.width = `${completionRate}%`;

    // Behind subjects (placeholder logic)
    behindSubjectsElement.textContent = '0';
    behindSubjectsTextElement.textContent = 'All caught up';

    // Total sessions this month
    const thisMonthSessions = userData.studySessions.filter(session => {
        const sessionDate = new Date(session.date);
        const now = new Date();
        return sessionDate.getMonth() === now.getMonth() &&
            sessionDate.getFullYear() === now.getFullYear();
    }).length;

    totalSessionsElement.textContent = thisMonthSessions;
}

// Calculate weekly study hours
function calculateWeeklyHours() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return userData.studySessions.reduce((total, session) => {
        const sessionDate = new Date(session.date);
        if (sessionDate >= oneWeekAgo) {
            return total + (session.duration / 3600);
        }
        return total;
    }, 0);
}

// Calculate topic completion rate
function calculateCompletionRate() {
    if (userData.subjects.length === 0) return 0;

    let totalTopics = 0;
    let completedTopics = 0;

    userData.subjects.forEach(subject => {
        const subjectData = gcseSubjects[subject.name];
        if (subjectData && subjectData.topics) {
            totalTopics += subjectData.topics.length;
            completedTopics += subjectData.topics.filter(topic => {
                return userData.studySessions.some(
                    session => session.subject === subject.name && session.topic === topic
                );
            }).length;
        }
    });

    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
}

// User profile functions
function openUserProfileModal() {
    // Load current profile data
    userNameInput.value = userData.userProfile.name || 'Student';
    gcseDateInput.value = userData.userProfile.gcseDate || '';

    // Set avatar preview
    if (userData.userProfile.avatar) {
        avatarImage.src = userData.userProfile.avatar;
        avatarImage.classList.remove('d-none');
        avatarInitials.classList.add('d-none');
    } else {
        avatarInitials.textContent = userData.userProfile.initials || 'JS';
        avatarInitials.classList.remove('d-none');
        avatarImage.classList.add('d-none');
    }

    userProfileModal.show();
}
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            avatarImage.src = event.target.result;
            avatarImage.classList.remove('d-none');
            avatarInitials.classList.add('d-none');
        };
        reader.readAsDataURL(file);
    }
}

function generateAvatarFromInitials() {
    const name = userNameInput.value.trim() || "Student";
    const initials = getInitials(name);

    avatarInitials.textContent = initials;
    avatarInitials.classList.remove('d-none');
    avatarImage.classList.add('d-none');
    avatarInput.value = ''; // Clear file input
}

function getInitials(name) {
    return name.split(' ')
        .map(part => part[0]?.toUpperCase() || '')
        .join('')
        .substring(0, 2);
}

function saveUserProfile() {
    const name = userNameInput.value.trim();
    const gcseDate = gcseDateInput.value;

    if (!name) {
        alert('Please enter your name');
        return;
    }

    // Update user data
    userData.userProfile.name = name;
    userData.userProfile.gcseDate = gcseDate;
    userData.userProfile.initials = getInitials(name);

    // Save avatar if uploaded
    if (avatarImage.src && !avatarImage.classList.contains('d-none')) {
        userData.userProfile.avatar = avatarImage.src;
    } else {
        userData.userProfile.avatar = null;
    }

    saveUserData();
    updateUserProfileDisplay();
    userProfileModal.hide();
}
function updateUserProfileDisplay() {
    const avatar = document.querySelector('.user-profile .avatar');
    const username = document.querySelector('.user-profile .username');
    const userRole = document.querySelector('.user-profile .user-role');

    if (!avatar || !username || !userRole) return;

    // Update avatar
    if (userData.userProfile.avatar) {
        avatar.innerHTML = `<img src="${userData.userProfile.avatar}" alt="Profile" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
        avatar.textContent = userData.userProfile.initials || 'JS';
        avatar.style.backgroundColor = getRandomColor();
    }

    // Update name and role
    username.textContent = userData.userProfile.name || 'Student';
    userRole.textContent = `GCSE${userData.userProfile.gcseDate ? ` (${formatGCSEDate(userData.userProfile.gcseDate)})` : ''}`;
}

function formatGCSEDate(dateString) {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getRandomColor() {
    const colors = ['#4361ee', '#3f37c9', '#4cc9f0', '#4895ef', '#f72585', '#7209b7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Chart functions
function renderCharts() {
    renderWeeklyTimeChart();
    renderSubjectProgressChart();
    renderSubjectTimeChart();
    renderWeeklyProgressChart();
    renderTopicCompletionChart();
}
// Weekly Study Time Chart
function renderWeeklyTimeChart() {
    const ctx = document.getElementById('weeklyTimeChart').getContext('2d');

    // Destroy previous chart if it exists
    if (weeklyTimeChart) {
        weeklyTimeChart.destroy();
    }

    // Get data for the last 7 days
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        return {
            date,
            day: days[date.getDay()],
            hours: 0
        };
    });

    // Calculate hours for each day
    userData.studySessions.forEach(session => {
        const sessionDate = new Date(session.date);
        const dayDiff = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24));

        if (dayDiff <= 6) {
            const index = 6 - dayDiff;
            last7Days[index].hours += (session.duration / 3600);
        }
    });

    weeklyTimeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: last7Days.map(day => day.day),
            datasets: [{
                label: 'Study Hours',
                data: last7Days.map(day => day.hours),
                backgroundColor: '#4e73df',
                borderColor: '#2e59d9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Day of Week'
                    }
                }
            }
        }
    });
}

// Subject Progress Chart
function renderSubjectProgressChart() {
    const ctx = document.getElementById('subjectProgressChart').getContext('2d');

    if (subjectProgressChart) {
        subjectProgressChart.destroy();
    }

    const subjects = userData.subjects.map(subject => {
        return {
            name: subject.displayName || subject.name,
            completion: calculateTopicCompletion(subject.name)
        };
    });

    subjectProgressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: subjects.map(subject => subject.name),
            datasets: [{
                data: subjects.map(subject => subject.completion),
                backgroundColor: [
                    '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
                    '#e74a3b', '#858796', '#5a5c69', '#2e59d9'
                ],
                hoverBackgroundColor: [
                    '#2e59d9', '#17a673', '#2c9faf', '#dda20a',
                    '#be2617', '#6b6d7d', '#42444e', '#1c3ca8'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Subject Time Distribution Chart
function renderSubjectTimeChart() {
    const ctx = document.getElementById('subjectTimeChart').getContext('2d');

    if (subjectTimeChart) {
        subjectTimeChart.destroy();
    }

    const subjectHours = {};
    userData.studySessions.forEach(session => {
        const subject = session.subject;
        const hours = session.duration / 3600;
        subjectHours[subject] = (subjectHours[subject] || 0) + hours;
    });

    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];

    let colorIndex = 0;
    const colors = [
        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
        '#e74a3b', '#858796', '#5a5c69', '#2e59d9'
    ];

    userData.subjects.forEach(subject => {
        if (subjectHours[subject.name]) {
            labels.push(subject.displayName || subject.name);
            data.push(subjectHours[subject.name]);
            backgroundColors.push(colors[colorIndex % colors.length]);
            borderColors.push(colors[(colorIndex + 4) % colors.length]);
            colorIndex++;
        }
    });

    // If no data, show empty state
    if (data.length === 0) {
        document.getElementById('subjectTimeChart').parentElement.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-pie-chart"></i>
                <p>No study data available yet</p>
            </div>
        `;
        return;
    }

    subjectTimeChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw.toFixed(1)}h`;
                        }
                    }
                }
            }
        }
    });
}

// Weekly Progress Chart
function renderWeeklyProgressChart() {
    const ctx = document.getElementById('weeklyProgressChart').getContext('2d');

    if (weeklyProgressChart) {
        weeklyProgressChart.destroy();
    }

    // Get data for the last 4 weeks
    const now = new Date();
    const weeks = Array.from({ length: 4 }, (_, i) => {
        return {
            week: i + 1,
            hours: 0
        };
    });

    // Calculate hours for each week
    userData.studySessions.forEach(session => {
        const sessionDate = new Date(session.date);
        const weekDiff = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24 * 7));

        if (weekDiff < 4) {
            weeks[3 - weekDiff].hours += (session.duration / 3600);
        }
    });

    weeklyProgressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeks.map((_, i) => `Week ${4 - i}`).reverse(),
            datasets: [{
                label: 'Study Hours',
                data: weeks.map(week => week.hours).reverse(),
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: '#4e73df',
                pointBackgroundColor: '#4e73df',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4e73df',
                pointRadius: 4,
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Week'
                    }
                }
            }
        }
    });
}

// Topic Completion Chart
function renderTopicCompletionChart() {
    const ctx = document.getElementById('topicCompletionChart').getContext('2d');

    if (topicCompletionChart) {
        topicCompletionChart.destroy();
    }

    const subjects = userData.subjects.map(subject => {
        return {
            name: subject.displayName || subject.name,
            completion: calculateTopicCompletion(subject.name)
        };
    }).filter(subject => subject.completion > 0);

    // If no data, show empty state
    if (subjects.length === 0) {
        document.getElementById('topicCompletionChart').parentElement.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-bar-chart"></i>
                <p>No topic completion data available yet</p>
            </div>
        `;
        return;
    }

    topicCompletionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects.map(subject => subject.name),
            datasets: [{
                label: 'Completion %',
                data: subjects.map(subject => subject.completion),
                backgroundColor: '#1cc88a',
                borderColor: '#17a673',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Completion %'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Subject'
                    }
                }
            }
        }
    });
}

// Resources Tab Functionality
function setupResourcesTab() {
    // Category switching
    document.querySelectorAll('.resource-categories .category').forEach(category => {
        category.addEventListener('click', function () {
            document.querySelectorAll('.resource-categories .category').forEach(c => {
                c.classList.remove('active');
            });
            this.classList.add('active');

            const categoryId = this.dataset.category;
            document.querySelectorAll('.resource-category').forEach(cat => {
                cat.classList.remove('active');
            });
            document.getElementById(categoryId).classList.add('active');
        });
    });

    // Open all resources button
    document.getElementById('openAllResources')?.addEventListener('click', function () {
        document.querySelectorAll('.resource-card').forEach(card => {
            if (card.closest('.resource-category.active')) {
                window.open(card.href, '_blank');
            }
        });
    });
}

// Timetable Functions
function renderTimetableSubjects() {
    subjectCards.innerHTML = '';

    if (userData.subjects.length === 0) {
        subjectCards.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-book"></i>
                <p>Add subjects first in the Subjects tab</p>
            </div>
        `;
        return;
    }

    userData.subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.dataset.subject = subject.name;
        card.draggable = true;
        card.innerHTML = `
            <div class="subject-card-inner">
                ${subject.displayName || subject.name}
            </div>
        `;

        // Add drag events
        card.addEventListener('dragstart', dragStart);

        subjectCards.appendChild(card);
    });
}

function renderTimetableGrid() {
    timetableBody.innerHTML = '';

    // Create time slots from 8am to 8pm
    for (let hour = 8; hour <= 20; hour++) {
        const row = document.createElement('div');
        row.className = 'timetable-row';

        // Time cell
        const timeCell = document.createElement('div');
        timeCell.className = 'timetable-cell time-cell';
        timeCell.textContent = `${hour}:00`;
        row.appendChild(timeCell);

        // Day cells (Monday to Friday)
        for (let day = 1; day <= 5; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'timetable-cell day-cell';
            dayCell.dataset.day = day;
            dayCell.dataset.hour = hour;

            // Add drop events
            dayCell.addEventListener('dragover', dragOver);
            dayCell.addEventListener('drop', drop);
            dayCell.addEventListener('dragleave', dragLeave);

            // Check if this slot has a scheduled subject
            const timetableKey = `${day}-${hour}`;
            if (userData.timetable && userData.timetable[timetableKey]) {
                const subjectName = userData.timetable[timetableKey];
                const subject = userData.subjects.find(s => s.name === subjectName);

                if (subject) {
                    const subjectBlock = document.createElement('div');
                    subjectBlock.className = 'timetable-subject-block';
                    subjectBlock.textContent = subject.displayName || subject.name;
                    subjectBlock.dataset.subject = subjectName;
                    subjectBlock.draggable = true;
                    subjectBlock.addEventListener('dragstart', dragStart);
                    dayCell.appendChild(subjectBlock);
                }
            }

            row.appendChild(dayCell);
        }

        timetableBody.appendChild(row);
    }
}

// Drag and Drop Functions
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.subject || e.target.parentElement.dataset.subject);
    e.target.classList.add('dragging');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const subject = e.dataTransfer.getData('text/plain');
    const day = e.target.dataset.day;
    const hour = e.target.dataset.hour;

    if (subject && day && hour) {
        // Update timetable data
        if (!userData.timetable) {
            userData.timetable = {};
        }

        const timetableKey = `${day}-${hour}`;
        userData.timetable[timetableKey] = subject;

        // Update UI
        renderTimetableGrid();
    }
}

function saveTimetable() {
    saveUserData();
    alert('Timetable saved successfully!');
}

function resetTimetable() {
    if (confirm('Are you sure you want to reset the timetable? This cannot be undone.')) {
        userData.timetable = {};
        saveUserData();
        renderTimetableGrid();
    }
}
function initTimingTools() {
    setupStopwatch();
    setupCountdown();
}
function setupStopwatch() {
    document.getElementById('stopwatchStart').addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPause').addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchReset').addEventListener('click', resetStopwatch);
    document.getElementById('stopwatchLap').addEventListener('click', recordLap);
}

function setupCountdown() {
    document.getElementById('countdownStart').addEventListener('click', startCountdown);
    document.getElementById('countdownPause').addEventListener('click', pauseCountdown);
    document.getElementById('countdownReset').addEventListener('click', resetCountdown);
    document.getElementById('stopAlarmButton').addEventListener('click', stopAlarm);
}

// Stopwatch Functions
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);

        document.getElementById('stopwatchStart').disabled = true;
        document.getElementById('stopwatchPause').disabled = false;
    }
}

function pauseStopwatch() {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);

        document.getElementById('stopwatchStart').disabled = false;
        document.getElementById('stopwatchPause').disabled = true;
    }
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
    document.getElementById('stopwatchLapList').innerHTML = '';

    document.getElementById('stopwatchStart').disabled = false;
    document.getElementById('stopwatchPause').disabled = true;
}

function updateStopwatchDisplay() {
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    const seconds = Math.floor((stopwatchTime / 1000) % 60);
    const minutes = Math.floor((stopwatchTime / (1000 * 60)) % 60);
    const hours = Math.floor((stopwatchTime / (1000 * 60 * 60)) % 24);

    document.getElementById('stopwatchDisplay').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function recordLap() {
    if (stopwatchRunning) {
        const lapTime = document.getElementById('stopwatchDisplay').textContent;
        const lapList = document.getElementById('stopwatchLapList');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.prepend(lapItem);
    }
}

// Countdown Timer Functions
function startCountdown() {
    if (!countdownRunning) {
        // Get input values if countdown isn't already running
        if (countdownTime === 0) {
            const hours = parseInt(document.getElementById('hoursInput').value) || 0;
            const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
            const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

            countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

            if (countdownTime <= 0) {
                alert('Please set a valid time');
                return;
            }
        }

        countdownRunning = true;
        const endTime = Date.now() + countdownTime;

        countdownInterval = setInterval(() => {
            countdownTime = endTime - Date.now();

            if (countdownTime <= 0) {
                countdownComplete();
                return;
            }

            updateCountdownDisplay();
        }, 100);

        document.getElementById('countdownStart').disabled = true;
        document.getElementById('countdownPause').disabled = false;
        document.getElementById('countdownReset').disabled = false;
        document.getElementById('countdownAlarm').style.display = 'none';
    }
}

function pauseCountdown() {
    if (countdownRunning) {
        countdownRunning = false;
        clearInterval(countdownInterval);

        document.getElementById('countdownStart').disabled = false;
        document.getElementById('countdownPause').disabled = true;
    }
}

function resetCountdown() {
    countdownRunning = false;
    clearInterval(countdownInterval);
    countdownTime = 0;
    updateCountdownDisplay();

    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
    document.getElementById('countdownStart').disabled = false;
    document.getElementById('countdownPause').disabled = true;
    document.getElementById('countdownAlarm').style.display = 'none';

    // Stop any ongoing alarm
    stopAlarm();
}

function updateCountdownDisplay() {
    const seconds = Math.floor((countdownTime / 1000) % 60);
    const minutes = Math.floor((countdownTime / (1000 * 60)) % 60);
    const hours = Math.floor((countdownTime / (1000 * 60 * 60)) % 24);

    document.getElementById('countdownDisplay').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function countdownComplete() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTime = 0;
    document.getElementById('countdownDisplay').textContent = '00:00:00';
    document.getElementById('countdownAlarm').style.display = 'flex';

    // Start the alarm
    playAlarm();

    // Enable the start button
    document.getElementById('countdownStart').disabled = false;
    document.getElementById('countdownPause').disabled = true;
}

function playAlarm() {
    try {
        alarmSound.currentTime = 0;
        alarmSound.loop = true;
        alarmSound.play().catch(e => {
            console.error("Alarm play failed:", e);
            // Fallback to using the browser's AudioContext
            playAlarmFallback();
        });
    } catch (e) {
        console.error("Alarm error:", e);
        playAlarmFallback();
    }
}

function playAlarmFallback() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.5;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();

        // Store the oscillator so we can stop it later
        alarmInterval = {
            stop: () => {
                oscillator.stop();
                gainNode.disconnect();
            }
        };
    } catch (e) {
        console.error("Web Audio API failed:", e);
        // Final fallback - just show the visual alarm
    }
}

function stopAlarm() {
    // Stop the alarm sound
    try {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmSound.loop = false;
    } catch (e) {
        console.error("Error stopping alarm:", e);
    }

    // Stop the fallback alarm if it's running
    if (alarmInterval && typeof alarmInterval.stop === 'function') {
        alarmInterval.stop();
    }

    // Hide the alarm display
    document.getElementById('countdownAlarm').style.display = 'none';
}
// Resource Management Functions
function setupResourceModal() {
    const addResourceBtn = document.getElementById('addResourceBtn');
    const resourceModal = new bootstrap.Modal(document.getElementById('resourceModal'));
    const saveResourceBtn = document.getElementById('saveResourceBtn');
    const resourceForm = document.getElementById('resourceForm');
    const resourceList = document.getElementById('resourceList');

    // Initialize userData.resources if it doesn't exist
    if (!userData.resources) {
        userData.resources = {
            websites: [],
            documents: [],
            videos: [],
            other: []
        };
        saveUserData();
    }

    // Add Resource button click handler
    addResourceBtn?.addEventListener('click', () => {
        resourceForm.reset();
        resourceModal.show();
    });

    // Save Resource button click handler
    saveResourceBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        saveResource();
        resourceModal.hide();
    });

    // Render existing resources
    renderResources();
}

function saveResource() {
    const resourceName = document.getElementById('resourceName').value.trim();
    const resourceUrl = document.getElementById('resourceUrl').value.trim();
    const resourceCategory = document.getElementById('resourceCategory').value;
    const resourceDescription = document.getElementById('resourceDescription').value.trim();

    if (!resourceName || !resourceUrl) {
        alert('Please provide both a name and URL for the resource');
        return;
    }

    // Validate URL format and add https:// if missing
    let processedUrl = resourceUrl;
    if (!/^https?:\/\//i.test(resourceUrl)) {
        processedUrl = 'https://' + resourceUrl;
    }

    try {
        new URL(processedUrl);
    } catch (e) {
        alert('Please enter a valid URL');
        return;
    }

    const newResource = {
        name: resourceName,
        url: processedUrl,
        description: resourceDescription,
        dateAdded: new Date().toISOString()
    };

    // Initialize category array if it doesn't exist
    if (!userData.resources[resourceCategory]) {
        userData.resources[resourceCategory] = [];
    }

    userData.resources[resourceCategory].unshift(newResource); // Add to beginning of array
    saveUserData();
    renderResources();
}

function renderResources() {
    const categories = ['websites', 'documents', 'videos', 'other'];

    categories.forEach(category => {
        const container = document.getElementById(`${category}Resources`);
        if (!container) return;

        // Clear existing cards but preserve the category header
        const header = container.querySelector('.category-header');
        container.innerHTML = '';
        if (header) container.appendChild(header);

        if (!userData.resources[category] || userData.resources[category].length === 0) {
            container.innerHTML += `
                <div class="empty-state">
                    <i class="bi bi-info-circle"></i>
                    <p>No ${category} resources added yet</p>
                </div>
            `;
            return;
        }

        userData.resources[category].forEach((resource, index) => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.innerHTML = `
                <a href="${resource.url}" target="_blank" class="resource-link">
                    <div class="resource-card-header">
                        <div class="resource-icon">
                            ${getResourceIcon(category)}
                        </div>
                        <h5>${resource.name}</h5>
                    </div>
                    <p class="resource-description">${resource.description || 'No description provided'}</p>
                    <div class="resource-footer">
                        <small class="text-muted">Added: ${new Date(resource.dateAdded).toLocaleDateString()}</small>
                    </div>
                </a>
                <button class="btn btn-sm btn-outline-danger delete-resource" data-category="${category}" data-index="${index}">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            container.appendChild(resourceCard);
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-resource').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const category = this.dataset.category;
            const index = parseInt(this.dataset.index);
            deleteResource(category, index);
        });
    });
}

function getResourceIcon(category) {
    const icons = {
        'websites': '<i class="bi bi-globe"></i>',
        'documents': '<i class="bi bi-file-earmark-text"></i>',
        'videos': '<i class="bi bi-film"></i>',
        'other': '<i class="bi bi-link-45deg"></i>'
    };
    return icons[category] || icons['other'];
}

function deleteResource(category, index) {
    if (confirm('Are you sure you want to delete this resource?')) {
        userData.resources[category].splice(index, 1);
        saveUserData();
        renderResources();
    }
}
// Wellbeing Module
// Wellbeing Module
const WellbeingManager = {
    // Initialize all wellbeing features
    init() {
        if (!userData.wellbeing) {
            userData.wellbeing = {
                breakReminders: true,
                reminderInterval: 50,
                lastBreakTime: null,
                mindfulnessDuration: 5,
                wakeUpTime: '07:00',
                sleepCycles: 5
            };
            saveUserData();
        }
        this.updateUIFromPreferences();
        this.setupEventListeners();

        // Start break reminders if enabled
        if (userData.wellbeing.breakReminders) {
            this.startBreakReminder();
        }
    },

    // Update UI based on saved preferences
    updateUIFromPreferences() {
        const { wellbeing } = userData;
        if (wellbeing) {
            document.getElementById('breakRemindersSwitch').checked = wellbeing.breakReminders;
            document.getElementById('reminderInterval').value = wellbeing.reminderInterval;
            document.getElementById('mindfulnessDuration').value = wellbeing.mindfulnessDuration;
            document.getElementById('wakeUpTime').value = wellbeing.wakeUpTime;
            document.getElementById('sleepCycles').value = wellbeing.sleepCycles;
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Break reminders
        const breakRemindersSwitch = document.getElementById('breakRemindersSwitch');
        if (breakRemindersSwitch) {
            breakRemindersSwitch.addEventListener('change', (e) => {
                userData.wellbeing.breakReminders = e.target.checked;
                saveUserData();
                if (e.target.checked) this.startBreakReminder();
                else this.stopBreakReminder();
            });
        }

        const reminderInterval = document.getElementById('reminderInterval');
        if (reminderInterval) {
            reminderInterval.addEventListener('change', (e) => {
                userData.wellbeing.reminderInterval = parseInt(e.target.value);
                saveUserData();
                if (userData.wellbeing.breakReminders) {
                    this.restartBreakReminder();
                }
            });
        }

        const takeBreakNowBtn = document.getElementById('takeBreakNowBtn');
        if (takeBreakNowBtn) {
            takeBreakNowBtn.addEventListener('click', () => {
                this.showBreakReminder(true);
            });
        }

        // Mindfulness timer
        const startMindfulnessBtn = document.getElementById('startMindfulnessBtn');
        if (startMindfulnessBtn) {
            startMindfulnessBtn.addEventListener('click', () => {
                this.startMindfulnessTimer();
            });
        }

        const stopMindfulnessBtn = document.getElementById('stopMindfulnessBtn');
        if (stopMindfulnessBtn) {
            stopMindfulnessBtn.addEventListener('click', () => {
                this.stopMindfulnessTimer();
            });
        }

        const mindfulnessDuration = document.getElementById('mindfulnessDuration');
        if (mindfulnessDuration) {
            mindfulnessDuration.addEventListener('change', (e) => {
                userData.wellbeing.mindfulnessDuration = parseInt(e.target.value);
                saveUserData();
                this.updateMindfulnessDisplay();
            });
        }

        // Sleep calculator
        const calculateSleepBtn = document.getElementById('calculateSleepBtn');
        if (calculateSleepBtn) {
            calculateSleepBtn.addEventListener('click', () => {
                this.calculateOptimalSleepTimes();
            });
        }

        const saveSleepPrefsBtn = document.getElementById('saveSleepPrefsBtn');
        if (saveSleepPrefsBtn) {
            saveSleepPrefsBtn.addEventListener('click', () => {
                this.saveSleepPreferences();
            });
        }
    },

    // Break reminder system
    breakInterval: null,
    startBreakReminder() {
        this.stopBreakReminder();
        this.breakInterval = setInterval(() => {
            const now = new Date();
            const lastBreak = userData.wellbeing.lastBreakTime ? new Date(userData.wellbeing.lastBreakTime) : null;

            if (!lastBreak || (now - lastBreak) >= userData.wellbeing.reminderInterval * 60 * 1000) {
                this.showBreakReminder();
                userData.wellbeing.lastBreakTime = now.toISOString();
                saveUserData();
            }
        }, 60000); // Check every minute
    },

    stopBreakReminder() {
        if (this.breakInterval) {
            clearInterval(this.breakInterval);
            this.breakInterval = null;
        }
    },

    restartBreakReminder() {
        this.stopBreakReminder();
        this.startBreakReminder();
    },

    showBreakReminder(manual = false) {
        const stretches = [
            "Neck Rolls: Slowly roll your head in circles 5 times each direction",
            "Shoulder Shrugs: Lift shoulders up and down 10 times",
            "Stand and Stretch: Reach up high, then touch your toes",
            "Eye Rest: Look away from screen and focus on distant object for 30 seconds",
            "Wrist Circles: Rotate wrists 10 times each direction"
        ];

        const exercise = stretches[Math.floor(Math.random() * stretches.length)];
        const title = manual ? "Recommended Break" : "Time for a Break!";
        const message = manual ?
            "Here's a good exercise to refresh yourself:" :
            `You've been studying for ${userData.wellbeing.reminderInterval} minutes. Try this exercise:`;

        // Create modal if it doesn't exist
        if (!document.getElementById('breakReminderModal')) {
            const modalHTML = `
                <div class="modal fade" id="breakReminderModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>${message}</p>
                                <div class="alert alert-info">${exercise}</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Update modal content
        document.getElementById('breakReminderModal').querySelector('.modal-title').textContent = title;
        document.getElementById('breakReminderModal').querySelector('.modal-body p').textContent = message;
        document.getElementById('breakReminderModal').querySelector('.alert').textContent = exercise;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('breakReminderModal'));
        modal.show();
    },

    // Mindfulness timer
    mindfulnessInterval: null,
    mindfulnessTimeLeft: 0,
    startMindfulnessTimer() {
        this.stopMindfulnessTimer();
        this.mindfulnessTimeLeft = userData.wellbeing.mindfulnessDuration * 60;

        this.updateMindfulnessDisplay();
        document.getElementById('startMindfulnessBtn').disabled = true;
        document.getElementById('stopMindfulnessBtn').disabled = false;

        this.mindfulnessInterval = setInterval(() => {
            this.mindfulnessTimeLeft--;
            this.updateMindfulnessDisplay();

            if (this.mindfulnessTimeLeft <= 0) {
                this.stopMindfulnessTimer();
                this.showMindfulnessComplete();
            }
        }, 1000);
    },

    stopMindfulnessTimer() {
        if (this.mindfulnessInterval) {
            clearInterval(this.mindfulnessInterval);
            this.mindfulnessInterval = null;
        }
        const startBtn = document.getElementById('startMindfulnessBtn');
        const stopBtn = document.getElementById('stopMindfulnessBtn');
        if (startBtn) startBtn.disabled = false;
        if (stopBtn) stopBtn.disabled = true;
    },

    updateMindfulnessDisplay() {
        const minutes = Math.floor(this.mindfulnessTimeLeft / 60);
        const seconds = this.mindfulnessTimeLeft % 60;
        const display = document.getElementById('mindfulnessDisplay');
        if (display) {
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    showMindfulnessComplete() {
        const breaths = [
            "Deep Breathing: Inhale for 4s, hold for 4s, exhale for 6s",
            "Box Breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s",
            "4-7-8 Breathing: Inhale 4s, hold 7s, exhale 8s"
        ];

        const exercise = breaths[Math.floor(Math.random() * breaths.length)];

        // Create modal if it doesn't exist
        if (!document.getElementById('mindfulnessCompleteModal')) {
            const modalHTML = `
                <div class="modal fade" id="mindfulnessCompleteModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-success text-white">
                                <h5 class="modal-title">Mindfulness Session Complete</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>Great job! Try this breathing exercise:</p>
                                <div class="alert alert-success">${exercise}</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        } else {
            // Update modal content
            document.getElementById('mindfulnessCompleteModal').querySelector('.alert').textContent = exercise;
        }

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('mindfulnessCompleteModal'));
        modal.show();
    },

    // Sleep calculator
    calculateOptimalSleepTimes() {
        const wakeUpTime = document.getElementById('wakeUpTime').value;
        const cycles = parseInt(document.getElementById('sleepCycles').value);

        if (!wakeUpTime || isNaN(cycles) || cycles < 1 || cycles > 6) {
            alert('Please enter valid wake-up time and sleep cycles (1-6)');
            return;
        }

        const [hours, minutes] = wakeUpTime.split(':').map(Number);
        const wakeUpDate = new Date();
        wakeUpDate.setHours(hours, minutes, 0, 0);

        const cycleDuration = 90; // minutes per sleep cycle
        const results = [];

        for (let i = 1; i <= cycles; i++) {
            const bedtime = new Date(wakeUpDate.getTime() - i * cycleDuration * 60000);
            results.push({
                time: bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                cycles: i
            });
        }

        this.displaySleepResults(results, wakeUpTime);
    },

    displaySleepResults(results, wakeUpTime) {
        const resultsContainer = document.getElementById('sleepResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <h5>Optimal Bedtimes for ${wakeUpTime} wake-up:</h5>
            <ul class="list-group mt-3">
                ${results.map(item => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${item.time}
                        <span class="badge bg-primary rounded-pill">${item.cycles} cycle${item.cycles > 1 ? 's' : ''}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    },

    saveSleepPreferences() {
        userData.wellbeing.wakeUpTime = document.getElementById('wakeUpTime').value;
        userData.wellbeing.sleepCycles = parseInt(document.getElementById('sleepCycles').value);
        saveUserData();

        // Show toast notification
        const toastHTML = `
            <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">Preferences Saved</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Your sleep preferences have been updated.
                    </div>
                </div>
            </div>
        `;

        // Remove existing toast if any
        const existingToast = document.querySelector('.position-fixed.bottom-0.end-0');
        if (existingToast) existingToast.remove();

        document.body.insertAdjacentHTML('beforeend', toastHTML);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            const toast = document.querySelector('.toast.show');
            if (toast) {
                bootstrap.Toast.getInstance(toast)?.hide();
            }
        }, 3000);
    }
};
function addTopicInput(initialValue = '') {
    const topicsContainer = document.getElementById('topicsContainer');
    const topicId = `topic-${Date.now()}`;

    const topicDiv = document.createElement('div');
    topicDiv.className = 'input-group mb-2';
    topicDiv.innerHTML = `
        <input type="text" class="form-control topic-input" value="${initialValue}" 
               placeholder="Enter topic name" id="${topicId}">
        <button class="btn btn-outline-danger remove-topic" type="button">
            <i class="bi bi-trash"></i>
        </button>
    `;

    topicsContainer.appendChild(topicDiv);

    // Add event listener for remove button
    topicDiv.querySelector('.remove-topic').addEventListener('click', function () {
        topicsContainer.removeChild(topicDiv);
    });
}
// Add to your script.js
function initMusicPlayer() {
    // Switch streams in mini-player (Wellbeing)
    document.querySelectorAll('.yt-stream-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const ytId = this.dataset.ytid;
            document.getElementById('ytMiniPlayer').src =
                `https://www.youtube.com/embed/${ytId}?autoplay=1&controls=1`;

            // Update active button
            document.querySelectorAll('.yt-stream-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Switch streams in main player (Music tab)
    document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', function () {
            const ytId = this.dataset.ytid;
            document.getElementById('ytMainPlayer').src =
                `https://www.youtube.com/embed/${ytId}?autoplay=1&controls=1`;
        });
    });
}
function updateCountdown(card, examDate) {
    const now = new Date();
    const timeDiff = examDate - now;

    if (timeDiff <= 0) {
        card.querySelector('.exam-card-countdown').textContent = 'Exam has passed';
        card.querySelector('.exam-progress-fill').style.width = '0%';
        card.style.opacity = '0.7';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Update the countdown display
    card.querySelector('.exam-card-countdown').textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update progress bar (90 days = 100%)
    const percentage = Math.min(100, (timeDiff / (1000 * 60 * 60 * 24 * 90)) * 100);
    const progressBar = card.querySelector('.exam-progress-fill');
    progressBar.style.width = `${percentage}%`;

    // Update color based on urgency
    progressBar.className = 'exam-progress-fill ' +
        (percentage > 75 ? 'time-plenty' :
            percentage > 50 ? 'time-medium' :
                percentage > 25 ? 'time-low' : 'time-critical');
}
function createExamCard(exam) {
    if (!exam || !exam.datetime) {
        console.error("Invalid exam data:", exam);
        return document.createElement('div'); // Return empty div as fallback
    }

    const card = document.createElement('div');
    card.className = 'exam-card';
    card.dataset.datetime = exam.datetime.toISOString();

    // Debug card creation
    console.log("Creating card for:", exam.subjectName, exam.examName);

    card.innerHTML = `
      <div class="exam-card-icon">
        <i class="bi bi-${exam.subjectIcon}"></i>
      </div>
      <div class="exam-card-content">
        <div class="exam-card-subject">${exam.subjectName} (${exam.boardName})</div>
        <div class="exam-card-name">${exam.examName}</div>
        <div class="exam-card-time">
          ${exam.datetime.toLocaleDateString('en-GB', { weekday: 'long' })},
          ${exam.datetime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          at ${exam.datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div class="exam-progress-container">
          <div class="exam-progress-bar">
            <div class="exam-progress-fill"></div>
          </div>
        </div>
        <div class="exam-card-countdown"></div>
      </div>
    `;

    return card;
}

function initUserExamDates() {
    console.log("--- Debugging initUserExamDates ---");

    // 1. First get the container element
    const container = document.getElementById('exam-dates-container');
    if (!container) {
        console.error("Error: exam-dates-container element not found!");
        return;
    }

    // 2. Check subjects
    if (!userData.subjects || userData.subjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-book"></i>
                <h3>No Subjects Selected</h3>
                <p>Please add subjects in your profile settings</p>
            </div>
        `;
        return;
    }

    console.log("userData.subjects:", userData.subjects);

    const scienceKeywords = ['biology', 'physics', 'chemistry'];
    const filteredExams = [];

    userData.subjects.forEach(userSubject => {
        const baseName = userSubject.name
            .toLowerCase()
            .replace(/-\s*set\s*\d+/i, '')
            .replace(/\(.*\)/g, '')
            .trim();

        const isScience = scienceKeywords.some(keyword => baseName.includes(keyword));
        const userBoard = userSubject.examBoard?.toLowerCase();

        for (const boardKey in examData) {
            const boardName = examData[boardKey].name.toLowerCase();
            if (userBoard && !boardName.includes(userBoard)) continue;

            examData[boardKey].subjects.forEach(examSubject => {
                const examName = examSubject.name.toLowerCase();

                // Match logic:
                if (examName.includes(baseName) ||
                    baseName.includes(examName) ||
                    (isScience && examName.includes('science'))) {

                    examSubject.exams.forEach(exam => {
                        const examDate = new Date(exam.datetime);
                        if (isNaN(examDate.getTime())) {
                            console.error("Invalid date:", exam.datetime);
                        }
                        filteredExams.push({
                            boardName: examData[boardKey].name,
                            subjectName: isScience ? 'Science' : userSubject.name,
                            subjectIcon: isScience ? 'beaker' : examSubject.icon,
                            examName: exam.name,
                            datetime: new Date(exam.datetime)
                        });
                    });
                }
            });
        }
    });
    // After the filtration loop ends, before rendering
    console.log("Filtered exams before sorting:", filteredExams);
    console.log("Exam data structure check:", {
        AQA: examData.AQA?.subjects?.map(s => s.name),
        Edexcel: examData.Edexcel?.subjects?.map(s => s.name)
    });
    // Render exams
    container.innerHTML = filteredExams.length ? '' : `
      <div class="empty-state">
        <i class="bi bi-book"></i>
        <h3>No Exams Found</h3>
        <p>No matching exams for: ${userData.subjects.map(s => s.name).join(', ')}</p>
      </div>
    `;

    filteredExams.sort((a, b) => a.datetime - b.datetime)
        .forEach(exam => {
            container.appendChild(createExamCard(exam));
        });

    setInterval(() => {
        document.querySelectorAll('.exam-card').forEach(card => {
            const examDate = new Date(card.dataset.datetime);
            updateCountdown(card, examDate);
        });
    }, 1000);
}

// 3. Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();

    // Temporary test - force some subjects if empty
    if (userData.subjects.length === 0) {
        userData.subjects = [
            { name: "Mathematics", examBoard: "AQA" },
            { name: "Physics", examBoard: "AQA" }
        ];
        console.warn("Using test subjects:", userData.subjects);
    }

    initUserExamDates();
});


function initExamDatesTab(examData) {
    const examGrid = document.getElementById('exam-dates-grid');
    const viewToggle = document.getElementById('exam-dates-view-toggle');
    const secondsToggle = document.getElementById('exam-dates-seconds-toggle');
    const subjectFilter = document.getElementById('exam-dates-subject-filter');
    const boardFilter = document.getElementById('exam-dates-board-filter');

    let isListView = false;
    let showSeconds = true;
    let currentSubject = 'all';
    let currentBoard = 'all';
    let examCards = []; // Store card elements

    const allExams = processExamData(examData);
    setupSubjectFilter();
    setupBoardFilter(examData);

    viewToggle.addEventListener('click', toggleView);
    secondsToggle.addEventListener('click', toggleSeconds);
    subjectFilter.addEventListener('change', function () {
        currentSubject = this.value;
        renderExams();
    });

    boardFilter.addEventListener('change', function () {
        currentBoard = this.value;
        renderExams();
    });

    renderExams(); // Initial rendering of exams
    startCountdown();

    function processExamData(data) {
        const exams = [];
        for (const board in data) {
            data[board].subjects.forEach(subject => {
                subject.exams.forEach(exam => {
                    exams.push({
                        boardName: data[board].name,
                        boardKey: board,
                        subjectName: subject.name,
                        subjectIcon: subject.icon,
                        examName: exam.name,
                        datetime: new Date(exam.datetime)
                    });
                });
            });
        }
        return exams.sort((a, b) => a.datetime - b.datetime);
    }

    function setupSubjectFilter() {
        const allSubjects = new Set();
        for (const board in examData) {
            examData[board].subjects.forEach(subject => {
                allSubjects.add(subject.name);
            });
        }
        const sortedSubjects = [...allSubjects].sort();
        sortedSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);
        });
    }

    function setupBoardFilter(data) {
        const boards = Object.keys(data).sort();
        boards.forEach(board => {
            const option = document.createElement('option');
            option.value = board;
            option.textContent = data[board].name;
            boardFilter.appendChild(option);
        });
    }

    function toggleView() {
        isListView = !isListView;
        examGrid.classList.toggle('list-view', isListView);
        const span = viewToggle.querySelector('span');
        span.textContent = isListView ? 'Grid View' : 'List View';
        const icon = viewToggle.querySelector('i');
        icon.className = isListView ? 'bi bi-grid' : 'bi bi-list';
        renderExams();
    }

    function toggleSeconds() {
        showSeconds = !showSeconds;
        const span = secondsToggle.querySelector('span');
        span.textContent = showSeconds ? 'Hide Seconds' : 'Show Seconds';
        updateAllCards();
    }

    function getFilteredExams() {
        let filtered = allExams;

        if (currentSubject !== 'all') {
            filtered = filtered.filter(exam => exam.subjectName === currentSubject);
        }

        if (currentBoard !== 'all') {
            filtered = filtered.filter(exam => exam.boardKey === currentBoard);
        }

        return filtered;
    }

    function updateCard(card, timeRemaining) {
        if (timeRemaining.expired) {
            card.querySelector('.exam-card-countdown').textContent = 'Exam has passed';
            card.querySelector('.exam-progress-fill').style.width = '0%';
            card.style.opacity = '0.7';
            return;
        }

        const countdownHTML = showSeconds
            ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
            : `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;

        card.querySelector('.exam-card-countdown').textContent = countdownHTML;

        const progressBar = card.querySelector('.exam-progress-fill');
        progressBar.style.width = `${timeRemaining.percentage}%`;
        progressBar.className = `exam-progress-fill ${getTimeClass(timeRemaining.percentage)}`;
    }

    function renderExams() {
        examGrid.innerHTML = ''; // Clear the grid
        examCards = []; // Clear the cards array
        const filteredExams = getFilteredExams();

        if (filteredExams.length === 0) {
            examGrid.innerHTML = '<div class="empty-state"><i class="bi bi-search"></i><p>No exams match your filters</p></div>';
            return;
        }

        filteredExams.forEach(exam => {
            const card = createExamCard(exam);
            examGrid.appendChild(card);
            examCards.push({
                element: card,
                exam: exam
            });
        });
        updateAllCards();
    }

    function updateAllCards() {
        examCards.forEach(({ element, exam }) => {
            const timeRemaining = calculateTimeRemaining(exam.datetime);
            updateCard(element, timeRemaining);
        });
    }

    function startCountdown() {
        updateAllCards();
        setInterval(updateAllCards, 1000);
    }
}

function calculateTimeRemaining(examDate) {
    const now = new Date();
    const timeDiff = examDate - now;

    if (timeDiff <= 0) {
        return { expired: true };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
        expired: false,
        days,
        hours,
        minutes,
        seconds,
        percentage: Math.min(100, (timeDiff / (1000 * 60 * 60 * 24 * 90)) * 100)
    };
}

function getTimeClass(percentage) {
    if (percentage > 75) return 'time-plenty';
    if (percentage > 50) return 'time-medium';
    if (percentage > 25) return 'time-low';
    return 'time-critical';
}

function setupExamRules() {
    document.getElementById('examRulesLink').addEventListener('click', (e) => {
        e.preventDefault();
        const examRulesModal = new bootstrap.Modal(document.getElementById('examRulesModal'));
        examRulesModal.show();
    });
}



// Call this in your init() function

document.addEventListener('DOMContentLoaded', () => {
    WellbeingManager.init();
    initExamDatesTab(examData);
});
document.addEventListener('DOMContentLoaded', initTimingTools);
document.addEventListener('DOMContentLoaded', init);
