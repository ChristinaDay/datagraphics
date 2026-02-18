# Project Journal: Operational Data Graphics

This journal documents the development process, decisions, learnings, and technical discoveries for the Operational Data Graphics project.

---

## Session 1: Project Foundation & Week 1 Setup
**Date**: February 17, 2026

### Project Initialization

Successfully established the foundational structure for a portfolio project demonstrating systems-level thinking for Senior Data Graphics Designer / Design Engineer roles.

**Goal**: Build a visual grammar + implementation proof (not a production BI tool) that demonstrates:
- Systems-level design thinking
- Deep understanding of data graphics
- Aesthetic taste and restraint
- Implementation credibility (Vega + JS + SVG)
- Ability to define and evangelize standards

**Target Audience**: Data engineers, analytics engineers, infrastructure/platform teams, technical PMs who need high-signal, low-noise visuals.

### Documentation Created

1. **README.md** - Project overview, philosophy, structure, and 4-week roadmap
2. **design-thesis.md** - Written philosophy explaining audience, problems, principles
3. **project-plan.md** - Week-by-week breakdown of deliverables and success metrics
4. **chart-grammar-breakdown.md** - Deconstruction of 6 core charts into Grammar of Graphics layers
5. **vega-vs-vega-lite.md** - Comparison and justification for choosing full Vega
6. **vega-structure-guide.md** - Guide for building Vega specifications
7. **color-system.md** - Comprehensive color palette documentation
8. **spacing-system.md** - 4px base unit spacing scale
9. **axis-grid-standards.md** - Formal specifications for axis and grid behavior
10. **figma-guide.md** - Step-by-step Figma setup instructions
11. **figma-connection-setup.md** - TalkToFigma plugin configuration

### Implementation Proof of Concept

Created first working Vega implementation:
- **time-series-line.html** - High-density multi-series line chart with:
  - Dark mode styling
  - Custom tooltips
  - Multiple data series
  - Responsive design
- **config-template.js** - Reusable Vega configuration for consistency
- **index.html** - Demo landing page

### Technology Stack Decision: Vega vs Vega-Lite

**Decision**: Use full Vega (not Vega-Lite)

**Rationale**:
- Full Vega offers precise control over every visual element
- Better suited for custom, infrastructure-grade designs
- More flexibility for interaction patterns
- Demonstrates deeper technical capability

**Vega Foundation**: Based on Leland Wilkinson's *Grammar of Graphics* theory, which treats visualization as:
- **Data** → **Transform** → **Mark** → **Encoding** → **Scale**
- Same theoretical foundation as ggplot2 and Observable Plot
- Declarative approach (describe what, not how)

### Version Control Setup

1. Created `.gitignore` with appropriate exclusions
2. Initialized Git repository
3. Made initial commit
4. Connected to remote: `https://github.com/ChristinaDay/datagraphics.git`
5. Pushed all foundation work

---

## Figma Integration: Design Foundations

### Design Tokens Workflow

**Approach**: Created JSON-based design tokens following W3C format for easy sync between design and code.

**File**: `design/tokens.json`

**Contents**:
- Colors (categorical, status, sequential, diverging, backgrounds, text, borders)
- Spacing scale (4px base unit)
- Typography (Inter font, size scale 10-20px)
- Chart specifications (padding, stroke widths)
- Opacity values

**Import Method**: Tokens Studio plugin for Figma
- Installed plugin
- Imported `tokens.json`
- Successfully synced to Figma Variables

**Note**: Initially confused Figma Variables vs Styles:
- **Variables**: Dynamic values (colors, numbers, strings, booleans)
- **Styles**: Pre-configured combinations (text styles, color styles)
- For our use case: Variables work well for colors and spacing; text styles created manually

### TalkToFigma Plugin Setup

**Goal**: Enable programmatic interaction with Figma for automation and bulk operations.

**Configuration**:
```json
{
  "mcpServers": {
    "TalkToFigma": {
      "command": "bunx",
      "args": ["cursor-talk-to-figma-mcp@latest"]
    }
  }
}
```

**Setup Process**:
1. Installed `bun` globally (required dependency)
2. Started WebSocket server: `bunx cursor-talk-to-figma-socket`
3. Installed TalkToFigma plugin in Figma
4. Connected via channel codes

**Connection Troubleshooting**:
- Initial timeout issues resolved by generating fresh channel codes
- Channels used: `nfjhtgwq`, `sn1vwmu2`, `hgeyk0sx`
- Required reopening plugin when switching between tasks

### Figma File Structure

**Project**: Operational Data Graphics  
**File**: Visual Foundations & Standards

