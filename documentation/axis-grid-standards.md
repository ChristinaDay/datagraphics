# Axis & Grid Standards: Operational Data Graphics

## Philosophy

Axes and grids in operational graphics should:
- **Guide the eye** without dominating
- **Enable precise reading** of values
- **Stay consistent** across all chart types
- **Fade into the background** (infrastructure, not decoration)

---

## Axis Anatomy

Every axis has these components:
1. **Domain line** (the main axis line)
2. **Tick marks** (small lines indicating scale divisions)
3. **Tick labels** (numbers or categories)
4. **Axis title** (what this axis represents)
5. **Grid lines** (optional, extending into chart area)

---

## Color Standards

### Dark Mode (Primary)
```
Domain line:  #2a2a2a  (muted gray, 1px solid)
Tick marks:   #2a2a2a  (same as domain)
Tick labels:  #888888  (tertiary text)
Axis title:   #a0a0a0  (secondary text)
Grid lines:   #2a2a2a  at 50% opacity (subtle)
```

### Light Mode (Future)
```
Domain line:  #d4d4d4
Tick marks:   #d4d4d4
Tick labels:  #6b7280
Axis title:   #404040
Grid lines:   #e5e5e5  at 80% opacity
```

---

## Typography Standards

### Axis Titles
```
Font:   Inter, system-ui, sans-serif
Size:   11px
Weight: 500 (medium)
Color:  #a0a0a0
Case:   Sentence case (not all caps)
```

**Examples:**
- ✓ "CPU Usage (%)"
- ✓ "Requests per Second"
- ✗ "CPU USAGE (%)" (too loud)

### Tick Labels
```
Font:   JetBrains Mono, Consolas, monospace (for numbers)
        Inter, sans-serif (for categories/dates)
Size:   10px
Weight: 400 (regular)
Color:  #888888
```

**Rationale**: Monospace for numbers ensures alignment and readability in dense contexts.

---

## Bottom Axis (X-Axis)

### Standard Configuration
```json
{
  "orient": "bottom",
  "scale": "x",
  "title": null,  // Usually no title on bottom
  
  "domainColor": "#2a2a2a",
  "domainWidth": 1,
  
  "tickColor": "#2a2a2a",
  "tickSize": 5,
  "tickCount": 8,  // Suggestion, Vega adjusts
  
  "labelColor": "#888888",
  "labelFont": "Inter, system-ui, sans-serif",
  "labelFontSize": 10,
  "labelPadding": 8,
  "labelFlush": true,  // Aligns first/last labels to edges
  
  "grid": false  // Usually no vertical gridlines
}
```

### When to Add Title
Only if axis context isn't obvious:
- ✓ Add title if showing unusual unit (e.g., "Unix Timestamp")
- ✗ Skip title if obvious (e.g., time-series date axis)

### Time Axis Formatting
```json
{
  "format": "%I:%M %p"  // Example: "02:30 PM"
}
```

**Common formats:**
- `%Y-%m-%d` → 2024-01-15
- `%b %d` → Jan 15
- `%I:%M %p` → 02:30 PM
- `%H:%M` → 14:30

---

## Left Axis (Y-Axis)

### Standard Configuration
```json
{
  "orient": "left",
  "scale": "y",
  "title": "Metric Name (Unit)",
  "titleColor": "#a0a0a0",
  "titleFont": "Inter, system-ui, sans-serif",
  "titleFontSize": 11,
  "titleFontWeight": 500,
  "titlePadding": 12,
  
  "domainColor": "#2a2a2a",
  "domainWidth": 1,
  
  "tickColor": "#2a2a2a",
  "tickSize": 5,
  "tickCount": 5,  // Fewer ticks than x-axis
  
  "labelColor": "#888888",
  "labelFont": "JetBrains Mono, Consolas, Monaco, monospace",
  "labelFontSize": 10,
  "labelPadding": 8,
  
  "grid": true,
  "gridColor": "#2a2a2a",
  "gridOpacity": 0.5,
  "gridDash": [1, 3]  // Subtle dotted line
}
```

### Title Guidelines
Always include y-axis title with unit:
- ✓ "CPU Usage (%)"
- ✓ "Latency (ms)"
- ✓ "Requests/sec"
- ✗ "CPU" (missing unit)

---

## Grid Lines

### When to Use Grids

| Axis | Use Grid? | Rationale |
|------|-----------|-----------|
| **Y-axis** | ✓ Yes (always) | Helps read precise values horizontally |
| **X-axis** | ✗ No (usually) | Vertical lines create visual noise |

