# 🔧 TECHNICAL SPECIFICATIONS: StudioLoop Booking MVP

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    StudioLoop Booking OS                        │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Layer                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │ Admin Web   │  │ Mobile Apps │  │ Landing Page        │    │
│  │ Dashboard   │  │ iOS/Android │  │ Marketing Site      │    │
│  │ (React)     │  │ (React N.)  │  │ (Next.js)          │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  API Gateway & Authentication                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ API Gateway (Express/Fastify) + JWT Auth + Rate Limiting   ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  Business Logic Layer (Microservices)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │ Booking     │  │ User        │  │ Notification        │    │
│  │ Service     │  │ Service     │  │ Service             │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │ Gym         │  │ Payment     │  │ Analytics           │    │
│  │ Service     │  │ Service     │  │ Service             │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │ PostgreSQL  │  │ Redis       │  │ File Storage        │    │
│  │ (Primary)   │  │ (Cache)     │  │ (AWS S3/MinIO)      │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Infrastructure & Monitoring                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐    │
│  │ Docker      │  │ Monitoring  │  │ CI/CD Pipeline      │    │
│  │ Containers  │  │ (Sentry)    │  │ (GitHub Actions)    │    │
│  └─────────────┘  └─────────────┘  └─────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## DATABASE SCHEMA (PostgreSQL)

### Core Tables

