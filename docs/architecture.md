# StudioLoop Fullstack Architecture Document

This document outlines the complete fullstack architecture for StudioLoop, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

**Decision:** This is a **greenfield full-stack project** requiring ground-up architecture design.

**Analysis:**
- ✅ Business requirements clearly defined
- ✅ Market research and competitive analysis complete  
- ✅ Technical roadmap with 8-week MVP timeline
- ✅ Dual-platform strategy (B2B SaaS + B2C Marketplace)
- ❌ No existing starter templates mentioned
- ❌ No existing codebase to extend

Given the sophisticated requirements (multi-tenant SaaS, marketplace integration, mobile-first African market), this requires custom architecture optimized specifically for the dual-platform needs.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-20 | 1.0 | Initial architecture design for StudioLoop MVP | Winston (Architect) |

---

## High Level Architecture

### Technical Summary

StudioLoop employs a **dual-platform architecture** combining multi-tenant SaaS (gym management) and marketplace (fitness discovery) capabilities. The system uses a **mobile-first, API-driven approach** with React Native for mobile apps, Next.js for web interfaces, and a **Python/FastAPI backend** with PostgreSQL. The architecture prioritizes **African market optimization** with offline-first capabilities, load-shedding resilience, and local payment integrations. Multi-tenancy is achieved through database-level isolation ensuring complete gym data separation, while the marketplace creates cross-tenant discovery and booking capabilities. Infrastructure leverages **serverless deployment** with FastAPI on AWS Lambda/Railway plus Vercel for frontend hosting.

### Platform and Infrastructure Choice

**Platform:** Vercel (Frontend) + Railway/AWS Lambda (Python Backend) + Supabase (Database)  
**Key Services:** Vercel (Next.js hosting), Railway/AWS Lambda (FastAPI), Supabase (PostgreSQL/auth), Redis Cloud (caching), Stripe (payments)  
**Deployment Host and Regions:** Global edge (Vercel), EU-West for API (closest to Africa)

**Rationale:** This hybrid approach provides rapid MVP development (critical for 8-week timeline), global CDN with good African performance, managed PostgreSQL with real-time subscriptions, serverless scaling for cost efficiency, and easy migration path to full AWS later.

### Repository Structure

