/**
 * StudioLoop Dashboard Annotation System
 * Interactive business context overlay for dashboard demonstrations
 */

class AnnotationSystem {
    constructor() {
        this.annotations = {};
        this.currentPage = '';
        this.isVisible = false;
        this.currentSection = null;
        this.init();
    }

    init() {
        this.detectCurrentPage();
        this.loadAnnotations();
        this.createAnnotationUI();
        this.setupEventListeners();
        this.addAnnotationToggle();
        this.addKeyboardShortcuts();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('trainer-dashboard')) this.currentPage = 'dashboard';
        else if (path.includes('trainer-analytics')) this.currentPage = 'analytics';
        else if (path.includes('trainer-schedule')) this.currentPage = 'schedule';
        else if (path.includes('trainer-earnings')) this.currentPage = 'earnings';
        else if (path.includes('trainer-communications')) this.currentPage = 'communications';
        else if (path.includes('trainer-equipment')) this.currentPage = 'equipment';
        else if (path.includes('trainer-settings')) this.currentPage = 'settings';
    }

    async loadAnnotations() {
        // In a real implementation, these would be loaded from the .md files
        // For now, we'll define them inline with key insights
        this.annotations = {
            dashboard: {
                title: "BMS + Marketplace Business Model",
                overview: "This dashboard is the primary BMS interface for studio partners. StudioLoop provides complete business management that ALSO connects studios to a fitness marketplace network.",
                sections: {
                    'today-schedule': {
                        title: "Today's Schedule - Core BMS Operations",
                        content: "Manages ALL studio bookings (direct + marketplace). QR check-in works for both member types. Shows revenue split between booking sources.",
                        businessImpact: "30% better utilization through marketplace bookings filling off-peak slots."
                    },
                    'revenue-cards': {
                        title: "Revenue Metrics - Complete Financial Overview", 
                        content: "Combines direct membership + marketplace commission + equipment rental revenue. Total business intelligence in one view.",
                        businessImpact: "Average 25-40% total revenue growth within first year."
                    },
                    'quick-actions': {
                        title: "Quick Actions - Full BMS Capabilities",
                        content: "Complete studio management: scheduling, member communications, analytics, and equipment management. Not just marketplace features.",
                        businessImpact: "Reduces admin time by 70%+ vs manual systems."
                    }
                }
            },
            analytics: {
                title: "Complete Business Intelligence & Marketplace Performance",
                overview: "Comprehensive analytics for both direct studio operations and marketplace network performance. Data-driven decision making across all revenue streams.",
                sections: {
                    'kpi-cards': {
                        title: "KPI Cards - Multi-Stream Revenue Tracking",
                        content: "R24,580 includes direct memberships + marketplace tokens + equipment rental. 1,284 students = direct + marketplace users.",
                        businessImpact: "Studios see 15-30% improvement in profitability through data-driven optimization."
                    },
                    'performance-table': {
                        title: "Class Performance - Complete Studio Analysis",
                        content: "Analyzes ALL classes regardless of booking source. Identifies which classes attract marketplace vs direct members.",
                        businessImpact: "Optimize class mix for maximum revenue across all channels."
                    },
                    'heatmap': {
                        title: "Activity Heatmap - Capacity Optimization", 
                        content: "Shows optimal times for marketplace bookings to fill gaps. Peak times command premium pricing.",
                        businessImpact: "30%+ improvement in off-peak class utilization."
                    }
                }
            },
            schedule: {
                title: "Complete Studio Scheduling & Resource Management BMS",
                overview: "Core operational center managing ALL studio scheduling - instructors, rooms, equipment. Handles direct bookings AND marketplace network integration.",
                sections: {
                    'calendar': {
                        title: "Full Calendar System - Complete Studio Management",
                        content: "Multi-room scheduling, instructor assignment, resource booking. Manages ALL booking channels, not just marketplace.",
                        businessImpact: "Eliminates double-bookings, optimizes resource utilization by 40%+."
                    },
                    'today-classes': {
                        title: "Today's Classes - Real-Time Operations",
                        content: "Live attendance tracking for direct members AND marketplace users. Revenue attribution by booking source.",
                        businessImpact: "Improved operational efficiency and member experience."
                    }
                }
            },
            earnings: {
                title: "Complete Financial Management & Revenue Optimization BMS", 
                overview: "Comprehensive financial control center tracking ALL revenue streams: direct memberships, marketplace commissions, equipment rentals, additional services.",
                sections: {
                    'revenue-overview': {
                        title: "Multi-Stream Revenue Tracking",
                        content: "R37,240 combines: Direct memberships + 55-60% marketplace commission + equipment rental + corporate contracts.",
                        businessImpact: "Revenue diversification reduces risk, increases stability."
                    },
                    'payout-system': {
                        title: "Automated Financial Operations",
                        content: "Automatic monthly marketplace payouts + instant direct payment processing. Complete financial transparency.",
                        businessImpact: "Predictable cash flow, reduced accounting overhead by 80%+."
                    }
                }
            },
            communications: {
                title: "Complete Member Relationship Management & Network Messaging BMS",
                overview: "Unified communication hub for ALL member types - direct members and marketplace users. Complete CRM integration with automated workflows.",
                sections: {
                    'member-communication': {
                        title: "Unified Member Communication System",
                        content: "Single platform for direct members + marketplace users. Automated welcome sequences, booking confirmations, follow-ups.",
                        businessImpact: "20%+ improvement in member retention through better communication."
                    },
                    'network-messaging': {
                        title: "Network Communication Benefits", 
                        content: "Cross-studio messaging, member transfers, referral communications. Convert marketplace users to direct members.",
                        businessImpact: "20%+ of marketplace users convert to direct memberships through communication."
                    }
                }
            },
            equipment: {
                title: "Asset Management & Network Sharing BMS",
                overview: "Complete studio asset lifecycle management PLUS inter-studio equipment sharing for additional revenue streams.",
                sections: {
                    'asset-management': {
                        title: "Complete Asset Management System",
                        content: "Inventory tracking, condition monitoring, maintenance scheduling, ROI analysis. Professional asset management.",
                        businessImpact: "30-50% better asset utilization, reduced maintenance costs."
                    },
                    'network-sharing': {
                        title: "Equipment Sharing Network",
                        content: "Rent unused equipment to other studios, access specialized equipment without purchase. Transform costs into revenue.",
                        businessImpact: "R2,000-8,000 additional monthly revenue per studio from equipment sharing."
                    }
                }
            },
            settings: {
                title: "Complete Studio Configuration & Network Management BMS",
                overview: "Administrative control center for all studio operations. Manages brand identity, business rules, staff permissions, and network participation.",
                sections: {
                    'studio-config': {
                        title: "Studio Profile & Business Configuration",
                        content: "Complete brand management, operational settings, booking policies, pricing structure. Professional studio presentation.",
                        businessImpact: "Systematic configuration ensures operational excellence and scalability."
                    },
                    'network-settings': {
                        title: "Network Participation Configuration",
                        content: "Marketplace visibility, commission preferences, equipment sharing settings, inter-studio collaboration rules.",
                        businessImpact: "Optimize network participation for maximum financial benefit."
                    }
                }
            }
        };
    }

    createAnnotationUI() {
        // Create annotation overlay container
        const overlay = document.createElement('div');
        overlay.id = 'annotation-overlay';
        overlay.innerHTML = `
            <div id="annotation-panel" class="annotation-panel">
                <div class="annotation-header">
                    <div class="annotation-title">
                        <i class="fas fa-lightbulb"></i>
                        <h3 id="annotation-page-title">Business Context</h3>
                    </div>
                    <div class="annotation-controls">
                        <button id="annotation-minimize" class="btn-icon">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button id="annotation-close" class="btn-icon">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div id="annotation-content" class="annotation-content">
                    <div id="annotation-overview" class="annotation-section">
                        <h4>Overview</h4>
                        <p id="overview-text"></p>
                    </div>
                    <div id="annotation-sections" class="annotation-sections">
                        <h4>Interactive Elements</h4>
                        <p class="annotation-hint">Click on highlighted dashboard elements to see business context</p>
                        <div id="sections-list"></div>
                    </div>
                    <div id="annotation-details" class="annotation-details" style="display: none;">
                        <div class="back-button">
                            <button id="back-to-overview">
                                <i class="fas fa-arrow-left"></i> Back to Overview
                            </button>
                        </div>
                        <h4 id="detail-title"></h4>
                        <div id="detail-content"></div>
                        <div id="detail-impact" class="business-impact">
                            <h5><i class="fas fa-chart-line"></i> Business Impact</h5>
                            <p id="impact-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #annotation-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                z-index: 10000;
                display: none;
                backdrop-filter: blur(2px);
            }

            .annotation-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                max-width: 90vw;
                max-height: 80vh;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                font-family: 'Inter', sans-serif;
            }

            .annotation-header {
                background: linear-gradient(45deg, #0077ff, #00e5ff);
                color: white;
                padding: 20px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .annotation-title {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .annotation-title h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .annotation-title i {
                font-size: 20px;
            }

            .annotation-controls {
                display: flex;
                gap: 8px;
            }

            .btn-icon {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background 0.2s;
            }

            .btn-icon:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .annotation-content {
                padding: 24px;
                max-height: 60vh;
                overflow-y: auto;
            }

            .annotation-section h4 {
                color: #0077ff;
                margin: 0 0 12px 0;
                font-size: 16px;
                font-weight: 600;
            }

            .annotation-section p {
                margin: 0 0 20px 0;
                line-height: 1.6;
                color: #374151;
            }

            .annotation-hint {
                background: #f0f8ff;
                color: #0057cc;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 16px !important;
                font-size: 14px;
                border-left: 4px solid #0077ff;
            }

            .sections-list {
                display: grid;
                gap: 8px;
            }

            .section-item {
                padding: 12px 16px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                background: white;
            }

            .section-item:hover {
                border-color: #0077ff;
                background: #f0f8ff;
                transform: translateX(4px);
            }

            .section-item h5 {
                margin: 0 0 4px 0;
                color: #0077ff;
                font-size: 14px;
                font-weight: 600;
            }

            .section-item p {
                margin: 0;
                font-size: 13px;
                color: #6b7280;
                line-height: 1.4;
            }

            .business-impact {
                background: #f0f9f0;
                border: 1px solid #10b981;
                border-radius: 8px;
                padding: 16px;
                margin-top: 20px;
            }

            .business-impact h5 {
                margin: 0 0 8px 0;
                color: #047857;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .business-impact p {
                margin: 0;
                color: #065f46;
                font-size: 14px;
                line-height: 1.5;
            }

            .back-button {
                margin-bottom: 20px;
            }

            .back-button button {
                background: none;
                border: none;
                color: #6b7280;
                font-size: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 0;
                transition: color 0.2s;
            }

            .back-button button:hover {
                color: #0077ff;
            }

            /* Highlighting system */
            .annotation-highlight {
                position: relative;
                cursor: pointer !important;
                transition: all 0.3s ease;
            }

            .annotation-highlight::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border: 2px solid #0077ff;
                border-radius: 8px;
                background: rgba(0, 119, 255, 0.1);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: -1;
            }

            .annotation-highlight:hover::after {
                opacity: 1;
            }

            .annotation-highlight.active::after {
                opacity: 1;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.02); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }

            /* Toggle button */
            #annotation-toggle {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 60px;
                height: 60px;
                background: linear-gradient(45deg, #0077ff, #00e5ff);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 8px 24px rgba(0, 119, 255, 0.3);
                transition: all 0.3s ease;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #annotation-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 32px rgba(0, 119, 255, 0.4);
            }

            #annotation-toggle.active {
                background: linear-gradient(45deg, #10b981, #00e5ff);
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .annotation-panel {
                    width: 95vw;
                    max-height: 90vh;
                }

                .annotation-content {
                    padding: 16px;
                }

                #annotation-toggle {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                    bottom: 16px;
                    right: 16px;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(overlay);

        // Load content for current page
        this.loadPageContent();
    }

    addAnnotationToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'annotation-toggle';
        toggle.innerHTML = '<i class="fas fa-info"></i>';
        toggle.title = 'Toggle Business Context (Press B)';
        
        toggle.addEventListener('click', () => {
            this.toggleAnnotations();
        });

        document.body.appendChild(toggle);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Press 'B' to toggle annotations
            if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
                // Don't trigger if user is typing in an input
                if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
                e.preventDefault();
                this.toggleAnnotations();
            }
            // Press Escape to close
            if (e.key === 'Escape' && this.isVisible) {
                this.hideAnnotations();
            }
        });
    }

    setupEventListeners() {
        // Close button
        document.getElementById('annotation-close').addEventListener('click', () => {
            this.hideAnnotations();
        });

        // Minimize button
        document.getElementById('annotation-minimize').addEventListener('click', () => {
            this.hideAnnotations();
        });

        // Back to overview
        document.getElementById('back-to-overview').addEventListener('click', () => {
            this.showOverview();
        });

        // Click outside to close
        document.getElementById('annotation-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'annotation-overlay') {
                this.hideAnnotations();
            }
        });
    }

    loadPageContent() {
        const pageData = this.annotations[this.currentPage];
        if (!pageData) return;

        document.getElementById('annotation-page-title').textContent = pageData.title;
        document.getElementById('overview-text').textContent = pageData.overview;

        // Create section list
        const sectionsList = document.getElementById('sections-list');
        sectionsList.innerHTML = '';

        Object.entries(pageData.sections).forEach(([key, section]) => {
            const item = document.createElement('div');
            item.className = 'section-item';
            item.innerHTML = `
                <h5>${section.title}</h5>
                <p>${section.content.substring(0, 100)}...</p>
            `;
            item.addEventListener('click', () => {
                this.showSectionDetails(key, section);
                this.highlightElement(key);
            });
            sectionsList.appendChild(item);
        });

        // Add highlights to dashboard elements
        this.addElementHighlights();
    }

    addElementHighlights() {
        const pageData = this.annotations[this.currentPage];
        if (!pageData) return;

        // Define element selectors for each page
        const selectors = {
            dashboard: {
                'today-schedule': '.upcoming-classes, .today-schedule',
                'revenue-cards': '.metrics-grid, .kpi-grid',
                'quick-actions': '.quick-actions, .action-buttons'
            },
            analytics: {
                'kpi-cards': '.kpi-grid, .kpi-card',
                'performance-table': '.performance-table, table',
                'heatmap': '.heatmap-container, .heatmap-grid'
            },
            schedule: {
                'calendar': '.calendar-container, .calendar-grid',
                'today-classes': '.today-classes, .class-list'
            },
            earnings: {
                'revenue-overview': '.earnings-grid, .revenue-cards',
                'payout-system': '.payout-section, .payment-history'
            },
            communications: {
                'member-communication': '.chat-container, .message-list',
                'network-messaging': '.contacts-list, .network-section'
            },
            equipment: {
                'asset-management': '.equipment-grid, .current-rentals',
                'network-sharing': '.equipment-catalog, .rental-section'
            },
            settings: {
                'studio-config': '.settings-grid, .profile-section',
                'network-settings': '.network-settings, .preferences-section'
            }
        };

        const currentSelectors = selectors[this.currentPage];
        if (!currentSelectors) return;

        Object.entries(currentSelectors).forEach(([key, selector]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('annotation-highlight');
                element.setAttribute('data-annotation-key', key);
                element.addEventListener('click', (e) => {
                    if (this.isVisible) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showSectionDetails(key, pageData.sections[key]);
                        this.highlightElement(key);
                    }
                });
            });
        });
    }

    showSectionDetails(key, section) {
        document.getElementById('annotation-overview').style.display = 'none';
        document.getElementById('annotation-sections').style.display = 'none';
        document.getElementById('annotation-details').style.display = 'block';

        document.getElementById('detail-title').textContent = section.title;
        document.getElementById('detail-content').innerHTML = `<p>${section.content}</p>`;
        document.getElementById('impact-text').textContent = section.businessImpact;
    }

    showOverview() {
        document.getElementById('annotation-details').style.display = 'none';
        document.getElementById('annotation-overview').style.display = 'block';
        document.getElementById('annotation-sections').style.display = 'block';
        this.clearHighlights();
    }

    highlightElement(key) {
        this.clearHighlights();
        const elements = document.querySelectorAll(`[data-annotation-key="${key}"]`);
        elements.forEach(element => {
            element.classList.add('active');
        });
    }

    clearHighlights() {
        document.querySelectorAll('.annotation-highlight.active').forEach(element => {
            element.classList.remove('active');
        });
    }

    toggleAnnotations() {
        if (this.isVisible) {
            this.hideAnnotations();
        } else {
            this.showAnnotations();
        }
    }

    showAnnotations() {
        document.getElementById('annotation-overlay').style.display = 'block';
        document.getElementById('annotation-toggle').classList.add('active');
        this.isVisible = true;
        this.showOverview();

        // Add subtle animation
        setTimeout(() => {
            document.querySelector('.annotation-panel').style.animation = 'fadeInUp 0.3s ease';
        }, 10);
    }

    hideAnnotations() {
        document.getElementById('annotation-overlay').style.display = 'none';
        document.getElementById('annotation-toggle').classList.remove('active');
        this.isVisible = false;
        this.clearHighlights();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.annotationSystem = new AnnotationSystem();
});

// Add CSS animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    </style>
`);