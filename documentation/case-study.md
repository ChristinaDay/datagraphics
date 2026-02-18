# Case Study: Operational Data Graphics
## A Modern Visualization System for Data Infrastructure

**Role:** Design Systems Designer / Design Engineer  
**Timeline:** February 2026 (4 weeks)  
**Tools:** Figma, Vega, JavaScript, HTML/CSS  
**GitHub:** [github.com/ChristinaDay/datagraphics](https://github.com/ChristinaDay/datagraphics)

---

## Overview

I designed and implemented a complete data visualization system specifically for operational monitoring—targeting data engineers, analytics engineers, and infrastructure teams who need high-signal, low-noise graphics for real-time metrics, system health, and performance monitoring.

This project demonstrates systems-level design thinking, from defining visual foundations and interaction patterns to implementing production-ready charts with full Vega and building an interactive demo with real-time simulations.

**Key Achievement:** Built a complete design system in 4 weeks—from design tokens and Figma variables to interactive Vega implementations with light/dark mode theming.

---

## The Problem

### Generic BI Tools Don't Fit Operational Workflows

Most dashboards use business intelligence aesthetics—decorative elements, saturated colors, excessive whitespace. These designs prioritize executive presentations over operational workflows.

**Engineers monitoring production systems need:**
- High information density (scan patterns quickly)
- Minimal visual noise (focus on anomalies)
- Semantic color (only for status/meaning, not decoration)
- Dark mode by default (terminal-first workflows)
- Precise, functional design over visual flair

**The gap:** No standardized visual grammar exists for operational graphics. Teams cobble together charts from generic libraries, resulting in inconsistent, inefficient monitoring interfaces.

---

## My Approach

### Position as a Design System, Not a Library

**Strategic Decision:** Instead of building "another chart library," I positioned this as a **visual grammar** + **implementation proof** demonstrating:

1. **Systems thinking** - Define primitives that compose
2. **Design + code credibility** - Both Figma designs and working implementations
3. **Theoretical foundation** - Based on Grammar of Graphics (Leland Wilkinson)
4. **Audience specificity** - Designed for operational users, not generic BI

**Why Vega?** Chose full Vega (not Vega-Lite) to demonstrate technical depth and precise control over every visual element—critical for design systems work.

---

## Design Process

### Week 1: Foundations

**Established visual language:**
- **Color system:** Categorical, status, sequential, diverging palettes
- **Typography:** Inter for UI, JetBrains Mono for metrics
- **Spacing:** 4px base unit, documented scale
- **Axis standards:** Grid opacity, tick spacing, label hierarchy

**Created design tokens** (`tokens.json`) following W3C format for Figma import via Tokens Studio plugin.

**Key Decision:** Dark mode first. Operational teams work in terminals and dark UIs—designing for light mode first would have felt forced.

---

### Week 2: Chart Primitives

**Designed 6 core chart types in Figma:**

1. **High-Density Time-Series Line** - CPU, memory, latency trends
2. **Multi-Series Comparison Line** - Environment/region comparison  
3. **Stacked Area Trend** - Resource allocation, composition over time
4. **Histogram / Distribution** - Latency percentiles, response time patterns
5. **Throughput Bar Comparison** - Endpoint/service volume ranking
6. **Status Timeline (Health Bands)** - Service uptime, incident timelines

**Documented for each:**
- When to use / when NOT to use
- Data structure requirements
- Interaction patterns
- Accessibility considerations

**Challenge:** Initial programmatic creation placed elements outside frame bounds due to Figma API coordinate system quirks. Solution: Diagnosed absolute vs. relative coordinate handling, documented the fix, rebuilt all charts with proper positioning.

---

### Week 3: Implementation

**Implemented 4 of 6 charts in full Vega:**

**Technical approach:**
- JSON specifications (~500 lines each)
- Declarative data transformations
- Custom scales, axes, marks encoding
- Dark mode styling, hover interactions

**Charts built:**
- Chart 1: Time-Series Line (13 data points, smooth interpolation)
- Chart 2: Multi-Series Comparison (faceted marks for 3 series)
- Chart 4: Histogram (5 bins, bell curve distribution)
- Chart 6: Status Timeline (health bands with conditional rendering)

**Critical Discovery:** During implementation, caught spacing inconsistencies—charts used `padding: 5` instead of documented `{top: 10, left: 60, right: 20, bottom: 40}`. Systematically audited and fixed all 5 files, applying proper `labelPadding: 8px`, `symbolOffset: 8px`, etc. **This taught me:** Design systems only work when implementation matches documentation exactly.

**Created unified demo page** with all 4 charts, sticky navigation, smooth scrolling, and jump links—portfolio-ready showcase.

---

## Interactive Enhancements

### Real-Time Simulation Feature

Added **"Simulate"** buttons to demonstrate how charts handle operational scenarios:

**Chart 1:** Live metric streaming (new data points every 1.5s)
- Sliding window visualization
- Threshold alerts when CPU > 90%

**Chart 2:** Traffic spike simulation
- All environments increase, Production fastest
- Shows scale differences under load

**Chart 4:** Performance degradation
- Distribution shifts right (higher latency)
- Visualizes how issues appear in histograms

**Chart 6:** Cascading incident
- Database fails → Auth degrades → Full recovery
- 5-step incident timeline over 10 seconds

**Why this matters:** Most visualization portfolios are static. Interactive simulations prove understanding of real operational workflows and demonstrate Vega's reactive capabilities.

---

### Light/Dark Mode Theming

**Built complete theming system:**
- CSS custom properties (50+ variables)
- Auto-detects OS preference (`prefers-color-scheme`)
- Saves user choice to localStorage
- Updates all Vega charts dynamically
- Listens for OS theme changes in real-time

**UX Flow:**
1. First visit → Matches OS theme automatically
2. User clicks toggle → Saves preference, stays fixed
3. OS changes → Only updates if no saved preference

**Design tokens** structured with `light` and `dark` modes for Figma variable import, maintaining design-code consistency.

---

## Outcomes & Impact

### Deliverables

**Documentation (17 files):**
- Design thesis, project plan, grammar breakdown
- Color system, spacing standards, axis specifications
- Interaction patterns, chart usage guidelines
- Theming system, Figma setup guide

**Design Assets:**
- Complete Figma file with 6 chart primitives
- Design tokens (W3C format) with mode support
- Color variables, typography styles, spacing boards

**Implementation (6 files):**
- 4 Vega chart implementations (~2,000 lines)
- Interactive demo with real-time simulations (~400 lines)
- Unified showcase page with theming

**Portfolio Differentiators:**
- Interactive (not static mockups)
- Complete system (not isolated components)
- Theory-grounded (Grammar of Graphics)
- Audience-specific (operational, not generic BI)

---

### Technical Highlights

**Full Vega Mastery:**
- Custom padding per side (not available in Vega-Lite)
- Precise legend positioning and spacing
- Conditional mark rendering (Chart 6 text labels)
- Faceted data transformations (Chart 2 multi-series)

**Design System Discipline:**
- Documented spacing standards → Implemented exactly
- Caught and fixed inconsistencies systematically
- Applied 8px label padding across all axes
- Consistent 40% grid opacity throughout

**Modern Web Features:**
- CSS custom properties for theming
- localStorage for preferences
- matchMedia API for system detection
- Smooth 0.3s transitions with proper fallbacks

---

## Key Learnings

### 1. Design Systems Require Implementation Integrity

**Challenge:** Initially implemented charts with `padding: 5` instead of documented standards.

**Learning:** Documentation is worthless if code doesn't match. When I caught this, I systematically audited all 5 files and applied proper spacing. **Takeaway:** Design systems demand discipline—every 8px matters.

### 2. Audience Specificity Drives Design Decisions

**Example:** Grid lines over bars (not behind) in histograms.

**Rationale:** Operational users need precise value estimation. 40% opacity ensures grids don't overpower data while serving their functional purpose.

**Takeaway:** Generic "best practices" don't always apply. Understand your users' workflows.

### 3. Theory + Practice = Credibility

**Grammar of Graphics foundation** demonstrated I understand visualization theory, not just tools. **Vega implementation** proved I can execute at a systems level.

**Takeaway:** Senior roles require both. Design without implementation is incomplete; implementation without theory is shallow.

### 4. Interactive > Static for Portfolios

**Before simulations:** Static charts (technically correct but not engaging).

**After simulations:** Click "Simulate Incident" → watch cascading failure → memorable interview demo.

**Takeaway:** Show, don't tell. Let hiring managers interact with your work.

---

## Reflection

### What Went Well

**Rapid iteration:** Figma + TalkToFigma plugin enabled programmatic chart creation, speeding up Week 2.

**Documentation discipline:** Writing design thesis first clarified audience, constraints, and principles—guiding every subsequent decision.

**Systematic problem-solving:** When spacing inconsistencies appeared, I didn't patch—I audited the system and fixed the root cause.

### What I'd Do Differently

**Earlier alignment check:** Should have referenced `spacing-system.md` while writing initial Vega specs, not after completion.

**More user testing:** Would test simulations with actual engineers to validate operational scenarios.

**Expand chart library:** Implement Charts 3 & 5 to complete the full 6-chart set.

### Why This Project Matters

This wasn't about building "another chart library." It was about demonstrating **how I think about design systems:**

- Define primitives, not templates
- Document standards, then enforce them
- Design for specific users, not generic ones
- Bridge design and engineering
- Show theoretical depth + practical execution

**For companies like Fivetran, Datadog, or infrastructure-focused teams:** This project proves I can define visual systems, implement them with precision, and understand operational workflows deeply enough to design for them.

---

## Try It Yourself

**Live Demo:** [View Interactive Demo](https://christinamday.com/projects/operational-data-graphics/demo.html)

**GitHub:** [github.com/ChristinaDay/datagraphics](https://github.com/ChristinaDay/datagraphics)

**Explore:**
- Toggle between light/dark modes
- Click "Simulate" buttons to see real-time updates
- View all 4 charts with smooth interactions
- Check the documentation and Figma designs

---

*Project completed February 2026 | Christina Day*