**Structure:** Turborepo-based monorepo  
**Monorepo Tool:** Turborepo (Vercel's tool, excellent Next.js integration)  
**Package Organization:** Apps (web/mobile/admin) + Packages (shared types, UI components, utilities)

### High Level Architecture Diagram

```mermaid
graph TB
    %% Users
    GymMember[👤 Gym Members<br/>Mobile App]
    GymOwner[👤 Gym Owners<br/>Web Dashboard]
    Explorer[👤 Fitness Explorers<br/>Mobile App]
    
    %% Frontend Layer
    subgraph "Frontend Applications"
        MobileApp[📱 React Native App<br/>iOS/Android]
        WebDash[🖥️ Admin Dashboard<br/>Next.js]
        Landing[🌐 Landing Page<br/>Next.js]
    end
    
    %% API Layer
    subgraph "API Gateway"
        NextAPI[⚡ Next.js API Routes<br/>Vercel Edge Functions]
        CustomAPI[🔧 Custom Services<br/>AWS Lambda]
    end
    
    %% Backend Services
    subgraph "Backend Services"
        AuthService[🔐 Auth Service<br/>Supabase Auth]
        BookingService[📅 Booking Engine]
        MarketplaceService[🏪 Marketplace Logic]
        NotificationService[📲 Notifications<br/>WhatsApp/Push]
        PaymentService[💳 Payment Processing<br/>Stripe/Yoco]
    end
    
    %% Data Layer
    subgraph "Data & Storage"
        PostgresDB[(🗄️ PostgreSQL<br/>Supabase)]
        RedisCache[(⚡ Redis Cache<br/>Upstash)]
        FileStorage[📁 File Storage<br/>Supabase Storage]
    end
    
    %% External Services
    subgraph "External Integrations"
        WhatsAppAPI[📱 WhatsApp Business]
        StripeAPI[💳 Stripe]
        YocoAPI[🏪 Yoco]
        SMSGateway[📟 SMS Gateway]
    end
    
    %% Connections
    GymMember --> MobileApp
    GymOwner --> WebDash
    Explorer --> MobileApp
    Explorer --> Landing
    
    MobileApp --> NextAPI
    WebDash --> NextAPI
    Landing --> NextAPI
    
    NextAPI --> AuthService
    NextAPI --> BookingService
    NextAPI --> MarketplaceService
    
    CustomAPI --> NotificationService
    CustomAPI --> PaymentService
    
    BookingService --> PostgresDB
    MarketplaceService --> PostgresDB
    AuthService --> PostgresDB
    
    BookingService --> RedisCache
    MarketplaceService --> RedisCache
    
    NotificationService --> WhatsAppAPI
    NotificationService --> SMSGateway
    PaymentService --> StripeAPI
    PaymentService --> YocoAPI
    
    MobileApp --> FileStorage
    WebDash --> FileStorage
```

### Architectural Patterns

- **Jamstack Architecture:** Static site generation with serverless APIs - _Rationale:_ Optimal performance and cost efficiency for global deployment with African edge optimization
- **Multi-Tenant SaaS Pattern:** Database-level tenant isolation with shared application layer - _Rationale:_ Complete data separation for gyms while enabling marketplace cross-tenant features
- **API-First Design:** RESTful APIs with OpenAPI specification - _Rationale:_ Enables mobile app, web dashboard, and future integrations with consistent interface
- **Event-Driven Architecture:** Asynchronous processing for bookings, notifications, and payments - _Rationale:_ Improves responsiveness and handles African connectivity issues gracefully
- **Repository Pattern:** Abstract data access with Prisma ORM - _Rationale:_ Enables testing and potential database migrations while maintaining type safety
- **BFF (Backend for Frontend):** Optimized API endpoints for mobile vs web - _Rationale:_ Mobile-first optimization for African market with different data needs
- **CQRS Pattern:** Separate read/write models for analytics and reporting - _Rationale:_ Enables real-time gym analytics without impacting booking performance

---

## Tech Stack

This is the **single source of truth** for all technology decisions. All development must use these exact versions.

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.3+ | Web dashboard and mobile app | Type safety across full stack, excellent React Native support |
| Frontend Framework | Next.js | 14.x | Admin dashboard and landing page | Server-side rendering, API routes, excellent Vercel integration |
| Mobile Framework | React Native | 0.73+ | Cross-platform mobile app | Single codebase for iOS/Android, large community, Expo integration |
| UI Component Library | Tailwind CSS + Shadcn/UI | Latest | Consistent design system | Rapid development, mobile-first responsive design |
| State Management | Zustand | 4.x | Client-side state | Lightweight, TypeScript-first, less boilerplate than Redux |
| Backend Language | Python | 3.11+ | API and business logic | Developer familiarity, excellent libraries, rapid development |
| Backend Framework | FastAPI | 0.104+ | REST API server | Automatic OpenAPI docs, async support, excellent performance |
| API Style | REST + OpenAPI | 3.0 | Client-server communication | Auto-generated clients, excellent mobile support, clear documentation |
| Database | PostgreSQL | 15+ | Primary data store | ACID compliance, JSON support, excellent multi-tenancy features |
| Cache | Redis | 7+ | Session and data caching | High performance, pub/sub for real-time features |
| File Storage | Supabase Storage | Latest | Images and documents | S3-compatible, integrated with auth, CDN included |
| Authentication | Supabase Auth + Custom JWT | Latest | User management | Built-in OAuth, custom business logic integration |
| Frontend Testing | Vitest + React Testing Library | Latest | Component and unit tests | Fast, modern testing with great TypeScript support |
| Backend Testing | Pytest + FastAPI TestClient | Latest | API and integration tests | Python standard, excellent async support |
| E2E Testing | Playwright | Latest | End-to-end testing | Cross-platform, excellent mobile testing |
| Build Tool | Turborepo | Latest | Monorepo orchestration | Fast builds, excellent caching, Vercel integration |
| Bundler | Vite (Next.js built-in) | Latest | Frontend bundling | Fast development, modern ES modules |
| IaC Tool | Terraform | Latest | Infrastructure as code | Multi-cloud support, excellent state management |
| CI/CD | GitHub Actions | Latest | Automated deployment | Integrated with GitHub, excellent ecosystem |
| Monitoring | Sentry + PostHog | Latest | Error tracking and analytics | Comprehensive monitoring, privacy-focused analytics |
| Logging | Loguru (Python) + Pino (Node) | Latest | Application logging | Structured logging, excellent performance |
| CSS Framework | Tailwind CSS | 3.x | Styling system | Utility-first, excellent mobile support, consistent design |

---

## Data Models

### Tenant (Gym/Studio)

**Purpose:** Represents each gym or fitness studio using the booking system. Critical for multi-tenancy and marketplace functionality.

**Key Attributes:**
- id: UUID - Unique identifier for the tenant
- name: string - Display name of the gym/studio
- slug: string - URL-friendly identifier for subdomains/routing
- email: string - Primary contact email
- phone: string - Contact phone number
- address: Address - Physical location data
- settings: TenantSettings - Gym-specific configuration
- subscription_tier: SubscriptionTier - SaaS pricing tier
- marketplace_enabled: boolean - Whether gym participates in marketplace
- status: TenantStatus - Active, suspended, trial, etc.

#### TypeScript Interface
```typescript
interface Tenant {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address: Address;
  settings: TenantSettings;
  subscription_tier: SubscriptionTier;
  marketplace_enabled: boolean;
  status: TenantStatus;
  created_at: Date;
  updated_at: Date;
}

type SubscriptionTier = 'starter' | 'growth' | 'pro' | 'enterprise';
type TenantStatus = 'active' | 'trial' | 'suspended' | 'cancelled';
```

#### Relationships
- Has many: Users, Classes, ClassSchedules, Bookings
- Related to: Subscriptions, PaymentMethods

---

### User

**Purpose:** Represents all users in the system - gym members, instructors, and admin staff. Supports multiple roles within and across tenants.

**Key Attributes:**
- id: UUID - Unique user identifier
- email: string - Login credential and contact
- first_name: string - Personal information
- last_name: string - Personal information
- phone: string - Contact and verification
- profile_image_url: string - Avatar/photo
- tenant_roles: UserTenantRole[] - Roles per gym/tenant
- preferences: UserPreferences - App settings and preferences
- status: UserStatus - Active, inactive, banned

#### TypeScript Interface
```typescript
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_image_url?: string;
  tenant_roles: UserTenantRole[];
  preferences: UserPreferences;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}

interface UserTenantRole {
  tenant_id: string;
  role: UserRole;
  status: 'active' | 'inactive';
  joined_at: Date;
}

type UserRole = 'member' | 'instructor' | 'admin' | 'owner';
type UserStatus = 'active' | 'inactive' | 'banned';
```

#### Relationships
- Belongs to many: Tenants (through UserTenantRole)
- Has many: Bookings, CreditTransactions, Notifications

---

### Class

**Purpose:** Template for fitness classes that can be scheduled multiple times. Defines the type of workout, instructor, and requirements.

**Key Attributes:**
- id: UUID - Unique class identifier
- tenant_id: UUID - Which gym owns this class
- name: string - Class name (e.g., "Morning Yoga", "HIIT Training")
- description: string - Detailed class information
- class_type: ClassType - Category for filtering and discovery
- instructor_id: UUID - Default instructor (can be overridden per schedule)
- duration_minutes: number - How long the class runs
- max_capacity: number - Maximum attendees
- difficulty_level: DifficultyLevel - Beginner, intermediate, advanced
- credits_required: number - Cost in credit system
- equipment_needed: string[] - Required equipment list
- is_active: boolean - Whether class is currently offered

#### TypeScript Interface
```typescript
interface Class {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  class_type: ClassType;
  instructor_id?: string;
  duration_minutes: number;
  max_capacity: number;
  difficulty_level: DifficultyLevel;
  credits_required: number;
  equipment_needed: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

type ClassType = 'yoga' | 'pilates' | 'hiit' | 'strength' | 'cardio' | 'dance' | 'martial_arts' | 'swimming' | 'cycling';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
```

#### Relationships
- Belongs to: Tenant, User (instructor)
- Has many: ClassSchedules

---

### ClassSchedule

**Purpose:** Specific instances of classes with date/time, instructor, and booking availability. This is what users actually book.

**Key Attributes:**
- id: UUID - Unique schedule identifier
- tenant_id: UUID - Gym ownership
- class_id: UUID - Which class template this represents
- instructor_id: UUID - Actual instructor (may differ from class default)
- start_time: DateTime - When class begins
- end_time: DateTime - When class ends
- available_spots: number - Current availability
- booking_window_hours: number - How far in advance bookings open
- cancellation_window_hours: number - Latest cancellation time
- status: ScheduleStatus - Scheduled, cancelled, completed
- notes: string - Special instructions or changes

#### TypeScript Interface
```typescript
interface ClassSchedule {
  id: string;
  tenant_id: string;
  class_id: string;
  instructor_id?: string;
  start_time: Date;
  end_time: Date;
  available_spots: number;
  booking_window_hours: number;
  cancellation_window_hours: number;
  status: ScheduleStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

type ScheduleStatus = 'scheduled' | 'cancelled' | 'completed' | 'in_progress';
```

#### Relationships
- Belongs to: Tenant, Class, User (instructor)
- Has many: Bookings

---

### Booking

**Purpose:** Individual user reservations for class schedules. Core entity for the entire booking system and marketplace transactions.

**Key Attributes:**
- id: UUID - Unique booking identifier
- tenant_id: UUID - Which gym the booking is for
- user_id: UUID - Who made the booking
- class_schedule_id: UUID - Which scheduled class
- status: BookingStatus - Current state of the booking
- booking_type: BookingType - Direct vs marketplace booking
- credits_used: number - Cost deducted from user account
- qr_code: string - Unique check-in code
- qr_expires_at: DateTime - When QR code becomes invalid
- check_in_time: DateTime - When user actually arrived
- cancellation_reason: string - Why booking was cancelled
- marketplace_fee: number - Commission if booked through marketplace

#### TypeScript Interface
```typescript
interface Booking {
  id: string;
  tenant_id: string;
  user_id: string;
  class_schedule_id: string;
  status: BookingStatus;
  booking_type: BookingType;
  credits_used: number;
  qr_code?: string;
  qr_expires_at?: Date;
  check_in_time?: Date;
  cancellation_reason?: string;
  marketplace_fee?: number;
  created_at: Date;
  updated_at: Date;
}

type BookingStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'completed' | 'no_show';
type BookingType = 'direct' | 'marketplace';
```

#### Relationships
- Belongs to: Tenant, User, ClassSchedule
- Has many: CreditTransactions

---

### MemberCredit

**Purpose:** Tracks credit balances and transactions for the token-based subscription system. Supports both single-gym and marketplace usage.

**Key Attributes:**
- id: UUID - Unique credit account identifier
- tenant_id: UUID - Which gym the credits are for (null for universal credits)
- user_id: UUID - Credit account owner
- credits_balance: number - Current available credits
- credits_total_purchased: number - Lifetime credit purchases
- subscription_plan: SubscriptionPlan - Current membership level
- auto_renew: boolean - Whether to automatically purchase credits
- expires_at: DateTime - When credits expire
- marketplace_credits: number - Credits usable across all gyms

#### TypeScript Interface
```typescript
interface MemberCredit {
  id: string;
  tenant_id?: string; // null for universal marketplace credits
  user_id: string;
  credits_balance: number;
  credits_total_purchased: number;
  subscription_plan?: SubscriptionPlan;
  auto_renew: boolean;
  expires_at?: Date;
  marketplace_credits: number;
  created_at: Date;
  updated_at: Date;
}

type SubscriptionPlan = 'essential' | 'premium' | 'unlimited';
```

#### Relationships
- Belongs to: User, Tenant (optional)
- Has many: CreditTransactions

---

## API Specification

### REST API Overview

**Base URL:** https://api.studioloop.co.za/v1  
**Authentication:** JWT tokens with tenant context  
**Rate Limiting:** 1000 requests/hour (authenticated), 100 requests/hour (anonymous)

### Key API Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh

#### User Management
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/{user_id}/credits` - Get credit balances

#### Gym/Tenant Management
- `GET /tenants` - List gyms (marketplace discovery)
- `GET /tenants/{tenant_slug}` - Get gym details

#### Class Management
- `GET /tenants/{tenant_slug}/classes` - List classes
- `POST /tenants/{tenant_slug}/classes` - Create class (admin)

#### Booking Management
- `POST /bookings` - Create booking
- `GET /bookings/{booking_id}` - Get booking details
- `DELETE /bookings/{booking_id}` - Cancel booking
- `POST /bookings/{booking_id}/checkin` - Check in with QR code

#### Marketplace
- `GET /marketplace/search` - Search classes across gyms

#### Payments
- `POST /payments/subscriptions` - Create subscription
- `POST /payments/credits/purchase` - Purchase credits

---

## Components

### API Gateway & Router

**Responsibility:** Central entry point for all API requests, handling authentication, tenant routing, rate limiting, and request/response transformation.

**Key Interfaces:**
- HTTP REST endpoints (OpenAPI 3.0 specification)
- JWT token validation and tenant context injection
- Request routing to appropriate backend services
- Response formatting and error handling

**Dependencies:** AuthService, TenantService, Redis (rate limiting)

**Technology Stack:** FastAPI with custom middleware, Pydantic for validation, Redis for rate limiting and caching

---

### Authentication Service

**Responsibility:** User registration, login, JWT token management, and session handling. Integrates with Supabase Auth while maintaining custom business logic.

**Key Interfaces:**
- `/auth/register`, `/auth/login`, `/auth/refresh` endpoints
- Token generation and validation utilities
- User permission and role management
- Password reset and email verification flows

**Dependencies:** Database (User table), Supabase Auth, Email service

**Technology Stack:** FastAPI + Supabase Auth SDK, JWT libraries, bcrypt for password hashing, email templates

---

### Tenant Management Service

**Responsibility:** Gym/studio onboarding, subscription management, tenant-specific configurations, and multi-tenancy enforcement.

**Key Interfaces:**
- Tenant CRUD operations
- Subscription tier management
- Tenant context resolution (slug to ID mapping)
- Marketplace participation settings

**Dependencies:** Database (Tenant table), Payment service for subscriptions

**Technology Stack:** FastAPI service layer, SQLAlchemy ORM with row-level security, Pydantic models

---

### Booking Engine

**Responsibility:** Core booking logic, availability calculations, waitlist management, and booking conflict resolution. This is the heart of your system.

**Key Interfaces:**
- Class and schedule CRUD operations
- Real-time availability calculations
- Booking creation with conflict detection
- Waitlist promotion automation
- QR code generation and validation

**Dependencies:** Database (Classes, Schedules, Bookings), Redis (availability caching), Notification service

**Technology Stack:** FastAPI with async processing, Redis for real-time availability, background tasks for waitlist processing

---

### Marketplace Service

**Responsibility:** Cross-gym discovery, search functionality, marketplace booking logic, and commission calculations.

**Key Interfaces:**
- Multi-tenant class search and filtering
- Distance-based gym discovery
- Marketplace booking flow (different from direct bookings)
- Commission tracking and payout calculations

**Dependencies:** Booking Engine, Tenant Management, Payment service, Geographic service

**Technology Stack:** FastAPI with Elasticsearch/PostgreSQL full-text search, PostGIS for location queries, background jobs for analytics

---

### Credit Management Service

**Responsibility:** Token/credit system, subscription plans, credit transactions, and marketplace credit transfers.

**Key Interfaces:**
- Credit balance calculations
- Credit purchase and usage tracking
- Subscription management
- Marketplace credit transfers between gyms
- Auto-renewal and expiration handling

**Dependencies:** Database (MemberCredit, CreditTransactions), Payment service, Notification service

**Technology Stack:** FastAPI with transactional database operations, background jobs for renewals and expirations

---

### Payment Processing Service

**Responsibility:** Integration with Stripe, Yoco, and other payment providers. Handles subscriptions, one-time payments, and marketplace commission distribution.

**Key Interfaces:**
- Payment method management
- Subscription creation and management
- One-time credit purchases
- Marketplace commission distribution
- Webhook handling for payment events

**Dependencies:** Stripe/Yoco APIs, Database (payment records), Credit Management service

**Technology Stack:** FastAPI with Stripe/Yoco SDKs, webhook validation, background processing for failed payments

---

### Notification Service

**Responsibility:** Multi-channel notifications including WhatsApp, SMS, email, and push notifications. Handles booking confirmations, reminders, and marketing messages.

**Key Interfaces:**
- WhatsApp Business API integration
- SMS gateway integration
- Email template rendering and sending
- Push notification delivery
- Notification preferences and opt-out management

**Dependencies:** WhatsApp API, SMS gateway, Email service, Database (notification logs)

**Technology Stack:** FastAPI with Celery for background processing, WhatsApp Business SDK, email templates with Jinja2

---

### Analytics & Reporting Service

**Responsibility:** Business intelligence, gym performance analytics, usage tracking, and report generation for gym owners and marketplace insights.

**Key Interfaces:**
- Dashboard data aggregation
- Custom report generation
- Real-time metrics calculation
- Export functionality (PDF, CSV)
- Trend analysis and forecasting

**Dependencies:** Database (all tables), Redis (metric caching)

**Technology Stack:** FastAPI with Pandas for data processing, background jobs for report generation, caching for performance

---

### Mobile App (React Native)

**Responsibility:** Primary user interface for gym members and fitness explorers. Handles booking flows, marketplace discovery, and offline functionality.

**Key Interfaces:**
- Authentication and user management screens
- Class browsing and booking flows
- Marketplace discovery and search
- QR code generation and scanning
- Offline data synchronization

**Dependencies:** API Gateway, Device storage, Camera (QR scanning), Location services

**Technology Stack:** React Native with Expo, Zustand for state management, React Query for API caching, AsyncStorage for offline data

---

### Admin Web Dashboard (Next.js)

**Responsibility:** Gym owner and staff interface for managing classes, schedules, members, and viewing analytics.

**Key Interfaces:**
- Class and schedule management
- Member management and communication
- Booking oversight and check-ins
- Analytics dashboards and reporting
- Subscription and payment management

**Dependencies:** API Gateway, File upload service

**Technology Stack:** Next.js 14 with App Router, Tailwind CSS + Shadcn/UI, React Query for data fetching, Chart.js for analytics

---

### Marketing Website (Next.js)

**Responsibility:** Public-facing website for gym owner acquisition, waitlist management, and marketplace promotion.

**Key Interfaces:**
- Landing pages and marketing content
- Gym owner signup and onboarding
- Waitlist management
- Marketplace discovery (public view)
- SEO optimization and analytics

**Dependencies:** CMS (for content), API Gateway (for forms), Analytics services

**Technology Stack:** Next.js with SSG, Tailwind CSS, CMS integration (Sanity/Strapi), SEO optimization

---

### Background Job Processor

**Responsibility:** Asynchronous task processing including payment processing, notifications, analytics calculations, and data cleanup.

**Key Interfaces:**
- Payment webhook processing
- Scheduled notification sending
- Analytics data aggregation
- Database cleanup and archiving
- Credit expiration processing

**Dependencies:** All services (as needed), Redis (job queue), Database

**Technology Stack:** Celery with Redis broker, FastAPI workers, scheduled tasks with cron-like functionality

---

## Component Diagrams

```mermaid
graph TB
    subgraph "Frontend Layer"
        MobileApp[📱 Mobile App<br/>React Native]
        AdminDash[🖥️ Admin Dashboard<br/>Next.js]
        MarketingSite[🌐 Marketing Site<br/>Next.js]
    end
    
    subgraph "API Layer"
        APIGateway[⚡ API Gateway<br/>FastAPI Router]
    end
    
    subgraph "Core Services"
        AuthService[🔐 Auth Service]
        TenantService[🏢 Tenant Service]
        BookingEngine[📅 Booking Engine]
        MarketplaceService[🏪 Marketplace Service]
        CreditService[💰 Credit Service]
        PaymentService[💳 Payment Service]
        NotificationService[📲 Notification Service]
        AnalyticsService[📊 Analytics Service]
    end
    
    subgraph "Background Processing"
        JobProcessor[⚙️ Background Jobs<br/>Celery]
    end
    
    subgraph "Data Layer"
        PostgresDB[(🗄️ PostgreSQL)]
        RedisCache[(⚡ Redis)]
        FileStorage[📁 File Storage]
    end
    
    subgraph "External Services"
        WhatsAppAPI[📱 WhatsApp API]
        StripeAPI[💳 Stripe API]
        YocoAPI[🏪 Yoco API]
        SMSGateway[📟 SMS Gateway]
    end
    
    %% Frontend to API
    MobileApp --> APIGateway
    AdminDash --> APIGateway
    MarketingSite --> APIGateway
    
    %% API Gateway routing
    APIGateway --> AuthService
    APIGateway --> TenantService
    APIGateway --> BookingEngine
    APIGateway --> MarketplaceService
    APIGateway --> CreditService
    APIGateway --> PaymentService
    APIGateway --> AnalyticsService
    
    %% Inter-service dependencies
    BookingEngine --> CreditService
    BookingEngine --> NotificationService
    MarketplaceService --> BookingEngine
    MarketplaceService --> TenantService
    PaymentService --> CreditService
    AuthService --> TenantService
    
    %% Background processing
    PaymentService --> JobProcessor
    NotificationService --> JobProcessor
    AnalyticsService --> JobProcessor
    
    %% Data access
    AuthService --> PostgresDB
    TenantService --> PostgresDB
    BookingEngine --> PostgresDB
    BookingEngine --> RedisCache
    MarketplaceService --> PostgresDB
    CreditService --> PostgresDB
    PaymentService --> PostgresDB
    AnalyticsService --> PostgresDB
    AnalyticsService --> RedisCache
    
    %% File storage
    MobileApp --> FileStorage
    AdminDash --> FileStorage
    
    %% External integrations
    NotificationService --> WhatsAppAPI
    NotificationService --> SMSGateway
    PaymentService --> StripeAPI
    PaymentService --> YocoAPI
    JobProcessor --> WhatsAppAPI
    JobProcessor --> StripeAPI
```

---

## External APIs

### WhatsApp Business API

- **Purpose:** Primary communication channel for booking confirmations, reminders, and customer support in the African market
- **Documentation:** https://developers.facebook.com/docs/whatsapp/business-management-api
- **Base URL(s):** https://graph.facebook.com/v18.0/
- **Authentication:** Bearer token (Business API access token)
- **Rate Limits:** 1000 messages per second per phone number

**Key Endpoints Used:**
- `POST /{phone-number-id}/messages` - Send booking confirmations and reminders
- `GET /{phone-number-id}` - Get phone number details and status
- `POST /{phone-number-id}/register` - Register phone number for business use

**Integration Notes:** Critical for African market adoption. WhatsApp is the dominant messaging platform. Implement template management for booking confirmations, class reminders, and promotional messages.

---

### Yoco Payment API

- **Purpose:** Primary payment processor for South African market - handles local cards, instant EFT, and business payments
- **Documentation:** https://developer.yoco.com/
- **Base URL(s):** https://online.yoco.com/v1/
- **Authentication:** Bearer token (Secret API key)
- **Rate Limits:** 100 requests per minute

**Key Endpoints Used:**
- `POST /charges` - Process credit/debit card payments for subscriptions
- `POST /webhooks` - Handle payment status updates
- `GET /charges/{charge_id}` - Retrieve payment details
- `POST /refunds` - Process refunds for cancelled bookings

**Integration Notes:** Essential for local market penetration. Yoco has strong SME relationships in South Africa. Implement webhook handling for asynchronous payment processing.

---

### Stripe API

- **Purpose:** International payment processing, subscription management, and marketplace commission distribution
- **Documentation:** https://stripe.com/docs/api
- **Base URL(s):** https://api.stripe.com/v1/
- **Authentication:** Bearer token (Secret API key)
- **Rate Limits:** 100 requests per second in live mode

**Key Endpoints Used:**
- `POST /payment_intents` - Create payment intents for subscription purchases
- `POST /subscriptions` - Manage recurring credit subscriptions
- `POST /transfers` - Distribute marketplace commissions to gym partners
- `POST /webhook_endpoints` - Handle subscription lifecycle events

**Integration Notes:** Handles international customers and complex marketplace transactions. Use Stripe Connect for marketplace commission distribution.

---

### Supabase APIs

- **Purpose:** Authentication, database management, real-time subscriptions, and file storage
- **Documentation:** https://supabase.com/docs/reference/api
- **Base URL(s):** https://{project-ref}.supabase.co/
- **Authentication:** Bearer token (Service role key)
- **Rate Limits:** Based on plan (unlimited for paid plans)

**Key Endpoints Used:**
- `POST /auth/v1/signup` - User registration with email verification
- `POST /auth/v1/token` - JWT token refresh and management
- `GET /rest/v1/` - RESTful database access with RLS policies
- `POST /storage/v1/object` - File upload for profile images and gym photos

**Integration Notes:** Primary infrastructure provider. Use Row Level Security (RLS) for multi-tenant data isolation.

---

### Google Maps Platform

- **Purpose:** Location services, gym discovery, distance calculations, and address validation
- **Documentation:** https://developers.google.com/maps/documentation
- **Base URL(s):** https://maps.googleapis.com/maps/api/
- **Authentication:** API key
- **Rate Limits:** 40,000 requests per month (free tier)

**Key Endpoints Used:**
- `GET /geocode/json` - Convert addresses to coordinates for gym locations
- `GET /distancematrix/json` - Calculate travel distances for marketplace discovery
- `GET /place/nearbysearch/json` - Find gyms near user location

**Integration Notes:** Essential for marketplace discovery functionality. Implement caching to reduce API costs.

---

### SendGrid Email API

- **Purpose:** Transactional emails for user onboarding, password resets, and marketing communications
- **Documentation:** https://docs.sendgrid.com/api-reference
- **Base URL(s):** https://api.sendgrid.com/v3/
- **Authentication:** Bearer token (API key)
- **Rate Limits:** Based on plan (up to 25,000 emails/month free)

**Key Endpoints Used:**
- `POST /mail/send` - Send transactional emails with templates
- `POST /marketing/contacts` - Manage email marketing lists
- `GET /suppression/bounces` - Handle email delivery issues

**Integration Notes:** Use for email verification, password resets, and marketing campaigns.

---

### Clickatell SMS API

- **Purpose:** SMS notifications for markets with limited smartphone penetration and backup communication channel
- **Documentation:** https://docs.clickatell.com/
- **Base URL(s):** https://platform.clickatell.com/
- **Authentication:** Bearer token (API key)
- **Rate Limits:** Based on account limits

**Key Endpoints Used:**
- `POST /messages` - Send SMS notifications for booking confirmations
- `GET /messages/{message_id}` - Check delivery status

**Integration Notes:** Important backup communication channel in South Africa. Use for critical notifications when WhatsApp/email fails.

---

### Sentry Error Tracking

- **Purpose:** Application monitoring, error tracking, and performance monitoring across all services
- **Documentation:** https://docs.sentry.io/api/
- **Base URL(s):** https://sentry.io/api/0/
- **Authentication:** Bearer token (Auth token)
- **Rate Limits:** Based on plan

**Key Endpoints Used:**
- `POST /projects/{org}/{project}/events/` - Custom error reporting
- `GET /organizations/{org}/issues/` - Retrieve error data for dashboards

**Integration Notes:** Critical for monitoring distributed system health. Implement custom error tracking for business logic failures.

---

### PostHog Analytics API

- **Purpose:** Privacy-focused user analytics, feature flags, and A/B testing for product optimization
- **Documentation:** https://posthog.com/docs/api
- **Base URL(s):** https://app.posthog.com/
- **Authentication:** Personal API key
- **Rate Limits:** 1000 requests per minute

**Key Endpoints Used:**
- `POST /capture/` - Track user events and behaviors
- `GET /api/feature_flag/` - Manage feature flags for gradual rollouts

**Integration Notes:** GDPR/POPI compliant analytics. Use for understanding user behavior patterns.

---

### External Integration Architecture

```mermaid
graph TB
    subgraph "StudioLoop Services"
        NotificationService[📲 Notification Service]
        PaymentService[💳 Payment Service]
        AuthService[🔐 Auth Service]
        MarketplaceService[🏪 Marketplace Service]
        AnalyticsService[📊 Analytics Service]
    end
    
    subgraph "Communication APIs"
        WhatsAppAPI[📱 WhatsApp Business API]
        SendGridAPI[📧 SendGrid Email API]
        ClickatellAPI[📟 Clickatell SMS API]
    end
    
    subgraph "Payment APIs"
        YocoAPI[🏪 Yoco Payment API]
        StripeAPI[💳 Stripe API]
    end
    
    subgraph "Infrastructure APIs"
        SupabaseAPI[🔧 Supabase APIs]
        GoogleMapsAPI[🗺️ Google Maps API]
    end
    
    subgraph "Monitoring APIs"
        SentryAPI[🚨 Sentry API]
        PostHogAPI[📈 PostHog API]
    end
    
    %% Service to API connections
    NotificationService --> WhatsAppAPI
    NotificationService --> SendGridAPI
    NotificationService --> ClickatellAPI
    
    PaymentService --> YocoAPI
    PaymentService --> StripeAPI
    
    AuthService --> SupabaseAPI
    MarketplaceService --> GoogleMapsAPI
    MarketplaceService --> SupabaseAPI
    
    AnalyticsService --> SentryAPI
    AnalyticsService --> PostHogAPI
```

---

## Core Workflows

### User Registration and Onboarding

```mermaid
sequenceDiagram
    participant U as User
    participant MA as Mobile App
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database
    participant WA as WhatsApp API
    participant Email as Email Service

    U->>MA: Open app, tap "Sign Up"
    MA->>API: POST /auth/register
    API->>Auth: Validate email/phone
    Auth->>DB: Check existing user
    DB-->>Auth: User not found
    Auth->>Email: Send verification email
    Auth->>WA: Send verification WhatsApp
    Auth-->>API: Registration initiated
    API-->>MA: Verification required
    MA-->>U: Check email/WhatsApp for code
    
    U->>MA: Enter verification code
    MA->>API: POST /auth/verify
    API->>Auth: Verify code
    Auth->>DB: Create user record
    Auth->>DB: Create default preferences
    Auth-->>API: JWT tokens
    API-->>MA: Authentication success
    MA-->>U: Welcome to StudioLoop
```

### Direct Gym Booking Flow

```mermaid
sequenceDiagram
    participant U as User
    participant MA as Mobile App
    participant API as API Gateway
    participant BE as Booking Engine
    participant CS as Credit Service
    participant DB as Database
    participant NS as Notification Service
    participant WA as WhatsApp API

    U->>MA: Browse gym classes
    MA->>API: GET /tenants/{gym}/classes
    API->>BE: Get available classes
    BE->>DB: Query class schedules
    DB-->>BE: Available classes with spots
    BE-->>API: Class availability
    API-->>MA: Display classes
    
    U->>MA: Select class, tap "Book"
    MA->>API: POST /bookings
    API->>BE: Create booking request
    BE->>CS: Check credit balance
    CS->>DB: Query user credits
    DB-->>CS: Sufficient credits
    CS-->>BE: Credits confirmed
    
    BE->>DB: Begin transaction
    BE->>DB: Create booking record
    BE->>DB: Update available spots
    BE->>CS: Deduct credits
    CS->>DB: Create credit transaction
    BE->>DB: Commit transaction
    
    BE->>NS: Send booking confirmation
    NS->>WA: WhatsApp confirmation
    NS->>Email: Email confirmation with QR
    BE-->>API: Booking success + QR code
    API-->>MA: Booking confirmed
    MA-->>U: Booking confirmed with QR
```

### Marketplace Discovery and Cross-Gym Booking

```mermaid
sequenceDiagram
    participant U as User
    participant MA as Mobile App
    participant API as API Gateway
    participant MS as Marketplace Service
    participant BE as Booking Engine
    participant PS as Payment Service
    participant DB as Database
    participant Maps as Google Maps API

    U->>MA: Open marketplace, search "yoga near me"
    MA->>API: GET /marketplace/search?location=lat,lng&type=yoga
    API->>MS: Search classes across gyms
    MS->>Maps: Get nearby gyms
    Maps-->>MS: Gym locations within radius
    MS->>DB: Query classes from nearby gyms
    DB-->>MS: Available classes with gym details
    MS-->>API: Marketplace results
    API-->>MA: Display classes from multiple gyms
    
    U->>MA: Select class at new gym, tap "Book"
    MA->>API: POST /marketplace/bookings
    API->>MS: Create marketplace booking
    MS->>BE: Check availability at target gym
    BE->>DB: Verify class availability
    DB-->>BE: Class available
    
    MS->>PS: Calculate marketplace fees
    PS-->>MS: Total cost + commission
    MS->>BE: Create booking with marketplace flag
    BE->>DB: Create booking (marketplace type)
    BE->>PS: Process payment with split
    PS->>DB: Record commission transaction
    
    MS->>NS: Send confirmation to user
    MS->>NS: Notify gym of new booking
    NS->>WA: Confirmations to both parties
    MS-->>API: Marketplace booking success
    API-->>MA: Cross-gym booking confirmed
    MA-->>U: Ready to visit new gym!
```

### QR Code Check-in Flow

```mermaid
sequenceDiagram
    participant U as User
    participant MA as Mobile App
    participant Scanner as QR Scanner
    participant API as API Gateway
    participant BE as Booking Engine
    participant DB as Database
    participant GA as Gym Admin
    participant WA as WhatsApp API

    U->>MA: Arrive at gym, open booking
    MA-->>U: Display QR code
    GA->>Scanner: Scan user's QR code
    Scanner->>API: POST /bookings/{id}/checkin
    API->>BE: Validate QR and timing
    BE->>DB: Check booking status
    DB-->>BE: Valid booking found
    
    BE->>DB: Update check-in time
    BE->>DB: Update class attendance
    BE-->>API: Check-in successful
    API-->>Scanner: Access granted
    Scanner-->>GA: User checked in
    
    BE->>NS: Send check-in confirmation
    NS->>WA: Notify user of successful check-in
    NS->>WA: Update gym on attendance
```

### Credit Purchase and Subscription Flow

```mermaid
sequenceDiagram
    participant U as User
    participant MA as Mobile App
    participant API as API Gateway
    participant CS as Credit Service
    participant PS as Payment Service
    participant Yoco as Yoco API
    participant DB as Database
    participant NS as Notification Service

    U->>MA: Tap "Buy Credits"
    MA->>API: GET /credit-packages
    API->>CS: Get available packages
    CS-->>API: Package options
    API-->>MA: Display credit packages
    
    U->>MA: Select package, enter payment
    MA->>API: POST /payments/credits/purchase
    API->>PS: Process credit purchase
    PS->>Yoco: Create payment intent
    Yoco-->>PS: Payment confirmation
    
    PS->>CS: Credit purchase confirmed
    CS->>DB: Add credits to user account
    CS->>DB: Create credit transaction
    PS->>DB: Record payment details
    
    CS->>NS: Send purchase confirmation
    NS->>WA: WhatsApp receipt
    NS->>Email: Email receipt with details
    CS-->>API: Credits added successfully
    API-->>MA: Purchase complete
    MA-->>U: Credits added to account
```

### Gym Owner Dashboard Analytics

```mermaid
sequenceDiagram
    participant GO as Gym Owner
    participant WD as Web Dashboard
    participant API as API Gateway
    participant AS as Analytics Service
    participant DB as Database
    participant Cache as Redis Cache

    GO->>WD: Login to dashboard
    WD->>API: GET /dashboard/analytics
    API->>AS: Get gym performance data
    AS->>Cache: Check cached metrics
    Cache-->>AS: Cache miss
    
    AS->>DB: Query booking data
    AS->>DB: Query revenue data
    AS->>DB: Query member activity
    AS->>DB: Query class popularity
    
    AS->>AS: Calculate KPIs
    AS->>AS: Generate trends
    AS->>Cache: Cache results (1 hour)
    AS-->>API: Analytics dashboard data
    
    API-->>WD: Display analytics
    WD-->>GO: Real-time gym insights
    
    Note over GO,Cache: Updates every hour or on-demand
```

---

## Database Schema

### Core Tables Structure

```sql
-- Tenants (Gyms/Studios)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address JSONB NOT NULL, -- {street, city, province, postal_code, country}
    settings JSONB DEFAULT '{}', -- Gym-specific configuration
    subscription_tier VARCHAR(50) DEFAULT 'starter',
    marketplace_enabled BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users (Members, Instructors, Admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url TEXT,
    preferences JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User-Tenant Relationships and Roles
CREATE TABLE user_tenant_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- member, instructor, admin, owner
    status VARCHAR(50) DEFAULT 'active',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tenant_id)
);

