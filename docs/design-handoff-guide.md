# StudioLoop Design Handoff Guide

## Executive Summary

This document provides everything a visual designer needs to create high-fidelity Figma prototypes and a development team needs to implement the StudioLoop mobile app and web dashboard. All specifications are production-ready and follow modern design and accessibility standards.

---

## 📁 Design Asset Requirements

### Required Deliverables

**Phase 1: Mobile App (Priority 1)**
```
1. Authentication Flow (3 screens)
   - Welcome screen
   - Registration form
   - Phone verification

2. Core User Journey (8 screens)
   - Home dashboard
   - Marketplace discovery (map + list)
   - Gym details page
   - Class details page
   - Booking confirmation
   - Booking success with QR
   - User profile
   - My bookings list

3. Settings & Configuration (5 screens)
   - Main settings menu
   - Notification preferences
   - Privacy settings
   - Payment methods
   - App appearance

4. Error & Edge Cases (8 screens)
   - Network errors
   - Booking failures
   - Payment errors
   - Empty states
   - Permission requests
```

**Phase 2: Web Dashboard (Priority 2)**
```
1. Gym Owner Dashboard (5 screens)
   - Main dashboard overview
   - Weekly class schedule
   - Member management table
   - Class management forms
   - Analytics reports

2. Responsive Variations
   - Mobile responsive (320px-768px)
   - Tablet responsive (768px-1024px)
   - Desktop optimized (1024px+)
```

---

## 🎨 Design System Implementation

### Brand Guidelines

#### Color Specifications
```
Primary Brand Colors:
- Orange: #FF6B35 (RGB: 255, 107, 53)
- Blue: #004AAD (RGB: 0, 74, 173)
- Green Success: #00C851 (RGB: 0, 200, 81)

Neutral Palette:
- Text Dark: #1A1A1A (RGB: 26, 26, 26)
- Text Medium: #666666 (RGB: 102, 102, 102)
- Text Light: #999999 (RGB: 153, 153, 153)
- Background: #F5F5F5 (RGB: 245, 245, 245)
- White: #FFFFFF (RGB: 255, 255, 255)

Status Colors:
- Success: #00C851 (RGB: 0, 200, 81)
- Warning: #FF8800 (RGB: 255, 136, 0)
- Error: #FF4444 (RGB: 255, 68, 68)
- Info: #0099CC (RGB: 0, 153, 204)

Color Usage Rules:
- Primary Orange: CTAs, active states, brand elements
- Primary Blue: Links, secondary actions, trust indicators
- Green: Success states, confirmations, positive metrics
- Never use red and green as the only differentiators
- Maintain 4.5:1 contrast ratio for all text
```

#### Typography System
```
Font Family: 
Primary: Inter (Google Fonts)
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

Heading Hierarchy:
H1 - Display: 32px, Weight: 700, Line-height: 40px
H2 - Large: 24px, Weight: 600, Line-height: 32px  
H3 - Medium: 20px, Weight: 600, Line-height: 28px
H4 - Small: 16px, Weight: 600, Line-height: 24px

Body Text:
Large: 16px, Weight: 400, Line-height: 24px
Regular: 14px, Weight: 400, Line-height: 20px
Small: 12px, Weight: 400, Line-height: 16px

Interactive:
Button: 16px, Weight: 600, Line-height: 24px
Link: 14px, Weight: 500, Line-height: 20px
Caption: 12px, Weight: 500, Line-height: 16px

Mobile Adjustments:
- Increase base font size by 10% on mobile
- Ensure minimum 14px for body text
- Add extra line spacing for readability
```

