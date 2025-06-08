.topics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary-light);
}

.topics-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
}

.topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(248, 249, 250, 0.9);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.8);
}

.topic-item:hover {
    transform: translateX(5px);
    background: var(--primary-light);
}

.form-check {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.form-check-input {
    margin: 0;
    cursor: pointer;
}

.form-check-label {
    cursor: pointer;
    font-weight: 500;
}

.study-topic-btn {
    padding: 0.35rem 1rem;
    font-size: 0.85rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.study-topic-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
/* Add to your styles.css */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6c757d;
    text-align: center;
    padding: 20px;
}

.empty-state i {
    font-size: 2rem;
    margin-bottom: 10px;
}

.empty-state p {
    margin: 0;
    font-size: 0.9rem;
}

/* Updated Resources CSS */
.search-container {
    position: relative;
    max-width: 100%;
    margin-bottom: 30px;
}

.search-container input {
    width: 100%;
    padding: 12px 20px 12px 45px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    font-size: 16px;
    background-color: #f8f9fa;
}

.search-container i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
}
.resources-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 20px;
}

.resource-actions {
    margin-left: auto;
}

.resource-categories {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.category {
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #555;
    background: #f8f9fa;
}

.category:hover {
    background: #e9ecef;
}

.category.active {
    background: #4e73df;
    color: white;
}

.resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
    align-content: start;
}

.resource-category {
    display: none;
    grid-column: 1 / -1;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
}

.resource-category.active {
    display: grid;
}

.resource-card {
    display: block;
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e0e0e0;
}

.resource-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #4e73df;
}

.resource-logo {
    width: 60px;
    height: 60px;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.resource-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.resource-info {
    text-align: center;
}

.resource-info h3 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    color: #333;
}

.resource-info p {
    margin: 0 0 8px 0;
    font-size: 0.8rem;
    color: #666;
}

.resource-link {
    font-size: 0.8rem;
    color: #4e73df;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.resource-preview {
    grid-column: 1 / -1;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    margin-top: 20px;
}

.preview-content i {
    font-size: 2.5rem;
    color: #dee2e6;
    margin-bottom: 15px;
}

.preview-content h3 {
    margin: 0 0 10px 0;
    color: #495057;
}

.preview-content p {
    margin: 0 0 5px 0;
    color: #6c757d;
}

.preview-content .small-text {
    font-size: 0.75rem;
}

/* Open All Button */
#openAllResources {
    padding: 5px 10px;
    font-size: 0.8rem;
}

/* Timetable Container */
.timetable-container {
    display: flex;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

/* Timetable Subjects Panel */
.timetable-subjects {
    width: 250px;
    flex-shrink: 0;
    background: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: var(--card-shadow);
}

.timetable-subjects h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--dark-color);
}

.subject-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.subject-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.75rem;
    cursor: grab;
    transition: all 0.2s;
    user-select: none;
}

.subject-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color);
}

.subject-card:active {
    cursor: grabbing;
}

.subject-card-inner {
    font-weight: 500;
    color: var(--dark-color);
}

/* Timetable Grid */
.timetable-grid {
    flex-grow: 1;
    background: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: var(--card-shadow);
    overflow-x: auto;
}

.timetable-header {
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    gap: 4px;
    margin-bottom: 4px;
}

.timetable-header .timetable-cell {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem;
    text-align: center;
    font-weight: 500;
    border-radius: 4px;
}

.timetable-body {
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    gap: 4px;
}

.timetable-row {
    display: contents;
}

.timetable-cell {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    min-height: 60px;
    padding: 0.5rem;
    position: relative;
    transition: all 0.2s;
}

.time-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    background-color: var(--light-color);
}

.day-cell {
    min-height: 60px;
}

.day-cell:hover {
    background-color: var(--primary-light);
}

.timetable-subject-block {
    background-color: var(--primary-light);
    border-left: 3px solid var(--primary-color);
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0;
    cursor: move;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--dark-color);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: break-word;
}

/* Current day/time highlighting */
.current-day {
    background-color: rgba(67, 97, 238, 0.1);
    box-shadow: inset 0 0 0 2px var(--primary-color);
}

.current-time {
    background-color: rgba(67, 97, 238, 0.2);
    position: relative;
}

