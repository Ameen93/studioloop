# StudioLoop Product Backlog & Sprint Plan

## MVP Vision Statement

**Build a dual-platform fitness booking system that enables gyms to manage bookings efficiently while creating a marketplace for fitness enthusiasts to discover and book classes across multiple venues.**

### MVP Success Criteria
- [ ] 10 gyms onboarded and actively using the platform
- [ ] 500 active users booking classes
- [ ] 100 successful bookings per week
- [ ] <2% booking failure rate
- [ ] 4.0+ app store rating

---

## Epic Structure

### Epic 1: User Authentication & Onboarding
**Goal:** Seamless user registration and gym onboarding
**Priority:** P0 (Critical)
**Sprint:** 1

### Epic 2: Core Booking System
**Goal:** Enable direct gym class bookings with credit system
**Priority:** P0 (Critical)
**Sprint:** 1-2

### Epic 3: Gym Management Dashboard
**Goal:** Allow gym owners to manage classes and schedules
**Priority:** P0 (Critical)
**Sprint:** 2-3

### Epic 4: Marketplace Discovery
**Goal:** Enable users to discover classes across multiple gyms
**Priority:** P1 (High)
**Sprint:** 3-4

### Epic 5: Payment Integration
**Goal:** Process payments and credit purchases
**Priority:** P0 (Critical)
**Sprint:** 4-5

### Epic 6: QR Check-in System
**Goal:** Contactless class check-in via QR codes
**Priority:** P1 (High)
**Sprint:** 5-6

### Epic 7: Notifications & Communications
**Goal:** WhatsApp and push notifications for bookings
**Priority:** P1 (High)
**Sprint:** 6-7

### Epic 8: Analytics & Reporting
**Goal:** Basic analytics for gym owners
**Priority:** P2 (Medium)
**Sprint:** 7-8

---

## User Stories by Sprint

### Sprint 1: Foundation (Week 1-2)
**Sprint Goal:** User can register and view gym classes

#### Story 1.1: User Registration
**As a** fitness enthusiast  
**I want to** create an account using my email or phone  
**So that** I can start booking fitness classes

**Acceptance Criteria:**
- User can register with email/phone and password
- Email/SMS verification is sent
- User profile is created with basic info
- User is logged in after successful registration
- Error handling for existing accounts

**Story Points:** 5
**Dependencies:** Supabase Auth setup

---

#### Story 1.2: User Login
**As a** registered user  
**I want to** log into my account  
**So that** I can access my bookings and profile

**Acceptance Criteria:**
- User can login with email/phone and password
- "Forgot password" flow works via email
- Sessions persist across app restarts
- Biometric login option available (Face ID/Fingerprint)
- Proper error messages for invalid credentials

**Story Points:** 3
**Dependencies:** Story 1.1

---

#### Story 1.3: Gym Profile Setup
**As a** gym owner  
**I want to** create my gym profile  
**So that** users can discover my fitness facility

**Acceptance Criteria:**
- Gym owner can register business details
- Can upload gym photos and logo
- Can set location and operating hours
- Can add gym description and amenities
- Profile is viewable in marketplace

**Story Points:** 5
**Dependencies:** Story 1.1

---

#### Story 1.4: Class Template Creation
**As a** gym owner  
**I want to** create class templates  
**So that** I can schedule recurring classes easily

**Acceptance Criteria:**
- Can create class with name, description, duration
- Can set instructor, capacity, and difficulty level
- Can specify equipment needed
- Can set credit cost for the class
- Templates are saved for reuse

**Story Points:** 5
**Dependencies:** Story 1.3

---

#### Story 1.5: View Available Classes
**As a** user  
**I want to** see available classes at my gym  
**So that** I can choose which class to attend

**Acceptance Criteria:**
- User sees list of upcoming classes
- Each class shows time, instructor, available spots
- Can filter by class type and time
- Can view class details
- Shows credits required

**Story Points:** 3
**Dependencies:** Story 1.4

---

### Sprint 2: Core Booking (Week 3-4)
**Sprint Goal:** User can book and manage class reservations

