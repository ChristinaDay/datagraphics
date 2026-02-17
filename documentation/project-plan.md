# Project Plan: Operational Data Graphics

**Timeline**: 4 weeks  
**Goal**: Portfolio-ready data visualization system demonstration

---

## Week 1: Philosophy + Visual Foundations

### Deliverables
- [x] Design thesis document
- [ ] Visual foundations (Figma)
  - [ ] Typography scale
  - [ ] Color system (sequential, diverging, categorical, status)
  - [ ] Spacing scale
  - [ ] Dark mode + light mode definitions
- [ ] Axis + grid standards
  - [ ] Tick behavior rules
  - [ ] Gridline weight system
  - [ ] Zero-line treatment
- [ ] Tooltip design
- [ ] Legend standards

### Success Metric
Can hand off "primitive rules" to any designer and they'd know how to build a chart.

---

## Week 2: Chart Primitives

### Deliverables (6 charts defined)
1. **High-density time-series line chart**
   - When to use / when not to use
   - Default padding + axis behavior
   - Tooltip model
   - Multi-series color logic
   
2. **Multi-series comparison line chart**
   - Legend placement
   - Line weight hierarchy
   - Focus state behavior
   
3. **Stacked area trend**
   - Fill opacity rules
   - Zero-baseline logic
   - Stack order conventions
   
4. **Histogram / distribution**
   - Bin sizing rules
   - Overlay options (mean, median lines)
   - Color for frequency intensity
   
5. **Throughput bar comparison**
   - Horizontal vs vertical rules
   - Grouping logic
   - Negative value treatment
   
6. **Status timeline (health bands)**
   - State color mapping
   - Band height rules
   - Transition visualization

### For Each Chart:
- Figma mockup (with annotations)
- Usage guidelines doc
- Accessibility notes
- Interaction specification

### Success Metric
A developer could implement these charts from your spec alone.

---

## Week 3: Implementation (Vega)

### Deliverables (4 charts implemented)
Choose 4 of the 6 to build:
- High-density time-series (required — foundational)
- Multi-series comparison (required — most common)
- Status timeline (recommended — distinctive)
- One of: histogram, stacked area, or throughput bar

### Requirements:
- Dynamic data updates
- Tooltip implementation
- Multiple series support
- Dark mode rendering
- Clean, readable code

### Tech Stack:
- Vega or Vega-Lite
- Vanilla JavaScript (no framework)
- SVG rendering
- Static HTML demo page

### Success Metric
Charts work with sample data, look professional, match the design spec.

---

## Week 4: Documentation + Polish

### Deliverables
1. **Case study write-up**
   - Problem
   - Audience
   - Design process
   - Principles
   - Implementation choices
   - Reflection
   
2. **Demo page polish**
   - Simple static site
   - Show all 4 charts
   - Toggle dark/light mode
   - Real-ish sample data
   
3. **README finalization**
   - Clear project description
   - Screenshots
   - How to run
   - Philosophy summary
   
4. **GitHub repo setup**
   - Clean commit history
   - Organized folder structure
   - Descriptive READMEs in subfolders

### Success Metric
Anyone landing on the repo or case study immediately understands the intent and your capability.

---

## Key Milestones

| Week | Milestone | Outcome |
|------|-----------|---------|
| 1 | Philosophy + foundations complete | Design system primitives defined |
| 2 | All 6 charts designed | Spec-ready for implementation |
| 3 | 4 charts implemented | Code proof exists |
| 4 | Portfolio case study published | Project is shippable |

---

## Critical Success Factors

### 1. Design Clarity
The visual system must be **obviously well-thought-out**. This is what signals senior-level thinking.

### 2. Restraint
Less is more. Don't over-design. Let the clarity of the system speak for itself.

### 3. Implementation Credibility
The code doesn't need to be production-ready, but it should look like you know what you're doing. Clean, commented, logical.

### 4. Portfolio Presentation
The case study narrative is as important as the work itself. Frame it well.

---

## Scope Boundaries

### In Scope
- Design system definition
- Visual standards doc
- 6 chart primitives (designed)
- 4 chart primitives (implemented)
- Case study + demo page

### Out of Scope
- npm package publishing
- Full test coverage
- Build tooling / bundling complexity
- Responsive mobile design
- Real backend integration
- Comprehensive charting library

---

## Risk Mitigation

### Risk: Overbuilding
**Mitigation**: Timebox each week. If Week 1 runs long, cut scope in Week 3.

### Risk: Vega learning curve
**Mitigation**: Start with simplest chart first. Use Observable examples as reference.

### Risk: Perfectionism
**Mitigation**: "Portfolio-ready" ≠ "pixel-perfect." Aim for 85% polish, ship it.

### Risk: Portfolio framing
**Mitigation**: Write the case study narrative as you go. Don't leave it until Week 4.

---

## Next Actions

1. **Set up Figma file** for visual foundations
2. **Start color palette** exploration (muted, dark-mode-first)
3. **Research Vega examples** to understand syntax
4. **Draft typography scale** (code-friendly fonts)

---

## Portfolio Positioning

This project demonstrates:
- **Systems thinking** (not just one chart, but a whole grammar)
- **Design depth** (visual foundations + principles)
- **Implementation skill** (working code, not just mockups)
- **Audience understanding** (operational users ≠ business users)
- **Communication** (written thesis, clear docs)

It positions you for roles like:
- Sr Data Graphics Designer
- Design Engineer (data vis focus)
- Data Visualization Engineer
- Design Systems Designer (data products)

---

## Resources

### Inspiration
- [Grafana](https://grafana.com) — operational monitoring UX
- [Observable Plot](https://observablehq.com/plot/) — declarative grammar
- [Tufte's principles](https://www.edwardtufte.com/) — maximize data-ink ratio
- [Viridis colormap](https://cran.r-project.org/web/packages/viridis/) — perceptually uniform

### Technical
- [Vega documentation](https://vega.github.io/vega/)
- [Vega-Lite examples](https://vega.github.io/vega-lite/examples/)
- [ColorBrewer](https://colorbrewer2.org/) — data-vis color palettes
- [SVG MDN reference](https://developer.mozilla.org/en-US/docs/Web/SVG)

---

**Start Date**: [TBD]  
**Target Completion**: [TBD + 4 weeks]  
**Portfolio Launch**: [TBD + 5 weeks]
