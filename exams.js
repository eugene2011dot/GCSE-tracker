    document.addEventListener('DOMContentLoaded', function () {
      // Debug check
      console.log("userData:", window.userData);

      if (!window.userData) {
        console.error("userData is missing - loading fallback");
        window.userData = { subjects: [] }; // Fallback empty data
      }

      initUserExamDates();
      initExamDatesTab(window.examData);
    });
    function initUserExamDates() {
      const container = document.getElementById('exam-dates-container');
      if (!container) return;

      // 1. Get data from localStorage (not script.js)
      let userData;
      try {
        userData = JSON.parse(localStorage.getItem('userData')) || { subjects: [] };
        console.log("Loaded userData:", userData); // Debug
      } catch (e) {
        console.error("Error loading userData:", e);
        userData = { subjects: [] };
      }

      // 2. Proceed with your exam matching logic
      const filteredExams = [];

      userData.subjects.forEach(userSubject => {
        const baseName = userSubject.name
          .replace(/-\s*set\s*\d+/i, '')
          .replace(/\(.*\)/g, '')
          .trim()
          .toLowerCase();
        const userBoard = userSubject.examBoard?.toLowerCase();

        for (const boardKey in examData) {
          const boardName = examData[boardKey].name.toLowerCase();

          // Skip if board doesn't match
          if (userBoard && !boardName.includes(userBoard)) continue;

          examData[boardKey].subjects.forEach(examSubject => {
            const examName = examSubject.name.toLowerCase();
            if (examName.includes(baseName) || baseName.includes(examName)) {
              examSubject.exams.forEach(exam => {
                filteredExams.push({
                  boardName: examData[boardKey].name,
                  subjectName: userSubject.name, // Use original name
                  subjectIcon: examSubject.icon,
                  examName: exam.name,
                  datetime: new Date(exam.datetime)
                });
              });
            }
          });
        }
      });

      // 3. Display results
      container.innerHTML = '';
      if (filteredExams.length === 0) {
        container.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-book"></i>
        <h3>No Exams Scheduled</h3>
        <p>We couldn't find any exams matching your current subjects</p>
        <div class="debug-hint">
          <p>Subjects: ${userData.subjects.map(s => s.name).join(', ')}</p>
          <p>Exam Boards: ${[...new Set(userData.subjects.map(s => s.examBoard))].join(', ')}</p>
        </div>
      </div>
    `;
        return;
      }

      filteredExams.sort((a, b) => a.datetime - b.datetime)
        .forEach(exam => {
          container.appendChild(createExamCard(exam));
        });

      // Update countdowns every second
      setInterval(() => {
        document.querySelectorAll('.exam-card').forEach(card => {
          updateExamCard(card, { datetime: new Date(card.dataset.datetime) });
        });
      }, 1000);
    }

    // Make sure to call this when the page loads
    document.addEventListener('DOMContentLoaded', initUserExamDates);

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
      let cards = []; // Store card elements

      const exams = processExamData(examData);
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
        const allExams = [];
        for (const board in data) {
          data[board].subjects.forEach(subject => {
            subject.exams.forEach(exam => {
              allExams.push({
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
        return allExams.sort((a, b) => a.datetime - b.datetime);
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
        let filtered = exams;

        if (currentSubject !== 'all') {
          filtered = filtered.filter(exam => exam.subjectName === currentSubject);
        }

        if (currentBoard !== 'all') {
          filtered = filtered.filter(exam => exam.boardKey === currentBoard);
        }

        return filtered;
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
          totalMilliseconds: timeDiff,
          percentage: calculatePercentage(timeDiff)
        };
      }

      function calculatePercentage(timeRemaining) {
        const threeMonths = 1000 * 60 * 60 * 24 * 90;
        return Math.min(100, (timeRemaining / threeMonths) * 100);
      }

      function getTimeClass(percentage) {
        if (percentage > 75) return 'time-plenty';
        if (percentage > 50) return 'time-medium';
        if (percentage > 25) return 'time-low';
        return 'time-critical';
      }

      function createExamCard(exam) {
        const card = document.createElement('div');
        card.className = 'exam-card';
        card.innerHTML = `
        <div class="subject-icon">
          <i class="bi bi-${exam.subjectIcon}"></i>
        </div>
        <div class="card-content">
          <div class="subject-name">${exam.subjectName} (${exam.boardName})</div>
          <div class="exam-name">${exam.examName}</div>
          <div class="exam-datetime">
            ${exam.datetime.toLocaleDateString('en-GB', { weekday: 'long' })},
            ${exam.datetime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            at ${exam.datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-bar-fill"></div>
            </div>
          </div>
          <div class="countdown"></div>
        </div>
      `;
        return card;
      }

      function updateCard(card, timeRemaining) {
        if (timeRemaining.expired) {
          card.querySelector('.countdown').textContent = 'Exam has passed';
          card.querySelector('.progress-bar-fill').style.width = '0%';
          card.style.opacity = '0.7';
          return;
        }

        const countdownHTML = showSeconds
          ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
          : `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;

        card.querySelector('.countdown').textContent = countdownHTML;

        const progressBar = card.querySelector('.progress-bar-fill');
        progressBar.style.width = `${timeRemaining.percentage}%`;
        progressBar.className = `progress-bar-fill ${getTimeClass(timeRemaining.percentage)}`;
      }

      function renderExams() {
        examGrid.innerHTML = ''; // Clear the grid
        cards = []; // Clear the cards array
        const filteredExams = getFilteredExams();

        if (filteredExams.length === 0) {
          examGrid.innerHTML = '<div class="empty-state"><i class="bi bi-search"></i><p>No exams match your filters</p></div>';
          return;
        }

        filteredExams.forEach(exam => {
          const card = createExamCard(exam);
          examGrid.appendChild(card);
          cards.push({
            element: card,
            exam: exam
          });
        });
        updateAllCards();
      }

      function updateAllCards() {
        cards.forEach(({ element, exam }) => {
          const timeRemaining = calculateTimeRemaining(exam.datetime);
          updateCard(element, timeRemaining);
        });
      }

      function startCountdown() {
        updateAllCards();
        setInterval(updateAllCards, 1000);
      }
    }

    // Shared functions
    function createExamCard(exam) {
      const card = document.createElement('div');
      card.className = 'exam-card';
      card.dataset.datetime = exam.datetime.toISOString();
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

    function updateExamCard(card, exam) {
      const timeRemaining = calculateTimeRemaining(exam.datetime);
      const countdownEl = card.querySelector('.exam-card-countdown');
      const progressFill = card.querySelector('.exam-progress-fill');

      if (timeRemaining.expired) {
        countdownEl.textContent = 'Exam has passed';
        progressFill.style.width = '0%';
        card.style.opacity = '0.7';
        return;
      }

      countdownEl.textContent = `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;
      progressFill.style.width = `${timeRemaining.percentage}%`;
      progressFill.className = `exam-progress-fill exam-${getTimeClass(timeRemaining.percentage)}`;
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

      return {
        expired: false,
        days,
        hours,
        minutes,
        percentage: Math.min(100, (timeDiff / (1000 * 60 * 60 * 24 * 90)) * 100)
      };
    }

    function getTimeClass(percentage) {
      if (percentage > 75) return 'time-plenty';
      if (percentage > 50) return 'time-medium';
      if (percentage > 25) return 'time-low';
      return 'time-critical';
    }