**Pages Created**:
1. **Cover** - Project title and overview
2. **Foundations** - Color, typography, spacing systems
3. **Chart Primitives** - 6 core chart designs (to be created)
4. **Components** - Reusable elements (to be created)
5. **Interaction Patterns** - Motion and behavior specs (to be created)

### Manual Foundations Work

**Text Styles Created** (manually in Figma):
- Display / 20px / Regular
- Body / 16px / Regular
- Body / 16px / Medium
- Label / 14px / Medium
- Caption / 12px / Regular
- Caption / 12px / Medium
- Micro / 10px / Regular
- Micro / 10px / Medium

All using Inter font family.

---

## Technical Discovery: Figma API Coordinate System

### The Problem

When using TalkToFigma to programmatically create elements inside a parent frame using the `parentId` parameter, elements appeared **outside the frame bounds** and were not visible on canvas.

**What Happened**:
- Created "Spacing System" frame at absolute canvas coordinates (x: 1300, y: 200)
- Attempted to create child rectangles using `parentId` with x coordinates like 1373, 1424, etc.
- Expected: Elements would appear inside the parent frame
- Reality: Elements appeared far off canvas, outside the frame

### Root Cause Analysis

**Coordinate System Behavior**:
When you provide a `parentId` in the Figma Plugin API, the `x` and `y` coordinates are still interpreted as **absolute canvas coordinates**, NOT relative to the parent frame's origin.

**Diagram**:
```
Canvas (0,0)
    │
    └─> Frame "Spacing System" at (1300, 200)
         │
         └─> Child element with x=1373 and parentId
             ├─ Expected: x=73 relative to frame (73 pixels from frame's left edge)
             └─ Reality: x=1373 absolute on canvas (1373 pixels from canvas origin)
```

**Why This Matters**:
- The API doesn't automatically convert to relative coordinates
- Providing absolute coordinates that are far from the parent results in children outside the frame
- This is a limitation/quirk of the Figma Plugin API itself, not TalkToFigma

### The Solution

**Correct Approach**: Calculate relative coordinates manually

**Formula**:
```
child_x_absolute = parent_x + child_x_relative
child_y_absolute = parent_y + child_y_relative
```

**Example**:
```javascript
// Parent frame at (1300, 200)
// Want child 73px from left edge of parent
// Calculation: 1300 + 73 = 1373 ✅

// BUT when using API, we were ALSO adding 1300 mentally
// This resulted in: 1300 + 1373 = 2673 ❌ (way off canvas)
```

**Corrected Implementation**:
For parent frame at (1300, 200), to place child 73px from left edge:
- Use `x: 1373` (not `x: 73`)
- Use `parentId: "frame-id"`

**Results**: Successfully created all spacing system elements (4px through 64px boxes) inside the parent frame with proper positioning.

### Key Learnings

1. **Figma Plugin API Coordinates**: Always absolute, even with `parentId`
2. **Manual Calculation Required**: Must add parent coordinates to desired relative offsets
3. **API Limitation**: Cannot directly reference Figma Variables or apply Text Styles via TalkToFigma
   - Colors must be set as hex/RGB values
   - Styles must be applied manually after creation
4. **Workaround Strategy**: 
   - Use TalkToFigma for bulk creation and positioning
   - Manually apply variables/styles for refinement

### Documentation Updated

Added coordinate system findings to internal notes. This knowledge is critical for any future programmatic Figma work on this project.

---

## Current Status: Week 1 Complete ✅

### Completed Deliverables

- [x] Project philosophy and design thesis written
- [x] Visual foundations documented (color, spacing, typography, axes)
- [x] First Vega implementation working (time-series line chart)
- [x] Git repository initialized and pushed
- [x] Figma file structure created
- [x] Design tokens imported as Figma Variables
- [x] Text styles created in Figma
- [x] Spacing system board built in Figma (via TalkToFigma)

### Next Steps

**Week 2 Focus**: Chart Primitives Design
- Design 6 core charts in Figma
- Define interaction patterns for each
- Document when to use / when not to use
- Specify accessibility considerations

---

## Session 2: Week 2 - Chart Primitives Design
**Date**: February 17, 2026

### Overview

Successfully completed the design phase for all 6 core chart types in Figma using programmatic creation via TalkToFigma. All charts now have visual mockups showing structure, styling, axes, legends, and data representations.

### Chart Designs Completed

#### 1. High-Density Time-Series Line Chart ✅
**Purpose**: Track one or more metrics over time with high precision

