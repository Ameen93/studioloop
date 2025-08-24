# StudioLoop UI/UX Mockups & Design System

## Design Philosophy

### Brand Principles
- **Energetic & Motivating**: Colors and interactions that inspire fitness
- **Clean & Modern**: Minimal design that doesn't distract from core functionality
- **African-Optimized**: Design for diverse users and varying connectivity
- **Mobile-First**: Primary focus on mobile experience

### Color Palette

```css
/* Primary Colors */
--primary-orange: #FF6B35;      /* Energy, motivation */
--primary-blue: #004AAD;        /* Trust, stability */
--accent-green: #00C851;        /* Success, health */

/* Neutral Colors */
--dark-gray: #1A1A1A;          /* Text primary */
--medium-gray: #666666;         /* Text secondary */
--light-gray: #F5F5F5;         /* Background */
--white: #FFFFFF;              /* Cards, overlays */

/* Status Colors */
--success: #00C851;            /* Booking confirmed */
--warning: #FF8800;            /* Class full, waitlist */
--error: #FF4444;              /* Booking failed */
--info: #0099CC;               /* Information */
```

### Typography

```css
/* Font Family */
font-family: 'Inter', 'SF Pro Display', system-ui;

/* Heading Styles */
--h1: 32px/40px, weight: 700;  /* Page titles */
--h2: 24px/32px, weight: 600;  /* Section headers */
--h3: 20px/28px, weight: 600;  /* Card titles */
--h4: 16px/24px, weight: 600;  /* Sub-headings */

/* Body Styles */
--body-large: 16px/24px, weight: 400;
--body-regular: 14px/20px, weight: 400;
--body-small: 12px/16px, weight: 400;

/* Interactive */
--button: 16px/24px, weight: 600;
--caption: 12px/16px, weight: 500;
```

### Design Tokens

```css
/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
```

---

## Mobile App Mockups

### 1. Authentication Flow

#### 1.1 Welcome Screen (REBUILT)
```
┌─────────────────────────────────┐
│ Status Bar                      │
├─────────────────────────────────┤
│                                 │
│         [StudioLoop Logo]       │
│          StudioLoop             │
│                                 │
│   Your fitness journey starts   │
│            here                 │
│                                 │
│  🏋️ Book classes at any gym     │
│  🔍 Discover new workouts       │
│  📊 Track your fitness goals    │
│                                 │
│  [Continue with Phone Number]   │
│                                 │
│   Already have an account?      │
│           [Sign In]             │
│                                 │
│                                 │
│    [Illustration: People        │
│     exercising together]        │
│                                 │
│                                 │
│  ┌─────────────────────────┐    │
│  │     Get Started         │    │
│  └─────────────────────────┘    │
│                                 │
│    Already have an account?     │
│           Sign In               │
│                                 │
└─────────────────────────────────┘
```

