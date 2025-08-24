# StudioLoop Interactive Prototype Specifications

## Overview

This document provides detailed specifications for creating interactive prototypes of the StudioLoop mobile app and web dashboard. Each interaction is described with triggers, animations, and state changes.

---

## Mobile App Interaction Flows

### 1. Onboarding & Authentication Flow

#### Flow: Welcome → Registration → Verification → Home

**Screen 1: Welcome Screen**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Trigger: App Launch             │
│                                 │
│ SIMPLIFIED ANIMATION:           │
│ All elements fade-in together   │
│ Duration: 0.6s                  │
│ Opacity: 0 → 1                 │
│ No transforms or staggering     │
│                                 │
│ FALLBACK: Elements visible by   │
│ default with opacity: 1         │
│                                 │
│ CRITICAL: Elements must ALWAYS  │
│ remain visible - no complex     │
│ animations that can fail        │
└─────────────────────────────────┘

CSS Implementation:
.welcome-screen * {
  opacity: 1 !important;
  visibility: visible !important;
  animation: simpleFadeIn 0.6s ease-out;
}

@keyframes simpleFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

Button Interactions:
• "Continue with Phone Number" → Navigate to Phone Verification
  - Animation: Button press scale (0.95) - optional
  - Transition: Slide left (0.3s ease-out)
  
• "Sign In" → Navigate to Login
  - Animation: Simple fade transition (0.2s)
```

**Screen 2: Registration Screen**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Input Field Behaviors:          │
│ • Focus: Border color change    │
│   #E0E0E0 → #FF6B35            │
│ • Validation: Real-time check   │
│   ✓ Green check for valid      │
│   ✗ Red X for invalid          │
│                                 │
│ Password Field:                 │
│ • Show/Hide toggle button       │
│ • Strength indicator bar        │
│   Red → Yellow → Green          │
└─────────────────────────────────┘

Form Validation:
• Email: Check format on blur
• Phone: Auto-format (+27 xx xxx xxxx)
• Password: Min 8 chars, show strength
• Terms: Must check to enable button

"Create Account" Button:
• Disabled state: Gray, no interaction
• Enabled: Orange gradient, haptic feedback
• Loading state: Spinner + "Creating..."
• Success: → Navigate to Phone Verification
• Error: Show error message + shake animation
```

**Screen 3: Phone Verification**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ OTP Input Behavior:             │
│ • Auto-focus first input        │
│ • Auto-advance on digit entry   │
│ • Auto-submit when complete     │
│ • Shake animation on wrong code │
│                                 │
│ Countdown Timer:                │
│ • 45 second countdown           │
│ • Color change at 10s (red)     │
│ • Enable "Resend" when 00:00    │
└─────────────────────────────────┘

States:
• Entering: Blue border on active input
• Correct: Green check animation → Home
• Incorrect: Red shake + error message
• Resend: Show success toast "Code sent!"
```

### 2. Core Booking Flow

#### Flow: Home → Class Discovery → Class Details → Booking → Success

**Screen 1: Home Screen**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Pull-to-Refresh:                │
│ • Pull down gesture             │
│ • Loading spinner animation     │
│ • Refresh data and fade-in      │
│                                 │
│ Quick Action Cards:             │
│ • Tap: Scale down (0.95)        │
│ • Release: Scale up + navigate  │
│                                 │
│ Class Cards (Recommended):      │
│ • Horizontal scroll             │
│ • Snap to card boundaries       │
│ • Parallax effect on scroll     │
└─────────────────────────────────┘

Card Interactions:
• "Book Class" button on card
  - Immediate: Navigate to Class Details
  - Animation: Card lift + slide transition

• "View QR Code" (for booked classes)
  - Action: Open QR modal overlay
  - Animation: Modal slide-up from bottom
```

**Screen 2: Class Details**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Header Image:                   │
│ • Parallax scroll effect        │
│ • Fade overlay on scroll        │
│                                 │
│ Content Sections:               │
│ • Expandable "Description"      │
│ • Reviews carousel (swipeable)  │
│                                 │
│ Bottom Action:                  │
│ • Sticky "Book Class" button    │
│ • Price/credits always visible  │
└─────────────────────────────────┘

Book Button States:
• Available: Orange gradient
• Full Class: Gray + "Join Waitlist"
• Insufficient Credits: Orange + "Buy Credits"
• Already Booked: Green + "View Booking"

