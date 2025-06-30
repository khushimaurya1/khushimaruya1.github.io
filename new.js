// JavaScript Code
class CountdownTimer {
    constructor() {
        this.targetDate = null;
        this.timerInterval = null;
        this.isRunning = false;
        this.initializeElements();
        this.setupEventListeners();
        this.setDefaultDateTime();
    }

    initializeElements() {
        this.elements = {
            targetDate: document.getElementById('targetDate'),
            targetTime: document.getElementById('targetTime'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            resetBtn: document.getElementById('resetBtn'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            status: document.getElementById('status'),
            timerDisplay: document.getElementById('timerDisplay')
        };
    }

    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startTimer());
        this.elements.stopBtn.addEventListener('click', () => this.stopTimer());
        this.elements.resetBtn.addEventListener('click', () => this.resetTimer());
        
        // Update timer when date/time inputs change
        this.elements.targetDate.addEventListener('change', () => this.updateTargetDate());
        this.elements.targetTime.addEventListener('change', () => this.updateTargetDate());
    }

    setDefaultDateTime() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        // Set default date to tomorrow
        const dateString = tomorrow.toISOString().split('T')[0];
        this.elements.targetDate.value = dateString;
        
        // Set default time to current time
        const timeString = now.toTimeString().slice(0, 5);
        this.elements.targetTime.value = timeString;
        
        this.updateTargetDate();
    }

    updateTargetDate() {
        const dateValue = this.elements.targetDate.value;
        const timeValue = this.elements.targetTime.value;
        
        if (dateValue && timeValue) {
            this.targetDate = new Date(`${dateValue}T${timeValue}`);
            
            if (!this.isRunning) {
                this.updateDisplay();
            }
        }
    }

    startTimer() {
        if (!this.targetDate) {
            this.updateStatus('Please set a target date and time first!', 'error');
            return;
        }

        const now = new Date().getTime();
        const target = this.targetDate.getTime();

        if (target <= now) {
            this.updateStatus('Please select a future date and time!', 'error');
            return;
        }

        this.isRunning = true;
        this.updateStatus('Timer is running...', 'running');
        
        // Update immediately
        this.updateDisplay();
        
        // Then update every second
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);

        // Update button states
        this.elements.startBtn.disabled = true;
        this.elements.stopBtn.disabled = false;
    }

    stopTimer() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.updateStatus('Timer stopped', 'stopped');
        
        // Update button states
        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
    }

    resetTimer() {
        this.stopTimer();
        this.setDefaultDateTime();
        this.updateStatus('Timer reset', 'reset');
        
        // Reset button states
        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
    }

    updateDisplay() {
        if (!this.targetDate) return;

        const now = new Date().getTime();
        const target = this.targetDate.getTime();
        const difference = target - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update display with animation
            this.updateTimeUnit('days', days);
            this.updateTimeUnit('hours', hours);
            this.updateTimeUnit('minutes', minutes);
            this.updateTimeUnit('seconds', seconds);

        } else {
            // Timer finished
            this.elements.days.textContent = '00';
            this.elements.hours.textContent = '00';
            this.elements.minutes.textContent = '00';
            this.elements.seconds.textContent = '00';
            
            this.stopTimer();
            this.updateStatus('🎉 Time\'s up! Countdown finished!', 'finished');
            
            // Play notification sound (if browser supports it)
            this.playNotificationSound();
        }
    }

    updateTimeUnit(unit, value) {
        const element = this.elements[unit];
        const formattedValue = value.toString().padStart(2, '0');
        
        if (element.textContent !== formattedValue) {
            element.textContent = formattedValue;
            
            // Add bounce animation
            const parentUnit = element.parentElement;
            parentUnit.classList.add('updating');
            setTimeout(() => {
                parentUnit.classList.remove('updating');
            }, 300);
        }
    }

    updateStatus(message, type) {
        this.elements.status.textContent = message;
        this.elements.status.className = `status ${type}`;
    }

    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }
}

// Initialize the countdown timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});