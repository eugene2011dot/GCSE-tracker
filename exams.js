// shared-exam-dates.js
class ExamDatesManager {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      this.isListView = options.isListView || false;
      this.showSeconds = options.showSeconds || true;
      this.currentSubject = 'all';
      this.currentBoard = 'all';
      this.cards = [];
      this.examData = options.examData || {};
      this.exams = this.processExamData(this.examData);
      
      this.init();
    }
  
    init() {
      if (this.container.id === 'exam-dates-grid') {
        this.setupViewToggle();
        this.setupSecondsToggle();
        this.setupSubjectFilter();
        this.setupBoardFilter();
      }
      
      this.renderExams();
      this.startCountdown();
    }
  
    processExamData(data) {
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
  
    setupViewToggle() {
      const viewToggle = document.getElementById('exam-dates-view-toggle');
      if (viewToggle) {
        viewToggle.addEventListener('click', () => {
          this.isListView = !this.isListView;
          this.container.classList.toggle('list-view', this.isListView);
          const span = viewToggle.querySelector('span');
          span.textContent = this.isListView ? 'Grid View' : 'List View';
          const icon = viewToggle.querySelector('i');
          icon.className = this.isListView ? 'bi bi-grid' : 'bi bi-list';
          this.renderExams();
        });
      }
    }
  
    setupSecondsToggle() {
      const secondsToggle = document.getElementById('exam-dates-seconds-toggle');
      if (secondsToggle) {
        secondsToggle.addEventListener('click', () => {
          this.showSeconds = !this.showSeconds;
          const span = secondsToggle.querySelector('span');
          span.textContent = this.showSeconds ? 'Hide Seconds' : 'Show Seconds';
          this.updateAllCards();
        });
      }
    }
  
    setupSubjectFilter() {
      const subjectFilter = document.getElementById('exam-dates-subject-filter');
      if (subjectFilter) {
        const allSubjects = new Set();
        for (const board in this.examData) {
          this.examData[board].subjects.forEach(subject => {
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
        
        subjectFilter.addEventListener('change', () => {
          this.currentSubject = subjectFilter.value;
          this.renderExams();
        });
      }
    }
  
    setupBoardFilter() {
      const boardFilter = document.getElementById('exam-dates-board-filter');
      if (boardFilter) {
        const boards = Object.keys(this.examData).sort();
        boards.forEach(board => {
          const option = document.createElement('option');
          option.value = board;
          option.textContent = this.examData[board].name;
          boardFilter.appendChild(option);
        });
        
        boardFilter.addEventListener('change', () => {
          this.currentBoard = boardFilter.value;
          this.renderExams();
        });
      }
    }
  
    getFilteredExams() {
      let filtered = this.exams;
      
      if (this.currentSubject !== 'all') {
        filtered = filtered.filter(exam => exam.subjectName === this.currentSubject);
      }
      
      if (this.currentBoard !== 'all') {
        filtered = filtered.filter(exam => exam.boardKey === this.currentBoard);
      }
      
      return filtered;
    }
  
    calculateTimeRemaining(examDate) {
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
        percentage: this.calculatePercentage(timeDiff)
      };
    }
  
    calculatePercentage(timeRemaining) {
      const threeMonths = 1000 * 60 * 60 * 24 * 90;
      return Math.min(100, (timeRemaining / threeMonths) * 100);
    }
  
    getTimeClass(percentage) {
      if (percentage > 75) return 'time-plenty';
      if (percentage > 50) return 'time-medium';
      if (percentage > 25) return 'time-low';
      return 'time-critical';
    }
  
    createExamCard(exam) {
      const card = document.createElement('div');
      card.className = this.container.id === 'exam-dates-container' ? 'exam-card' : 'exam-card-alt';
      card.innerHTML = `
        <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-icon' : 'subject-icon'}">
          <i class="bi bi-${exam.subjectIcon}"></i>
        </div>
        <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-content' : 'card-content'}">
          <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-subject' : 'subject-name'}">${exam.subjectName} (${exam.boardName})</div>
          <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-name' : 'exam-name'}">${exam.examName}</div>
          <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-time' : 'exam-datetime'}">
            ${exam.datetime.toLocaleDateString('en-GB', { weekday: 'long' })},
            ${exam.datetime.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            at ${exam.datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div class="${this.container.id === 'exam-dates-container' ? 'exam-progress-container' : 'progress-container'}">
            <div class="${this.container.id === 'exam-dates-container' ? 'exam-progress-bar' : 'progress-bar'}">
              <div class="${this.container.id === 'exam-dates-container' ? 'exam-progress-fill' : 'progress-bar-fill'}"></div>
            </div>
          </div>
          <div class="${this.container.id === 'exam-dates-container' ? 'exam-card-countdown' : 'countdown'}"></div>
        </div>
      `;
      return card;
    }
  
    updateCard(card, timeRemaining) {
      const countdownEl = card.querySelector(this.container.id === 'exam-dates-container' ? '.exam-card-countdown' : '.countdown');
      const progressFill = card.querySelector(this.container.id === 'exam-dates-container' ? '.exam-progress-fill' : '.progress-bar-fill');
  
      if (timeRemaining.expired) {
        countdownEl.textContent = 'Exam has passed';
        progressFill.style.width = '0%';
        card.style.opacity = '0.7';
        return;
      }
  
      const countdownHTML = this.showSeconds
        ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
        : `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;
  
      countdownEl.textContent = countdownHTML;
  
      progressFill.style.width = `${timeRemaining.percentage}%`;
      progressFill.className = this.container.id === 'exam-dates-container' 
        ? `exam-progress-fill exam-${this.getTimeClass(timeRemaining.percentage)}`
        : `progress-bar-fill ${this.getTimeClass(timeRemaining.percentage)}`;
    }
  
    renderExams() {
      this.container.innerHTML = '';
      this.cards = [];
      const filteredExams = this.getFilteredExams();
      
      if (filteredExams.length === 0) {
        this.container.innerHTML = '<div class="empty-state"><i class="bi bi-search"></i><p>No exams match your filters</p></div>';
        return;
      }
      
      filteredExams.forEach(exam => {
        const card = this.createExamCard(exam);
        this.container.appendChild(card);
        this.cards.push({
          element: card,
          exam: exam
        });
      });
      this.updateAllCards();
    }
    
    updateAllCards() {
      this.cards.forEach(({ element, exam }) => {
        const timeRemaining = this.calculateTimeRemaining(exam.datetime);
        this.updateCard(element, timeRemaining);
      });
    }
  
    startCountdown() {
      this.updateAllCards();
      setInterval(() => this.updateAllCards(), 1000);
    }
  }