**Exceptions:**
- Use X-grid for heatmaps or gantt-style charts
- Skip Y-grid for bar charts where bar top is clear

### Grid Styling
```json
{
  "grid": true,
  "gridColor": "#2a2a2a",
  "gridOpacity": 0.5,
  "gridDash": [1, 3]  // 1px dash, 3px gap
}
```

**Rationale:**
- **Dashed** (not solid): Less visual weight
- **50% opacity**: Fades into background
- **Same color as domain**: Consistent family

### Grid Density
```
Ideal: 4-6 horizontal gridlines per chart
Maximum: 8 gridlines
Minimum: 3 gridlines
```

**Vega auto-calculates** based on `tickCount` (suggestion only).

---

## Zero Baseline

### When to Include Zero

| Chart Type | Include Zero? | Rationale |
|------------|---------------|-----------|
| Bar chart | ✓ Always | Bars must start at zero (visual integrity) |
| Stacked area | ✓ Always | Part-to-whole requires zero baseline |
| Line chart | ✗ Usually not | CPU at 40-60% doesn't need to show 0% |
| Histogram | ✓ Always | Frequency counts start at zero |

### Implementation
```json
{
  "scales": [
    {
      "name": "y",
      "type": "linear",
      "zero": true  // or false
    }
  ]
}
```

### Zero Line Styling (If Emphasized)
```json
{
  "marks": [
    {
      "type": "rule",
      "encode": {
        "update": {
          "y": {"scale": "y", "value": 0},
          "x": {"value": 0},
          "x2": {"signal": "width"},
          "stroke": {"value": "#a0a0a0"},
          "strokeWidth": {"value": 1}
        }
      }
    }
  ]
}
```

Use emphasized zero line for:
- Charts showing positive/negative values
- Charts where zero crossing is meaningful

---

## Tick Mark Standards

### Tick Count Guidelines
```
Bottom axis (X): 6-10 ticks (more room horizontally)
Left axis (Y):   4-6 ticks (less room vertically)
```

### Tick Size
```
Standard: 5px (extends from axis line)
```

### Tick Alignment
- **Bottom axis**: Ticks extend downward
- **Left axis**: Ticks extend leftward
- **Top/Right axes**: Rarely used in operational contexts

---

## Axis Positioning

### Standard Layout
```
Primary Y-axis:   Left
Primary X-axis:   Bottom
Secondary Y-axis: Right (only if comparing different units)
Secondary X-axis: Never (use small multiples instead)
```

### Multi-Axis Charts (Use Sparingly)
If you must show two Y-axes (different units):
```json
{
  "axes": [
    {
      "orient": "left",
      "scale": "y1",
      "title": "Requests/sec",
      "titleColor": "#60a5fa"  // Match line color
    },
    {
      "orient": "right",
      "scale": "y2",
      "title": "Latency (ms)",
      "titleColor": "#34d399"  // Match line color
    }
  ]
}
```

**Better alternative**: Use small multiples (two separate charts stacked).

---

## Number Formatting

### Format Rules
```
Integers:       1,234 (with comma separators)
Decimals:       1,234.5 (one decimal if needed)
Percentages:    45% (no decimals unless <1%)
Currency:       $1.2M (abbreviated for large numbers)
Scientific:     Avoid (use SI prefixes: 1.2M not 1.2e6)
```

### SI Prefix Abbreviations
```
1,000       → 1K
1,000,000   → 1M
1,000,000,000 → 1B
```

**Vega Implementation:**
```json
{
  "axes": [
    {
      "orient": "left",
      "format": "~s"  // SI prefix formatting
    }
  ]
}
```

---

## Axis Scale Types

### Linear Scale (Most Common)
```json
{
  "name": "y",
  "type": "linear",
  "range": "height",
  "domain": {"data": "table", "field": "value"},
  "nice": true,  // Round to nice numbers
  "zero": false
}
```

**Use for**: Continuous numeric data (CPU %, latency, counts)

### Time Scale
```json
{
  "name": "x",
  "type": "time",
  "range": "width",
  "domain": {"data": "table", "field": "timestamp"}
}
```

**Use for**: Timestamps, dates

### Band Scale (For Categories)
```json
{
  "name": "x",
  "type": "band",
  "range": "width",
  "domain": {"data": "table", "field": "category"},
  "padding": 0.2  // Gap between bars
}
```

**Use for**: Bar charts with discrete categories

### Log Scale (Rare)
```json
{
  "name": "y",
  "type": "log",
  "base": 10,
  "range": "height",
  "domain": {"data": "table", "field": "value"}
}
```