Interactions:
• Scroll: Parallax image, sticky button
• Book button: → Navigate to Confirmation
• Join Waitlist: → Waitlist confirmation modal
• Buy Credits: → Credits purchase modal
```

**Screen 3: Booking Confirmation**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Cost Breakdown:                 │
│ • Animated counter showing      │
│   credit deduction              │
│                                 │
│ Confirm Button:                 │
│ • Disable during processing     │
│ • Loading spinner overlay       │
│ • Success animation sequence    │
└─────────────────────────────────┘

Confirmation Flow:
1. Tap "Confirm Booking"
2. Button loading state (2-3s simulation)
3. Success animation:
   - Checkmark expand animation
   - Confetti particle effect
   - Card details slide-in
4. Navigate to Success screen
```

**Screen 4: Booking Success**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Entry Animation:                │
│ • Confetti animation (2s)       │
│ • Success icon bounce-in        │
│ • Card slide-up from bottom     │
│                                 │
│ QR Code:                        │
│ • Auto-generate and display     │
│ • Tap to enlarge (modal)        │
│ • Brightness auto-adjust        │
│                                 │
│ Action Buttons:                 │
│ • "Add to Calendar" → OS cal    │
│ • "Get Directions" → Maps app   │
│ • "Share" → OS share sheet      │
└─────────────────────────────────┘
```

### 3. Marketplace Discovery Flow

#### Flow: Home → Explore → Gym Details → Book Cross-Gym Class

**Screen 1: Marketplace Map View**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Map Gestures:                   │
│ • Pinch to zoom                 │
│ • Pan to explore area           │
│ • Tap marker → Gym preview      │
│                                 │
│ Gym Markers:                    │
│ • Cluster when zoomed out       │
│ • Individual pins when close    │
│ • Color coding by rating        │
│   Green: 4.5+ stars            │
│   Yellow: 3.5-4.4 stars        │
│   Red: <3.5 stars              │
│                                 │
│ Bottom Card (Gym Preview):      │
│ • Swipe up → Full gym details   │
│ • Swipe horizontally → Next gym │
└─────────────────────────────────┘

Filter Interactions:
• Filter button (top right)
  - Slide-down filter panel
  - Multi-select options
  - Apply button updates map
  
• Search bar
  - Auto-suggest gym names
  - Live search results
```

**Screen 2: Gym Details (Marketplace)**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Image Gallery:                  │
│ • Horizontal carousel           │
│ • Page indicators               │
│ • Tap to fullscreen lightbox    │
│                                 │
│ Class List:                     │
│ • Today/Tomorrow toggle         │
│ • Filter by class type          │
│ • Sort by time/popularity       │
│                                 │
│ Booking as Non-Member:          │
│ • "Drop-in Rate" highlighted    │
│ • "First time? Here's what      │
│   to expect" expandable         │
└─────────────────────────────────┘

Special Interactions:
• "Get Directions" → Maps integration
• "Call Gym" → Phone app
• "Save to Favorites" → Heart animation
• Class booking → Enhanced confirmation
  (includes gym details, first-timer tips)
```

### 4. Profile & Settings Flow

**Screen 1: Profile Dashboard**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ Header Section:                 │
│ • Profile photo tap → Camera    │
│   options (Camera/Gallery)      │
│ • Edit profile → Form modal     │
│                                 │
│ Credits Section:                │
│ • Animated credit counter       │
│ • "Buy More" → Purchase flow    │
│ • Auto-refresh on app resume    │
│                                 │
│ Stats Cards:                    │
│ • Tap to expand with details    │
│ • Swipe for additional metrics  │
│                                 │
│ Menu Items:                     │
│ • Chevron animation on tap      │
│ • Slide transition to subpage   │
└─────────────────────────────────┘
```

### 5. QR Check-in Flow

**Screen 1: QR Code Display**
```
INTERACTIONS:
┌─────────────────────────────────┐
│ QR Code Generation:             │
│ • Fade-in animation on load     │
│ • Auto-brightness adjustment    │
│ • Refresh every 60 seconds      │
│                                 │
│ Screen Behaviors:               │
│ • Keep screen awake while open  │
│ • Max brightness override       │
│ • Disable rotation lock         │
│                                 │
│ Scan Instructions:              │
│ • Pulsing animation on border   │
│ • "Ready to scan" indicator     │
│                                 │
│ Fallback Options:               │
│ • Manual code entry button     │
│ • "Having trouble?" help link   │
└─────────────────────────────────┘

States:
• Valid: Green border pulse
• Expiring: Yellow border (5 min warning)
• Expired: Red border + "Refresh" button
• Scanned: Green checkmark animation
```

---

## Web Dashboard Interactions

### 1. Gym Owner Dashboard

