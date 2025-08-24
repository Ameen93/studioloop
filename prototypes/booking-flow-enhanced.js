        // Enhanced Accessibility Functions
        function announceStepChange() {
            const stepTitle = stepTitles[bookingState.currentStep];
            const announcement = `Now on step ${bookingState.currentStep} of ${bookingState.maxStep}: ${stepTitle}`;
            
            // Create or update screen reader announcement
            let announcer = document.getElementById('sr-announcer');
            if (!announcer) {
                announcer = document.createElement('div');
                announcer.id = 'sr-announcer';
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
                document.body.appendChild(announcer);
            }
            announcer.textContent = announcement;
        }

        function addErrorStateToStep(stepNumber) {
            const stepElement = document.getElementById(`step-${stepNumber}`);
            const interactiveElements = stepElement.querySelectorAll('.instructor-card, .date-option, .time-slot');
            
            interactiveElements.forEach(element => {
                element.classList.add('error');
                setTimeout(() => {
                    element.classList.remove('error');
                }, 3000);
            });
        }

        function goBack() {
            if (bookingState.isLoading) return;
            
            if (bookingState.currentStep > 1) {
                showLoading('Going back...');
                
                const currentStepElement = document.getElementById(`step-${bookingState.currentStep}`);
                currentStepElement.classList.remove('active');
                
                bookingState.currentStep--;
                
                setTimeout(() => {
                    const prevStepElement = document.getElementById(`step-${bookingState.currentStep}`);
                    prevStepElement.classList.remove('prev');
                    prevStepElement.classList.add('active');
                    
                    gsap.fromTo(prevStepElement, 
                        {
                            x: -100,
                            opacity: 0,
                            scale: 0.95
                        },
                        {
                            duration: 0.6,
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            ease: "power3.out"
                        }
                    );
                    
                    updateProgress();
                    updateNextButton();
                    hideLoading();
                    hideError();
                    
                    prevStepElement.focus();
                    announceStepChange();
                }, 200);
            } else {
                // Go back to home or previous page
                window.location.href = 'home-screen.html';
            }
        }

        function updateNextButton() {
            const nextBtn = document.getElementById('next-btn');
            
            switch (bookingState.currentStep) {
                case 1:
                    nextBtn.textContent = 'Select Time';
                    nextBtn.disabled = !bookingState.data.instructor;
                    break;
                case 2:
                    nextBtn.textContent = 'Review Booking';
                    nextBtn.disabled = false;
                    break;
                case 3:
                    nextBtn.textContent = 'Add Participants';
                    nextBtn.disabled = false;
                    break;
                case 4:
                    nextBtn.textContent = 'Choose Payment';
                    nextBtn.disabled = false;
                    break;
                case 5:
                    nextBtn.textContent = 'Confirm Booking';
                    nextBtn.disabled = false;
                    break;
                default:
                    nextBtn.textContent = 'Continue';
                    nextBtn.disabled = false;
            }
        }

        // Step-specific functions
        function selectInstructor(card) {
            if (bookingState.isLoading) return;
            
            // Remove previous selection
            document.querySelectorAll('.instructor-card').forEach(c => {
                c.classList.remove('selected');
                c.setAttribute('aria-selected', 'false');
            });
            
            // Add selection to clicked card
            card.classList.add('selected');
            card.setAttribute('aria-selected', 'true');
            
            // Update state
            const instructorName = card.dataset.instructor;
            const className = card.dataset.class;
            const duration = card.dataset.duration;
            
            bookingState.updateData('instructor', instructorName);
            bookingState.updateData('className', className);
            bookingState.updateData('duration', `${duration} minutes`);
            
            // Enhanced selection animation
            gsap.to(card, {
                duration: 0.4,
                scale: 1.02,
                ease: "back.out(2)"
            });
            
            setTimeout(() => {
                gsap.to(card, {
                    duration: 0.4,
                    scale: 1,
                    ease: "power2.out"
                });
            }, 300);
            
            updateNextButton();
            showSuccess(`Selected ${className} with ${instructorName}`);
            
            // Auto-advance after selection (with delay for feedback)
            setTimeout(() => {
                if (bookingState.currentStep === 1) {
                    nextStep();
                }
            }, 1500);
        }

        function selectDate(dateElement) {
            if (bookingState.isLoading) return;
            
            document.querySelectorAll('.date-option').forEach(d => {
                d.classList.remove('selected');
                d.setAttribute('aria-selected', 'false');
            });
            
            dateElement.classList.add('selected');
            dateElement.setAttribute('aria-selected', 'true');
            
            const dayText = dateElement.querySelector('.day').textContent;
            const dateText = dateElement.querySelector('.date').textContent;
            const dateString = `Aug ${dateText}`;
            
            bookingState.updateData('date', dateString);
            
            gsap.to(dateElement, {
                duration: 0.3,
                scale: 1.05,
                ease: "back.out(1.7)"
            });
            
            setTimeout(() => {
                gsap.to(dateElement, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            }, 200);
        }

        function selectTimeSlot(slot) {
            if (slot.classList.contains('unavailable') || bookingState.isLoading) {
                return;
            }
            
            document.querySelectorAll('.time-slot').forEach(s => {
                s.classList.remove('selected');
                s.setAttribute('aria-selected', 'false');
            });
            
            slot.classList.add('selected');
            slot.setAttribute('aria-selected', 'true');
            
            const time = slot.querySelector('.time').textContent;
            bookingState.updateData('time', time);
            
            gsap.to(slot, {
                duration: 0.3,
                scale: 1.05,
                ease: "back.out(1.7)"
            });
            
            setTimeout(() => {
                gsap.to(slot, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            }, 200);
        }

        function filterTimes(filter) {
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.remove('active');
            });
            event.target.classList.add('active');
            
            const timeSlots = document.querySelectorAll('.time-slot');
            timeSlots.forEach(slot => {
                const time = slot.querySelector('.time').textContent;
                const isAM = time.includes('AM');
                const isPM = time.includes('PM');
                
                let shouldShow = true;
                if (filter === 'morning' && !isAM) shouldShow = false;
                if (filter === 'evening' && !isPM) shouldShow = false;
                
                if (shouldShow) {
                    gsap.to(slot, { duration: 0.3, opacity: 1, scale: 1 });
                } else {
                    gsap.to(slot, { duration: 0.3, opacity: 0.3, scale: 0.95 });
                }
            });
        }

        // Initialize on DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            updateProgress();
            updateNextButton();
            
            // Enhanced entrance animations
            gsap.fromTo('.header', 
                { y: -50, opacity: 0 },
                { duration: 0.8, y: 0, opacity: 1, ease: "power3.out" }
            );
            
            gsap.fromTo('.instructor-card', 
                { y: 30, opacity: 0 },
                { 
                    duration: 0.6, 
                    y: 0, 
                    opacity: 1, 
                    stagger: 0.1, 
                    ease: "power2.out", 
                    delay: 0.3 
                }
            );
            
            gsap.fromTo('.bottom-actions', 
                { y: 50, opacity: 0 },
                { duration: 0.6, y: 0, opacity: 1, ease: "power2.out", delay: 0.5 }
            );
            
            // Add keyboard event listeners for accessibility
            addKeyboardSupport();
        });

        function addKeyboardSupport() {
            document.addEventListener('keydown', (e) => {
                if (bookingState.isLoading) return;
                
                switch(e.key) {
                    case 'Enter':
                        if (bookingState.currentStep < bookingState.maxStep) {
                            nextStep();
                        }
                        break;
                    case 'Escape':
                        goBack();
                        break;
                    case 'ArrowRight':
                        if (e.ctrlKey && bookingState.currentStep < bookingState.maxStep) {
                            nextStep();
                        }
                        break;
                    case 'ArrowLeft':
                        if (e.ctrlKey && bookingState.currentStep > 1) {
                            goBack();
                        }
                        break;
                }
            });

            // Add focus management for interactive elements
            document.querySelectorAll('.instructor-card, .date-option, .time-slot').forEach(element => {
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            });
        }