#### Story 2.1: Book a Class
**As a** user  
**I want to** book a spot in a fitness class  
**So that** I can secure my participation

**Acceptance Criteria:**
- User can select a class and book it
- Booking deducts credits from account
- Confirmation screen shows booking details
- Booking appears in user's schedule
- Cannot book if insufficient credits
- Cannot book if class is full

**Story Points:** 8
**Dependencies:** Story 1.5

---

#### Story 2.2: Cancel Booking
**As a** user  
**I want to** cancel my class booking  
**So that** someone else can take my spot

**Acceptance Criteria:**
- User can cancel booking from booking details
- Credits are refunded if within cancellation window
- Spot becomes available for others
- User receives cancellation confirmation
- Cannot cancel past cancellation deadline

**Story Points:** 5
**Dependencies:** Story 2.1

---

#### Story 2.3: Schedule Classes
**As a** gym owner  
**I want to** schedule classes for the week  
**So that** members know when classes are available

**Acceptance Criteria:**
- Can create schedule from class templates
- Can set specific dates and times
- Can assign instructors to sessions
- Can modify capacity for specific sessions
- Schedule is immediately visible to users

**Story Points:** 8
**Dependencies:** Story 1.4

---

#### Story 2.4: Manage Bookings
**As a** gym owner  
**I want to** see who has booked each class  
**So that** I can manage attendance

**Acceptance Criteria:**
- See list of bookings for each class
- Can view member details
- Can manually check-in members
- Can cancel member bookings if needed
- Export attendee list

**Story Points:** 5
**Dependencies:** Story 2.3

---

#### Story 2.5: Booking History
**As a** user  
**I want to** see my past and upcoming bookings  
**So that** I can track my fitness journey

**Acceptance Criteria:**
- View list of all bookings (past and future)
- See booking status (confirmed, completed, cancelled)
- Can rebook previous classes easily
- Shows total classes attended
- Can filter by date range

**Story Points:** 3
**Dependencies:** Story 2.1

---

### Sprint 3: Marketplace & Discovery (Week 5)
**Sprint Goal:** Users can discover and book classes across multiple gyms

#### Story 3.1: Gym Discovery
**As a** user  
**I want to** discover gyms near me  
**So that** I can explore different fitness options

**Acceptance Criteria:**
- Browse gyms on a map view
- See gyms in list view with distance
- Filter by amenities and class types
- View gym profiles with photos
- See gym ratings and class offerings

**Story Points:** 8
**Dependencies:** Story 1.3

---

#### Story 3.2: Cross-Gym Class Search
**As a** user  
**I want to** search for specific class types across all gyms  
**So that** I can find the perfect class regardless of location

**Acceptance Criteria:**
- Search by class type (yoga, HIIT, etc.)
- Filter by time, location, instructor
- See results from multiple gyms
- Sort by distance or time
- Save favorite searches

**Story Points:** 5
**Dependencies:** Story 3.1

---

#### Story 3.3: Marketplace Booking
**As a** user  
**I want to** book classes at gyms I'm not a member of  
**So that** I can try new fitness experiences

**Acceptance Criteria:**
- Book classes at any participating gym
- Use universal credits or pay per class
- Receive booking confirmation
- Get directions to new gym
- See first-timer tips for the gym

**Story Points:** 8
**Dependencies:** Story 3.2, Story 2.1

---

#### Story 3.4: Gym Analytics Dashboard
**As a** gym owner  
**I want to** see analytics about my gym's performance  
**So that** I can make data-driven decisions

**Acceptance Criteria:**
- View total bookings and revenue
- See popular classes and peak times
- Track member retention metrics
- Compare performance over time
- Export reports as PDF

**Story Points:** 5
**Dependencies:** Story 2.4

---

### Sprint 4: Payments & Credits (Week 6)
**Sprint Goal:** Complete payment system with credit purchases

#### Story 4.1: Purchase Credits
**As a** user  
**I want to** buy credits for class bookings  
**So that** I can book classes easily

**Acceptance Criteria:**
- View credit packages and prices
- Purchase via credit/debit card (Yoco)
- Instant credit balance update
- Receive payment receipt via email
- Transaction history available

