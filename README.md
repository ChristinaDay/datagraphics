# Operational Data Graphics

> A Modern Visualization System for Data Infrastructure

[![View Demo](https://img.shields.io/badge/View-Live_Demo-blue?style=for-the-badge)](vega-implementations/demo.html)
[![Read Case Study](https://img.shields.io/badge/Read-Case_Study-green?style=for-the-badge)](documentation/case-study.md)

## Overview

A complete data visualization design system demonstrating systems-level thinking for operational monitoring. This portfolio project shows how to define visual foundations, document chart primitives, and implement production-ready graphics for infrastructure teams.

**Built for**: Data engineers, analytics engineers, infrastructure teams, and technical PMs who need high-signal, low-noise operational metrics visualization.

**Project Status**: ✅ **95% Complete** — 4-week build with 6 charts designed, 4 implemented, interactive simulations, and full theming system.

---

## Philosophy

Operational data graphics should evoke:
- **Calm** — no visual noise
- **Precision** — accurate representation
- **Trust** — consistent, predictable behavior  
- **Stability** — infrastructure-grade reliability
- **Restraint** — functional over decorative

This system prioritizes clarity, density, and signal over marketing aesthetics.

---

## Project Structure

```
/operational-data-graphics
  /design              # Visual foundations, color systems, typography
  /charts              # Chart primitive definitions
  /vega-implementations # Working code examples
  /documentation       # Design thesis, principles, usage guidelines
  README.md
```

---

## Core Components

### 1. Design Thesis
A philosophy document explaining who this is for, what problems it solves, and what principles guide the system.

### 2. Visual Foundations
- Typography scale (for dense data contexts)
- Axis + tick behavior
- Gridline standards
- Color ramps (sequential, diverging, categorical, status)
- Spacing system
- Dark mode parity
- Tooltip + legend rules

### 3. Chart Primitives (6 core types)
1. High-density time-series line chart
2. Multi-series comparison line chart  
3. Stacked area trend
4. Histogram / distribution
5. Throughput bar comparison
6. Status timeline (health bands)

Each chart includes:
- When to use / when not to use
- Default padding + axis behavior
- Tooltip + interaction model
- Accessibility considerations

### 4. Interaction & Motion Standards
- Hover, focus, zoom, pan logic
- Transition behavior for data updates
- Animation timing system
- Threshold crossing rules

Motion is subtle, functional, and stability-reinforcing.

### 5. Implementation Proof (Vega/JS/SVG)
4 of the 6 charts implemented with:
- Dynamic data updates
- Tooltips
- Multiple series support
- Status state transitions

---

## ✨ Key Features

### Interactive Simulations
Each chart includes real-time data simulations demonstrating operational scenarios:
- **Time-Series**: Live metric streaming with threshold alerts
- **Multi-Series**: Traffic spike simulation across environments
- **Histogram**: Performance degradation visualization
- **Status Timeline**: Cascading incident recovery

### Complete Theming System
- Auto-detects system preference (dark/light mode)
- Smooth transitions between themes
- 50+ CSS variables for consistency
- Dynamic Vega chart updates
- localStorage persistence

### Production-Ready Code
- Full Vega specifications (~2,000 lines)
- Proper spacing standards (60px left, 40px bottom, 8px label padding)
- Semantic color usage (only for status/meaning)
- Accessible tooltips and hover states

---

## 🚀 View the Demo

**[Open Interactive Demo](vega-implementations/demo.html)** — See all 4 charts with simulations and theme toggle

Or explore individual charts:
- [Chart 1: High-Density Time-Series](vega-implementations/time-series-line.html)
- [Chart 2: Multi-Series Comparison](vega-implementations/multi-series-comparison.html)
- [Chart 4: Histogram / Distribution](vega-implementations/histogram-distribution.html)
- [Chart 6: Status Timeline](vega-implementations/status-timeline.html)

---

## Design Principles

1. **Maximize signal, minimize noise**  
   Every visual element must earn its place.

2. **Prioritize density over whitespace**  
   Operational users need to see patterns across time and systems.

3. **Use color sparingly and semantically**  
   Color indicates meaning (status, category, threshold) — not decoration.

4. **Design for dark mode first**  
   Infrastructure teams work in terminals and dark UIs.

5. **Motion must have purpose**  
   Transitions communicate state changes, not style.

6. **Accessibility is non-negotiable**  
   All charts must support keyboard navigation and screen readers.

---

## Target Use Cases

- **Time-series monitoring**: CPU usage, memory, latency over time
- **Throughput analysis**: Records processed, API calls, job completion rates
- **Error rate tracking**: Failed vs successful operations
- **System health visualization**: Uptime bands, incident timelines
- **Resource utilization**: Multi-series comparisons across infrastructure

---

## Technology Stack

- **Vega / Vega-Lite** for declarative chart specifications
- **SVG** for rendering
- **Vanilla JavaScript** for interactivity
- **Design**: Figma for visual standards

---

## 📊 Project Deliverables

### Week 1: Foundations ✅
- [x] Design philosophy document ([design-thesis.md](documentation/design-thesis.md))
- [x] Visual foundations (typography, color, spacing)
- [x] Axis + grid standards ([axis-grid-standards.md](documentation/axis-grid-standards.md))
- [x] Color system ([color-system.md](documentation/color-system.md))
- [x] First Vega implementation

### Week 2: Chart Design ✅
- [x] Define 6 chart primitives in Figma
- [x] Document usage guidelines ([chart-usage-guidelines.md](documentation/chart-usage-guidelines.md))
- [x] Interaction specifications ([interaction-patterns.md](documentation/interaction-patterns.md))
- [x] Create proper legends, grid lines, and spacing

### Week 3: Implementation ✅
- [x] Implement 4 charts in Vega (Charts 1, 2, 4, 6)
- [x] Add tooltips + hover interactions
- [x] Apply spacing standards systematically
- [x] Create unified demo page

### Week 4: Polish & Enhancements ✅
- [x] Interactive real-time simulations for all 4 charts
- [x] Complete light/dark mode theming system
- [x] Write comprehensive case study ([case-study.md](documentation/case-study.md))
- [x] Project journal with technical discoveries ([project-journal.md](documentation/project-journal.md))
- [ ] Screenshots for portfolio (in progress)

---

## 📈 Project Metrics

- **Documentation**: 19 markdown files (~5,000 words)
- **Charts Designed**: 6 complete chart primitives in Figma
- **Charts Implemented**: 4 full Vega specifications
- **Code**: ~2,000 lines of production-ready Vega + JS + CSS
- **Interactive Features**: 4 real-time simulations
- **Theming**: Complete light/dark mode system (50+ CSS variables)
- **Timeline**: 4 weeks from concept to portfolio-ready

---

## 📚 Documentation

### Core Philosophy
- [Design Thesis](documentation/design-thesis.md) — Why operational graphics need different principles
- [Case Study](documentation/case-study.md) — Complete project narrative (problem → solution)
- [Project Journal](documentation/project-journal.md) — Technical discoveries and problem-solving

### Design System
- [Color System](documentation/color-system.md) — Categorical, status, sequential, diverging palettes
- [Spacing System](documentation/spacing-system.md) — 4px base unit with chart specifications
- [Axis & Grid Standards](documentation/axis-grid-standards.md) — Formal axis behavior rules
- [Theming System](documentation/theming-system.md) — Light/dark mode implementation guide

### Chart Guidelines
- [Chart Grammar Breakdown](documentation/chart-grammar-breakdown.md) — Grammar of Graphics analysis
- [Chart Usage Guidelines](documentation/chart-usage-guidelines.md) — When to use each chart type
- [Interaction Patterns](documentation/interaction-patterns.md) — Hover, zoom, transitions

### Technical Guides
- [Vega vs Vega-Lite](documentation/vega-vs-vega-lite.md) — Why full Vega was chosen
- [Vega Structure Guide](documentation/vega-structure-guide.md) — How to build Vega specs

---

## Why This Project Matters

### The Problem
Common operational dashboards fail because they:
- Prioritize aesthetics over information density
- Use color arbitrarily (decoration over meaning)
- Over-animate or distract from data
- Don't consider dark mode contexts
- Lack systematic, composable thinking

### The Solution
This project demonstrates:
- **Systems thinking** — Define primitives that compose, not templates
- **Theory + practice** — Grammar of Graphics foundation + working code
- **Design + engineering** — Figma designs → Vega implementations
- **Audience specificity** — Built for operational users, not generic BI
- **Implementation discipline** — Documentation matches code exactly

### Portfolio Differentiators
✅ **Interactive** — Real-time simulations, not static mockups  
✅ **Complete** — 6 charts designed, 4 implemented, full documentation  
✅ **Theory-grounded** — Based on Grammar of Graphics (Leland Wilkinson)  
✅ **Technical depth** — Full Vega (not Vega-Lite), 2,000+ lines of code  
✅ **Production-ready** — Proper spacing standards, accessibility, theming  

---

## 🎯 For Hiring Managers

**This project proves I can:**
1. Define visual systems from first principles
2. Document standards comprehensively
3. Implement designs with precision (spacing, color, interaction)
4. Use modern web technologies (CSS variables, localStorage, Vega)
5. Think about operational workflows and user needs
6. Execute a complex project start-to-finish in 4 weeks

**Target roles**: Senior Data Graphics Designer, Design Engineer, Visualization Specialist, Design Systems Designer (data-focused teams)

**View the demo**: [`vega-implementations/demo.html`](vega-implementations/demo.html)  
**Read the case study**: [`documentation/case-study.md`](documentation/case-study.md)

---

## Technology Stack

- **Vega** — Declarative visualization grammar (full Vega, not Vega-Lite)
- **JavaScript** — Interactive controls, theme switching, simulations
- **HTML/CSS** — Semantic markup, CSS custom properties for theming
- **SVG** — Rendering via Vega
- **Figma** — Design system and chart primitives

---

## License

This is a portfolio project. Design system and code examples are freely available for reference.

---

## Contact

**Christina Day**  
Portfolio • [GitHub](https://github.com/ChristinaDay) • [LinkedIn]  
*Demonstrating systems-level design thinking for operational data visualization*
