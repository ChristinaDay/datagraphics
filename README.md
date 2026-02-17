# Operational Data Graphics

> A Modern Visualization System for Data Infrastructure

## Overview

A portfolio project demonstrating systems-level design thinking for operational data visualization. This project defines a visual grammar, interaction standards, and implementation proof for data graphics used in infrastructure, analytics, and data platform contexts.

**Built for**: Data engineers, analytics engineers, infrastructure teams, and technical PMs who need high-signal, low-noise operational metrics visualization.

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

## Chart Examples

_Coming soon_

---

## Running the Examples

```bash
# Instructions will be added as implementations are completed
```

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

## Roadmap

### Week 1: Foundations
- [ ] Design philosophy document
- [ ] Visual foundations (typography, color, spacing)
- [ ] Axis + grid standards

### Week 2: Chart Design
- [ ] Define 6 chart primitives
- [ ] Document usage guidelines
- [ ] Interaction specifications

### Week 3: Implementation
- [ ] Implement 4 charts in Vega
- [ ] Add tooltips + dynamic updates
- [ ] Dark mode support

### Week 4: Documentation
- [ ] Write case study
- [ ] Polish demo page
- [ ] Final portfolio presentation

---

## Why This Matters

Common operational dashboards fail because they:
- Prioritize aesthetics over information density
- Use color arbitrarily
- Over-animate or distract
- Don't consider dark mode contexts
- Lack systematic thinking

This project demonstrates how to:
- Think systematically about data graphics
- Define and evangelize visual standards
- Implement designs with code
- Balance aesthetics with functional requirements

---

## License

This is a portfolio project. Design system and code examples are freely available for reference.

---

## Contact

Christina  
[Portfolio] • [LinkedIn] • [GitHub]