**Main Dashboard**
```
INTERACTIONS:
┌─────────────────────────────────────────────┐
│ Real-time Updates:                          │
│ • Live booking notifications (toast)        │
│ • Auto-refresh every 30 seconds             │
│ • Pulse animation on new bookings           │
│                                             │
│ KPI Cards:                                  │
│ • Hover: Lift shadow effect                 │
│ • Click: Drill-down to detailed view        │
│ • Animated counters on load                 │
│                                             │
│ Today's Schedule:                           │
│ • Drag-and-drop to reschedule               │
│ • Right-click context menu                  │
│ • Color coding by booking status:           │
│   Green: Well booked (>75%)                 │
│   Yellow: Medium (50-75%)                   │
│   Red: Low bookings (<50%)                  │
│                                             │
│ Quick Actions Sidebar:                      │
│ • Button hover effects                      │
│ • Modal overlays for quick tasks            │
│ • Keyboard shortcuts (+ key shortcuts)     │
└─────────────────────────────────────────────┘
```

### 2. Class Schedule Management

**Weekly Calendar View**
```
INTERACTIONS:
┌─────────────────────────────────────────────┐
│ Calendar Navigation:                        │
│ • Week navigation arrows                    │
│ • Date picker dropdown                      │
│ • Keyboard arrows (left/right)              │
│                                             │
│ Class Slots:                               │
│ • Hover: Show booking details tooltip       │
│ • Click: Open class management modal        │
│ • Drag: Move to different time slot         │
│ • Double-click: Quick edit mode             │
│                                             │
│ Booking Status Colors:                     │
│ • Green: >80% booked                        │
│ • Yellow: 50-80% booked                     │
│ • Orange: 25-50% booked                     │
│ • Red: <25% booked                          │
│ • Gray: Cancelled                           │
│                                             │
│ Bulk Actions:                              │
│ • Multi-select with Ctrl+click             │
│ • Bulk edit modal                           │
│ • Copy/paste classes across days           │
└─────────────────────────────────────────────┘

Context Menus:
• Right-click on class slot:
  - Edit Class Details
  - Cancel Class
  - Duplicate to Other Days
  - View Attendee List
  - Send Class Reminder

• Right-click on empty slot:
  - Schedule New Class
  - Block Time Slot
  - Copy From Template
```

### 3. Member Management

**Member List Table**
```
INTERACTIONS:
┌─────────────────────────────────────────────┐
│ Table Features:                             │
│ • Sortable columns (click header)           │
│ • Resizable columns (drag borders)          │
│ • Sticky header on scroll                   │
│                                             │
│ Row Interactions:                           │
│ • Hover: Highlight row                      │
│ • Click: Expand member details              │
│ • Double-click: Open edit modal             │
│ • Right-click: Context menu                 │
│                                             │
│ Bulk Selection:                            │
│ • Checkbox column                           │
│ • Shift+click for range selection           │
│ • Ctrl+A for select all                     │
│                                             │
│ Filters & Search:                          │
│ • Real-time search (debounced)              │
│ • Multi-select filter dropdowns             │
│ • Advanced filter builder                   │
│ • Save filter presets                       │
└─────────────────────────────────────────────┘

Member Actions:
• Quick Actions (hover buttons):
  - Send Message
  - Add Credits  
  - View Booking History
  - Mark as Inactive

• Bulk Actions Bar (when items selected):
  - Send Bulk Email
  - Export Selected
  - Add Credits to All
  - Change Status
```

---

## Animation Specifications

### Transition Timing Functions

```css
/* Standard Easing */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Durations */
--duration-fast: 0.15s;      /* Micro-interactions */
--duration-normal: 0.25s;    /* Standard transitions */
--duration-slow: 0.4s;       /* Page transitions */
--duration-slower: 0.6s;     /* Complex animations */
```

### Micro-interactions

**Button Press Animation**
```
1. Press: Scale to 0.95 (0.1s ease-out)
2. Release: Scale to 1.0 (0.15s ease-out-back)
3. Success: Brief glow effect (0.3s)
```

**Card Hover Effects**
```
1. Hover: 
   - Lift: translateY(-4px) + shadow increase
   - Duration: 0.2s ease-out-quart
2. Leave: Return to normal (0.3s ease-out)
```

**Loading States**
```
1. Spinner: 360° rotation (1s linear infinite)
2. Skeleton: Shimmer effect (1.5s ease-in-out infinite)
3. Progress bar: Width animation (0.3s ease-out)
```

### Page Transitions

**Mobile Navigation**
```
Forward: Slide left (0.3s ease-out-quart)
Back: Slide right (0.25s ease-out)
Modal: Slide up from bottom (0.4s ease-out-back)
```