#### 1.2 Registration Screen
```
┌─────────────────────────────────┐
│ [<] Create Account              │
├─────────────────────────────────┤
│                                 │
│  Welcome to StudioLoop! 👋      │
│  Let's get you started          │
│                                 │
│  ┌─────────────────────────┐    │
│  │ First Name              │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Last Name               │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Email Address           │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Phone Number (+27)      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Password                │    │
│  └─────────────────────────┘    │
│                                 │
│  ☑ I agree to Terms &           │
│     Privacy Policy              │
│                                 │
│  ┌─────────────────────────┐    │
│  │     Create Account      │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### 1.3 Phone Verification
```
┌─────────────────────────────────┐
│ [<] Verify Phone                │
├─────────────────────────────────┤
│                                 │
│         📱                      │
│                                 │
│    Verify Your Number           │
│                                 │
│  We sent a 6-digit code to      │
│      +27 81 234 5678            │
│                                 │
│   ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│   │ 1 │ │ 2 │ │ 3 │ │ 4 │      │
│   └───┘ └───┘ └───┘ └───┘      │
│                                 │
│     Resend code in 00:45        │
│                                 │
│  ┌─────────────────────────┐    │
│  │        Verify           │    │
│  └─────────────────────────┘    │
│                                 │
│     Wrong number? Change        │
│                                 │
└─────────────────────────────────┘
```

### 2. Home & Navigation

#### 2.1 Main Home Screen
```
┌─────────────────────────────────┐
│ Good morning, Sarah! ☀️         │
│ Cape Town, SA  🌡️22°C           │
├─────────────────────────────────┤
│                                 │
│ Your Credits: 12 💎             │
│ Next Class: Yoga in 2 hours     │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🧘‍♀️ Morning Yoga        │    │
│ │ Today 10:00 AM          │    │
│ │ FitLife Gym • Sarah J.  │    │
│ │ [View QR Code]          │    │
│ └─────────────────────────┘    │
│                                 │
│ Quick Actions                   │
│ ┌───────┐ ┌───────┐ ┌───────┐  │
│ │  📅   │ │  🏪   │ │  💎   │  │
│ │ Book  │ │Explore│ │Credits│  │
│ │Class  │ │ Gyms  │ │       │  │
│ └───────┘ └───────┘ └───────┘  │
│                                 │
│ Popular Near You                │
│ ┌─────────────────────────┐    │
│ │ 🏋️‍♂️ HIIT Blast         │    │
│ │ Iron Gym • 1.2km away   │    │
│ │ 6:00 PM • 3 spots left  │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🤸‍♀️ Pilates Flow       │    │
│ │ Zen Studio • 2.1km away │    │
│ │ 7:30 PM • 8 spots left  │    │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
│🏠  🔍  📅  👤                   │
```

#### 2.2 Bottom Navigation
```
┌─────────────────────────────────┐
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│ │ 🏠  │ │ 🔍  │ │ 📅  │ │ 👤  │ │
│ │Home │ │Find │ │Book │ │More │ │
│ └─────┘ └─────┘ └─────┘ └─────┘ │
└─────────────────────────────────┘
```

### 3. Marketplace & Discovery

#### 3.1 Gym Discovery Map
```
┌─────────────────────────────────┐
│ [<] Explore Gyms    [🔧] [📍]  │
├─────────────────────────────────┤
│                                 │
│          🗺️ MAP VIEW             │
│                                 │
│    📍      📍         📍        │
│      FitLife   📍 Iron Gym      │
│           Zen Studio            │
│                                 │
│        📍 You are here          │
│              📍                 │
│          PowerHouse             │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🏋️ Iron Gym            │    │
│ │ ⭐ 4.8 • 1.2km away     │    │
│ │ "Best HIIT classes"     │    │
│ │ 5 classes today →       │    │
│ └─────────────────────────┘    │
│                                 │
│ [List View] [Map View]          │
│                                 │
└─────────────────────────────────┘
```

#### 3.2 Gym Details
```
┌─────────────────────────────────┐
│ [<] Iron Gym             [♡] [📤] │
├─────────────────────────────────┤
│                                 │
│     [Hero Image of Gym]         │
│                                 │
│ ┌─────────────────────────┐    │
│ │ Iron Gym                │    │
│ │ ⭐ 4.8 (127 reviews)    │    │
│ │ 📍 1.2km • Sea Point    │    │
│ │ 🕐 5:30 AM - 10:00 PM   │    │
│ └─────────────────────────┘    │
│                                 │
│ 🏋️ Strength • 🤸‍♀️ Functional  │
│ 🧘‍♀️ Yoga • 🥊 Boxing          │
│                                 │
│ ✨ Amenities                    │
│ 🚿 Showers • 🏃‍♂️ Treadmills    │
│ 🅿️ Parking • 📶 WiFi          │
│                                 │
│ Today's Classes                 │
│ ┌─────────────────────────┐    │
│ │ 🏋️ HIIT Blast          │    │
│ │ 6:00 PM • Advanced      │    │
│ │ with Mike T. • 3 spots  │    │
│ │ 2 credits              │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🧘‍♀️ Evening Flow       │    │
│ │ 7:30 PM • All levels    │    │
│ │ with Anna K. • 8 spots  │    │
│ │ 1 credit               │    │
│ └─────────────────────────┘    │
│                                 │
│     [View All Classes]          │
│                                 │
└─────────────────────────────────┘
```

### 4. Booking Flow

#### 4.1 Class Details
```
┌─────────────────────────────────┐
│ [<] HIIT Blast                  │
├─────────────────────────────────┤
│                                 │
│   [Class/Instructor Photo]      │
│                                 │
│ HIIT Blast 🏋️‍♂️                │
│ High-intensity interval         │
│ training for all fitness levels │
│                                 │
│ 📅 Today, March 15              │
│ 🕕 6:00 PM - 7:00 PM (60 min)  │
│ 📍 Iron Gym, Sea Point          │
│ 👨‍🏫 Mike Thompson              │
│ 🎯 Advanced Level               │
│                                 │
│ 💎 2 Credits Required           │
│ 👥 3 of 20 spots left           │
│                                 │
│ What you'll need:               │
│ • Water bottle                  │
│ • Towel                         │
│ • Athletic shoes                │
│                                 │
│ Class Description:              │
│ Push your limits in this       │
│ high-energy workout combining   │
│ strength and cardio...          │
│                                 │
│ ⭐ 4.9 (23 reviews)            │
│ "Amazing workout!" - Sarah      │
│ "Mike is the best!" - John     │
│                                 │
│ ┌─────────────────────────┐    │
│ │     Book This Class     │    │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### 4.2 Booking Confirmation
```
┌─────────────────────────────────┐
│ [<] Confirm Booking             │
├─────────────────────────────────┤
│                                 │
│           ✅                    │
│                                 │
│     Almost there!               │
│                                 │
│ ┌─────────────────────────┐    │
│ │ HIIT Blast              │    │
│ │ Today 6:00 PM           │    │
│ │ Iron Gym                │    │
│ │ Mike Thompson           │    │
│ └─────────────────────────┘    │
│                                 │
│ Cost Breakdown:                 │
│ Class cost      2 credits       │
│ Booking fee     Free            │
│ ─────────────────────────       │
│ Total           2 credits       │
│                                 │
│ Your balance: 12 → 10 credits   │
│                                 │
│ Cancellation Policy:            │
│ Free cancellation up to        │
│ 24 hours before class           │
│                                 │
│ ☑ I agree to the terms         │
│                                 │
│ ┌─────────────────────────┐    │
│ │    Confirm Booking      │    │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### 4.3 Booking Success
```
┌─────────────────────────────────┐
│            [X]                  │
├─────────────────────────────────┤
│                                 │
│            🎉                   │
│                                 │
│      You're booked!             │
│                                 │
│ ┌─────────────────────────┐    │
│ │ HIIT Blast              │    │
│ │ Today 6:00 PM           │    │
│ │ Iron Gym, Sea Point     │    │
│ │                         │    │
│ │    [QR Code Display]    │    │
│ │                         │    │
│ │ Show this QR code at    │    │
│ │ check-in                │    │
│ └─────────────────────────┘    │
│                                 │
│ What's next?                    │
│ • Get directions to gym         │
│ • Set class reminder            │
│ • Invite friends to join        │
│                                 │
│ ┌─────────────────────────┐    │
│ │    View Directions      │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │     Add to Calendar     │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │      Share Class        │    │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

