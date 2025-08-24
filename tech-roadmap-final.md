# Studio Loop Technical Roadmap 🛠️

## Project Overview
Build a **dual-platform ecosystem** connecting fitness enthusiasts and studios through:

1. **BMS System (B2B)** - Complete business management platform for gym/studio owners
2. **StudioLoop App (B2C)** - Consumer marketplace with subscription model + individual bookings

**Key Integration**: BMS-equipped gyms allow StudioLoop app users to book individual classes alongside their subscription members.

---

## Phase 0: Landing Page (Week 1) 🚀

### **Priority #1 - Get This Live ASAP**

#### **Tech Stack:**
- **Frontend:** Next.js + Tailwind CSS
- **Hosting:** Vercel (free tier)
- **Email Capture:** ConvertKit or Mailchimp
- **Analytics:** Google Analytics + Hotjar
- **Domain:** studioloop.co.za

#### **Key Features:**
```
Hero Section:
- Headline: "The Complete Fitness Ecosystem for Cape Town"
- Subheadline: "BMS for studios • Membership platform for users • Connected experiences for all"
- CTA: "Join Waitlist" with tabs for "Studio Owners" and "Fitness Enthusiasts"
- Hero video/image: Split showing studio management + member experiences

Dual Waitlist Forms:
Studio Owners:
- Studio name and location
- Current class volume
- Existing management system
- Primary challenges

Fitness Enthusiasts:
- Email (required)
- First name (required) 
- Phone number (optional)
- Fitness interests (yoga/HIIT/pilates/boxing/dance)
- Current fitness routine (dropdown)
- Preferred membership model (subscription vs pay-per-class)

Value Propositions:
For Studios: "Complete business management + marketplace revenue"
For Members: "Flexible access - subscription OR individual bookings"

How It Works (B2B):
1. Complete BMS for managing your studio
2. Access marketplace network for additional revenue
3. Members can book through StudioLoop app or direct

How It Works (B2C):
1. Choose subscription plan OR pay-per-class
2. Book at any partner studio through StudioLoop app  
3. Check in with QR code
4. Track progress and discover new studios

Pricing Preview:
B2C Subscription: Essential R650/month, Premium R950/month
B2C Individual: R120-180 per class (studio-dependent)  
B2B BMS: R500-2000/month (studio size dependent)
```

#### **Technical Requirements:**
- Mobile-responsive design
- Page load speed <2 seconds
- GDPR-compliant email capture
- Google Analytics conversion tracking
- Social media sharing integration

#### **Timeline:** 3-5 days maximum

---

## Phase 1: Core Infrastructure (Weeks 2-3)

### **Backend Architecture**

#### **Primary Tech Stack:**
- **API Framework:** FastAPI (Python) or Node.js + Express
- **Database:** PostgreSQL (primary) + Redis (caching)
- **Authentication:** JWT tokens + OAuth (Google/Apple)
- **File Storage:** AWS S3 or Google Cloud Storage
- **Email Service:** SendGrid or Mailgun
- **Payment Processing:** Stripe
- **Hosting:** AWS or Google Cloud Platform

#### **Database Schema Design:**

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255),
    subscription_plan VARCHAR(50),
    tokens_remaining INTEGER DEFAULT 0,
    tokens_total INTEGER DEFAULT 0,
    subscription_status VARCHAR(20) DEFAULT 'inactive',
    subscription_start_date TIMESTAMP,
    subscription_end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Studios Table
CREATE TABLE studios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    instagram VARCHAR(100),
    amenities JSONB,
    images JSONB,
    rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    commission_rate DECIMAL(5, 2) DEFAULT 40.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id),
    instructor_name VARCHAR(255),
    class_name VARCHAR(255) NOT NULL,
    class_type VARCHAR(100),
    description TEXT,
    duration_minutes INTEGER,
    difficulty_level VARCHAR(20),
    max_capacity INTEGER,
    price DECIMAL(8, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Schedules Table
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    available_spots INTEGER,
    booked_spots INTEGER DEFAULT 0,
    is_cancelled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    class_schedule_id UUID REFERENCES class_schedules(id),
    booking_status VARCHAR(20) DEFAULT 'confirmed',
    tokens_used INTEGER DEFAULT 1,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_in_time TIMESTAMP,
    no_show BOOLEAN DEFAULT false,
    qr_code VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50),
    stripe_payment_id VARCHAR(255),
    status VARCHAR(20),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Studio Payouts Table