#### Spacing & Layout
```
Base Unit: 4px (all spacing should be multiples of 4)

Standard Spacing Scale:
XS: 4px   - Icon padding, fine details
SM: 8px   - Small element spacing
MD: 16px  - Standard element spacing
LG: 24px  - Section spacing
XL: 32px  - Large section spacing
2XL: 48px - Page section spacing

Grid System:
Mobile: 16px side margins
Tablet: 24px side margins
Desktop: 32px side margins, max-width: 1200px

Content Width Limits:
Text content: max 65 characters per line
Cards: min 280px, max 400px width
Full-width containers: 100% with above margins
```

#### Border Radius & Shadows
```
Border Radius:
Small: 4px - Input fields, small buttons
Medium: 8px - Cards, standard buttons  
Large: 12px - Modal dialogs, feature cards
XLarge: 16px - Profile photos, hero elements

Shadow Levels:
Level 1: 0 1px 3px rgba(0,0,0,0.1) - Subtle card lift
Level 2: 0 4px 12px rgba(0,0,0,0.1) - Standard cards
Level 3: 0 8px 24px rgba(0,0,0,0.12) - Modals, dropdowns
Level 4: 0 16px 32px rgba(0,0,0,0.16) - Overlays

Button Shadows:
Primary: 0 4px 12px rgba(255,107,53,0.3)
Secondary: 0 2px 8px rgba(0,0,0,0.1)
Hover: Increase shadow by 50%
```

---

## 🧩 Component Library

### Button Components

#### Primary Button
```
Default State:
- Background: Linear gradient 135deg, #FF6B35 0%, #FF8A35 100%
- Text: #FFFFFF, 16px, weight 600
- Padding: 16px horizontal, 12px vertical
- Border-radius: 8px
- Shadow: 0 4px 12px rgba(255,107,53,0.3)

Hover State:
- Transform: translateY(-2px)
- Shadow: 0 6px 16px rgba(255,107,53,0.4)
- Transition: all 0.2s ease-out

Active/Press State:
- Transform: translateY(0) scale(0.98)
- Transition: all 0.1s ease-out

Disabled State:
- Background: #CCCCCC
- Text: #999999
- Shadow: none
- Cursor: not-allowed

Loading State:
- Show spinner, hide text
- Disable interaction
- Maintain original dimensions
```

#### Secondary Button  
```
Default State:
- Background: #FFFFFF
- Text: #004AAD, 16px, weight 600
- Border: 2px solid #004AAD
- Padding: 14px horizontal, 10px vertical (account for border)
- Border-radius: 8px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)

Hover State:
- Background: #004AAD
- Text: #FFFFFF
- Transition: all 0.2s ease-out

Active/Press State:
- Transform: scale(0.98)
```

#### Icon Button
```
Specifications:
- Size: 44px x 44px (minimum touch target)
- Icon: 20px, centered
- Background: transparent or light gray
- Border-radius: 8px
- Hover: Background alpha 0.1

Usage:
- Navigation icons
- Action buttons in lists
- Modal close buttons
```

### Card Components

#### Class Card (Most Important)
```
Container:
- Background: #FFFFFF
- Border-radius: 12px
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Border-left: 4px solid #FF6B35
- Padding: 16px
- Min-height: 120px

Content Structure:
1. Header Row:
   - Class name (H3, #1A1A1A)
   - Status badge (right-aligned)

2. Meta Row:
   - Time & date (14px, #666666)
   - Instructor name (14px, #666666)

3. Details Row:
   - Duration & capacity (12px, #999999)
   - Credits required (12px, highlighted)

4. Action Row:
   - Primary CTA button
   - Secondary action (link style)

Hover State:
- Transform: translateY(-2px)
- Shadow: 0 8px 24px rgba(0,0,0,0.12)
- Transition: all 0.2s ease-out

Status Badges:
- Available: Green background, white text
- Full: Orange background, white text
- Cancelled: Red background, white text
```