-- Class Templates
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    class_type VARCHAR(50) NOT NULL,
    instructor_id UUID REFERENCES users(id),
    duration_minutes INTEGER NOT NULL,
    max_capacity INTEGER NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    credits_required INTEGER NOT NULL,
    equipment_needed TEXT[], -- Array of equipment items
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled Class Instances
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    available_spots INTEGER NOT NULL,
    booking_window_hours INTEGER DEFAULT 168, -- 1 week
    cancellation_window_hours INTEGER DEFAULT 24,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_schedule_id UUID REFERENCES class_schedules(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'confirmed',
    booking_type VARCHAR(50) DEFAULT 'direct', -- direct, marketplace
    credits_used INTEGER NOT NULL,
    qr_code VARCHAR(255) UNIQUE,
    qr_expires_at TIMESTAMP WITH TIME ZONE,
    check_in_time TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    marketplace_fee DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Management
CREATE TABLE member_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL for universal credits
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    credits_balance INTEGER DEFAULT 0,
    credits_total_purchased INTEGER DEFAULT 0,
    subscription_plan VARCHAR(50),
    auto_renew BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE,
    marketplace_credits INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tenant_id)
);

-- Credit Transactions
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id), -- NULL for marketplace transactions
    booking_id UUID REFERENCES bookings(id),
    transaction_type VARCHAR(50) NOT NULL, -- purchase, usage, refund, transfer
    credits_amount INTEGER NOT NULL, -- Positive for additions, negative for usage
    balance_after INTEGER NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment Records
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id), -- NULL for marketplace payments
    booking_id UUID REFERENCES bookings(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50) NOT NULL, -- yoco, stripe, etc.
    payment_status VARCHAR(50) DEFAULT 'pending',
    external_payment_id VARCHAR(255),
    payment_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes for Performance