```sql
-- Tenants (Gyms) Table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address JSONB,
    settings JSONB DEFAULT '{}',
    subscription_tier VARCHAR(50) DEFAULT 'starter',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (Multi-tenant)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'member', -- admin, instructor, member
    profile_image_url VARCHAR(500),
    preferences JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, email)
);

-- Classes Table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES users(id),
    duration_minutes INTEGER NOT NULL,
    max_capacity INTEGER NOT NULL,
    class_type VARCHAR(100),
    difficulty_level VARCHAR(20) DEFAULT 'intermediate',
    price DECIMAL(10,2) DEFAULT 0,
    credits_required INTEGER DEFAULT 1,
    color VARCHAR(7) DEFAULT '#007bff', -- Hex color for calendar
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Schedules Table
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    available_spots INTEGER NOT NULL,
    booking_window_hours INTEGER DEFAULT 168, -- 7 days default
    cancellation_window_hours INTEGER DEFAULT 2,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, cancelled, completed
    instructor_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    class_schedule_id UUID REFERENCES class_schedules(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, waitlisted, cancelled, completed, no_show
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_in_time TIMESTAMP,
    cancellation_time TIMESTAMP,
    cancellation_reason TEXT,
    qr_code VARCHAR(255) UNIQUE,
    qr_expires_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Member Credits Table
CREATE TABLE member_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    credits_balance INTEGER DEFAULT 0,
    credits_total_purchased INTEGER DEFAULT 0,
    last_credit_purchase TIMESTAMP,
    auto_renew BOOLEAN DEFAULT false,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, user_id)
);

-- Credit Transactions Table
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id),
    transaction_type VARCHAR(50) NOT NULL, -- purchase, spend, refund, expire
    credits_amount INTEGER NOT NULL, -- positive for credits added, negative for spent
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- booking_confirmed, class_reminder, waitlist_promoted, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    channels JSONB DEFAULT '[]', -- ['push', 'email', 'sms', 'whatsapp']
    status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    data JSONB DEFAULT '{}', -- Additional data for the notification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes for Performance

```sql
-- Performance indexes
CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_schedule_id ON bookings(class_schedule_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_class_schedules_tenant_time ON class_schedules(tenant_id, start_time);
CREATE INDEX idx_notifications_user_status ON notifications(user_id, status);
CREATE INDEX idx_credit_transactions_user ON credit_transactions(user_id);

-- Unique constraints
ALTER TABLE bookings ADD CONSTRAINT unique_user_schedule 
    UNIQUE(user_id, class_schedule_id);
```

---

## API ENDPOINTS SPECIFICATION

### Authentication Endpoints

```typescript
// POST /api/auth/register
interface RegisterRequest {
  tenantSlug: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

// POST /api/auth/login
interface LoginRequest {
  tenantSlug: string;
  email: string;
  password: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}
```

### Booking Endpoints

```typescript
// GET /api/bookings/schedule
interface ScheduleQuery {
  startDate: string; // ISO date
  endDate: string;   // ISO date
  classType?: string;
  instructorId?: string;
}

interface ScheduleResponse {
  schedules: Array<{
    id: string;
    class: Class;
    startTime: string;
    endTime: string;
    availableSpots: number;
    totalSpots: number;
    canBook: boolean;
    waitlistAvailable: boolean;
    userBooking?: Booking;
  }>;
}

// POST /api/bookings
interface CreateBookingRequest {
  classScheduleId: string;
  joinWaitlist?: boolean;
}

interface BookingResponse {
  booking: Booking;
  qrCode?: string;
}

// DELETE /api/bookings/:id
interface CancelBookingRequest {
  reason?: string;
}
```

### Admin Endpoints

```typescript
// POST /api/admin/classes
interface CreateClassRequest {
  name: string;
  description?: string;
  instructorId?: string;
  duration: number; // minutes
  maxCapacity: number;
  classType?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  creditsRequired?: number;
  color?: string;
}

// POST /api/admin/schedules
interface CreateScheduleRequest {
  classId: string;
  startTime: string; // ISO datetime
  instructorId?: string;
  overrideCapacity?: number;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
    daysOfWeek?: number[]; // 0-6, Sunday = 0
  };
}

// GET /api/admin/analytics/dashboard
interface DashboardAnalytics {
  totalMembers: number;
  activeMembers: number;
  todayBookings: number;
  weekRevenue: number;
  popularClasses: Array<{
    name: string;
    bookings: number;
  }>;
  recentActivity: Activity[];
}
```

---

## MOBILE APP ARCHITECTURE (React Native)

### Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, etc.)
│   ├── booking/         # Booking-specific components
│   ├── profile/         # Profile components
│   └── forms/           # Form components
├── screens/             # Screen components
│   ├── Auth/           # Login, Register, ForgotPassword
│   ├── Booking/        # Schedule, BookClass, BookingDetails
│   ├── Profile/        # UserProfile, Settings, Credits
│   └── Gym/            # GymInfo, Classes, Instructors
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── TabNavigator.tsx
├── services/          # API and external services
│   ├── api/           # API client and endpoints
│   ├── auth/          # Authentication service
│   ├── notifications/ # Push notification service
│   └── storage/       # Local storage service
├── store/             # State management (Redux Toolkit)
│   ├── slices/        # Redux slices
│   ├── middleware/    # Custom middleware
│   └── index.ts       # Store configuration
├── utils/             # Helper functions
│   ├── date.ts        # Date utilities
│   ├── validation.ts  # Form validation
│   └── constants.ts   # App constants
├── hooks/             # Custom React hooks
│   ├── useAuth.ts
│   ├── useBooking.ts
│   └── useNotifications.ts
└── types/             # TypeScript type definitions
    ├── api.ts
    ├── navigation.ts
    └── user.ts
```

### Core Dependencies

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.0.5",
    "react-hook-form": "^7.45.0",
    "axios": "^1.4.0",
    "react-native-keychain": "^8.1.0",
    "react-native-push-notification": "^8.1.1",
    "react-native-qrcode-scanner": "^1.5.5",
    "react-native-vector-icons": "^9.2.0",
    "react-native-calendar-picker": "^7.1.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "react-native-flash-message": "^0.4.2"
  }
}
```

---

## BACKEND API ARCHITECTURE

### Technology Stack

```typescript
// Core Framework: Node.js + Express (Alternative: Fastify)
// Database: PostgreSQL with Prisma ORM
// Caching: Redis
// Authentication: JWT with refresh tokens
// Validation: Zod
// Documentation: OpenAPI/Swagger
```

### Project Structure

```
backend/
├── src/
│   ├── controllers/        # Request handlers
│   │   ├── auth.ts
│   │   ├── bookings.ts
│   │   ├── classes.ts
│   │   └── admin.ts
│   ├── middleware/        # Custom middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── rateLimiting.ts
│   │   └── tenantContext.ts
│   ├── services/         # Business logic
│   │   ├── AuthService.ts
│   │   ├── BookingService.ts
│   │   ├── NotificationService.ts
│   │   └── AnalyticsService.ts
│   ├── models/          # Database models (Prisma)
│   │   └── schema.prisma
│   ├── routes/          # Route definitions
│   │   ├── auth.ts
│   │   ├── bookings.ts
│   │   ├── admin.ts
│   │   └── public.ts
│   ├── utils/           # Utility functions
│   │   ├── validation.ts
│   │   ├── encryption.ts
│   │   ├── qrCode.ts
│   │   └── notifications.ts
│   ├── config/          # Configuration
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── environment.ts
│   └── types/           # TypeScript definitions
│       └── index.ts
├── prisma/             # Database migrations & seed
├── tests/              # Test files
├── docs/               # API documentation
└── docker/             # Docker configuration
```

### Core Services Implementation

```typescript
// BookingService.ts
export class BookingService {
  async createBooking(
    userId: string, 
    scheduleId: string, 
    tenantId: string
  ): Promise<Booking> {
    // 1. Check availability
    const schedule = await this.getScheduleWithAvailability(scheduleId);
    if (schedule.availableSpots <= 0) {
      throw new Error('Class is full');
    }

    // 2. Check booking window
    if (!this.isWithinBookingWindow(schedule)) {
      throw new Error('Booking window closed');
    }

    // 3. Check user credits
    const userCredits = await this.getUserCredits(userId, tenantId);
    if (userCredits.balance < schedule.class.creditsRequired) {
      throw new Error('Insufficient credits');
    }

    // 4. Create booking and deduct credits
    const booking = await this.db.booking.create({
      data: {
        userId,
        classScheduleId: scheduleId,
        tenantId,
        qrCode: generateQRCode(),
        qrExpiresAt: schedule.endTime
      }
    });

    await this.deductCredits(userId, schedule.class.creditsRequired, booking.id);
    await this.sendBookingConfirmation(booking);

    return booking;
  }

