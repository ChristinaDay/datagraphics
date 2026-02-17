# Getting Started with Operational Data Graphics

## What's Been Set Up

You now have a complete foundation for your 4-week portfolio project:

### 📁 Project Structure
```
/Data Graphics
  ├── README.md                           # Project overview
  ├── GETTING-STARTED.md                  # This file
  │
  ├── /documentation
  │   ├── design-thesis.md                # Philosophy & design thinking
  │   ├── project-plan.md                 # 4-week timeline & milestones
  │   ├── chart-grammar-breakdown.md      # All 6 charts deconstructed
  │   ├── vega-structure-guide.md         # How to build Vega specs
  │   └── vega-vs-vega-lite.md           # Why full Vega was chosen
  │
  ├── /vega-implementations
  │   ├── index.html                      # Demo landing page
  │   ├── time-series-line.html          # Chart #1 (working example)
  │   └── config-template.js             # Reusable config for all charts
  │
  └── /.cursor/rules
      └── project-brief.mdc               # AI context (always applied)
```

---

## ✅ What's Complete

### Week 1 (Foundations) — 90% Complete
- [x] **Design thesis** written (comprehensive philosophy doc)
- [x] **Project plan** with 4-week timeline
- [x] **Grammar of Graphics breakdown** for all 6 charts
- [x] **Full Vega structure guide** (not Vega-Lite)
- [x] **First working implementation** (time-series line chart)
- [x] **Reusable config template** (colors, typography, axes)
- [x] **Color system** documented (categorical, status, sequential, diverging)
- [x] **Spacing system** documented (4px base unit, all scales)
- [x] **Axis + grid standards** documented (complete specs)
- [ ] Visual foundations in Figma (typography, color, spacing)

---

## 🎯 Next Steps

### Immediate (Next Session)
1. **View the working chart**
   - Open `vega-implementations/time-series-line.html` in a browser
   - Study the Vega spec (compare to structure guide)
   - Understand how config template can be reused

2. **Finalize visual foundations**
   - Open Figma
   - Define typography scale (reference: config-template.js)
   - Create color palette swatches
   - Document spacing system

3. **Design remaining 5 charts**
   - Follow chart-grammar-breakdown.md specs
   - Annotate with Grammar of Graphics layers
   - Create usage guidelines for each

### Week 2 (Design Phase)
- [ ] Mockup all 6 charts in Figma
- [ ] Write usage guidelines ("when to use / when not")
- [ ] Document interaction specifications
- [ ] Create design system deliverable (PDF or Figma export)

### Week 3 (Implementation Phase)
- [ ] Implement Chart #2: Multi-series comparison line
- [ ] Implement Chart #3 or #4: Stacked area OR histogram
- [ ] Implement Chart #5 or #6: Bar comparison OR status timeline
- [ ] Test with real-ish data
- [ ] Ensure dark mode consistency

### Week 4 (Documentation & Polish)
- [ ] Write portfolio case study
- [ ] Polish demo page (all 4 charts)
- [ ] Create GitHub repo
- [ ] Take screenshots
- [ ] Publish

---

## 📖 How to Use This Setup

### Understanding the Grammar Breakdown
Each chart in `documentation/chart-grammar-breakdown.md` is decomposed into:
- **Data structure** (what JSON format to expect)
- **Transform** (how to manipulate data)
- **Mark** (what visual element to draw)
- **Encoding** (how data maps to visuals)
- **Scale** (data-to-visual mapping function)
- **Design decisions** (line weight, colors, interaction)

**Use this as your design + implementation spec.**

### Using the Config Template
`vega-implementations/config-template.js` contains:
- Color system (categorical, status, sequential, diverging)
- Typography (fonts, sizes, weights)
- Axis defaults (bottom, left)
- Mark defaults (line, area, bar)
- Interaction states (hover, focus, unfocus)

**Import this into every chart to maintain consistency.**

### Building a New Chart
1. Read the grammar breakdown for that chart type
2. Copy `time-series-line.html` as starting point
3. Modify the data, scales, and marks
4. Apply config-template.js styles
5. Test with sample data

---

## 🔍 Key Files to Reference

