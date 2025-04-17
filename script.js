// Initialize with empty data
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
    resources: { // Add this
        websites: [],
        documents: [],
        videos: [],
        other: []
    },
    currentDay: new Date().getDay(), // 0=Sunday, 1=Monday, etc.
    currentHour: new Date().getHours() // 0-23
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

// Initialize the app
function init() {
    loadUserData();
    updateUserProfileDisplay(); // Ensure profile is updated on page load
    setupNavigation();
    setupEventListeners();
    updateCurrentDate();
    renderSubjects();
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    setupResourcesTab();
    setupResourceModal();
    renderTimetableSubjects();
    renderTimetableGrid();
    WellbeingManager.init(); // Initialize the Wellbeing Manager
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('gcseStudyTrackerData');
    if (savedData) {
        userData = JSON.parse(savedData);

        // Ensure all user profile fields are loaded correctly
        if (!userData.userProfile) {
            userData.userProfile = {
                name: "Student",
                role: "GCSE",
                avatar: null,
                initials: "JS",
                gcseDate: null
            };
        }
    } else {
        saveUserData(); // Initialize the storage if it's empty
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('gcseStudyTrackerData', JSON.stringify(userData));
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
    // Subject selection in tracker
    subjectSelect.addEventListener('change', (e) => {
        updateTopicSelect(e.target.value);
        currentSession.subject = e.target.value;
    });

    // Topic selection in tracker
    topicSelect.addEventListener('change', (e) => {
        currentSession.topic = e.target.value || 'General study';
    });

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
}

// Start study timer
function startTimer() {
    if (!subjectSelect.value) {
        alert('Please select a subject first');
        return;
    }

    currentSession.startTime = new Date();
    currentSession.subject = subjectSelect.value;
    currentSession.topic = topicSelect.value || 'General study';

    // Update current session display
    currentSubjectDisplay.textContent = currentSession.subject;
    currentTopicDisplay.textContent = currentSession.topic;
    sessionStartTime.textContent = formatTime(currentSession.startTime);

    // Start timer
    timerInterval = setInterval(updateTimer, 1000);
    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
}

// Stop study timer
function stopTimer() {
    clearInterval(timerInterval);
    currentSession.endTime = new Date();
    currentSession.duration = seconds;
    stopTimerBtn.disabled = true;
}

// Update timer display
function updateTimer() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerDisplay.textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Format time for display
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Log study session
function logStudySession(event) {
    event.preventDefault();

    if (!currentSession.subject) {
        alert('Please select a subject and start the timer first');
        return;
    }

    const session = {
        date: currentSession.startTime.toISOString(),
        subject: currentSession.subject,
        topic: currentSession.topic,
        duration: currentSession.duration || seconds
    };

    userData.studySessions.push(session);
    saveUserData();

    // Reset timer and form
    seconds = 0;
    timerDisplay.textContent = '00:00:00';
    studySessionForm.reset();
    topicSelect.disabled = true;
    currentSubjectDisplay.textContent = 'Not selected';
    currentTopicDisplay.textContent = 'General study';
    sessionStartTime.textContent = '--:-- --';

    if (timerInterval) {
        clearInterval(timerInterval);
        startTimerBtn.disabled = false;
    }
    document.getElementById('stopAlarmButton').addEventListener('click', stopAlarm);
    // Update UI
    renderRecentSessions();
    updateDashboardStats();
    renderCharts();
    renderSubjects();
}

// Add new subject
function addSubject() {
    const subjectName = subjectInput.value;

    if (!subjectName) {
        alert('Please select a subject');
        return;
    }

    // Check if subject already exists
    if (userData.subjects.some(s => s.name === subjectName)) {
        alert('This subject has already been added');
        return;
    }

    const subjectDetails = {
        name: subjectName,
        displayName: subjectName // Default display name
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

    userData.subjects.push(subjectDetails);
    saveUserData();

    // Update UI
    populateSubjectSelects();
    renderSubjects();
    renderTimetableSubjects();

    // Reset form and close modal
    document.getElementById('addSubjectForm').reset();
    mathOptions.classList.add('d-none');
    addSubjectModal.hide();
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
                <span>${subjectData.examBoard || 'Not specified'}</span>
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
                <span>${subjectData.topics ? subjectData.topics.length : '0'} total</span>
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
            <button class="btn btn-sm btn-outline-primary" id="markAllComplete">Mark All Complete</button>
        </div>
        
        <div class="topics-list" id="topicsList"></div>
    `;

    // Append the content to the container
    subjectDetailsContainer.appendChild(contentDiv);

    // Add topics with checkboxes
    if (subjectData.topics && subjectData.topics.length > 0) {
        const topicsList = document.getElementById('topicsList');
        subjectData.topics.forEach(topic => {
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
                <button class="btn btn-sm btn-outline-secondary study-topic-btn" data-topic="${topic}">
                    <i class="bi bi-stopwatch"></i> Study Now
                </button>
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

        // Add event listener for "Mark All Complete" button
        document.getElementById('markAllComplete').addEventListener('click', function () {
            subjectData.topics.forEach(topic => {
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
            document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
                checkbox.checked = true;
            });
            const completion = calculateTopicCompletion(subjectName);
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${completion}%`;
                progressFill.style.backgroundColor = getProgressColor(completion);
            }
            document.getElementById('completionPercentage').textContent = `${completion}%`;
        });
    }

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
            <div class="subject-exam-board">${gcseSubjects[subject.name]?.examBoard || 'Unknown'}</div>
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
    userNameInput.value = userData.userProfile.name;
    gcseDateInput.value = userData.userProfile.gcseDate || '';

    // Set avatar preview
    if (userData.userProfile.avatar) {
        avatarImage.src = userData.userProfile.avatar;
        avatarImage.classList.remove('d-none');
        avatarInitials.classList.add('d-none');
    } else {
        avatarInitials.textContent = userData.userProfile.initials;
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

    if (!gcseDate) {
        alert('Please select your GCSE completion date');
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

    // Update avatar
    if (userData.userProfile.avatar) {
        avatar.innerHTML = `<img src="${userData.userProfile.avatar}" alt="Profile" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
        avatar.textContent = userData.userProfile.initials;
        avatar.style.backgroundColor = getRandomColor();
    }

    // Update name and role
    username.textContent = userData.userProfile.name;
    userRole.textContent = `GCSE (${formatGCSEDate(userData.userProfile.gcseDate)})`;
}

// Helper function to format the GCSE date
function formatGCSEDate(dateString) {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Helper function to generate a random color for initials
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
// Wellbeing Module Fixes
const WellbeingManager = {
    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.startBreakReminder(); // Automatically start break reminders if enabled
    },

    loadPreferences() {
        if (!userData.wellbeing) {
            userData.wellbeing = {
                breakReminders: true,
                reminderInterval: 50,
                mindfulnessDuration: 5,
                lastBreakTime: null,
                wakeUpTime: "07:00",
                sleepCycles: 5,
            };
            saveUserData();
        }
        this.updateUIFromPreferences();
    },

    updateUIFromPreferences() {
        const wellbeing = userData.wellbeing;
        document.getElementById("breakRemindersSwitch").checked = wellbeing.breakReminders;
        document.getElementById("reminderInterval").value = wellbeing.reminderInterval;
        document.getElementById("mindfulnessDuration").value = wellbeing.mindfulnessDuration;
        document.getElementById("wakeUpTime").value = wellbeing.wakeUpTime;
        document.getElementById("sleepCycles").value = wellbeing.sleepCycles;
    },

    setupEventListeners() {
        // Break Reminders
        document.getElementById("breakRemindersSwitch").addEventListener("change", (e) => {
            userData.wellbeing.breakReminders = e.target.checked;
            saveUserData();
            if (e.target.checked) this.startBreakReminder();
            else this.stopBreakReminder();
        });

        document.getElementById("reminderInterval").addEventListener("change", (e) => {
            userData.wellbeing.reminderInterval = parseInt(e.target.value, 10);
            saveUserData();
            this.restartBreakReminder();
        });

        document.getElementById("takeBreakNowBtn").addEventListener("click", () => {
            this.showBreakReminder(true);
        });

        // Mindfulness Timer
        document.getElementById("startMindfulnessBtn").addEventListener("click", () => {
            this.startMindfulnessTimer();
        });

        document.getElementById("stopMindfulnessBtn").addEventListener("click", () => {
            this.stopMindfulnessTimer();
        });

        document.getElementById("mindfulnessDuration").addEventListener("change", (e) => {
            userData.wellbeing.mindfulnessDuration = parseInt(e.target.value, 10);
            saveUserData();
            this.updateMindfulnessDisplay();
        });

        // Sleep Calculator
        document.getElementById("calculateSleepBtn").addEventListener("click", () => {
            this.calculateOptimalSleepTimes();
        });

        document.getElementById("saveSleepPrefsBtn").addEventListener("click", () => {
            this.saveSleepPreferences();
        });
    },

    // Break Reminder Logic
    breakInterval: null,

    startBreakReminder() {
        this.stopBreakReminder();
        if (!userData.wellbeing.breakReminders) return;

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
        if (userData.wellbeing.breakReminders) {
            this.startBreakReminder();
        }
    },

    showBreakReminder(manual = false) {
        const stretches = [
            "Neck Rolls: Slowly roll your head in circles 5 times each direction.",
            "Shoulder Shrugs: Lift shoulders up and down 10 times.",
            "Stand and Stretch: Reach up high, then touch your toes.",
            "Eye Rest: Look away from your screen and focus on a distant object for 30 seconds.",
            "Wrist Circles: Rotate your wrists 10 times each direction.",
        ];
        const exercise = stretches[Math.floor(Math.random() * stretches.length)];
        const title = manual ? "Recommended Break" : "Time for a Break!";
        const message = manual
            ? "Here's a good exercise to refresh yourself:"
            : `You've been studying for ${userData.wellbeing.reminderInterval} minutes. Try this exercise:`;

        const modal = new bootstrap.Modal(document.getElementById("breakReminderModal"));
        document.getElementById("breakReminderTitle").textContent = title;
        document.getElementById("breakReminderMessage").textContent = message;
        document.getElementById("breakReminderExercise").textContent = exercise;
        modal.show();
    },

    // Mindfulness Timer Logic
    mindfulnessInterval: null,
    mindfulnessTimeLeft: 0,

    startMindfulnessTimer() {
        this.stopMindfulnessTimer();
        this.mindfulnessTimeLeft = userData.wellbeing.mindfulnessDuration * 60;
        this.updateMindfulnessDisplay();

        document.getElementById("startMindfulnessBtn").disabled = true;
        document.getElementById("stopMindfulnessBtn").disabled = false;

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
        document.getElementById("startMindfulnessBtn").disabled = false;
        document.getElementById("stopMindfulnessBtn").disabled = true;
    },

    updateMindfulnessDisplay() {
        const minutes = Math.floor(this.mindfulnessTimeLeft / 60);
        const seconds = this.mindfulnessTimeLeft % 60;
        document.getElementById("mindfulnessDisplay").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    },

    showMindfulnessComplete() {
        const breaths = [
            "Deep Breathing: Inhale for 4s, hold for 4s, exhale for 6s.",
            "Box Breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s.",
            "4-7-8 Breathing: Inhale 4s, hold 7s, exhale 8s.",
        ];
        const exercise = breaths[Math.floor(Math.random() * breaths.length)];

        const modal = new bootstrap.Modal(document.getElementById("mindfulnessCompleteModal"));
        document.getElementById("mindfulnessBreathExercise").textContent = exercise;
        modal.show();
    },

    // Sleep Calculator Logic
    calculateOptimalSleepTimes() {
        const wakeUpTime = document.getElementById("wakeUpTime").value;
        const cycles = parseInt(document.getElementById("sleepCycles").value, 10);

        if (!wakeUpTime || isNaN(cycles) || cycles < 1 || cycles > 6) {
            alert("Please enter valid wake-up time and sleep cycles (1-6).");
            return;
        }

        const [hours, minutes] = wakeUpTime.split(":").map(Number);
        const wakeUpDate = new Date();
        wakeUpDate.setHours(hours, minutes, 0, 0);

        const cycleDuration = 90; // minutes per sleep cycle
        const results = [];

        for (let i = 1; i <= cycles; i++) {
            const bedtime = new Date(wakeUpDate.getTime() - i * cycleDuration * 60000);
            results.push({
                time: bedtime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                cycles: i,
            });
        }

        this.displaySleepResults(results, wakeUpTime);
    },

    displaySleepResults(results, wakeUpTime) {
        const resultsContainer = document.getElementById("sleepResults");
        resultsContainer.innerHTML = `
            <div class="sleep-results-header">
                <h5>Optimal Bedtimes for ${wakeUpTime} Wake-Up</h5>
                <p class="text-muted">Based on 90-minute sleep cycles.</p>
            </div>
            <div class="sleep-cycles-container">
                ${results
                    .map(
                        (item) => `
                    <div class="sleep-cycle-card">
                        <div class="sleep-cycle-time">${item.time}</div>
                        <div class="sleep-cycle-badge">${item.cycles} cycle${item.cycles > 1 ? "s" : ""}</div>
                    </div>
                `
                    )
                    .join("")}
            </div>
        `;
    },

    saveSleepPreferences() {
        userData.wellbeing.wakeUpTime = document.getElementById("wakeUpTime").value;
        userData.wellbeing.sleepCycles = parseInt(document.getElementById("sleepCycles").value, 10);
        saveUserData();

        const toast = new bootstrap.Toast(document.getElementById("preferencesToast"));
        document.getElementById("toastMessage").textContent = "Sleep preferences saved successfully!";
        toast.show();
    },
};

// Initialize the Wellbeing Module
document.addEventListener("DOMContentLoaded", () => {
    WellbeingManager.init();
});// Initialize the timing tools when the page loads
document.addEventListener('DOMContentLoaded', initTimingTools);
document.addEventListener('DOMContentLoaded', init);