CREATE TABLE studio_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id),
    amount DECIMAL(10, 2),
    commission_rate DECIMAL(5, 2),
    payment_period_start DATE,
    payment_period_end DATE,
    status VARCHAR(20) DEFAULT 'pending',
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **API Endpoints Structure:**

```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password

Users:
GET /api/user/profile
PUT /api/user/profile
GET /api/user/bookings
GET /api/user/tokens
POST /api/user/subscription

Studios:
GET /api/studios
GET /api/studios/{id}
GET /api/studios/{id}/classes
GET /api/studios/{id}/schedule
GET /api/studios/nearby

Classes:
GET /api/classes
GET /api/classes/{id}
GET /api/classes/search
GET /api/classes/schedule

Bookings:
POST /api/bookings
GET /api/bookings/{id}
PUT /api/bookings/{id}/cancel
POST /api/bookings/{id}/checkin

Payments:
POST /api/payments/subscribe
POST /api/payments/webhook
GET /api/payments/history
```

---

## Phase 2: Mobile App Development (Weeks 4-5)

### **Mobile App Architecture**

#### **Tech Stack Decision:**
- **Cross-Platform:** React Native (recommended)
  - Pros: Faster development, shared codebase, strong community
  - Cons: Some platform-specific limitations
- **Alternative:** Flutter
  - Pros: Better performance, Google backing
  - Cons: Dart language learning curve

#### **App Structure:**
```
src/
├── components/           # Reusable UI components
├── screens/             # App screens
│   ├── Auth/           # Login, Register, ForgotPassword
│   ├── Discovery/      # Studio search and discovery
│   ├── Booking/        # Class booking flow
│   ├── Profile/        # User profile and settings
│   └── Studio/         # Studio details and classes
├── navigation/         # Navigation configuration
├── services/          # API calls and external services
├── store/             # State management (Redux/Context)
├── utils/             # Helper functions
└── assets/            # Images, fonts, etc.
```

#### **Core Features Implementation:**

**1. User Authentication**
- Email/password registration
- Social login (Google, Apple)
- Biometric authentication (TouchID/FaceID)
- JWT token management

**2. Studio Discovery**
- Map view with studio locations
- List view with filters
- Search functionality
- Favorite studios

**3. Class Booking System**
- Real-time availability
- Calendar integration
- Booking confirmation
- Cancellation policies

**4. Token Management**
- Token balance display
- Usage history
- Auto-renewal settings
- Plan upgrade options

**5. QR Code Check-in**
- Camera integration
- Unique QR code generation
- Check-in confirmation
- Attendance tracking

#### **Key Libraries & Dependencies:**
```json
{
  "react-navigation": "Navigation between screens",
  "axios": "HTTP client for API calls",
  "react-native-maps": "Map integration",
  "react-native-camera": "QR code scanning",
  "react-native-push-notification": "Push notifications",
  "react-native-stripe": "Payment processing",
  "react-native-keychain": "Secure token storage",
  "react-native-calendar": "Date/time selection",
  "react-native-vector-icons": "Icon library"
}
```

---

## Phase 3: Studio Integration (Week 6)

### **Studio Dashboard (Web)**

#### **Tech Stack:**
- **Frontend:** React + Tailwind CSS
- **State Management:** Redux Toolkit
- **Charts:** Chart.js or Recharts
- **Authentication:** JWT + Role-based access

#### **Dashboard Features:**

**1. Analytics Overview**
- Revenue from Studio Loop
- Booking trends and patterns
- Popular class times
- Customer demographics

**2. Schedule Management**
- Add/edit/cancel classes
- Set capacity limits
- Manage instructor schedules
- Holiday/closure management

**3. Customer Management**
- View Studio Loop bookings
- Customer communication
- No-show tracking
- Review management

**4. Financial Reports**
- Monthly revenue summaries
- Commission calculations
- Payout schedules
- Tax reporting exports