**Desktop Navigation**  
```
Page change: Fade transition (0.2s ease-in-out)
Modal: Scale from 0.9 to 1.0 + fade (0.3s ease-out-back)
Dropdown: Slide down + fade (0.15s ease-out)
```

---

## State Management Specifications

### Loading States

**Data Loading Hierarchy**
```
1. Skeleton Screen (immediate)
   - Show layout structure
   - Shimmer animation on placeholders
   
2. Progressive Loading (as data arrives)
   - Critical content first
   - Secondary content fades in
   - Images lazy load with blur-to-sharp
   
3. Error States (if loading fails)
   - Friendly error messages
   - Retry button with exponential backoff
   - Offline mode indicators
```

### Form Validation States

**Real-time Validation**
```
1. Pristine (untouched)
   - Default styling
   - No validation messages
   
2. Touched + Invalid
   - Red border color
   - Error icon
   - Error message below field
   - Shake animation on submit attempt
   
3. Valid
   - Green border color
   - Checkmark icon
   - Success confirmation
   
4. Loading (async validation)
   - Spinner in field
   - Disabled state
```

### Connection States

**Network Status Indicators**
```
Online:
- No indicator (default state)
- Real-time sync badges

Offline:
- Persistent banner at top
- "Offline Mode" indicator
- Disabled network-dependent features
- Queue actions for when back online

Slow Connection:
- Loading indicators
- Reduced image quality
- Simplified animations
```

---

## Responsive Behavior Specifications

### Mobile Breakpoints

**Portrait Mode (320px - 480px)**
```
Navigation: Bottom tab bar
Cards: Single column, full width
Typography: Larger sizes for readability
Touch targets: Minimum 44px
Spacing: Increased for thumb navigation
```

**Landscape Mode (Mobile)**
```
Navigation: Side rail (collapsed)
Cards: Two columns where space allows
Header: Compressed height
Keyboard: Adjust viewport for input focus
```

### Tablet Adaptations

**iPad (768px - 1024px)**
```
Navigation: Side rail + top bar hybrid
Cards: 2-3 columns depending on content
Modals: Center overlay (not full screen)
Gestures: Support for trackpad scrolling
```

### Desktop Scaling

**Small Desktop (1024px - 1440px)**
```
Navigation: Full sidebar + top navigation
Content: Max-width containers
Cards: 3-4 columns
Hover states: Full implementation
Keyboard shortcuts: Complete set
```

**Large Desktop (1440px+)**
```
Content: Centered with max-width
Increased padding and spacing
Larger imagery and cards
Multi-column layouts where appropriate
```

---

## Accessibility Interaction Specs

### Keyboard Navigation

**Tab Order Priority**
```
1. Skip links (hidden until focused)
2. Primary navigation
3. Main content actions
4. Secondary content
5. Footer navigation
```

**Keyboard Shortcuts**
```
Global:
- Tab: Next focusable element  
- Shift+Tab: Previous element
- Enter/Space: Activate button/link
- Escape: Close modal/dropdown

App-specific:
- Ctrl+K: Open search
- B: Book class (on class details)
- N: New booking (dashboard)
- /: Focus search bar
```

### Screen Reader Support

**Announcement Priorities**
```
Critical: Booking confirmations, errors
Important: Navigation changes, form validation  
Informative: Loading states, optional updates
```

**ARIA Live Regions**
```
aria-live="assertive": Error messages, critical updates
aria-live="polite": Status updates, form validation
aria-describedby: Form help text, error descriptions
```

### Touch Accessibility

**High Contrast Mode Support**
```
- Increased border weights
- Higher contrast color ratios
- Reduced reliance on color alone
- Clear focus indicators
```

**Large Text Support**
```
- Scalable font sizes (up to 200%)
- Flexible layouts that adapt
- Readable line heights
- Adequate color contrast at all sizes
```

---

## Performance Specifications

### Animation Performance

**60 FPS Target**
```
- Use transform and opacity for animations
- Avoid animating layout properties
- Use will-change sparingly
- Implement frame dropping for low-end devices
```

**Reduced Motion Support**
```
@media (prefers-reduced-motion: reduce) {
  - Disable non-essential animations
  - Replace with instant state changes
  - Maintain functional animations only
}
```

### Loading Performance

**Critical Path Optimization**
```
1. Above-fold content loads first
2. Progressive enhancement for interactions
3. Lazy load below-fold content
4. Prefetch likely next actions
```

**Perceived Performance**
```
- Skeleton screens for instant loading feel
- Progressive image loading (blur → sharp)
- Optimistic UI updates
- Immediate feedback on all interactions
```

This comprehensive interaction specification provides everything needed to create engaging, accessible, and performant prototypes that accurately represent the final StudioLoop experience.