```sql
-- Performance indexes for common queries
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_status ON tenants(status);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_user_tenant_roles_user_id ON user_tenant_roles(user_id);
CREATE INDEX idx_user_tenant_roles_tenant_id ON user_tenant_roles(tenant_id);

CREATE INDEX idx_classes_tenant_id ON classes(tenant_id);
CREATE INDEX idx_classes_type_active ON classes(class_type, is_active);

CREATE INDEX idx_class_schedules_tenant_id ON class_schedules(tenant_id);
CREATE INDEX idx_class_schedules_start_time ON class_schedules(start_time);
CREATE INDEX idx_class_schedules_status ON class_schedules(status);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_tenant_id ON bookings(tenant_id);
CREATE INDEX idx_bookings_schedule_id ON bookings(class_schedule_id);
CREATE INDEX idx_bookings_qr_code ON bookings(qr_code);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);

CREATE INDEX idx_member_credits_user_id ON member_credits(user_id);
CREATE INDEX idx_member_credits_tenant_id ON member_credits(tenant_id);

CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_external_id ON payments(external_payment_id);
```

### Row Level Security (Multi-tenancy)

```sql
-- Enable RLS on all tenant-specific tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_credits ENABLE ROW LEVEL SECURITY;

-- Policies for tenant isolation
CREATE POLICY tenant_isolation ON classes
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation ON class_schedules
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation ON bookings
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- User access policies
CREATE POLICY user_own_data ON member_credits
    FOR ALL
    USING (user_id = current_setting('app.current_user_id')::UUID);

-- Marketplace policies (cross-tenant read access for discovery)
CREATE POLICY marketplace_read_classes ON classes
    FOR SELECT
    USING (is_active = true AND EXISTS (
        SELECT 1 FROM tenants 
        WHERE tenants.id = classes.tenant_id 
        AND tenants.marketplace_enabled = true
    ));
```