#### Gym Card
```
Container:
- Background: #FFFFFF
- Border-radius: 12px  
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Overflow: hidden (for image)

Image Section:
- Height: 160px
- Object-fit: cover
- Aspect-ratio: 16:9

Content Section:
- Padding: 16px

Content Structure:
1. Header:
   - Gym name (H3, #1A1A1A)
   - Star rating + review count

2. Meta:
   - Distance + location
   - Class types offered

3. Footer:
   - "View Classes" button
   - Favorite/heart icon
```

### Form Components

#### Text Input
```
Default State:
- Border: 2px solid #E0E0E0
- Background: #FFFFFF
- Padding: 16px
- Border-radius: 8px
- Font: 16px regular
- Placeholder: #999999

Focus State:
- Border: 2px solid #FF6B35
- Shadow: 0 0 0 3px rgba(255,107,53,0.1)
- Outline: none

Error State:
- Border: 2px solid #FF4444
- Error message below in red
- Error icon in field

Success State:
- Border: 2px solid #00C851
- Success icon in field

Label Style:
- Font: 14px, weight 500
- Color: #1A1A1A
- Margin-bottom: 8px
```

#### Status Indicators
```
Badge Component:
- Padding: 4px 8px
- Border-radius: 12px (pill shape)
- Font: 12px, weight 500, uppercase
- Letter-spacing: 0.5px

Badge Variants:
Success: Background rgba(0,200,81,0.1), Text #00C851
Warning: Background rgba(255,136,0,0.1), Text #FF8800  
Error: Background rgba(255,68,68,0.1), Text #FF4444
Info: Background rgba(0,153,204,0.1), Text #0099CC
Neutral: Background rgba(102,102,102,0.1), Text #666666
```

---

## 📱 Mobile Design Specifications

### Screen Sizes & Breakpoints
```
Target Devices:
Primary: iPhone 12/13/14 (390px x 844px)
Secondary: iPhone SE (375px x 667px) 
Android: Samsung Galaxy S21 (384px x 854px)

Safe Areas:
- Top: 44px (status bar + notch)
- Bottom: 34px (home indicator)
- Sides: 16px minimum margin

Breakpoints:
Mobile Small: 320px - 374px
Mobile Medium: 375px - 413px  
Mobile Large: 414px+

Navigation:
- Tab bar height: 80px (includes safe area)
- Header height: 56px + safe area
- Back button: 44px touch target minimum
```

### Touch & Interaction
```
Minimum Touch Targets: 44px x 44px
Recommended: 48px x 48px for primary actions

Gesture Support:
- Pull-to-refresh on scrollable screens
- Swipe back navigation
- Long press for context menus
- Pinch-to-zoom on maps

Button States:
- Press: Scale 0.95, immediate feedback
- Release: Scale back to 1.0 with bounce
- Duration: 0.15s ease-out
```

### Typography for Mobile
```
Increase all font sizes by 10% from base:

H1: 35px (instead of 32px)
H2: 26px (instead of 24px)
Body Large: 18px (instead of 16px)
Body Regular: 15px (instead of 14px)
Minimum: 14px (never below this)

Line Height: Add 20% for better readability
Letter Spacing: Default (don't condense)
```

---

## 🖥️ Desktop Design Specifications

### Layout & Grid
```
Breakpoints:
Small Desktop: 1024px - 1439px
Large Desktop: 1440px+

Container Widths:
Small Desktop: 1024px max-width
Large Desktop: 1200px max-width, centered

Grid System:
12-column grid with 24px gutters
Sidebar: 280px fixed width
Main content: Flexible remaining space

Navigation:
- Header: 72px height
- Sidebar: Full height, collapsible
- Breadcrumbs: Show current path
```

### Responsive Behavior
```
Desktop to Tablet (768px - 1023px):
- Collapse sidebar to icons only
- Reduce font sizes by 10%
- Stack form elements
- Horizontal scroll for tables

Tablet to Mobile (<768px):
- Hide sidebar, show hamburger menu
- Full-width content
- Vertical card layouts
- Touch-optimized controls
```

---

## 🎯 Interactive Prototyping Guide