**Features Created**:
- Title: "API Latency (p50, p95, p99)"
- Y-axis with labels (0, 100, 200, 300, 400 ms)
- X-axis with time labels (00:00, 06:00, 12:00, 18:00)
- Horizontal grid lines (subtle, 40% opacity)
- 3 colored line series representing p50, p95, p99
- Legend with colored indicators (blue, cyan, violet)
- Proper axis styling and typography

**Design Decisions**:
- Used semi-transparent lines (90% opacity) for depth
- Grid lines very subtle to not compete with data
- Legend positioned top-right for easy reference

#### 2. Multi-Series Comparison Line Chart ✅
**Purpose**: Compare different entities (services) over time

**Features Created**:
- Title: "Request Volume by Service"
- Y-axis labels in thousands (0, 1k, 2k, 3k, 4k)
- X-axis with day labels (Mon, Wed, Fri, Sun)
- 4 colored line series: Auth, API, Database, Cache
- Legend with 4 service names
- Color palette: blue, green, orange, violet

**Design Decisions**:
- Used distinct colors from our categorical palette
- Each service clearly differentiated
- Horizontal layout for multi-day comparison

#### 3. Stacked Area Trend ✅
**Purpose**: Show cumulative composition breakdown over time

**Features Created**:
- Title: "Resource Usage Over Time"
- Y-axis in percentages (0%, 25%, 50%, 75%, 100%)
- 4 stacked layers: CPU, Memory, Disk, Network
- Semi-transparent fills (70% opacity) showing stacking
- Horizontal legend showing all 4 resources
- Clear visual hierarchy of layers

**Design Decisions**:
- Lower opacity to show stacking relationships
- Color order from bottom-up matches legend left-right
- Percentage scale emphasizes this is cumulative

#### 4. Histogram / Distribution ✅
**Purpose**: Show frequency distribution across ranges

**Features Created**:
- Title: "Response Time Distribution"
- Y-axis: count
- X-axis: response time in ms (50, 150, 250, 350)
- 8 vertical bars showing distribution curve
- Normal distribution shape (peaks in middle)
- Bar heights create recognizable bell curve

**Design Decisions**:
- Bars touch each other (no gaps) to show continuous range
- Used single color (blue) since categories are ranges, not distinct types
- Peak positioned in middle to show typical latency pattern

#### 5. Throughput Bar Comparison ✅
**Purpose**: Compare discrete categories on a single metric

**Features Created**:
- Title: "Endpoint Throughput Comparison"
- X-axis: requests/sec
- Y-axis: 5 endpoint labels (/api/users, /api/posts, /api/auth, /api/search, /api/metrics)
- Horizontal bars of varying lengths
- Clear ranking from highest to lowest

**Design Decisions**:
- Horizontal orientation for better label readability
- Single color since comparing same metric across categories
- Bar lengths clearly show magnitude differences

#### 6. Status Timeline (Health Bands) ✅
**Purpose**: Show health/availability status over time

**Features Created**:
- Title: "Service Health Status"
- X-axis: Time (Last 24 hours)
- Y-axis: 4 service names (API, Database, Cache, Auth)
- Colored horizontal bands showing status over time:
  - Green: Healthy
  - Yellow/Orange: Degraded
  - Red: Down
- Legend showing status color meanings
- Segments show state duration

**Design Decisions**:
- Used status colors (green, orange, red) from our palette
- Semi-transparent fills (70%) for subtle appearance
- Different patterns for each service showing various incident scenarios
- Cache shows healthy → down → healthy to demonstrate incident
- Database shows healthy → degraded to show partial outage

### Documentation Created

#### interaction-patterns.md ✅
Comprehensive interaction and motion standards including:
- Hover/focus states (crosshairs, tooltips, dimming)
- Zoom & pan behavior (scroll wheel, click-drag, keyboard)
- Data updates & live refresh (append mode, smooth transitions)
- Selection & filtering (legend interactions, ESC to clear)
- Threshold crossings & alerts (subtle pulse, color changes)
- Motion timing system (instant, fast, standard, deliberate)
- Accessibility standards (keyboard nav, screen readers, reduced motion)
- Anti-patterns to avoid
- Implementation checklist

**Key Principles Documented**:
- Motion must serve a purpose, not decoration
- Interactions should reinforce stability
- Respect `prefers-reduced-motion`
- Provide consistent timing across all charts

#### chart-usage-guidelines.md ✅
Detailed guide for choosing the right chart type including:
- Decision tree for chart selection
- For each chart type:
  - Purpose statement
  - Best use cases
  - When to use ✅
  - When NOT to use ❌
  - Data requirements
  - Example use cases