---

## Frontend Architecture

### Component Architecture

#### Component Organization

```
apps/mobile/src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── LoadingSpinner/
│   ├── booking/         # Booking-specific components
│   │   ├── ClassCard/
│   │   ├── BookingForm/
│   │   ├── QRCodeDisplay/
│   │   └── BookingHistory/
│   ├── marketplace/     # Marketplace components
│   │   ├── GymCard/
│   │   ├── SearchFilters/
│   │   ├── LocationPicker/
│   │   └── ClassSearch/
│   └── profile/         # User profile components
│       ├── ProfileForm/
│       ├── CreditBalance/
│       └── SubscriptionCard/
├── screens/             # Screen components
│   ├── auth/           # Authentication screens
│   ├── home/           # Home and dashboard
│   ├── booking/        # Booking flow screens
│   ├── marketplace/    # Marketplace screens
│   ├── profile/        # Profile and settings
│   └── gym-admin/      # Gym admin screens
├── navigation/         # Navigation configuration
├── hooks/              # Custom React hooks
├── services/           # API client services
├── stores/             # Zustand state stores
├── utils/              # Utility functions
└── types/              # TypeScript type definitions

apps/web/src/
├── components/         # Web dashboard components
│   ├── dashboard/      # Dashboard widgets
│   ├── members/        # Member management
│   ├── classes/        # Class management
│   ├── bookings/       # Booking management
│   ├── analytics/      # Analytics components
│   └── settings/       # Settings panels
├── pages/              # Next.js pages
├── hooks/              # Custom hooks
├── services/           # API services
├── stores/             # State management
└── utils/              # Utilities
```

#### Component Template

```typescript
// Standard component template with TypeScript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ClassSchedule } from '@/types/booking';

interface ClassCardProps {
  classSchedule: ClassSchedule;
  onBook: (scheduleId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classSchedule,
  onBook,
  isLoading = false,
  disabled = false,
}) => {
  const { theme } = useTheme();
  
  const handlePress = () => {
    if (!disabled && !isLoading) {
      onBook(classSchedule.id);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {classSchedule.class.name}
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {classSchedule.instructor?.name}
      </Text>
      
      <TouchableOpacity
        style={[
          styles.bookButton,
          { backgroundColor: disabled ? theme.disabled : theme.primary }
        ]}
        onPress={handlePress}
        disabled={disabled || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Booking...' : 'Book Class'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
```

### State Management Architecture

#### State Structure

```typescript
// Zustand store structure for mobile app
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  currentTenant: Tenant | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshTokens: () => Promise<void>;
  setCurrentTenant: (tenant: Tenant) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      tokens: { accessToken: null, refreshToken: null },
      currentTenant: null,
      
      login: async (email, password) => {
        try {
          const response = await authService.login(email, password);
          set({
            user: response.user,
            tokens: response.tokens,
            isAuthenticated: true,
          });
        } catch (error) {
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          tokens: { accessToken: null, refreshToken: null },
          isAuthenticated: false,
          currentTenant: null,
        });
      },
      
      refreshTokens: async () => {
        const { refreshToken } = get().tokens;
        if (!refreshToken) throw new Error('No refresh token');
        
        const response = await authService.refresh(refreshToken);
        set({ tokens: response.tokens });
      },
      
      setCurrentTenant: (tenant) => {
        set({ currentTenant: tenant });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Booking Store
interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  fetchBookings: (userId: string) => Promise<void>;
  createBooking: (scheduleId: string) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  currentBooking: null,
  isLoading: false,
  
  fetchBookings: async (userId) => {
    set({ isLoading: true });
    try {
      const bookings = await bookingService.getUserBookings(userId);
      set({ bookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  createBooking: async (scheduleId) => {
    set({ isLoading: true });
    try {
      const booking = await bookingService.createBooking(scheduleId);
      const { bookings } = get();
      set({
        bookings: [booking, ...bookings],
        currentBooking: booking,
        isLoading: false,
      });
      return booking;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  cancelBooking: async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      const { bookings } = get();
      set({
        bookings: bookings.filter(b => b.id !== bookingId),
      });
    } catch (error) {
      throw error;
    }
  },
}));
```

#### State Management Patterns

- **Separation of Concerns:** Each store handles a specific domain (auth, booking, marketplace, etc.)
- **Optimistic Updates:** UI updates immediately, with rollback on API errors
- **Offline-First:** Critical data persisted locally with sync when online
- **Real-time Updates:** WebSocket integration for live booking updates
- **Cache Management:** API responses cached with TTL for performance

### Routing Architecture

#### Route Organization

```
Navigation Structure:
├── AuthNavigator          # Authentication flows
│   ├── Login
│   ├── Register
│   ├── ForgotPassword
│   └── Verification
├── MainTabNavigator       # Authenticated main navigation
│   ├── HomeStack
│   │   ├── Home
│   │   ├── GymDetails
│   │   └── ClassDetails
│   ├── MarketplaceStack
│   │   ├── MarketplaceHome
│   │   ├── SearchResults
│   │   └── GymProfile
│   ├── BookingsStack
│   │   ├── BookingHistory
│   │   ├── BookingDetails
│   │   └── QRCode
│   └── ProfileStack
│       ├── Profile
│       ├── Settings
│       ├── Credits
│       └── Subscription
└── AdminNavigator         # Gym admin flows
    ├── Dashboard
    ├── Members
    ├── Classes
    ├── Bookings
    └── Analytics
```

#### Protected Route Pattern

```typescript
// Protected route wrapper for gym admin features
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'owner' | 'instructor';
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'admin',
  fallbackPath = '/login',
}) => {
  const { isAuthenticated, user, currentTenant } = useAuthStore();
  
  if (!isAuthenticated || !user) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  if (requiredRole && currentTenant) {
    const userRole = user.tenantRoles.find(
      role => role.tenantId === currentTenant.id
    );
    
    if (!userRole || !hasPermission(userRole.role, requiredRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  return <>{children}</>;
};

function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    member: 1,
    instructor: 2,
    admin: 3,
    owner: 4,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
```

### Frontend Services Layer

#### API Client Setup

```typescript
// API client with tenant context and error handling
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';

class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.studioloop.co.za/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    // Request interceptor - add auth and tenant context
    this.client.interceptors.request.use(
      (config) => {
        const { tokens, currentTenant } = useAuthStore.getState();
        
        if (tokens.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        
        if (currentTenant) {
          config.headers['X-Tenant-ID'] = currentTenant.id;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor - handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await useAuthStore.getState().refreshTokens();
            return this.client(originalRequest);
          } catch (refreshError) {
            useAuthStore.getState().logout();
            throw refreshError;
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
```

#### Service Example

```typescript
// Booking service with offline support and caching
import { apiClient } from './apiClient';
import { Booking, CreateBookingRequest } from '@/types/booking';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BookingService {
  private readonly cacheKey = 'bookings_cache';
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes
  
  async getUserBookings(userId: string, forceRefresh = false): Promise<Booking[]> {
    try {
      // Check cache first
      if (!forceRefresh) {
        const cached = await this.getCachedBookings();
        if (cached) return cached;
      }
      
      const bookings = await apiClient.get<Booking[]>(`/users/${userId}/bookings`);
      
      // Cache the results
      await this.setCachedBookings(bookings);
      
      return bookings;
    } catch (error) {
      // Fallback to cache on network error
      const cached = await this.getCachedBookings();
      if (cached) {
        console.warn('Using cached bookings due to network error');
        return cached;
      }
      throw error;
    }
  }
  
  async createBooking(request: CreateBookingRequest): Promise<Booking> {
    try {
      const booking = await apiClient.post<Booking>('/bookings', request);
      
      // Update cache optimistically
      const cached = await this.getCachedBookings();
      if (cached) {
        await this.setCachedBookings([booking, ...cached]);
      }
      
      return booking;
    } catch (error) {
      // Handle specific booking errors
      if (error.response?.status === 409) {
        throw new Error('Class is fully booked');
      } else if (error.response?.status === 402) {
        throw new Error('Insufficient credits');
      }
      throw error;
    }
  }
  
  async cancelBooking(bookingId: string): Promise<void> {
    await apiClient.delete(`/bookings/${bookingId}`);
    
    // Update cache
    const cached = await this.getCachedBookings();
    if (cached) {
      const updated = cached.filter(b => b.id !== bookingId);
      await this.setCachedBookings(updated);
    }
  }
  
  private async getCachedBookings(): Promise<Booking[] | null> {
    try {
      const cached = await AsyncStorage.getItem(this.cacheKey);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid
      if (Date.now() - timestamp > this.cacheTimeout) {
        await AsyncStorage.removeItem(this.cacheKey);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  }
  
  private async setCachedBookings(bookings: Booking[]): Promise<void> {
    try {
      const cacheData = {
        data: bookings,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache bookings:', error);
    }
  }
}

export const bookingService = new BookingService();
```

---

## Backend Architecture

### Service Architecture

#### FastAPI Application Structure