**Use for**: Data spanning multiple orders of magnitude (1 to 1,000,000)

**Warning**: Only use if audience understands logarithmic scales.

---

## Responsive Axis Behavior

### Mobile (< 768px)
```
Tick count: Reduce by 30-40%
Font size: Keep same (10px min for readability)
Axis titles: Abbreviate if needed
Padding: Reduce slightly (50px left instead of 60px)
```

### Tick Label Rotation (Avoid If Possible)
```json
{
  "labelAngle": -45,  // Last resort for long labels
  "labelAlign": "right"
}
```

**Better alternatives:**
- Abbreviate labels
- Use horizontal bars instead of vertical
- Increase chart width

---

## Axis Examples by Chart Type

### Time-Series Line Chart
```json
{
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "title": null,
      "format": "%I:%M %p",
      "grid": false
    },
    {
      "orient": "left",
      "scale": "y",
      "title": "CPU Usage (%)",
      "grid": true,
      "tickCount": 5
    }
  ]
}
```

### Bar Chart (Vertical)
```json
{
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "title": null,
      "grid": false,
      "labelAngle": 0  // Keep horizontal
    },
    {
      "orient": "left",
      "scale": "y",
      "title": "Requests",
      "grid": true,
      "tickCount": 5
    }
  ]
}
```

### Histogram
```json
{
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "title": "Latency (ms)",
      "grid": false
    },
    {
      "orient": "left",
      "scale": "y",
      "title": "Frequency",
      "grid": true,
      "tickCount": 5
    }
  ]
}
```

---

## Common Mistakes to Avoid

### ❌ Too Many Gridlines
**Bad**: 15 horizontal gridlines → visual clutter
**Good**: 5-6 gridlines → clean and readable

### ❌ Vertical Gridlines on Time-Series
**Bad**: Gridlines on both axes
**Good**: Horizontal only (for reading values)

### ❌ No Axis Title
**Bad**: Y-axis with just numbers (what do they mean?)
**Good**: "CPU Usage (%)" tells the whole story

### ❌ Inconsistent Fonts
**Bad**: Different fonts on each axis
**Good**: Monospace for numbers, sans-serif for text (consistent system)

### ❌ High Contrast Axes
**Bad**: Bright white or colored axis lines
**Good**: Muted `#2a2a2a` fades into background

---

## Quick Reference

| Element | Value | Token |
|---------|-------|-------|
| Domain line color | `#2a2a2a` | `border-strong` |
| Domain line width | `1px` | — |
| Tick color | `#2a2a2a` | `border-strong` |
| Tick size | `5px` | — |
| Tick label color | `#888888` | `text-tertiary` |
| Tick label font | Mono (numbers), Sans (text) | — |
| Tick label size | `10px` | `text-xs` |
| Axis title color | `#a0a0a0` | `text-secondary` |
| Axis title size | `11px` | `text-sm` |
| Grid color | `#2a2a2a` | `border-strong` |
| Grid opacity | `50%` | — |
| Grid dash | `[1, 3]` | — |

---

## Vega Template

Complete axis configuration template:

```json
{
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "title": null,
      "titleColor": "#a0a0a0",
      "titleFont": "Inter, system-ui, sans-serif",
      "titleFontSize": 11,
      "titleFontWeight": 500,
      "titlePadding": 12,
      
      "labelColor": "#888888",
      "labelFont": "Inter, system-ui, sans-serif",
      "labelFontSize": 10,
      "labelPadding": 8,
      "labelFlush": true,
      
      "tickColor": "#2a2a2a",
      "tickSize": 5,
      "tickCount": 8,
      
      "domainColor": "#2a2a2a",
      "domainWidth": 1,
      
      "grid": false
    },
    {
      "orient": "left",
      "scale": "y",
      "title": "Value",
      "titleColor": "#a0a0a0",
      "titleFont": "Inter, system-ui, sans-serif",
      "titleFontSize": 11,
      "titleFontWeight": 500,
      "titlePadding": 12,
      
      "labelColor": "#888888",
      "labelFont": "JetBrains Mono, Consolas, Monaco, monospace",
      "labelFontSize": 10,
      "labelPadding": 8,
      
      "tickColor": "#2a2a2a",
      "tickSize": 5,
      "tickCount": 5,
      
      "domainColor": "#2a2a2a",
      "domainWidth": 1,
      
      "grid": true,
      "gridColor": "#2a2a2a",
      "gridOpacity": 0.5,
      "gridDash": [1, 3]
    }
  ]
}
```

---

This ensures consistent, professional axes across all 6 chart primitives.