  async cancelBooking(bookingId: string, reason?: string): Promise<void> {
    const booking = await this.getBookingWithSchedule(bookingId);
    
    if (!this.isWithinCancellationWindow(booking.classSchedule)) {
      throw new Error('Cancellation window closed');
    }

    await this.db.booking.update({
      where: { id: bookingId },
      data: { 
        status: 'cancelled',
        cancellationTime: new Date(),
        cancellationReason: reason
      }
    });

    // Refund credits
    await this.refundCredits(booking.userId, booking.classSchedule.class.creditsRequired);
    
    // Promote waitlist
    await this.promoteWaitlist(booking.classScheduleId);
  }
}
```

---

## SECURITY IMPLEMENTATION

### Authentication & Authorization

```typescript
// JWT Token Structure
interface JWTPayload {
  userId: string;
  tenantId: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}

// Role-based middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JWTPayload;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Tenant isolation middleware
export const tenantContext = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.tenantId || req.headers['x-tenant-id'];
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant context required' });
  }
  req.tenantId = tenantId;
  next();
};
```

### Data Validation

```typescript
// Using Zod for request validation
const createBookingSchema = z.object({
  body: z.object({
    classScheduleId: z.string().uuid(),
    joinWaitlist: z.boolean().optional().default(false)
  })
});

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      res.status(400).json({ error: 'Validation failed', details: error });
    }
  };
};
```

---

## REAL-TIME FEATURES

### WebSocket Implementation

```typescript
// Socket.IO for real-time updates
import { Server } from 'socket.io';

export class RealtimeService {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: { origin: process.env.CLIENT_URL }
    });

    this.io.on('connection', (socket) => {
      socket.on('join_tenant', (tenantId) => {
        socket.join(`tenant:${tenantId}`);
      });

      socket.on('join_user', (userId) => {
        socket.join(`user:${userId}`);
      });
    });
  }

  // Notify all users in a tenant about schedule changes
  notifyScheduleUpdate(tenantId: string, schedule: any) {
    this.io.to(`tenant:${tenantId}`).emit('schedule_updated', schedule);
  }

  // Notify specific user about booking status
  notifyUser(userId: string, event: string, data: any) {
    this.io.to(`user:${userId}`).emit(event, data);
  }

  // Notify about waitlist promotions
  notifyWaitlistPromotion(userId: string, booking: any) {
    this.io.to(`user:${userId}`).emit('waitlist_promoted', booking);
  }
}
```

---

## OFFLINE FUNCTIONALITY

### Mobile App Offline Strategy

```typescript
// Redux Offline Middleware
import { createOfflineMiddleware } from '@redux-offline/redux-offline';

const offlineConfig = {
  // Actions to be queued when offline
  effect: (effect: any, action: any) => {
    if (action.meta?.offline) {
      return API.request(effect);
    }
  },

  // Retry failed actions when back online
  retry: (action: any, retries: number) => {
    return retries < 3;
  },

  // Detect network connectivity
  detectNetwork: (callback: Function) => {
    // Implementation using NetInfo
  }
};

