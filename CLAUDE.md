# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Loop is a fitness marketplace connecting users to boutique fitness studios in Cape Town via a token-based subscription model. The project aims to solve the fragmentation in Cape Town's fitness scene by creating one membership that works across 30+ partner studios.

### Vision Statement
"One membership. Every studio in Cape Town." - Access 200+ boutique fitness classes with one simple subscription.

### Business Model
- **User Subscriptions**: Essential (R650/month), Premium (R950/month), Unlimited (R1200/month)  
- **Studio Revenue Share**: 40-45% commission on bookings
- **Corporate Packages**: Group wellness programs for companies
- **Premium Services**: Photography, marketing, analytics for studios

## Development Status

**Current Phase**: Pre-development / Planning & Documentation Complete
- Comprehensive business planning and technical architecture finished
- Marketing strategy and partnership roadmap established
- MVP technical specifications and user stories defined
- Ready to begin development with landing page as immediate priority
- Using BMAD™ (Breakthrough Method of Agile AI-driven Development) framework

## Planned Technology Stack

### Landing Page (Week 1 Priority)
- **Frontend**: Next.js + Tailwind CSS
- **Hosting**: Vercel
- **Email**: ConvertKit/Mailchimp
- **Domain**: studioloop.co.za

### Core Application (Weeks 2-8)
- **Backend**: FastAPI (Python) or Node.js + Express
- **Database**: PostgreSQL + Redis
- **Mobile App**: React Native (cross-platform)
- **Payments**: Stripe
- **Cloud**: AWS or Google Cloud Platform
- **Authentication**: JWT + OAuth (Google/Apple)

## Key Documents

### Planning & Strategy Documents
- **Technical Roadmap**: `tech-roadmap-final.md` - Complete 8-week development plan with detailed architecture
- **Marketing Plan**: `marketing-plan-final.md` - Launch strategy targeting 500+ users and 30+ studios
- **Sales/Partnership**: `sales-partnership-roadmap.md` - Studio acquisition strategy and revenue projections
- **MVP Specifications**: `mvp-technical-specifications.md` - Detailed technical specs for booking system
- **Project Brief**: `booking-system-project-brief.md` - Comprehensive project overview
- **Product Backlog**: `docs/product-backlog.md` - User stories and sprint planning
- **Architecture**: `docs/architecture.md` - System design and technical decisions

### Research & Analysis
- **Market Research**: `sa-gym-market-research.md` - South African fitness market analysis  
- **Competitive Analysis**: `booking-system-competitive-analysis.md` - Competitor landscape
- **Feature Brainstorm**: `booking-system-feature-brainstorm.md` - Feature ideation sessions
- **Partnership Strategies**: `partnership-strategies.md` - Studio partnership approaches
- **Gym Owner Validation**: `gym-owner-validation-guide.md` - Customer validation framework

### Design & Prototypes
- **Interactive Prototypes**: `prototypes/` - HTML/CSS/JS functional prototypes
  - Trainer dashboard with analytics and management tools
  - User booking flows and class discovery
  - Payment and profile management interfaces
- **UX Documentation**: `docs/ux-improvements-welcome-flow.md` - User experience guidelines

## BMAD Framework

This project uses the BMAD™ (Breakthrough Method of Agile AI-driven Development) framework located in `.bmad-core/`:

- **Agent Teams**: `.bmad-core/agent-teams/` - Team configurations for different development phases
- **Individual Agents**: `.bmad-core/agents/` - Specialized AI agents (PM, Dev, Architect, QA, UX Expert)
- **Templates**: `.bmad-core/templates/` - Document templates for PRDs, architecture docs
- **Tasks**: `.bmad-core/tasks/` - Reusable development tasks and workflows
- **Checklists**: `.bmad-core/checklists/` - Quality gates and validation frameworks
- **Data**: `.bmad-core/data/` - Knowledge base and technical preferences

### Using BMAD Agents

When implementing features, follow the BMAD development loop:
1. **Scrum Master Agent** → Creates user stories from technical roadmap
2. **Developer Agent** → Implements approved stories
3. **QA Agent** → Reviews and refactors code  
4. **Architect Agent** → Reviews system design decisions
5. **UX Expert Agent** → Validates user experience and design

### BMAD Workflow Phases
1. **Planning Phase**: Use PM/Architect/UX agents for comprehensive documentation
2. **Development Phase**: SM → Dev → QA cycles for iterative implementation
3. **Integration Phase**: Cross-agent collaboration for system validation

## Database Schema

The database architecture is designed as a multi-tenant SaaS system with the following core entities:

### Primary Tables (PostgreSQL)
- **Users**: Multi-tenant user management with role-based access
- **Tenants**: Gym/studio accounts with subscription tiers and settings
- **Classes**: Class templates with instructor assignment and capacity management
- **Class Schedules**: Time-based class instances with availability tracking
- **Bookings**: User reservations with QR code generation and check-in status
- **Member Credits**: Token-based system with purchase history and expiration
- **Credit Transactions**: Audit trail for all credit movements
- **Notifications**: Multi-channel messaging system (push, email, SMS, WhatsApp)
- **Audit Logs**: Complete activity tracking for compliance

### Caching Layer (Redis)
- Session management and authentication tokens
- Real-time availability updates
- User credit balances
- Popular class recommendations

Detailed schema available in `tech-roadmap-final.md` (lines 79-188) and `mvp-technical-specifications.md` (lines 47-214)

## API Architecture

### RESTful API Endpoints
- **Authentication**: `/api/auth/*` - JWT-based auth with refresh tokens
- **User Management**: `/api/user/*` - Profile, bookings, credits, preferences
- **Studio Discovery**: `/api/studios/*` - Search, filters, details, reviews
- **Class Management**: `/api/classes/*` - Schedules, search, availability
- **Booking System**: `/api/bookings/*` - Create, cancel, check-in, waitlist
- **Payments**: `/api/payments/*` - Stripe integration, subscriptions, refunds
- **Admin Dashboard**: `/api/admin/*` - Analytics, reporting, management

### Real-time Features (WebSocket)
- Live booking updates
- Waitlist notifications
- Class availability changes
- Check-in status updates

Complete API specification in `tech-roadmap-final.md` (lines 190-231) and `mvp-technical-specifications.md` (lines 217-337)

## Development Timeline

### Phase 0: Landing Page (Week 1) 🚀
**IMMEDIATE PRIORITY** - Get waitlist live ASAP
- Next.js landing page with email capture
- Goal: 500+ waitlist signups
- Hero: "One membership. Every studio in Cape Town."
- Deployment: Vercel with studioloop.co.za domain

### Phase 1: Core Infrastructure (Weeks 2-3)
- Backend API (FastAPI or Node.js + Express)
- PostgreSQL database with multi-tenant architecture
- JWT authentication with OAuth integration
- Basic admin dashboard for studio management

### Phase 2: Mobile App Development (Weeks 4-5)
- React Native cross-platform app
- User registration and authentication
- Class browsing and booking functionality
- QR code generation for check-ins

### Phase 3: Studio Integration (Week 6)
- Studio dashboard with analytics
- Schedule management tools
- QR code scanning system
- Financial reporting and payouts

### Phase 4: Testing & Launch Prep (Week 7)
- Comprehensive testing (unit, integration, E2E)
- Performance optimization
- Security audit and penetration testing
- Load testing for concurrent users

### Phase 5: Launch & Monitoring (Week 8)
- Production deployment with monitoring
- App store releases (iOS/Android)
- Partner studio onboarding
- Launch marketing campaign

### Post-Launch Roadmap (Weeks 9-16)
- **Weeks 9-10**: Bug fixes and stability improvements
- **Weeks 11-12**: Enhanced discovery and social features
- **Weeks 13-16**: Referral system and advanced analytics

## Critical Features

1. **QR Code Check-in System** - Must work 100% reliably
2. **Real-time Class Availability** - Accurate slot management
3. **Token Management** - Subscription-based class credits
4. **Studio Dashboard** - Zero-training-required interface
5. **Payment Security** - PCI compliant via Stripe

## Testing Strategy

Once development begins:
- **Backend**: Jest (Node.js) or Pytest (Python)
- **Mobile**: Jest + React Native Testing Library
- **E2E**: Detox or Appium
- **Load Testing**: Artillery or K6

## Commands

Since no code exists yet, commands will be established as development progresses:

### Future Development Commands
```bash
# Landing Page (Next.js)
npm install          # Install dependencies
npm run dev         # Development server
npm run build       # Production build
npm run test        # Run tests

# Backend (if using Node.js)
npm install         # Install dependencies
npm run dev        # Development server with nodemon
npm run test       # Run Jest tests
npm run migrate    # Run database migrations

# Backend (if using Python/FastAPI)
pip install -r requirements.txt    # Install dependencies
uvicorn main:app --reload         # Development server
pytest                            # Run tests
alembic upgrade head             # Run migrations

# Mobile App (React Native)
npm install                      # Install dependencies
npx react-native run-ios        # iOS simulator
npx react-native run-android    # Android emulator
npm test                        # Run tests
```

## Current Development Status

**Ready to Begin**: All planning documentation complete, immediate focus on landing page
**Next Action**: Create Next.js landing page with waitlist functionality  
**Timeline**: Week 1 priority - get waitlist live within 3-5 days maximum

---

# Important Instructions
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.