### Required Interactions

#### Critical User Flows (Must Include)
```
1. Registration & Login Flow
   - Form validation with real-time feedback
   - OTP input with auto-advance
   - Biometric setup flow

2. Core Booking Flow  
   - Class discovery and filtering
   - Booking confirmation with cost breakdown
   - Success state with QR code generation
   - Error handling for full classes

3. Profile Management
   - Edit profile with image upload
   - Credit purchase flow
   - Settings navigation

4. QR Check-in Process
   - QR code display with brightness adjustment
   - Scan simulation or manual entry
   - Success confirmation
```

#### Micro-interactions (Include if Time Permits)
```
- Button press animations
- Card hover effects
- Loading states with skeletons
- Form field focus states
- Tab transitions
- Modal animations
```

### Animation Specifications
```
Timing Functions:
- Ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)
- Ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)

Duration Standards:
- Micro-interactions: 0.15s
- Standard transitions: 0.25s  
- Page transitions: 0.4s
- Complex animations: 0.6s

Performance Rules:
- Use transform and opacity only
- Avoid animating width, height, or position
- Include prefers-reduced-motion support
```

---

## ♿ Accessibility Requirements

### Color Contrast
```
Required Contrast Ratios:
- Body text: 4.5:1 minimum (WCAG AA)
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum
- Brand elements: Follow brand colors

Color Independence:
- Never rely on color alone to convey information
- Include icons, text, or patterns as alternatives
- Test with color blindness simulators
```

### Typography Accessibility
```
Font Requirements:
- Minimum 14px on mobile, 12px on desktop
- Maximum 75 characters per line
- 1.4x line height minimum for body text
- Sans-serif fonts for screen readability

Text Scaling:
- Support up to 200% text scaling
- Layouts must adapt without horizontal scrolling
- Maintain touch targets at large text sizes
```

### Keyboard & Screen Reader
```
Focus Management:
- Visible focus indicators (2px blue outline)
- Logical tab order
- Skip links for main content
- Focus trapping in modals

ARIA Implementation:
- aria-label for icon buttons
- aria-describedby for form errors
- aria-live regions for dynamic content
- Proper heading hierarchy (h1 → h2 → h3)

Screen Reader Content:
- Alt text for all images
- Loading state announcements
- Error message associations
- Form field labels and help text
```

---

## 📊 Data & Content Guidelines

### Placeholder Content
```
User Names: Sarah Johnson, Mike Thompson, Anna Klein
Gym Names: FitLife Gym, Iron Gym, Zen Studio, PowerHouse
Class Names: Morning Yoga, HIIT Blast, Evening Pilates, Boxing Basics
Addresses: Use Cape Town, South Africa locations
Phone Numbers: Use +27 format (South African)
Prices: South African Rand (R350, R50, etc.)
```

### Image Requirements
```
Profile Photos:
- Size: 120px x 120px minimum
- Format: JPEG or PNG
- Diverse representation required

Gym Photos:
- Hero images: 16:9 aspect ratio, 800px x 450px minimum
- Gallery images: 1:1 aspect ratio, 400px x 400px minimum
- Show diverse people exercising
- Bright, energetic environments

Class Images:
- 4:3 aspect ratio, 400px x 300px minimum
- Show relevant equipment and exercises
- Include instructor when possible

Stock Photo Sources:
- Unsplash: Search "gym", "fitness", "yoga", "exercise"
- Ensure diverse representation
- Avoid overly perfect/commercial looking images
```

### Copy & Messaging
```
Tone of Voice:
- Motivational but not overwhelming
- Friendly and approachable
- Clear and concise
- South African context where relevant

Error Messages:
- Apologetic but not overly dramatic
- Clear next steps provided
- Avoid technical jargon
- Offer alternatives when possible

Success Messages:
- Celebratory but brief
- Include relevant next steps
- Use motivational language
- Include relevant details
```