**Story Points:** 8
**Dependencies:** Yoco integration

---

#### Story 4.2: Subscription Plans
**As a** user  
**I want to** subscribe to monthly credit packages  
**So that** I get better value and convenience

**Acceptance Criteria:**
- Choose from subscription tiers
- Auto-renewal monthly
- Can cancel anytime
- Pro-rated refunds on cancellation
- Subscription status in profile

**Story Points:** 5
**Dependencies:** Story 4.1

---

#### Story 4.3: Gym Payment Dashboard
**As a** gym owner  
**I want to** track revenue from bookings  
**So that** I can manage my finances

**Acceptance Criteria:**
- See revenue from direct bookings
- See revenue from marketplace bookings
- View payout schedule
- Download financial reports
- Track refunds and cancellations

**Story Points:** 5
**Dependencies:** Story 4.1

---

#### Story 4.4: Promotional Credits
**As a** gym owner  
**I want to** offer promotional credits  
**So that** I can attract new members

**Acceptance Criteria:**
- Create promo codes with credit values
- Set expiration dates and usage limits
- Track redemption rates
- Users can apply promo codes
- Credits added to user account

**Story Points:** 3
**Dependencies:** Story 4.1

---

### Sprint 5: QR Check-in & Verification (Week 7)
**Sprint Goal:** Implement contactless check-in system

#### Story 5.1: Generate QR Codes
**As a** user  
**I want to** receive a QR code for my booking  
**So that** I can check in quickly at the gym

**Acceptance Criteria:**
- QR code generated upon booking
- QR code contains encrypted booking info
- QR code expires after class ends
- Can access QR from booking details
- Works offline once loaded

**Story Points:** 5
**Dependencies:** Story 2.1

---

#### Story 5.2: QR Scanner for Gym
**As a** gym staff  
**I want to** scan member QR codes  
**So that** I can verify class attendance

**Acceptance Criteria:**
- Scan QR codes via tablet/phone camera
- Instant verification of valid booking
- Show member name and photo
- Mark attendance automatically
- Handle invalid/expired codes

**Story Points:** 5
**Dependencies:** Story 5.1

---

#### Story 5.3: WhatsApp Notifications
**As a** user  
**I want to** receive booking confirmations via WhatsApp  
**So that** I have easy access to booking details

**Acceptance Criteria:**
- Opt-in for WhatsApp notifications
- Receive booking confirmations
- Get class reminders 2 hours before
- Receive cancellation notices
- Can reply for basic support

**Story Points:** 8
**Dependencies:** WhatsApp Business API

---

#### Story 5.4: Push Notifications
**As a** user  
**I want to** receive push notifications  
**So that** I don't miss my classes

**Acceptance Criteria:**
- Enable/disable push notifications
- Class reminders (customizable timing)
- Booking confirmations
- Promotional notifications (opt-in)
- Waitlist notifications

**Story Points:** 3
**Dependencies:** Story 2.1

---

### Sprint 6: Polish & Optimization (Week 8)
**Sprint Goal:** Refine UX and ensure production readiness

#### Story 6.1: Offline Mode
**As a** user  
**I want to** access my bookings offline  
**So that** I can check in even without internet

**Acceptance Criteria:**
- View bookings when offline
- QR codes work offline
- Sync when connection restored
- Clear offline indicators
- Handle conflicts gracefully

**Story Points:** 5
**Dependencies:** Story 5.1

---

#### Story 6.2: Performance Optimization
**As a** user  
**I want** the app to be fast and responsive  
**So that** I have a smooth experience

**Acceptance Criteria:**
- App loads in <3 seconds
- Smooth scrolling and transitions
- Images load progressively
- Search returns results instantly
- No memory leaks

**Story Points:** 8
**Dependencies:** All previous stories

---

#### Story 6.3: Instructor Management
**As a** gym owner  
**I want to** manage my instructor roster  
**So that** I can assign them to classes

**Acceptance Criteria:**
- Add/remove instructors
- Set instructor availability
- Assign to multiple classes
- Instructors can view their schedule
- Cover/substitute instructors

**Story Points:** 5
**Dependencies:** Story 2.3

---

