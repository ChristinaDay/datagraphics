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