```
apps/api/src/
├── main.py                 # FastAPI application entry point
├── core/                   # Core application configuration
│   ├── config.py          # Environment configuration
│   ├── database.py        # Database connection and session
│   ├── security.py        # JWT and authentication utilities
│   ├── middleware.py      # Custom middleware
│   └── exceptions.py      # Custom exception handlers
├── models/                 # SQLAlchemy models
│   ├── __init__.py
│   ├── base.py           # Base model with common fields
│   ├── tenant.py         # Tenant/gym models
│   ├── user.py           # User and auth models
│   ├── booking.py        # Booking and class models
│   └── payment.py        # Payment and credit models
├── schemas/               # Pydantic schemas
│   ├── __init__.py
│   ├── tenant.py         # Tenant request/response schemas
│   ├── user.py           # User schemas
│   ├── booking.py        # Booking schemas
│   └── payment.py        # Payment schemas
├── services/              # Business logic services
│   ├── __init__.py
│   ├── auth_service.py   # Authentication logic
│   ├── booking_service.py # Booking business logic
│   ├── marketplace_service.py # Marketplace logic
│   ├── credit_service.py  # Credit management
│   ├── payment_service.py # Payment processing
│   └── notification_service.py # Notifications
├── repositories/          # Data access layer
│   ├── __init__.py
│   ├── base_repository.py # Base repository pattern
│   ├── tenant_repository.py
│   ├── user_repository.py
│   ├── booking_repository.py
│   └── payment_repository.py
├── api/                   # API route handlers
│   ├── __init__.py
│   ├── v1/               # API version 1
│   │   ├── __init__.py
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── users.py      # User management
│   │   ├── tenants.py    # Tenant management
│   │   ├── bookings.py   # Booking endpoints
│   │   ├── marketplace.py # Marketplace endpoints
│   │   └── payments.py   # Payment endpoints
│   └── dependencies.py   # FastAPI dependencies
├── tasks/                 # Background tasks
│   ├── __init__.py
│   ├── celery_app.py     # Celery configuration
│   ├── booking_tasks.py  # Booking-related tasks
│   ├── notification_tasks.py # Notification tasks
│   └── payment_tasks.py  # Payment processing tasks
├── utils/                 # Utility functions
│   ├── __init__.py
│   ├── security.py       # Security utilities
│   ├── email.py          # Email utilities
│   ├── qr_code.py        # QR code generation
│   └── validators.py     # Custom validators
└── tests/                 # Test files
    ├── __init__.py
    ├── conftest.py       # Test configuration
    ├── test_auth.py
    ├── test_booking.py
    └── test_marketplace.py
```

#### FastAPI Application Template

```python
# main.py - FastAPI application setup
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import logging
import time
from contextlib import asynccontextmanager

from core.config import settings
from core.database import engine
from core.middleware import TenantMiddleware, LoggingMiddleware
from core.exceptions import CustomHTTPException
from api.v1 import auth, users, tenants, bookings, marketplace, payments

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting StudioLoop API...")
    yield
    # Shutdown
    logger.info("Shutting down StudioLoop API...")

app = FastAPI(
    title="StudioLoop API",
    description="Dual-platform fitness booking system API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
)

# Security middleware
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware
app.add_middleware(TenantMiddleware)
app.add_middleware(LoggingMiddleware)

# Exception handlers
@app.exception_handler(CustomHTTPException)
async def custom_http_exception_handler(request: Request, exc: CustomHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.error_code,
                "message": exc.detail,
                "timestamp": time.time(),
                "request_id": getattr(request.state, "request_id", "unknown"),
            }
        },
    )

@app.exception_handler(500)
async def internal_server_error_handler(request: Request, exc: Exception):
    logger.error(f"Internal server error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred",
                "timestamp": time.time(),
                "request_id": getattr(request.state, "request_id", "unknown"),
            }
        },
    )

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}

# API routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(tenants.router, prefix="/api/v1/tenants", tags=["tenants"])
app.include_router(bookings.router, prefix="/api/v1/bookings", tags=["bookings"])
app.include_router(marketplace.router, prefix="/api/v1/marketplace", tags=["marketplace"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])
```

### Database Architecture

#### Repository Pattern Implementation

```python
# repositories/base_repository.py
from typing import Generic, TypeVar, Type, List, Optional, Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import DeclarativeBase
from abc import ABC, abstractmethod

ModelType = TypeVar("ModelType", bound=DeclarativeBase)

class BaseRepository(Generic[ModelType], ABC):
    def __init__(self, model: Type[ModelType], db_session: AsyncSession):
        self.model = model
        self.db_session = db_session
    
    async def get_by_id(self, id: Any) -> Optional[ModelType]:
        result = await self.db_session.execute(
            select(self.model).where(self.model.id == id)
        )
        return result.scalar_one_or_none()
    
    async def get_all(
        self, 
        offset: int = 0, 
        limit: int = 100,
        filters: Optional[Dict[str, Any]] = None
    ) -> List[ModelType]:
        query = select(self.model)
        
        if filters:
            for key, value in filters.items():
                if hasattr(self.model, key):
                    query = query.where(getattr(self.model, key) == value)
        
        query = query.offset(offset).limit(limit)
        result = await self.db_session.execute(query)
        return result.scalars().all()
    
    async def create(self, **kwargs) -> ModelType:
        instance = self.model(**kwargs)
        self.db_session.add(instance)
        await self.db_session.commit()
        await self.db_session.refresh(instance)
        return instance
    
    async def update(self, id: Any, **kwargs) -> Optional[ModelType]:
        await self.db_session.execute(
            update(self.model)
            .where(self.model.id == id)
            .values(**kwargs)
        )
        await self.db_session.commit()
        return await self.get_by_id(id)
    
    async def delete(self, id: Any) -> bool:
        result = await self.db_session.execute(
            delete(self.model).where(self.model.id == id)
        )
        await self.db_session.commit()
        return result.rowcount > 0

# repositories/booking_repository.py
from models.booking import Booking, ClassSchedule
from .base_repository import BaseRepository
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from datetime import datetime
from typing import List, Optional
import uuid

class BookingRepository(BaseRepository[Booking]):
    def __init__(self, db_session: AsyncSession):
        super().__init__(Booking, db_session)
    
    async def get_user_bookings(
        self, 
        user_id: uuid.UUID, 
        tenant_id: Optional[uuid.UUID] = None
    ) -> List[Booking]:
        query = select(self.model).where(self.model.user_id == user_id)
        
        if tenant_id:
            query = query.where(self.model.tenant_id == tenant_id)
        
        query = query.order_by(self.model.created_at.desc())
        result = await self.db_session.execute(query)
        return result.scalars().all()
    
    async def get_schedule_bookings(
        self, 
        schedule_id: uuid.UUID
    ) -> List[Booking]:
        result = await self.db_session.execute(
            select(self.model)
            .where(
                and_(
                    self.model.class_schedule_id == schedule_id,
                    self.model.status.in_(['confirmed', 'checked_in'])
                )
            )
        )
        return result.scalars().all()
    
    async def check_booking_conflict(
        self, 
        user_id: uuid.UUID, 
        start_time: datetime,
        end_time: datetime
    ) -> bool:
        """Check if user has overlapping bookings"""
        result = await self.db_session.execute(
            select(self.model)
            .join(ClassSchedule)
            .where(
                and_(
                    self.model.user_id == user_id,
                    self.model.status.in_(['confirmed', 'checked_in']),
                    ClassSchedule.start_time < end_time,
                    ClassSchedule.end_time > start_time
                )
            )
        )
        return result.scalar_one_or_none() is not None
    
    async def get_booking_by_qr_code(self, qr_code: str) -> Optional[Booking]:
        result = await self.db_session.execute(
            select(self.model).where(self.model.qr_code == qr_code)
        )
        return result.scalar_one_or_none()
```

### Authentication and Authorization

#### JWT Authentication Flow

```mermaid
sequenceDiagram
    participant Client as Client App
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database
    participant Supabase as Supabase Auth

    Client->>API: POST /auth/login
    API->>Auth: Validate credentials
    Auth->>Supabase: Verify user with Supabase
    Supabase-->>Auth: User verified
    Auth->>DB: Get user tenant roles
    DB-->>Auth: User roles data
    Auth->>Auth: Generate JWT with tenant context
    Auth-->>API: JWT tokens + user data
    API-->>Client: Authentication success

    Note over Client,Supabase: Subsequent requests include JWT
    
    Client->>API: GET /bookings (with JWT)
    API->>Auth: Validate JWT
    Auth->>Auth: Extract user + tenant context
    Auth-->>API: Valid user session
    API->>API: Set tenant context in request
    API->>Service: Process request with tenant isolation
```

#### Authentication Middleware

```python
# core/security.py
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import uuid

from core.config import settings
from models.user import User
from repositories.user_repository import UserRepository

security = HTTPBearer()

class JWTManager:
    @staticmethod
    def create_access_token(
        data: Dict[str, Any], 
        expires_delta: Optional[timedelta] = None
    ) -> str:
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    
    @staticmethod
    def create_refresh_token(user_id: str) -> str:
        data = {"sub": user_id, "type": "refresh"}
        expire = datetime.utcnow() + timedelta(days=30)
        data.update({"exp": expire})
        return jwt.encode(data, settings.SECRET_KEY, algorithm="HS256")
    
    @staticmethod
    def verify_token(token: str) -> Dict[str, Any]:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return payload
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

# Authentication dependency
async def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    user_repo: UserRepository = Depends()
) -> User:
    token = credentials.credentials
    
    try:
        payload = JWTManager.verify_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await user_repo.get_by_id(uuid.UUID(user_id))
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Set user context in request state
        request.state.current_user = user
        request.state.user_id = user.id
        
        # Set tenant context if provided in token
        tenant_id = payload.get("tenant_id")
        if tenant_id:
            request.state.tenant_id = uuid.UUID(tenant_id)
        
        return user
        
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Tenant context dependency
async def get_current_tenant(request: Request) -> Optional[uuid.UUID]:
    return getattr(request.state, "tenant_id", None)

# Role-based access control
def require_role(required_role: str):
    def role_checker(
        request: Request,
        current_user: User = Depends(get_current_user),
        tenant_id: Optional[uuid.UUID] = Depends(get_current_tenant)
    ) -> User:
        if not tenant_id:
            raise HTTPException(status_code=403, detail="No tenant context")
        
        user_role = next(
            (role for role in current_user.tenant_roles 
             if role.tenant_id == tenant_id), 
            None
        )
        
        if not user_role or not has_permission(user_role.role, required_role):
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        
        return current_user
    
    return role_checker

def has_permission(user_role: str, required_role: str) -> bool:
    role_hierarchy = {
        "member": 1,
        "instructor": 2,
        "admin": 3,
        "owner": 4,
    }
    return role_hierarchy.get(user_role, 0) >= role_hierarchy.get(required_role, 0)
```

---

## Testing Strategy

### Testing Pyramid

```
                    E2E Tests
                   /          \
              Integration Tests  
             /                  \
    Frontend Unit Tests    Backend Unit Tests
```

### Test Organization

#### Frontend Tests