.current-time::after {
    content: "Now";
    position: absolute;
    top: 4px;
    right: 4px;
    background: var(--primary-color);
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
}

/* Timetable Actions */
.timetable-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-end;
}

/* Responsive Styles */
@media (max-width: 992px) {
    .timetable-container {
        flex-direction: column;
    }

    .timetable-subjects {
        width: 100%;
    }

}

@media (max-width: 768px) {

    .timetable-header,
    .timetable-body {
        grid-template-columns: 60px repeat(5, 1fr);
    }

    .timetable-cell {
        min-height: 50px;
        font-size: 0.85rem;
    }

    .resource-categories {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: fit-content;
        overflow-x: auto;
    }

    .resources-container {
        display: flex;
        flex-direction: column;
    }

    .resource-categories h5 {
        display: none;
        border-left: solid 2px var(--primary-color);
    }
}

/* Drag and Drop Feedback */
.drag-over {
    background-color: rgba(67, 97, 238, 0.2) !important;
    border: 2px dashed var(--primary-color) !important;
}

.dragging {
    opacity: 0.5;
    transform: scale(0.95);
}

/* Timing Tools Styles */
.timing-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.timing-card {
    flex: 1;
    min-width: 300px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.timer-display {
    font-size: 2.5rem;
    font-family: monospace;
    text-align: center;
    margin: 15px 0;
    color: #333;
}

.timer-input {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 15px 0;
}

.timer-input input {
    width: 60px;
    text-align: center;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.2rem;
}

.timer-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.lap-times {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 15px;
}

.lap-times h4 {
    margin-bottom: 10px;
    color: #555;
}

#stopwatchLapList {
    list-style: none;
    padding: 0;
    max-height: 150px;
    overflow-y: auto;
}

#stopwatchLapList li {
    padding: 5px 0;
    border-bottom: 1px solid #f5f5f5;
    font-family: monospace;
}

.timer-alarm {
    display: none;
    align-items: center;
    justify-content: center;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 10px;
    margin-top: 15px;
    color: #721c24;
    animation: pulse 1s infinite;
}

.timer-alarm .alarm-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.timer-alarm i {
    font-size: 1.5rem;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

/* Add to your existing resources CSS */
#addResourceBtn {
    margin-right: 10px;
}

/* Modal styles for add resource */
#addResourceModal .modal-dialog {
    max-width: 500px;
}

#addResourceModal .form-group {
    margin-bottom: 1rem;
}

#addResourceModal .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
}

#addResourceModal .btn-close {
    align-self: flex-start;
    margin-top: 0.25rem;
}

/* Add to your resources CSS */
.resource-card-wrapper {
    position: relative;
}

.remove-resource {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
}

.resource-card-wrapper:hover .remove-resource {
    opacity: 1;
}

/* Resource Cards */
.resource-card {
    display: block;
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e0e0e0;
}

.resource-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.resource-link {
    text-decoration: none;
    color: inherit;
}

.resource-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
}

.resource-icon {
    font-size: 1.5rem;
    color: #4e73df;
    width: 60px;
    height: 60px;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.resource-card h5 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    color: #333;
}

.resource-description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-align: center;
}

.resource-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.delete-resource {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
}

/* Wellbeing Tab - Modern Design */
#wellbeing {
    background-color: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    margin: 1.5rem auto;
    max-width: 900px;
}

/* Section Headers */
.wellbeing-section h3 {
    color: #334155;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.wellbeing-section h3 i {
    color: #6366f1;
}

/* Dividers */
#wellbeing hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #e2e8f0;
}

/* Form Controls */
.wellbeing-section .form-check {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}

.wellbeing-section .form-select {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s ease;
}

.wellbeing-section .form-select:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}

/* Buttons */
#wellbeing .btn {
    border-radius: 8px;
    padding: 0.6rem 1.25rem;
    font-weight: 500;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

#wellbeing .btn-outline-primary {
    border: 1px solid #6366f1;
    color: #6366f1;
}

#wellbeing .btn-outline-primary:hover {
    background-color: #6366f1;
    color: white;
}

#wellbeing .btn-primary {
    background-color: #6366f1;
    border: none;
}

#wellbeing .btn-primary:hover {
    background-color: #4f46e5;
}

#wellbeing .btn-success {
    background-color: #10b981;
    border: none;
}