| File | Purpose |
|------|---------|
| `design-thesis.md` | Your design philosophy (use in portfolio case study) |
| `chart-grammar-breakdown.md` | Implementation specs for all 6 charts |
| `vega-structure-guide.md` | How Vega works (data → scales → axes → marks) |
| `color-system.md` | Complete color palette with usage rules |
| `spacing-system.md` | 4px base unit, all spacing scales |
| `axis-grid-standards.md` | Axis configuration, grid rules, formatting |
| `config-template.js` | Reusable styles for consistency |
| `time-series-line.html` | Working example to learn from |

---

## 💡 Why Full Vega?

You chose **full Vega** (not Vega-Lite) because:
1. **More control** → Define every scale, axis, mark explicitly
2. **Systems thinking** → Shows you understand visualization primitives
3. **Portfolio signal** → More impressive than high-level abstractions
4. **Custom interactions** → Full signal/event system access

Trade-off: More code (~120 lines vs ~30 lines), but demonstrates deeper capability.

---

## 🎨 Design System Constraints

Apply these across all 6 charts:

### Color
- **Categorical**: `#60a5fa` (blue), `#34d399` (green), `#fbbf24` (amber), `#a78bfa` (purple), `#f87171` (red)
- **Status**: Green (healthy), amber (warning), red (error), gray (unknown)
- **Background**: `#1a1a1a` (chart), `#0d0d0d` (canvas)
- **Grid**: `#2a2a2a` at 50% opacity

### Typography
- **Sans-serif**: Inter (labels, titles)
- **Monospace**: JetBrains Mono (numbers)
- **Sizes**: Title (14px), axis title (11px), axis label (10px)

### Spacing
- **Padding**: 60px left, 40px bottom, 10px top, 20px right
- **Line weight**: 1.5px for primary marks
- **Grid dash**: `[1, 3]` (subtle dotted lines)

### Interaction
- **Hover**: Reduce opacity to 0.7
- **Transition**: 200ms ease
- **Tooltips**: Instant (0ms delay)

---

## 🚀 Running the Examples

### Method 1: Local File
Simply open `vega-implementations/index.html` or `time-series-line.html` in your browser.

### Method 2: Local Server (Recommended)
```bash
# Navigate to project root
cd "Data Graphics"

# Start a simple server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open browser to:
# http://localhost:8000/vega-implementations/
```

### Method 3: Vega Editor (for testing specs)
1. Go to https://vega.github.io/editor/
2. Paste your Vega JSON spec
3. See live preview + debugging

---

## 📝 Portfolio Framing

When presenting this project:

**What to emphasize:**
- "Built with full Vega to demonstrate understanding of visualization grammar"
- "Designed for operational contexts (data infrastructure teams)"
- "Systems-level thinking: defined primitives, then composed into charts"
- "Philosophy-first approach: design thesis before implementation"

**How to position:**
- Not a BI tool, but a design system proof
- Demonstrates both design depth AND implementation capability
- Shows understanding of audience (technical users ≠ business users)

---

## 🤔 Common Questions

### "Why not D3?"
**Answer:** D3 is incredibly powerful for custom visualizations, but for a design system, Vega's declarative specs are more maintainable and self-documenting. The JSON spec IS the implementation guide.

### "Why only 6 chart types?"
**Answer:** These 6 cover 90% of operational use cases. Quality over quantity — each chart is deeply considered rather than a shallow library of 50 types.

### "How long did this take?"
**Answer:** 4 weeks: 1 week foundations, 1 week design, 1 week implementation, 1 week documentation.

---

## 🔗 Resources

### Vega Documentation
- [Vega Docs](https://vega.github.io/vega/docs/)
- [Vega Examples](https://vega.github.io/vega/examples/)
- [Vega Editor](https://vega.github.io/editor/)

### Inspiration
- [Grafana](https://grafana.com) — Operational monitoring UX
- [Observable Plot](https://observablehq.com/plot/) — Declarative grammar
- [Tufte's Work](https://www.edwardtufte.com/) — Data-ink ratio principles

### Theory
- "The Grammar of Graphics" by Leland Wilkinson
- "A Layered Grammar of Graphics" by Hadley Wickham

---

## 📧 Questions?

Refer back to:
- `design-thesis.md` for philosophy questions
- `vega-structure-guide.md` for implementation questions
- `chart-grammar-breakdown.md` for design decisions

Or ask in your next session!

---

**You're now ready to start Week 1's visual foundations in Figma. 🎨**