```
apps/mobile/tests/
├── __tests__/               # Jest test files
│   ├── components/         # Component unit tests
│   │   ├── booking/
│   │   │   ├── ClassCard.test.tsx
│   │   │   ├── BookingForm.test.tsx
│   │   │   └── QRCodeDisplay.test.tsx
│   │   ├── marketplace/
│   │   │   ├── GymCard.test.tsx
│   │   │   └── SearchFilters.test.tsx
│   │   └── common/
│   │       ├── Button.test.tsx
│   │       └── Input.test.tsx
│   ├── screens/           # Screen integration tests
│   │   ├── auth/
│   │   │   ├── Login.test.tsx
│   │   │   └── Register.test.tsx
│   │   ├── booking/
│   │   │   └── BookingFlow.test.tsx
│   │   └── marketplace/
│   │       └── MarketplaceSearch.test.tsx
│   ├── stores/            # State management tests
│   │   ├── authStore.test.ts
│   │   ├── bookingStore.test.ts
│   │   └── marketplaceStore.test.ts
│   ├── services/          # API service tests
│   │   ├── authService.test.ts
│   │   ├── bookingService.test.ts
│   │   └── marketplaceService.test.ts
│   └── utils/             # Utility function tests
│       ├── validation.test.ts
│       └── formatting.test.ts
├── __mocks__/              # Mock implementations
│   ├── @react-native-async-storage/
│   ├── react-native-camera/
│   └── axios.ts
└── setup.ts               # Test setup configuration
```

#### Backend Tests

```
apps/api/tests/
├── unit/                   # Unit tests
│   ├── services/
│   │   ├── test_auth_service.py
│   │   ├── test_booking_service.py
│   │   ├── test_marketplace_service.py
│   │   └── test_payment_service.py
│   ├── repositories/
│   │   ├── test_user_repository.py
│   │   ├── test_booking_repository.py
│   │   └── test_tenant_repository.py
│   └── utils/
│       ├── test_security.py
│       ├── test_qr_code.py
│       └── test_validators.py
├── integration/            # Integration tests
│   ├── api/
│   │   ├── test_auth_endpoints.py
│   │   ├── test_booking_endpoints.py
│   │   ├── test_marketplace_endpoints.py
│   │   └── test_payment_endpoints.py
│   ├── database/
│   │   ├── test_tenant_isolation.py
│   │   ├── test_booking_workflows.py
│   │   └── test_credit_transactions.py
│   └── external_apis/
│       ├── test_yoco_integration.py
│       ├── test_whatsapp_integration.py
│       └── test_email_integration.py
├── fixtures/               # Test data fixtures
│   ├── users.py
│   ├── tenants.py
│   ├── bookings.py
│   └── payments.py
└── conftest.py            # Pytest configuration
```

#### E2E Tests

```
e2e/
├── specs/                  # Playwright test specs
│   ├── auth/
│   │   ├── login.spec.ts
│   │   ├── registration.spec.ts
│   │   └── password-reset.spec.ts
│   ├── booking/
│   │   ├── direct-booking.spec.ts
│   │   ├── marketplace-booking.spec.ts
│   │   ├── booking-cancellation.spec.ts
│   │   └── qr-code-checkin.spec.ts
│   ├── admin/
│   │   ├── gym-dashboard.spec.ts
│   │   ├── class-management.spec.ts
│   │   └── member-management.spec.ts
│   └── marketplace/
│       ├── gym-discovery.spec.ts
│       └── cross-gym-booking.spec.ts
├── page-objects/          # Page object models
│   ├── LoginPage.ts
│   ├── BookingPage.ts
│   ├── MarketplacePage.ts
│   └── DashboardPage.ts
├── fixtures/              # Test data
│   ├── users.json
│   ├── gyms.json
│   └── classes.json
└── playwright.config.ts   # Playwright configuration
```

### Test Examples

#### Frontend Component Test

```typescript
// __tests__/components/booking/ClassCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ClassCard } from '@/components/booking/ClassCard';
import { mockClassSchedule } from '../../__mocks__/bookingData';

const mockOnBook = jest.fn();

describe('ClassCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders class information correctly', () => {
    const { getByText } = render(
      <ClassCard
        classSchedule={mockClassSchedule}
        onBook={mockOnBook}
      />
    );

    expect(getByText('Morning Yoga')).toBeTruthy();
    expect(getByText('Sarah Johnson')).toBeTruthy();
    expect(getByText('Book Class')).toBeTruthy();
  });

  it('calls onBook when book button is pressed', async () => {
    const { getByText } = render(
      <ClassCard
        classSchedule={mockClassSchedule}
        onBook={mockOnBook}
      />
    );

    fireEvent.press(getByText('Book Class'));

    await waitFor(() => {
      expect(mockOnBook).toHaveBeenCalledWith(mockClassSchedule.id);
    });
  });

  it('disables booking when disabled prop is true', () => {
    const { getByText } = render(
      <ClassCard
        classSchedule={mockClassSchedule}
        onBook={mockOnBook}
        disabled={true}
      />
    );

    const bookButton = getByText('Book Class');
    fireEvent.press(bookButton);

    expect(mockOnBook).not.toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    const { getByText } = render(
      <ClassCard
        classSchedule={mockClassSchedule}
        onBook={mockOnBook}
        isLoading={true}
      />
    );

    expect(getByText('Booking...')).toBeTruthy();
  });
});
```

#### Backend API Test

```python
# tests/integration/api/test_booking_endpoints.py
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
import uuid

from main import app
from models.user import User
from models.tenant import Tenant
from models.booking import Booking, ClassSchedule, Class
from tests.fixtures.users import create_test_user
from tests.fixtures.tenants import create_test_tenant
from tests.fixtures.bookings import create_test_class, create_test_schedule

@pytest.mark.asyncio
class TestBookingEndpoints:
    
    async def test_create_booking_success(
        self,
        client: AsyncClient,
        db_session: AsyncSession,
        authenticated_user_headers: dict
    ):
        # Setup test data
        tenant = await create_test_tenant(db_session)
        test_class = await create_test_class(db_session, tenant.id)
        schedule = await create_test_schedule(
            db_session, 
            test_class.id,
            start_time=datetime.utcnow() + timedelta(hours=2)
        )
        
        # Test booking creation
        booking_data = {
            "class_schedule_id": str(schedule.id),
            "credits_to_use": 1
        }
        
        response = await client.post(
            "/api/v1/bookings",
            json=booking_data,
            headers=authenticated_user_headers
        )
        
        assert response.status_code == 201
        booking = response.json()
        assert booking["class_schedule_id"] == str(schedule.id)
        assert booking["status"] == "confirmed"
        assert "qr_code" in booking
        
    async def test_create_booking_insufficient_credits(
        self,
        client: AsyncClient,
        db_session: AsyncSession,
        authenticated_user_headers: dict
    ):
        # Setup test data with high credit requirement
        tenant = await create_test_tenant(db_session)
        test_class = await create_test_class(
            db_session, 
            tenant.id,
            credits_required=100  # User has insufficient credits
        )
        schedule = await create_test_schedule(db_session, test_class.id)
        
        booking_data = {
            "class_schedule_id": str(schedule.id),
            "credits_to_use": 100
        }
        
        response = await client.post(
            "/api/v1/bookings",
            json=booking_data,
            headers=authenticated_user_headers
        )
        
        assert response.status_code == 402
        error = response.json()
        assert error["error"]["code"] == "INSUFFICIENT_CREDITS"
        
    async def test_create_booking_class_full(
        self,
        client: AsyncClient,
        db_session: AsyncSession,
        authenticated_user_headers: dict
    ):
        # Setup test data with no available spots
        tenant = await create_test_tenant(db_session)
        test_class = await create_test_class(db_session, tenant.id)
        schedule = await create_test_schedule(
            db_session, 
            test_class.id,
            available_spots=0  # No spots available
        )
        
        booking_data = {
            "class_schedule_id": str(schedule.id),
            "credits_to_use": 1
        }
        
        response = await client.post(
            "/api/v1/bookings",
            json=booking_data,
            headers=authenticated_user_headers
        )
        
        assert response.status_code == 409
        error = response.json()
        assert error["error"]["code"] == "CLASS_FULL"
        
    async def test_cancel_booking_success(
        self,
        client: AsyncClient,
        db_session: AsyncSession,
        authenticated_user_headers: dict
    ):
        # Setup test booking
        tenant = await create_test_tenant(db_session)
        test_class = await create_test_class(db_session, tenant.id)
        schedule = await create_test_schedule(db_session, test_class.id)
        
        # Create booking first
        booking_data = {
            "class_schedule_id": str(schedule.id),
            "credits_to_use": 1
        }
        
        create_response = await client.post(
            "/api/v1/bookings",
            json=booking_data,
            headers=authenticated_user_headers
        )
        booking_id = create_response.json()["id"]
        
        # Cancel the booking
        response = await client.delete(
            f"/api/v1/bookings/{booking_id}",
            headers=authenticated_user_headers
        )
        
        assert response.status_code == 200
        
        # Verify booking is cancelled
        get_response = await client.get(
            f"/api/v1/bookings/{booking_id}",
            headers=authenticated_user_headers
        )
        
        cancelled_booking = get_response.json()
        assert cancelled_booking["status"] == "cancelled"
```

#### E2E Test

```typescript
// e2e/specs/booking/direct-booking.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { BookingPage } from '../page-objects/BookingPage';
import { testUsers } from '../fixtures/users.json';

test.describe('Direct Gym Booking Flow', () => {
  let loginPage: LoginPage;
  let bookingPage: BookingPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    bookingPage = new BookingPage(page);
    
    // Login as test user
    await loginPage.goto();
    await loginPage.login(testUsers.member.email, testUsers.member.password);
    await expect(page).toHaveURL('/dashboard');
  });

  test('should successfully book a class', async ({ page }) => {
    // Navigate to class schedule
    await bookingPage.navigateToGymClasses();
    
    // Find and click on available class
    const className = 'Morning Yoga';
    await bookingPage.selectClass(className);
    
    // Verify class details are displayed
    await expect(bookingPage.classTitle).toHaveText(className);
    await expect(bookingPage.instructorName).toBeVisible();
    await expect(bookingPage.classTime).toBeVisible();
    
    // Book the class
    await bookingPage.clickBookButton();
    
    // Confirm booking
    await bookingPage.confirmBooking();
    
    // Verify booking success
    await expect(page.locator('[data-testid="booking-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="qr-code"]')).toBeVisible();
    
    // Verify booking appears in user's bookings
    await bookingPage.navigateToMyBookings();
    await expect(page.locator(`[data-testid="booking-${className}"]`)).toBeVisible();
  });

  test('should handle insufficient credits gracefully', async ({ page }) => {
    // Navigate to expensive class that user cannot afford
    await bookingPage.navigateToGymClasses();
    await bookingPage.selectClass('Premium Personal Training');
    
    // Attempt to book
    await bookingPage.clickBookButton();
    
    // Verify error message
    await expect(page.locator('[data-testid="error-message"]'))
      .toHaveText('Insufficient credits for this class');
    
    // Verify purchase credits option is available
    await expect(page.locator('[data-testid="purchase-credits-button"]')).toBeVisible();
  });

  test('should allow booking cancellation within cancellation window', async ({ page }) => {
    // First, book a class
    await bookingPage.navigateToGymClasses();
    await bookingPage.selectClass('Evening Pilates');
    await bookingPage.clickBookButton();
    await bookingPage.confirmBooking();
    
    // Navigate to bookings
    await bookingPage.navigateToMyBookings();
    
    // Cancel the booking
    await page.locator('[data-testid="cancel-booking"]').first().click();
    await page.locator('[data-testid="confirm-cancellation"]').click();
    
    // Verify cancellation success
    await expect(page.locator('[data-testid="cancellation-success"]')).toBeVisible();
    
    // Verify booking status updated
    await expect(page.locator('[data-testid="booking-status"]').first())
      .toHaveText('Cancelled');
  });
});
```