#wellbeing .btn-success:hover {
    background-color: #0d9e6e;
}

#wellbeing .btn-danger {
    background-color: #ef4444;
    border: none;
}

#wellbeing .btn-danger:hover {
    background-color: #dc2626;
}

/* Mindfulness Timer */
.mindfulness-timer {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
}

#mindfulnessDisplay {
    font-family: 'Roboto Mono', monospace;
    font-size: 2.5rem;
    font-weight: 600;
    color: #6366f1;
    margin: 0.5rem 0;
}

/* Sleep Calculator */
.sleep-results-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.sleep-results-header h5 {
    color: #334155;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.sleep-results-header p {
    color: #64748b;
    font-size: 0.9rem;
}

.sleep-cycles-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.sleep-cycle-card {
    background: white;
    border-radius: 10px;
    padding: 1.25rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
}

.sleep-cycle-card:hover {
    transform: translateY(-2px);
}

.sleep-cycle-time {
    font-size: 1.1rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.5rem;
}

.sleep-cycle-badge {
    background-color: #6366f1;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    display: inline-block;
}

/* Modals */
.wellbeing-modal .modal-content {
    border-radius: 12px;
    border: none;
    overflow: hidden;
}

.wellbeing-modal .modal-header {
    background-color: #6366f1;
    color: white;
    border-bottom: none;
    padding: 1.25rem 1.5rem;
}

.wellbeing-modal .modal-body {
    padding: 2rem;
    text-align: center;
}

.wellbeing-modal .modal-body i {
    font-size: 3rem;
    color: #6366f1;
    margin-bottom: 1rem;
}

.wellbeing-modal .alert {
    border-radius: 8px;
    border: none;
    padding: 1rem;
    margin-top: 1.5rem;
}

/* Toast Notification */
#preferencesToast .toast-header {
    background-color: #6366f1;
    color: white;
    border-radius: 8px 8px 0 0;
}

#preferencesToast .toast-body {
    padding: 1rem;
    color: #334155;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    #wellbeing {
        padding: 1.5rem;
    }

    .sleep-cycles-container {
        grid-template-columns: 1fr;
    }

    .wellbeing-section h3 {
        font-size: 1.25rem;
    }
}

/* Add to styles.css */
.topic-input {
    flex-grow: 1;
}

.remove-topic {
    width: auto;
}

#topicsContainer {
    margin-bottom: 10px;
}

.subject-info-item {
    margin-bottom: 8px;
}

.subject-info-label {
    font-weight: 500;
    margin-right: 8px;
}

.topics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.topics-header h4 {
    margin: 0;
}

.topics-header button {
    margin-left: 10px;
}

.topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.topic-item:last-child {
    border-bottom: none;
}

.form-check {
    margin-right: 10px;
}

/* Topic management styles */
.topic-actions {
    display: flex;
    gap: 5px;
}

.topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.topic-item:last-child {
    border-bottom: none;
}