// Offline-capable booking action
export const bookClassOffline = (scheduleId: string) => ({
  type: 'BOOK_CLASS_OFFLINE',
  payload: { scheduleId },
  meta: {
    offline: {
      effect: { url: '/api/bookings', method: 'POST', body: { scheduleId } },
      commit: { type: 'BOOK_CLASS_SUCCESS' },
      rollback: { type: 'BOOK_CLASS_FAILURE' }
    }
  }
});
```

---

## PERFORMANCE OPTIMIZATION

### Caching Strategy

```typescript
// Redis caching layers
export class CacheService {
  // Cache gym schedule for 5 minutes
  async getSchedule(tenantId: string, date: string) {
    const cacheKey = `schedule:${tenantId}:${date}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const schedule = await this.db.getSchedule(tenantId, date);
    await redis.setex(cacheKey, 300, JSON.stringify(schedule)); // 5 min TTL
    return schedule;
  }

  // Cache user's available credits
  async getUserCredits(userId: string) {
    const cacheKey = `credits:${userId}`;
    // Implement with shorter TTL for accuracy
  }

  // Invalidate cache on updates
  async invalidateSchedule(tenantId: string, date: string) {
    await redis.del(`schedule:${tenantId}:${date}`);
  }
}
```

### Database Optimization

```sql
-- Materialized view for popular analytics
CREATE MATERIALIZED VIEW popular_classes AS
SELECT 
  c.tenant_id,
  c.name,
  COUNT(b.id) as booking_count,
  AVG(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time))/60) as avg_duration
FROM classes c
JOIN class_schedules cs ON c.id = cs.class_id
JOIN bookings b ON cs.id = b.class_schedule_id
WHERE b.status = 'completed'
  AND cs.start_time >= NOW() - INTERVAL '30 days'
GROUP BY c.tenant_id, c.name
ORDER BY booking_count DESC;

-- Refresh weekly
CREATE OR REPLACE FUNCTION refresh_popular_classes()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW popular_classes;
END;
$$ LANGUAGE plpgsql;
```

---

## MONITORING & OBSERVABILITY

### Health Checks & Metrics

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      external_services: await checkExternalServices()
    }
  };

  const isHealthy = Object.values(health.checks).every(check => check.status === 'ok');
  res.status(isHealthy ? 200 : 503).json(health);
});

// Prometheus metrics
import prometheus from 'prom-client';

const bookingCounter = new prometheus.Counter({
  name: 'bookings_total',
  help: 'Total number of bookings created',
  labelNames: ['tenant_id', 'class_type', 'status']
});

const responseTime = new prometheus.Histogram({
  name: 'api_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  buckets: [0.1, 0.5, 1, 2, 5]
});
```

---

## DEPLOYMENT CONFIGURATION

### Docker Compose (Development)

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/booking_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: booking_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

volumes:
  postgres_data:
```

### CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy MVP
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # Deploy to cloud provider
          # Run database migrations
          # Update containers
```

---

## TESTING STRATEGY

### Backend Testing

```typescript
// Unit tests with Jest
describe('BookingService', () => {
  test('should create booking when spots available', async () => {
    const mockSchedule = {
      id: '123',
      availableSpots: 5,
      class: { creditsRequired: 1 }
    };
    
    jest.spyOn(bookingService, 'getScheduleWithAvailability')
        .mockResolvedValue(mockSchedule);
    
    const booking = await bookingService.createBooking('user1', 'schedule1', 'tenant1');
    
    expect(booking).toBeDefined();
    expect(booking.status).toBe('confirmed');
  });

  test('should throw error when class is full', async () => {
    const mockSchedule = { availableSpots: 0 };
    jest.spyOn(bookingService, 'getScheduleWithAvailability')
        .mockResolvedValue(mockSchedule);

    await expect(
      bookingService.createBooking('user1', 'schedule1', 'tenant1')
    ).rejects.toThrow('Class is full');
  });
});

// Integration tests with Supertest
describe('POST /api/bookings', () => {
  test('should create booking successfully', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ classScheduleId: 'valid-schedule-id' })
      .expect(201);

    expect(response.body.booking).toBeDefined();
  });
});
```

### Mobile Testing

```typescript
// React Native testing with Testing Library
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('BookingScreen', () => {
  test('should book class when button pressed', async () => {
    const mockBookClass = jest.fn();
    const { getByText } = render(
      <BookingScreen bookClass={mockBookClass} />
    );

    fireEvent.press(getByText('Book Class'));
    
    await waitFor(() => {
      expect(mockBookClass).toHaveBeenCalled();
    });
  });
});
```

---

## MVP DEVELOPMENT TIMELINE

### Week 1-2: Foundation
- ✅ Database schema setup
- ✅ Basic API structure
- ✅ Authentication system
- ✅ Core models and relationships

### Week 3-4: Core Features
- ✅ Class scheduling system
- ✅ Booking creation and management
- ✅ QR code generation
- ✅ Basic admin dashboard

### Week 5-6: Mobile App
- ✅ React Native app structure
- ✅ Authentication screens
- ✅ Class booking flow
- ✅ QR code scanner

### Week 7-8: Integration & Testing
- ✅ End-to-end testing
- ✅ Performance optimization
- ✅ Security audit
- ✅ Deployment pipeline

---

## CRITICAL SUCCESS FACTORS

### Technical Requirements
- **Performance:** <1 second booking confirmation
- **Reliability:** 99.9% uptime
- **Security:** End-to-end encryption, POPI compliance
- **Scalability:** Handle 1000+ concurrent users per gym

### User Experience
- **Simplicity:** WhatsApp-level ease of use
- **Speed:** Faster than manual booking processes
- **Reliability:** Works during load-shedding
- **Familiarity:** Leverages known interaction patterns

### Business Integration
- **Low friction onboarding:** <1 day gym setup
- **Data migration:** Import existing member data
- **Payment integration:** Local payment methods
- **Support:** Responsive local customer service