---

## Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel (Next.js web) + Expo/App Store (React Native mobile)
- **Build Command:** `npm run build` (web), `expo build` (mobile)
- **Output Directory:** `.next` (web), `dist` (mobile)
- **CDN/Edge:** Vercel Edge Network with global distribution

**Backend Deployment:**
- **Platform:** Railway (MVP) with AWS Lambda migration path
- **Build Command:** `pip install -r requirements.txt && python -m pytest`
- **Deployment Method:** Docker container with auto-scaling

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy StudioLoop

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PYTHON_VERSION: '3.11'

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run mobile tests
        run: npm run test:mobile
      
      - name: Run web tests
        run: npm run test:web
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: 0

  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: studioloop_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        run: |
          pip install -r apps/api/requirements.txt
          pip install -r apps/api/requirements-dev.txt
      
      - name: Run database migrations
        run: alembic upgrade head
        working-directory: apps/api
        env:
          DATABASE_URL: postgresql://postgres:test@localhost/studioloop_test
      
      - name: Run backend tests
        run: pytest -v --cov=src
        working-directory: apps/api
        env:
          DATABASE_URL: postgresql://postgres:test@localhost/studioloop_test
          REDIS_URL: redis://localhost:6379
          SECRET_KEY: test-secret-key
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3

  deploy-staging:
    if: github.ref == 'refs/heads/staging'
    needs: [test-frontend, test-backend]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Deploy backend to Railway staging
      - name: Deploy API to Railway
        uses: railway-deploy@v1
        with:
          service: studioloop-api-staging
          environment: staging
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
      
      # Deploy web dashboard to Vercel
      - name: Deploy Web to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/web
          environment: staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: [test-frontend, test-backend]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      # Deploy backend to Railway production
      - name: Deploy API to Railway
        uses: railway-deploy@v1
        with:
          service: studioloop-api-production
          environment: production
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
      
      # Deploy web dashboard to Vercel
      - name: Deploy Web to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/web
          environment: production
      
      # Build and submit mobile app (manual trigger)
      - name: Build mobile app
        if: contains(github.event.head_commit.message, '[mobile-release]')
        run: |
          npm run build:mobile:ios
          npm run build:mobile:android
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:8000 | Local development |
| Staging | https://staging.studioloop.co.za | https://api-staging.studioloop.co.za | Pre-production testing |
| Production | https://studioloop.co.za | https://api.studioloop.co.za | Live environment |

---

## Security and Performance

### Security Requirements

**Frontend Security:**
- CSP Headers: Strict content security policy preventing XSS attacks
- XSS Prevention: Input sanitization and React's built-in protection
- Secure Storage: Sensitive data encrypted in device secure storage

**Backend Security:**
- Input Validation: Pydantic schemas validate all API inputs
- Rate Limiting: 1000 requests/hour per user, 100/hour for anonymous
- CORS Policy: Restricted to allowed domains only

**Authentication Security:**
- Token Storage: JWT tokens in secure HTTP-only cookies (web) / encrypted storage (mobile)
- Session Management: 15-minute access token, 30-day refresh token lifecycle
- Password Policy: Minimum 8 characters, complexity requirements

### Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <500KB initial load, code splitting for routes
- Loading Strategy: Progressive loading with skeleton screens
- Caching Strategy: API responses cached for 5 minutes, static assets for 1 year

**Backend Performance:**
- Response Time Target: <200ms for API endpoints, <500ms for complex queries
- Database Optimization: Strategic indexing, query optimization, connection pooling
- Caching Strategy: Redis for session data, query results cached for 1 hour

---

## Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Sentry for error tracking, PostHog for user analytics
- **Backend Monitoring:** Sentry for error tracking, Prometheus for metrics
- **Error Tracking:** Real-time error alerts with stack traces and user context
- **Performance Monitoring:** Core Web Vitals tracking, API response time monitoring

### Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors and crash rates
- API response times from client perspective
- User interaction and conversion rates

**Backend Metrics:**
- Request rate and error rate by endpoint
- Response time percentiles (p50, p95, p99)
- Database query performance and connection usage
- Background job processing times and failure rates

---

## Project Structure

```
studioloop/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── deploy.yml
│       └── test.yml
├── apps/                       # Application packages
│   ├── mobile/                 # React Native mobile app
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── screens/        # Screen components
│   │   │   ├── navigation/     # Navigation configuration
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── services/       # API client services
│   │   │   ├── stores/         # Zustand state stores
│   │   │   ├── utils/          # Utility functions
│   │   │   └── types/          # TypeScript definitions
│   │   ├── __tests__/          # Mobile app tests
│   │   ├── android/            # Android-specific code
│   │   ├── ios/                # iOS-specific code
│   │   ├── app.json            # Expo configuration
│   │   └── package.json
│   ├── web/                    # Next.js web dashboard
│   │   ├── src/
│   │   │   ├── components/     # Web dashboard components
│   │   │   ├── pages/          # Next.js pages
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── services/       # API services
│   │   │   ├── stores/         # State management
│   │   │   └── utils/          # Utilities
│   │   ├── __tests__/          # Web app tests
│   │   ├── public/             # Static assets
│   │   ├── next.config.js      # Next.js configuration
│   │   └── package.json
│   └── api/                    # FastAPI backend
│       ├── src/
│       │   ├── main.py         # FastAPI entry point
│       │   ├── core/           # Core configuration
│       │   ├── models/         # SQLAlchemy models
│       │   ├── schemas/        # Pydantic schemas
│       │   ├── services/       # Business logic
│       │   ├── repositories/   # Data access layer
│       │   ├── api/            # API route handlers
│       │   ├── tasks/          # Background tasks
│       │   └── utils/          # Utility functions
│       ├── tests/              # Backend tests
│       ├── alembic/            # Database migrations
│       ├── requirements.txt    # Python dependencies
│       └── Dockerfile          # Container configuration
├── packages/                   # Shared packages
│   ├── shared/                 # Shared types/utilities
│   │   ├── src/
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   ├── constants/      # Shared constants
│   │   │   └── utils/          # Shared utilities
│   │   └── package.json
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   └── package.json
│   └── config/                 # Shared configuration
│       ├── eslint/
│       ├── typescript/
│       └── jest/
├── e2e/                        # End-to-end tests
│   ├── specs/                  # Playwright test specs
│   ├── page-objects/           # Page object models
│   ├── fixtures/               # Test data
│   └── playwright.config.ts
├── infrastructure/             # Infrastructure as Code
│   ├── terraform/              # Terraform configurations
│   ├── docker-compose.yml      # Local development
│   └── railway.json            # Railway deployment config
├── scripts/                    # Build/deploy scripts
├── docs/                       # Documentation
│   ├── prd.md                  # Product requirements
│   ├── architecture.md         # This document
│   └── api/                    # API documentation
├── .env.example                # Environment template
├── package.json                # Root package.json
├── turbo.json                  # Turborepo configuration
└── README.md
```

---

## Development Workflow

### Local Development Setup

#### Prerequisites

```bash
# Install Node.js 18+
node --version  # Should be 18+
npm --version   # Should be 9+

# Install Python 3.11+
python --version  # Should be 3.11+
pip --version

# Install Docker
docker --version
docker-compose --version

# Install PostgreSQL (local) or use Docker
psql --version
```

#### Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/studioloop.git
cd studioloop

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start local services (PostgreSQL, Redis)
docker-compose up -d postgres redis

# Setup database
cd apps/api
alembic upgrade head
cd ../..

# Install Python dependencies
cd apps/api
pip install -r requirements.txt
pip install -r requirements-dev.txt
cd ../..
```

#### Development Commands

```bash
# Start all services
npm run dev

# Start frontend only
npm run dev:mobile    # React Native mobile app
npm run dev:web       # Next.js web dashboard

# Start backend only
npm run dev:api       # FastAPI backend

# Run tests
npm run test          # All tests
npm run test:mobile   # Mobile app tests
npm run test:web      # Web app tests
npm run test:api      # Backend tests
npm run test:e2e      # End-to-end tests

# Database operations
npm run db:migrate    # Run migrations
npm run db:seed       # Seed test data
npm run db:reset      # Reset database

# Code quality
npm run lint          # ESLint + Prettier
npm run type-check    # TypeScript checking
npm run format        # Format code
```

### Environment Configuration

#### Required Environment Variables

```bash
# Frontend (.env.local)
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/studioloop
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-super-secret-key
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
YOCO_SECRET_KEY=your-yoco-secret-key
WHATSAPP_TOKEN=your-whatsapp-token
SENDGRID_API_KEY=your-sendgrid-key

# Shared
NODE_ENV=development
ENVIRONMENT=development
LOG_LEVEL=debug
```

---

## Status

This comprehensive architecture document now provides the complete technical foundation for StudioLoop's dual-platform system, including:

### ✅ Completed Sections

1. **High-Level Architecture** - Technical summary, platform choices, repository structure, and architectural patterns
2. **Tech Stack** - Complete technology decisions with specific versions and rationale
3. **Data Models** - TypeScript interfaces for all core entities with relationships
4. **API Specification** - REST API overview with key endpoints documented
5. **Components** - Detailed service architecture with responsibilities and dependencies
6. **External APIs** - All third-party integrations with authentication and usage details
7. **Core Workflows** - Sequence diagrams for all major user journeys
8. **Database Schema** - Complete SQL schema with indexes and multi-tenant security
9. **Frontend Architecture** - Component organization, state management, routing, and services
10. **Backend Architecture** - FastAPI structure, repository pattern, and authentication
11. **Testing Strategy** - Comprehensive testing approach with examples
12. **Deployment Architecture** - CI/CD pipeline and environment configuration
13. **Security & Performance** - Security requirements and optimization strategies
14. **Monitoring** - Observability stack and key metrics
15. **Project Structure** - Complete monorepo organization
16. **Development Workflow** - Local setup and development commands

### 🎯 Key Architecture Highlights

- **Multi-tenant SaaS** with complete data isolation using Row Level Security
- **Marketplace integration** enabling cross-gym discovery and booking
- **African market optimization** with WhatsApp, offline-first design, and local payments
- **Python/FastAPI backend** as requested, with modern async patterns
- **React Native + Next.js frontend** for mobile-first user experience
- **Scalable infrastructure** using Vercel + Railway/AWS with migration path
- **Comprehensive testing** strategy covering unit, integration, and E2E tests
- **Security-first** approach with JWT auth, input validation, and rate limiting
- **Performance-optimized** with caching, indexing, and bundle optimization

The architecture is now ready for development team implementation following the 8-week MVP timeline outlined in the technical roadmap. All major technical decisions have been documented with clear rationale, and the system is designed to scale across Africa while meeting the specific needs of the South African fitness market.