.add-topic-form {
    margin-top: 15px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.topic-item .form-check {
    margin-right: 10px;
    flex-grow: 1;
}

.topics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.topics-header h4 {
    margin: 0;
}

.youtube-mini-player {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
}

.player-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.yt-stream-btn.active {
    font-weight: bold;
    transform: scale(1.05);
}

/* Main Player (Music Tab) */
.youtube-main-player {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.playlist-card {
    cursor: pointer;
    transition: transform 0.2s;
    padding: 10px;
    border-radius: 8px;
}

.playlist-card:hover {
    transform: translateY(-5px);
    background: #f8f9fa;
}

.playlist-card img {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 8px;
}

.playlist-card h5 {
    margin: 0;
    font-size: 1rem;
}

/* Exam Dates Styles */
/* Exam Dates Styles */
#dates {
    background-color: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
}


.exam-dates-container {
    display: flex;
    width: 100%;
    gap: 1.5rem;
    padding: 1rem 0;
    /* Vertical padding only */
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    /* For Firefox */
    scrollbar-color: var(--primary-color) var(--light-color);
    /* For Firefox */
}

.exam-dates-container::-webkit-scrollbar {
    height: 8px;
}

.exam-card {
    flex: 0 0 300px;
    /* Fixed width (no growth/shrink) */
    height: 250px;
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    border-left: 4px solid var(--primary-color);
    scroll-snap-align: start;
    /* Ensures snapping */
    transition: transform 0.2s;
}

.exam-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.exam-card-icon {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.exam-card-subject {
    font-weight: 600;
    color: var(--dark-color);
    margin-bottom: 0.25rem;
}

.exam-card-name {
    font-size: 0.9rem;
    color: var(--gray-color);
    margin-bottom: 0.5rem;
}

.exam-card-time {
    font-size: 0.85rem;
    color: var(--gray-color);
    margin-bottom: 1rem;
}

.exam-progress-container {
    margin: 1rem 0;
}

.exam-progress-bar {
    height: 6px;
    background-color: var(--border-color);
    border-radius: 3px;
    overflow: hidden;
}

.exam-progress-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.exam-card-countdown {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: var(--dark-color);
}

/* Progress bar colors */
.exam-time-plenty {
    background-color: var(--success-color);
}

.exam-time-medium {
    background-color: var(--warning-color);
}

.exam-time-low {
    background-color: #FF9800;
}

.exam-time-critical {
    background-color: var(--danger-color);
}

.exam-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.exam-actions .form-select {
    width: auto;
    min-width: 180px;
}

.exam-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.home-exam-grid {
    display: flex;
    width: 100vw;
    overflow-x: auto;
}

.exam-card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    transition: all 0.2s;
    border-left: 4px solid var(--primary-color);
}

.exam-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.subject-icon {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.subject-name {
    font-weight: 600;
    color: var(--dark-color);
    margin-bottom: 0.25rem;
}

.exam-name {
    font-size: 0.9rem;
    color: var(--gray-color);
    margin-bottom: 0.5rem;
}

.exam-datetime {
    font-size: 0.85rem;
    color: var(--gray-color);
    margin-bottom: 1rem;
}

.progress-container {
    margin: 1rem 0;
}

.progress-bar {
    height: 6px;
    background-color: var(--border-color);
    border-radius: 3px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.time-plenty {
    background-color: var(--success-color);
}

.time-medium {
    background-color: var(--warning-color);
}

.time-low {
    background-color: #FF9800;
}

.time-critical {
    background-color: var(--danger-color);
}

.countdown {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: var(--dark-color);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .exam-actions {
        flex-wrap: wrap;
    }

    .exam-grid {
        grid-template-columns: 1fr;
    }
}

.exam-rules-boards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    margin: 30px 0;
    padding: 15px;
}

.exam-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
    padding: 20px 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    border: 1px solid #e0e0e0;
}

.exam-board:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.exam-board-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 15px;
    filter: grayscale(20%);
    transition: filter 0.3s ease;
}

.exam-board:hover .exam-board-logo {
    filter: grayscale(0%);
}

.exam-board h3 {
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .exam-rules-boards {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
    }

    .exam-board-logo {
        width: 60px;
        height: 60px;
    }

    .exam-board h3 {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .exam-rules-boards {
        grid-template-columns: repeat(2, 1fr);
    }
}

.accordion {
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    background: white;
}

/* Header buttons */
.accordion-button {
    font-weight: 600;
    font-size: 1.1rem;
    padding: 1rem 1.25rem;
    background-color: #f1f3f5;
    color: #343a40;
    border: none;
    outline: none;
    transition: background-color 0.2s ease-in-out;
}

.accordion-button:hover {
    background-color: #e2e6ea;
}

.accordion-button:not(.collapsed) {
    background-color: #dee2e6;
    color: #0d6efd;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
}

/* Accordion body */
.accordion-body {
    background-color: #fff;
    padding: 1rem 1.5rem;
    border-top: 1px solid #dee2e6;
}

/* List styling inside accordion */
.accordion-body ol,
.accordion-body ul {
    padding-left: 1.25rem;
    margin-bottom: 1rem;
}

.accordion-body li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
}

/* Custom section titles if needed */
.accordion-header {
    border-bottom: 1px solid #dee2e6;
}

/* Extra spacing on last item */
.accordion-item:last-child .accordion-body {
    border-radius: 0 0 0.75rem 0.75rem;
}

.accordion-body li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #dee2e6;
}

.accordion-body ol>li:last-child,
.accordion-body ul>li:last-child {
    border-bottom: none;
}

.data-protection-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1050;
    width: 300px;
}