#### **Studio API Integration:**

**Option 1: Direct Integration**
- Custom API endpoints for each studio
- Real-time synchronization
- Complex but most accurate

**Option 2: Manual Import/Export**
- CSV/Excel schedule uploads
- Weekly synchronization
- Simple but less accurate

**Option 3: Third-party Integration**
- Mindbody, ClassPass API integration
- Automated synchronization
- Requires API access negotiation

### **QR Code Check-in System**

#### **Implementation:**
```javascript
// QR Code Generation (Backend)
const generateQRCode = (bookingId, userId, timestamp) => {
  const payload = {
    booking: bookingId,
    user: userId,
    timestamp: timestamp,
    expires: timestamp + (2 * 60 * 60 * 1000) // 2 hours
  };
  
  const encrypted = encrypt(JSON.stringify(payload));
  return encrypted;
};

// QR Code Validation (Studio App)
const validateQRCode = (qrData, studioId) => {
  try {
    const decrypted = decrypt(qrData);
    const payload = JSON.parse(decrypted);
    
    // Check expiration
    if (Date.now() > payload.expires) {
      return { valid: false, reason: 'expired' };
    }
    
    // Check booking exists and is for this studio
    const booking = getBooking(payload.booking);
    if (booking.studio_id !== studioId) {
      return { valid: false, reason: 'wrong_studio' };
    }
    
    return { valid: true, booking: booking };
  } catch (error) {
    return { valid: false, reason: 'invalid_code' };
  }
};
```

---

## Phase 4: Testing & Launch Preparation (Week 7)

### **Testing Strategy**

#### **Backend Testing:**
- **Unit Tests:** Jest (Node.js) or Pytest (Python)
- **Integration Tests:** API endpoint testing
- **Load Testing:** Artillery or K6
- **Security Testing:** OWASP ZAP

#### **Mobile App Testing:**
- **Unit Tests:** Jest + React Native Testing Library
- **E2E Tests:** Detox or Appium
- **Device Testing:** Physical devices + simulators
- **Performance Testing:** Flipper profiling

#### **Manual Testing Checklist:**
```
User Registration & Authentication:
□ Email registration works
□ Social login functions
□ Password reset works
□ Biometric auth works

Studio Discovery:
□ Map loads correctly
□ Search returns accurate results
□ Filters work properly
□ Studio details display correctly

Booking Flow:
□ Real-time availability updates
□ Booking confirmation sent
□ Tokens deducted correctly
□ Calendar integration works

Payment Processing:
□ Subscription creation works
□ Payment methods saved securely
□ Failed payments handled gracefully
□ Refunds process correctly

QR Check-in:
□ QR codes generate correctly
□ Camera scanning works
□ Check-in confirmation displays
□ Invalid codes rejected
```

### **Performance Optimization**

#### **Backend Optimization:**
- Database indexing on frequently queried fields
- Redis caching for studio data and schedules
- CDN for image assets
- API response compression

#### **Mobile App Optimization:**
- Image optimization and lazy loading
- Bundle size minimization
- Memory leak prevention
- Offline functionality for key features

### **Security Implementation**

#### **Data Protection:**
- HTTPS/TLS encryption for all communications
- JWT token expiration and refresh
- Input validation and sanitization
- SQL injection prevention
- Rate limiting on API endpoints

#### **PCI Compliance:**
- Never store credit card data
- Use Stripe for all payment processing
- Implement proper tokenization
- Regular security audits

---

## Phase 5: Launch & Monitoring (Week 8)

### **Deployment Strategy**

#### **Backend Deployment:**
- **Staging Environment:** Full replica of production
- **Production Environment:** Auto-scaling infrastructure
- **Database:** Master-slave setup for read replicas
- **Monitoring:** New Relic or DataDog
- **Logging:** Centralized logging with ELK stack

#### **Mobile App Release:**
- **Beta Testing:** TestFlight (iOS) and Play Console (Android)
- **Staged Rollout:** 10% → 50% → 100% over 1 week
- **Crash Reporting:** Crashlytics or Sentry
- **Analytics:** Mixpanel or Amplitude

### **Monitoring & Analytics**