#### Story 6.4: User Feedback System
**As a** user  
**I want to** rate classes and instructors  
**So that** I can help others make informed choices

**Acceptance Criteria:**
- Rate class after completion (1-5 stars)
- Optional written review
- Rate instructor separately
- View ratings before booking
- Gym owners see aggregate ratings

**Story Points:** 3
**Dependencies:** Story 2.5

---

#### Story 6.5: Help & Support
**As a** user  
**I want to** get help when I have issues  
**So that** I can resolve problems quickly

**Acceptance Criteria:**
- In-app help center with FAQs
- Contact support via chat
- Report bugs or issues
- Video tutorials for key features
- Gym-specific support contact

**Story Points:** 3
**Dependencies:** None

---

## Definition of Done

For each story to be considered complete:

1. **Code Complete**
   - [ ] Feature implemented according to acceptance criteria
   - [ ] Code reviewed by peer
   - [ ] No critical bugs

2. **Testing**
   - [ ] Unit tests written and passing (>80% coverage)
   - [ ] Integration tests passing
   - [ ] Manual QA completed
   - [ ] Accessibility tested

3. **Documentation**
   - [ ] Code commented appropriately
   - [ ] API documentation updated
   - [ ] User guide updated if needed

4. **Performance**
   - [ ] Loads in <3 seconds
   - [ ] No memory leaks
   - [ ] Works on low-end devices

5. **Deployment**
   - [ ] Deployed to staging environment
   - [ ] Product owner approval received
   - [ ] Merged to main branch

---

## Sprint Schedule

### 8-Week MVP Timeline

| Sprint | Dates | Goal | Story Points |
|--------|-------|------|--------------|
| Sprint 1 | Week 1-2 | Foundation & Auth | 21 |
| Sprint 2 | Week 3-4 | Core Booking | 29 |
| Sprint 3 | Week 5 | Marketplace | 26 |
| Sprint 4 | Week 6 | Payments | 21 |
| Sprint 5 | Week 7 | QR & Notifications | 21 |
| Sprint 6 | Week 8 | Polish & Launch | 24 |
| **Total** | **8 Weeks** | **MVP Complete** | **142** |

### Team Velocity Assumptions
- 2 developers (full-stack)
- 20-25 story points per sprint
- 4-day development, 1-day testing per week

---

## Risk Register

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Payment integration delays | High | Medium | Start Yoco integration early, have Stripe backup |
| WhatsApp API approval | Medium | Medium | Apply early, have SMS fallback |
| Gym adoption slow | High | Medium | Pre-sign 5 gyms, offer free trial |
| App store approval delays | High | Low | Submit 2 weeks before launch |
| Technical debt accumulation | Medium | High | Allocate 20% time for refactoring |

---

## Success Metrics (KPIs)

### Week 4 Checkpoint
- [ ] 3 gyms onboarded
- [ ] 50 test users registered
- [ ] Core booking flow working
- [ ] <5% crash rate

### Week 8 Launch Metrics
- [ ] 10 gyms active
- [ ] 500 registered users
- [ ] 100 bookings/week
- [ ] 4.0+ app rating
- [ ] <2% transaction failure rate
- [ ] <3 second load time

### Post-Launch (Month 3)
- [ ] 50 gyms
- [ ] 5,000 users
- [ ] 1,000 bookings/week
- [ ] 10% week-over-week growth
- [ ] CAC < R200
- [ ] LTV > R2,000

---

## Notes for Development Team

1. **Priority Order**: P0 stories block launch, P1 enhance experience, P2 are nice-to-have
2. **Technical Debt**: Address in Sprint 6 or post-launch
3. **Testing**: Each story needs tests before moving to next
4. **Daily Standups**: 9 AM SAST, 15 minutes max
5. **Sprint Reviews**: Friday afternoons with stakeholders
6. **Retrospectives**: After each sprint to improve process

---

## Backlog (Post-MVP)

### Future Epics
- Social features (friend invites, group bookings)
- Advanced analytics with AI insights
- Video on-demand classes
- Nutrition tracking integration
- Wearable device integration
- Corporate wellness packages
- Franchise management tools
- International expansion features