/* Toggle button styling */
.protection-toggle {
    width: 100%;
    padding: 10px 15px;
    background-color: #4361ee;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.protection-toggle:hover {
    background-color: #3a56d4;
}

.protection-toggle i {
    transition: transform 0.3s ease;
}

.protection-toggle.active i {
    transform: rotate(180deg);
}

/* Panel content styling */
.protection-panel {
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #dee2e6;
    border-bottom: none;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-out;
    margin-bottom: 5px;
}

.protection-panel.active {
    max-height: 500px;
    /* Adjust based on your content */
}

.panel-content {
    padding: 15px;
}

/* Button styling */
.data-btn {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
}

.data-btn i {
    font-size: 1rem;
}

/* Backup history styling */
.backup-history {
    margin-top: 15px;
    border-top: 1px solid #eee;
    padding-top: 10px;
}

.backup-history h6 {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 10px;
}

#backupList {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
}

#backupList li {
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
}

#backupList li:last-child {
    border-bottom: none;
}

/* Hide file input but keep it functional */
#importBackup {
    display: none;
}
/* Multi-select visual styling */
select.multi-select {
  height: auto;
  min-height: 100px;
  padding: 5px;
}

select.multi-select option {
  padding: 5px;
  border-bottom: 1px solid #eee;
}

/* Single select remains normal */
select:not(.multi-select) {
  height: auto;
}
/* Makes multi-select more user-friendly */
#topicSelect[multiple] {
    height: auto;
    min-height: 120px;
    padding: 8px;
}

#topicSelect[multiple] option {
    padding: 6px 12px;
    margin: 2px 0;
    border-radius: 4px;
    background: #f8f9fa;
}

#topicSelect[multiple] option:checked {
    background: #0d6efd;
    color: white;
}
/* Add to your stylesheet */
#currentTopic {
    white-space: normal;
    word-wrap: break-word;
    max-height: 60px;
    overflow-y: auto;
}
/* Responsive adjustments */
@media (max-width: 576px) {
    .data-protection-container {
        width: calc(100% - 40px);
        right: 20px;
        left: 20px;
    }
}
@media (max-width: 1200px) {
    .chart-container,
    .tracker-container,
    .progress-grid {
        grid-template-columns: 1fr;
    }

    .progress-card.table-card {
        grid-column: span 1;
    }
}

@media (max-width: 992px) {
    .sidenav {
        position: fixed;
        top: 0;
        height: fit-content;
        z-index: 1000;
        flex-direction: row;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    }

    .app-title,
    .user-info,
    .nav-item span {
        display: none;
    }

    .nav-item {
        justify-content: center;
        padding: 1rem;
        transition: all 0.3s ease;
    }

    .nav-item:hover {
        background: linear-gradient(to right, var(--primary-light), rgba(238, 242, 255, 0.3));
    }

    .nav-item i {
        margin-right: 0;
        font-size: 1.25rem;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .avatar {
        margin-right: 0;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    }
}

@media (max-width: 768px) {
    .app-container {
        flex-direction: column;
    }

    .sidenav {
        width: 100%;
        flex-direction: row;
        padding: 0.5rem;
        align-items: center;
        overflow-x: auto;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    .sidenav-header,
    .user-profile {
        display: none;
    }

    .nav-links {
        display: flex;
        padding: 0;
        flex-grow: 0;
        gap: 0.5rem;
    }

    .nav-item {
        padding: 0.75rem;
        border-radius: 8px;
    }

    .main-content {
        padding: 1rem;
        margin-left: 0;
        margin-top: 80px;
        background: linear-gradient(135deg, #f8faff 0%, #f5f7fb 100%);
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .subjects-container {
        grid-template-columns: 1fr;
    }

    .subject-details {
        display: none;
    }
}
body {
    background-color: var(--bg-color);
    color: var(--text-color);
}

.card,
.accordion,
.modal-content {
    background-color: var(--card-bg);
}

/* Smooth transitions for all elements */
body,
.card,
.accordion,
.modal-content,
.btn,
.list-group-item,
input,
textarea,
select {
    transition: background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease;
}

/* Dark mode link colors */
.dark-mode a {
    color: #4dabf7 !important;
}

.dark-mode a:hover {
    color: #74c0fc !important;
}