### 5. User Profile & Settings

#### 5.1 Profile Screen
```
┌─────────────────────────────────┐
│ Profile                  [⚙️]   │
├─────────────────────────────────┤
│                                 │
│        [Profile Photo]          │
│                                 │
│       Sarah Johnson             │
│    sarah.j@email.com            │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 💎 12 Credits Available │    │
│ │ [Buy More Credits]      │    │
│ └─────────────────────────┘    │
│                                 │
│ This Month                      │
│ 🏃‍♀️ 8 Classes Attended        │
│ 🔥 4 Week Streak               │
│ ⭐ Favorite: Yoga Classes       │
│                                 │
│ Quick Actions                   │
│ ┌─────────────────────────┐    │
│ │ 📅 My Bookings          │ >  │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ ♡ Favorite Gyms         │ >  │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ 💳 Payment Methods      │ >  │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ 🔔 Notifications        │ >  │
│ └─────────────────────────┘    │
│ ┌─────────────────────────┐    │
│ │ 🆘 Help & Support       │ >  │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### 5.2 My Bookings
```
┌─────────────────────────────────┐
│ [<] My Bookings                 │
├─────────────────────────────────┤
│                                 │
│ [Upcoming] [Past] [Cancelled]   │
│                                 │
│ Today                           │
│ ┌─────────────────────────┐    │
│ │ 🧘‍♀️ Morning Yoga        │    │
│ │ 10:00 AM • FitLife Gym  │    │
│ │ ✅ Checked In           │    │
│ │ [View QR] [Rate Class]  │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 🏋️‍♂️ HIIT Blast         │    │
│ │ 6:00 PM • Iron Gym      │    │
│ │ 📍 Show QR to check in  │    │
│ │ [View QR] [Cancel]      │    │
│ └─────────────────────────┘    │
│                                 │
│ Tomorrow                        │
│ ┌─────────────────────────┐    │
│ │ 🤸‍♀️ Pilates Flow       │    │
│ │ 7:30 PM • Zen Studio    │    │
│ │ ⏰ Reminder set         │    │
│ │ [View Details] [Cancel] │    │
│ └─────────────────────────┘    │
│                                 │
│ This Week                       │
│ ┌─────────────────────────┐    │
│ │ 🥊 Boxing Basics        │    │
│ │ Fri 6:00 PM • FightClub │    │
│ │ [View Details] [Cancel] │    │
│ └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## Web Dashboard Mockups (Gym Owners)