#### **Technical Metrics:**
- **API Response Times:** <200ms average
- **App Crash Rate:** <1% of sessions
- **Database Performance:** Query optimization
- **Server Uptime:** 99.9% target

#### **Business Metrics:**
- **User Acquisition:** Daily active users
- **Engagement:** Session duration and frequency
- **Conversion:** Free trial to paid subscription
- **Revenue:** Monthly recurring revenue tracking

#### **Alerting System:**
- **Critical:** Payment failures, app crashes
- **Warning:** High response times, low disk space
- **Info:** Deployment completions, daily reports

### **Launch Day Checklist:**

```
Pre-Launch (24 hours):
□ Final security scan completed
□ Database backups verified
□ Load testing passed
□ Monitoring systems active
□ Support team briefed
□ Marketing materials ready

Launch Day:
□ Release mobile apps to stores
□ Update landing page with download links
□ Send launch emails to waitlist
□ Monitor system performance
□ Respond to user feedback
□ Track key metrics

Post-Launch (48 hours):
□ Analyze user behavior data
□ Address any critical issues
□ Collect user feedback
□ Plan first iteration improvements
□ Celebrate with team! 🎉
```

---

## Post-Launch Roadmap (Weeks 9-16)

### **Immediate Priorities (Weeks 9-10):**
1. **Bug Fixes & Stability**
   - Address user-reported issues
   - Optimize performance bottlenecks
   - Improve error handling

2. **User Feedback Integration**
   - In-app feedback system
   - App store review responses
   - User interview insights

### **First Major Update (Weeks 11-12):**
1. **Enhanced Discovery**
   - Advanced filtering options
   - Personalized recommendations
   - Class reviews and ratings

2. **Social Features**
   - Friend connections
   - Activity sharing
   - Group bookings

### **Growth Features (Weeks 13-16):**
1. **Referral System**
   - In-app referral tracking
   - Automated reward distribution
   - Social sharing integration

2. **Advanced Analytics**
   - Personal fitness tracking
   - Goal setting and achievements
   - Workout history analysis

---

## Technical Debt & Maintenance

### **Code Quality Standards:**
- **Test Coverage:** Minimum 80% backend, 70% frontend
- **Code Reviews:** All pull requests reviewed
- **Documentation:** API docs with Swagger/OpenAPI
- **Linting:** ESLint, Prettier, Black (Python)

### **Maintenance Schedule:**
- **Daily:** Monitor system health and user feedback
- **Weekly:** Security updates and dependency upgrades
- **Monthly:** Performance optimization and cleanup
- **Quarterly:** Major feature releases and tech debt reduction

### **Scaling Considerations:**
- **Database:** Horizontal scaling with read replicas
- **API:** Microservices architecture for major features
- **Mobile:** Code splitting and dynamic imports
- **Infrastructure:** Auto-scaling based on traffic patterns

---

## Critical Success Factors

✅ **Reliable QR check-in** - This must work 100% of the time
✅ **Real-time availability** - Users trust the slots shown  
✅ **Simple studio tools** - Studios can use with zero training
✅ **Fast performance** - Booking should feel instant
✅ **Payment security** - PCI compliant from day one

---

## Development Resources & Team

### **Core Development Team:**
- **Lead Developer:** Full-stack development (you)
- **Contract Developers:** Consider for specific expertise
- **Designer:** UI/UX design (contract or co-founder)
- **QA Tester:** Manual and automated testing (part-time)

### **Development Timeline Summary:**
- **Week 1:** Landing page deployment
- **Week 2-3:** Backend infrastructure
- **Week 4-5:** Mobile app development
- **Week 6:** Studio integration
- **Week 7:** Testing and optimization
- **Week 8:** Launch and monitoring

### **Budget Estimates:**
- **Infrastructure:** R3,000/month (hosting, services)
- **Third-party APIs:** R2,000/month (Stripe, SendGrid, etc.)
- **Development Tools:** R1,500/month (subscriptions)
- **Contract Work:** R20,000-40,000 (if needed)

This technical roadmap provides a comprehensive guide for building Studio Loop from concept to launch, with clear priorities, timelines, and success metrics.