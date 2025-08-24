# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Loop is a fitness marketplace app connecting users to boutique fitness studios in Cape Town via a token-based subscription model. Currently in pre-development planning phase.

## Development Status

**Current Phase**: Pre-development / Planning
- Business documentation and technical roadmaps complete
- No source code implemented yet
- Using BMAD (Breakthrough Method of Agile AI-driven Development) framework for AI-driven development

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

- **Technical Roadmap**: `tech-roadmap-final.md` - Complete 8-week development plan with architecture details
- **Marketing Plan**: `marketing-plan-final.md` - Go-to-market strategy
- **Sales/Partnership**: `sales-partnership-roadmap.md` - Studio acquisition strategy
- **Business Plan**: `StudioLoop - LEAN Business Plan.docx`

## BMAD Framework

This project uses the BMAD™ (Breakthrough Method of Agile AI-driven Development) framework located in `.bmad-core/`:

- **Agent Teams**: `.bmad-core/agent-teams/` - Team configurations for different development phases
- **Individual Agents**: `.bmad-core/agents/` - Specialized AI agents (PM, Dev, Architect, QA)
- **Templates**: `.bmad-core/templates/` - Document templates for PRDs, architecture docs
- **Tasks**: `.bmad-core/tasks/` - Reusable development tasks
- **Checklists**: `.bmad-core/checklists/` - Quality gates and validation

### Using BMAD Agents

When implementing features, follow the BMAD development loop:
1. **Scrum Master Agent** → Creates user stories from technical roadmap
2. **Developer Agent** → Implements approved stories
3. **QA Agent** → Reviews and refactors code
4. **Architect Agent** → Reviews system design decisions

## Database Schema

The planned database structure is detailed in `tech-roadmap-final.md` (lines 79-188) including:
- Users (subscription management, tokens)
- Studios (partner information)
- Classes and Schedules
- Bookings (with QR code check-in)
- Payments and Studio Payouts

## API Structure

Planned API endpoints are documented in `tech-roadmap-final.md` (lines 193-231):
- `/api/auth/*` - Authentication endpoints
- `/api/user/*` - User management
- `/api/studios/*` - Studio discovery
- `/api/classes/*` - Class search and scheduling
- `/api/bookings/*` - Booking management
- `/api/payments/*` - Payment processing

## Development Timeline

**Week 1**: Landing page (PRIORITY)
**Weeks 2-3**: Backend infrastructure
**Weeks 4-5**: Mobile app development
**Weeks 6**: Studio integration & dashboard
**Week 7**: Testing & optimization
**Week 8**: Launch preparation

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

## Architecture Notes

### Microservices Consideration
As the platform scales, consider splitting into:
- Authentication Service
- Booking Service
- Payment Service
- Studio Management Service
- Notification Service

### Caching Strategy
- Redis for session management
- Cache studio schedules (5-minute TTL)
- Cache user token balances
- CDN for static assets

### Security Requirements
- HTTPS/TLS for all communications
- JWT with refresh tokens
- Input validation on all endpoints
- Rate limiting per user/IP
- Never store credit card data directly

## Performance Targets
- API response time: <200ms average
- App crash rate: <1% of sessions
- Page load speed: <2 seconds
- Server uptime: 99.9% target