### 1. Gym Dashboard Overview

#### 1.1 Main Dashboard
```
┌─────────────────────────────────────────────────────────────────────┐
│ StudioLoop Dashboard                              Sarah | Iron Gym ▼ │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Overview • Today, March 15, 2024                                   │
│                                                                     │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ │
│ │ Today's      │ │ This Week    │ │ Credits      │ │ Revenue     │ │
│ │ Bookings     │ │ Attendance   │ │ Sold         │ │ (This Week) │ │
│ │              │ │              │ │              │ │             │ │
│ │     23       │ │     89%      │ │     156      │ │   R4,850    │ │
│ │   +3 from    │ │   +2% from   │ │   +12 from   │ │  +R680 from │ │
│ │  yesterday   │ │  last week   │ │  last week   │ │  last week  │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └─────────────┘ │
│                                                                     │
│ Today's Schedule                     Quick Actions                  │
│ ┌─────────────────────────────────┐ ┌────────────────────────────┐  │
│ │ 🧘‍♀️ Morning Yoga               │ │ ➕ Schedule New Class      │  │
│ │ 10:00 AM • 12/15 booked        │ │ 👥 Manage Members          │  │
│ │ Sarah Johnson                   │ │ 📊 View Analytics          │  │
│ │ [Check Attendance] [Edit]       │ │ 💰 Process Payments        │  │
│ │                                 │ │ 📧 Send Announcement       │  │
│ │ 🏋️‍♂️ HIIT Blast                │ └────────────────────────────┘  │
│ │ 6:00 PM • 17/20 booked         │                                 │
│ │ Mike Thompson                   │                                 │
│ │ [Check Attendance] [Edit]       │                                 │
│ │                                 │                                 │
│ │ 🤸‍♀️ Evening Pilates            │                                 │
│ │ 7:30 PM • 8/15 booked          │                                 │
│ │ Anna Klein                      │                                 │
│ │ [Check Attendance] [Edit]       │                                 │
│ └─────────────────────────────────┘                                 │
│                                                                     │
│ Recent Activity                                                     │
│ • John Smith booked HIIT Blast for tonight                        │
│ • Lisa Brown cancelled Morning Yoga                                │
│ • Mike Thompson updated his availability                           │
│ • New member registration: Emma Wilson                             │
│                                                                     │
│ [📋 Classes] [👥 Members] [📊 Analytics] [⚙️ Settings]             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2. Class Management

#### 2.1 Class Schedule View
```
┌─────────────────────────────────────────────────────────────────────┐
│ [<] Class Schedule • Week of March 11-17, 2024        [+ New Class] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ [< Prev Week] [This Week] [Next Week >]                           │
│                                                                     │
│ ┌─────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐ │
│ │Time │ Mon 11  │ Tue 12  │ Wed 13  │ Thu 14  │ Fri 15  │ Sat 16  │ │
│ ├─────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤ │
│ │6:00 │ 🧘‍♀️ Yoga│ 🏃‍♂️ Run │ 🧘‍♀️ Yoga│ 🏃‍♂️ Run │ 🧘‍♀️ Yoga│ 🏋️‍♂️ HIIT│ │
│ │AM   │ Sarah J │ Club    │ Sarah J │ Club    │ Sarah J │ Mike T  │ │
│ │     │ 12/15   │ 8/12    │ 14/15   │ 6/12    │ 10/15   │ 18/20   │ │
│ ├─────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤ │
│ │10:00│ 🤸‍♀️ Pil │         │ 🤸‍♀️ Pil │         │ 🤸‍♀️ Pil │ 🥊 Box  │ │
│ │AM   │ Anna K  │         │ Anna K  │         │ Anna K  │ Tom R   │ │
│ │     │ 8/15    │         │ 12/15   │         │ 9/15    │ 10/12   │ │
│ ├─────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤ │
│ │6:00 │ 🏋️‍♂️ HIIT│ 🥊 Box  │ 🏋️‍♂️ HIIT│ 🥊 Box  │ 🏋️‍♂️ HIIT│         │ │
│ │PM   │ Mike T  │ Tom R   │ Mike T  │ Tom R   │ Mike T  │         │ │
│ │     │ 17/20   │ 9/12    │ 19/20   │ 11/12   │ 15/20   │         │ │
│ ├─────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤ │
│ │7:30 │ 🧘‍♀️ Flow│         │ 🧘‍♀️ Flow│         │ 🧘‍♀️ Flow│ 🤸‍♀️ Pil │ │
│ │PM   │ Sarah J │         │ Sarah J │         │ Sarah J │ Anna K  │ │
│ │     │ 8/15    │         │ 11/15   │         │ 6/15    │ 13/15   │ │
│ └─────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘ │
│                                                                     │
│ Legend: Class Name | Instructor | Booked/Capacity                   │
│ ✅ Confirmed | ⚠️ Low bookings | 🔴 Cancelled                       │
│                                                                     │
│ [📋 List View] [📅 Calendar View] [📊 Analytics View]              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3. Member Management