- Quick reference table comparing all 6 charts
- Guidance for choosing between similar chart types
- Anti-patterns to avoid (pie charts, 3D, dual Y-axes)
- Accessibility considerations

**Strategic Value**:
This document positions the project as a complete design system, not just visual mockups. It demonstrates senior-level thinking about:
- Context-appropriate chart selection
- Understanding of data types and their visual representation
- User needs and cognitive load
- Design system evangelization

### Technical Process

**Programmatic Figma Creation**:
- Used TalkToFigma API to create all chart elements
- Successfully applied coordinate system knowledge from Week 1
- Created ~270+ Figma elements across 6 charts
- Consistent styling using our color system throughout

**Challenges & Solutions**:
- Maintained absolute coordinate calculations for all elements
- Applied proper color palette consistently
- Created legends with auto-layout frames for flexibility
- Used semi-transparent fills for stacking/layering effects

### Design System Consistency

All 6 charts use:
- **Dark mode background**: `#171719`
- **Frame borders**: `#33353A` 
- **Axis colors**: `rgba(0.6, 0.62, 0.66, 1)`
- **Grid lines**: `rgba(0.2, 0.21, 0.23, 0.4)`
- **Text colors**: 
  - Primary: `rgba(0.85, 0.85, 0.88, 1)`
  - Secondary: `rgba(0.6, 0.62, 0.66, 1)`
- **Categorical colors**: Blue, Green/Cyan, Orange, Violet
- **Status colors**: Green (healthy), Orange (degraded), Red (down)
- **Typography**: Inter font, 10-14px sizes
- **Spacing**: Consistent padding and margins

---

## Current Status: Week 2 Complete ✅

### Completed Deliverables

- [x] Chart Primitives page created in Figma
- [x] All 6 chart types designed with full visual specifications
- [x] Interaction & motion standards documented
- [x] Chart usage guidelines written
- [x] Design system consistency maintained across all charts
- [x] Accessibility considerations documented

### Metrics

- **Figma elements created**: ~270+
- **Documentation pages**: 2 (interaction-patterns, chart-usage-guidelines)
- **Charts designed**: 6/6
- **Total documentation files**: 13

### Next Steps

**Week 3 Focus**: Implementation
- Implement 4 of the 6 charts in Vega
- Suggested priority:
  1. Multi-series comparison (builds on existing time-series)
  2. Histogram / distribution (new pattern)
  3. Status timeline (unique interaction model)
  4. Stacked area or bar comparison (choose one)

**Why These 4**:
- Demonstrates variety of chart types
- Shows different data structures and transforms
- Covers most common operational use cases
- Balances complexity vs portfolio value

---

## Week 2 Reflection

### What Went Well
- Rapid iteration using TalkToFigma for bulk creation
- Consistent visual language across all 6 charts
- Comprehensive documentation demonstrates senior-level thinking
- Successfully applied Week 1 coordinate system learnings
- Chart variety shows breadth of design thinking

### Technical Achievements
- Mastered programmatic Figma creation at scale
- Created complex layouts with proper hierarchy
- Applied color system consistently
- Demonstrated understanding of chart grammar

### Design Decisions
- Semi-transparent fills for layering effects
- Subtle grid lines that don't compete with data
- Legends positioned for optimal readability
- Color choices reinforce semantic meaning (status colors)

### Portfolio Differentiators
This project now demonstrates:
- **Systems thinking**: Not just charts, but a complete framework
- **Design + documentation**: Senior designers can evangelize systems
- **Implementation credibility**: Ready to build in Week 3
- **Depth of expertise**: Interaction patterns and usage guidelines show mastery

### Areas for Future Enhancement
- Could add more complex interaction examples
- Might create Figma components for reusability
- Could document animation curves with examples
- Screenshot documentation of Figma work for case study

---

## Reflection

### What Went Well
- Clear project scope and philosophy from the start
- Solid documentation structure
- Successful Vega proof of concept
- Design tokens workflow streamlined with JSON

### Technical Challenges Solved
- Vega vs Vega-Lite decision
- TalkToFigma connection setup
- Figma API coordinate system understanding

### Areas for Improvement
- Consider screenshot documentation of Figma work
- May need more interaction pattern examples
- Should test Vega charts with real-world data volumes

### Portfolio Value
This journal itself demonstrates:
- Systems thinking and documentation discipline
- Technical problem-solving (Figma API quirks)
- Ability to navigate ambiguity
- Cross-domain knowledge (design + code)

---

*Journal maintained by Christina Day*  
*Project: Operational Data Graphics*  
*GitHub: https://github.com/ChristinaDay/datagraphics.git*