---

## 🔧 Technical Specifications

### Asset Export Requirements
```
Icon Exports:
- SVG format preferred
- 24px, 32px, 48px sizes
- Stroke width: 2px
- Include filled and outline versions

Image Exports:
- @1x, @2x, @3x for mobile
- WebP format with JPEG fallback
- Optimize for <100KB per image
- Include dark mode variants if applicable

Component Exports:
- Export each component state separately
- Include measurement annotations
- Provide CSS property specifications
- Export design tokens as JSON
```

### File Organization
```
Figma Structure:
📁 StudioLoop Design System
├── 🎨 Brand Guidelines
├── 🧩 Component Library  
├── 📱 Mobile Screens
├── 🖥️ Desktop Screens
├── 📋 User Flows
├── 🎬 Prototype
└── 📦 Assets for Export

Naming Conventions:
- Screens: [Platform]-[Section]-[Screen] (e.g., Mobile-Auth-Login)
- Components: [Type]-[State] (e.g., Button-Primary-Hover)
- Assets: [Type]-[Size]-[Variant] (e.g., Icon-24-Filled)
```

---

## ✅ Quality Assurance Checklist

### Design Review Checklist
```
Brand Compliance:
□ Colors match brand specifications exactly
□ Typography follows system hierarchy
□ Logo usage follows brand guidelines
□ Consistent visual language throughout

User Experience:
□ Clear information hierarchy
□ Obvious interaction affordances
□ Consistent navigation patterns
□ Error states provide clear guidance
□ Success states are celebratory

Technical Requirements:
□ All screens have mobile and desktop versions
□ Touch targets meet 44px minimum
□ Text contrast meets WCAG AA standards
□ Forms include all validation states
□ Loading states are designed

Content & Copy:
□ All text follows tone of voice guidelines
□ Placeholder content is realistic and diverse
□ Error messages are helpful and actionable
□ Success messages include next steps
```

### Prototype Testing Checklist
```
Core Functionality:
□ Registration flow works end-to-end
□ Booking flow handles success and error states
□ Navigation is intuitive and consistent
□ Forms provide immediate feedback

Edge Cases:
□ Empty states are designed and handled
□ Error states provide recovery options
□ Loading states prevent user confusion
□ Offline states communicate clearly

Cross-Device:
□ Mobile prototype works on actual devices
□ Desktop prototype handles different screen sizes
□ Touch interactions feel responsive
□ Animations perform smoothly
```

---

## 🤝 Collaboration & Handoff

### Designer-Developer Handoff
```
Deliverables for Development:
1. High-fidelity prototypes (Figma link)
2. Design system documentation (this document)
3. Asset exports (icons, images, logos)
4. Animation specifications (easing, duration)
5. Responsive behavior documentation

Handoff Meeting Agenda:
1. Walkthrough of key user flows (30 min)
2. Review of design system components (20 min)
3. Discussion of technical constraints (10 min)
4. Q&A and clarifications (20 min)
5. Define review checkpoints (10 min)

Ongoing Collaboration:
- Weekly design-dev sync meetings
- Slack channel for quick questions
- Figma commenting for specific feedback
- Staged releases for user testing
```

### Stakeholder Approval Process
```
Review Stages:
1. Internal Design Review (1-2 days)
2. Product Owner Approval (2-3 days)
3. Stakeholder Feedback (3-5 days)
4. Final Revisions (1-2 days)
5. Developer Handoff (Immediate)

Approval Criteria:
□ Meets all user story requirements
□ Follows established design system
□ Accessible to users with disabilities
□ Optimized for target devices
□ Ready for development implementation
```

---

This comprehensive design handoff guide provides everything needed to transform the ASCII mockups and specifications into polished, professional designs that can be immediately implemented by a development team. The document ensures consistency, accessibility, and technical feasibility while maintaining the energetic, African-optimized brand experience envisioned for StudioLoop.