#### 3.1 Members List
```
┌─────────────────────────────────────────────────────────────────────┐
│ [<] Members (247 total)                        [🔍 Search] [+ Add]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ [All Members] [Active] [Inactive] [New This Month]                  │
│                                                                     │
│ ┌─── Name ────────┬─ Status ──┬── Credits ──┬─ Last Visit ─┬─────────┐ │
│ │ 👤 Sarah Johnson │ ✅ Active  │ 12 credits  │ Today       │ [View]  │ │
│ │ sarahj@email.com │ Premium   │ Auto-renew  │ 10:00 AM    │ [Edit]  │ │
│ ├─────────────────┼───────────┼─────────────┼─────────────┼─────────┤ │
│ │ 👤 Mike Chen     │ ✅ Active  │ 5 credits   │ Yesterday   │ [View]  │ │
│ │ mchen@email.com  │ Essential │ One-time    │ 6:00 PM     │ [Edit]  │ │
│ ├─────────────────┼───────────┼─────────────┼─────────────┼─────────┤ │
│ │ 👤 Lisa Brown    │ ⚠️ Inactive │ 0 credits   │ 1 week ago  │ [View]  │ │
│ │ lisa.b@email.com │ Expired   │ Expired     │ Morning     │ [Edit]  │ │
│ ├─────────────────┼───────────┼─────────────┼─────────────┼─────────┤ │
│ │ 👤 John Smith    │ ✅ Active  │ 8 credits   │ 2 days ago  │ [View]  │ │
│ │ john.s@email.com │ Premium   │ Auto-renew  │ 7:30 PM     │ [Edit]  │ │
│ ├─────────────────┼───────────┼─────────────┼─────────────┼─────────┤ │
│ │ 👤 Emma Wilson   │ 🆕 New     │ 3 credits   │ Never       │ [View]  │ │
│ │ emma.w@email.com │ Trial     │ Welcome     │ -           │ [Edit]  │ │
│ └─────────────────┴───────────┴─────────────┴─────────────┴─────────┘ │
│                                                                     │
│ Bulk Actions: [📧 Send Email] [💎 Add Credits] [📤 Export CSV]     │
│                                                                     │
│ Showing 1-5 of 247 members          [1] [2] [3] ... [50] [Next >]  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #FF6B35 0%, #FF8A35 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: #004AAD;
  border: 2px solid #004AAD;
  border-radius: 8px;
  padding: 14px 24px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #004AAD;
  color: white;
}
```

### Cards

#### Class Card
```css
.class-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #FF6B35;
  transition: all 0.2s ease;
}

.class-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.class-card .title {
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 4px;
}

.class-card .subtitle {
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
}

.class-card .meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #666666;
}
```

### Input Fields

#### Text Input
```css
.input-field {
  width: 100%;
  padding: 16px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;
}

.input-field:focus {
  border-color: #FF6B35;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input-field.error {
  border-color: #FF4444;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
  display: block;
}
```

### Status Badges

#### Status Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.success {
  background: rgba(0, 200, 81, 0.1);
  color: #00C851;
}

.badge.warning {
  background: rgba(255, 136, 0, 0.1);
  color: #FF8800;
}

.badge.error {
  background: rgba(255, 68, 68, 0.1);
  color: #FF4444;
}

.badge.info {
  background: rgba(0, 153, 204, 0.1);
  color: #0099CC;
}
```

---

## Mobile-First Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
.container {
  padding: 16px;
  max-width: 100%;
}

/* Small tablets */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
  }
}

/* Large screens */
@media (min-width: 1440px) {
  .container {
    max-width: 1440px;
  }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
  .grid.cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid.cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid.cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## Accessibility Guidelines

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have 3:1 contrast minimum
- Focus states are clearly visible

### Touch Targets
- Minimum 44px touch targets for mobile
- Adequate spacing between interactive elements
- Large enough tap areas for fat finger navigation

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- ARIA labels where needed

### Keyboard Navigation
- All interactive elements accessible via keyboard
- Logical tab order
- Clear focus indicators
- Skip links for main content

---

## Development Notes

### Implementation Priority
1. **Phase 1**: Authentication & Core Navigation
2. **Phase 2**: Booking Flow & Class Display
3. **Phase 3**: Profile & Settings
4. **Phase 4**: Gym Dashboard
5. **Phase 5**: Polish & Optimization

### Performance Considerations
- Use React Native's FlatList for long lists
- Implement image lazy loading
- Cache frequently accessed data
- Optimize bundle size with code splitting

### Testing Strategy
- Component tests for all UI components
- Visual regression tests for key screens
- Accessibility testing with screen readers
- Cross-device testing (iOS/Android)

This comprehensive UI design system provides everything needed to build a consistent, accessible, and engaging user experience for StudioLoop's dual-platform fitness booking system.