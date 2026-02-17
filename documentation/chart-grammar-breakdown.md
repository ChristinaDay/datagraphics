# Grammar of Graphics: Chart Primitive Breakdown

This document decomposes each chart type into its Grammar of Graphics components. Use this to:
- Guide design decisions in Figma
- Write implementation specs for Vega
- Ensure systematic thinking across all charts

---

## Grammar of Graphics Layers

Every chart is composed of:

1. **Data** → Raw structure (what fields exist)
2. **Transform** → Data manipulation (filter, aggregate, calculate, bin)
3. **Mark** → Visual element (line, bar, area, point, rect, rule)
4. **Encoding** → Mapping data to visual properties (x, y, color, size, opacity)
5. **Scale** → Data-to-visual mapping functions (linear, log, time, ordinal)
6. **Guides** → Axes, legends, gridlines
7. **Interaction** → Tooltips, hover, zoom, selection

---

## 1. High-Density Time-Series Line Chart

### Purpose
Show continuous metric changes over time with minimal visual noise.

### Use Cases
- CPU/memory usage over hours/days
- Request latency trends
- Throughput monitoring
- Error rate tracking

### Data Structure
```json
[
  {"timestamp": "2024-01-01T00:00:00Z", "value": 45.2},
  {"timestamp": "2024-01-01T01:00:00Z", "value": 52.1},
  ...
]
```

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | Time-series with timestamp + quantitative value |
| **Transform** | None (unless aggregating by time window) |
| **Mark** | `line` (continuous stroke, no points) |
| **Encoding** | • `x` ← timestamp (temporal)<br>• `y` ← value (quantitative) |
| **Scale** | • x: time scale (auto tick intervals)<br>• y: linear (zero-baseline optional) |
| **Guides** | • Gridlines: horizontal only (muted)<br>• Axis labels: minimal, monospace<br>• Zero line: accent if meaningful |

### Design Decisions

**Line Weight**: 1.5px (visible but not heavy)

**Points**: None (creates visual noise at high density)

**Color**: Single muted color (e.g., `#60a5fa`)

**Gridlines**: Horizontal only, `#2a2a2a` in dark mode

**Zero Baseline**: Only if zero is meaningful (e.g., error rate yes, temperature no)

**Tooltip**: Show exact timestamp + value on hover

### When NOT to Use
- Categorical x-axis (use bar chart)
- Comparing >5 series (too cluttered)
- Discrete events (use timeline)

### Vega-Lite Implementation Notes
```json
{
  "mark": {"type": "line", "strokeWidth": 1.5, "point": false},
  "encoding": {
    "x": {"field": "timestamp", "type": "temporal"},
    "y": {"field": "value", "type": "quantitative", "scale": {"zero": false}}
  }
}
```

---

## 2. Multi-Series Comparison Line Chart

### Purpose
Compare 2-5 related metrics over time (e.g., prod vs staging latency).

### Use Cases
- Environment comparison (prod/staging/dev)
- Regional metrics (US/EU/APAC)
- Service comparison (API A vs B vs C)

### Data Structure
```json
[
  {"timestamp": "2024-01-01T00:00:00Z", "metric": "cpu", "value": 45},
  {"timestamp": "2024-01-01T00:00:00Z", "metric": "memory", "value": 62},
  ...
]
```
Or wide format:
```json
[
  {"timestamp": "2024-01-01T00:00:00Z", "cpu": 45, "memory": 62},
  ...
]
```

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | Time-series with timestamp + metric identifier + value |
| **Transform** | `fold` (if using wide format) to convert to long format |
| **Mark** | `line` (one per series) |
| **Encoding** | • `x` ← timestamp (temporal)<br>• `y` ← value (quantitative)<br>• `color` ← metric (nominal) |
| **Scale** | • x: time scale<br>• y: linear (shared across series)<br>• color: categorical palette (3-5 muted colors) |
| **Guides** | • Legend: top-right or bottom<br>• Gridlines: horizontal, muted<br>• All series share y-axis (for comparison) |

### Design Decisions

**Max Series**: 5 (beyond that, use small multiples)

**Color Palette**: Muted, distinguishable hues
- Series 1: `#60a5fa` (blue)
- Series 2: `#34d399` (green)
- Series 3: `#fbbf24` (amber)
- Series 4: `#a78bfa` (purple)
- Series 5: `#f87171` (red)

**Line Weight**: 1.5px all equal (no hierarchy unless intentional)

**Legend**: Horizontal list, top-right, same colors as lines

**Interaction**: Hover highlights one series, dims others (opacity 0.2)

**Shared Y-Axis**: Always. If scales differ dramatically, use small multiples instead.

### When NOT to Use
- >5 series (use small multiples or facets)
- Different units (can't share y-axis)
- Sparse data (lines will be jumpy)

### Vega-Lite Implementation Notes
```json
{
  "mark": {"type": "line", "strokeWidth": 1.5},
  "encoding": {
    "x": {"field": "timestamp", "type": "temporal"},
    "y": {"field": "value", "type": "quantitative"},
    "color": {
      "field": "metric",
      "type": "nominal",
      "scale": {"range": ["#60a5fa", "#34d399", "#fbbf24"]}
    },
    "opacity": {
      "condition": {"param": "hover", "value": 1},
      "value": 0.2
    }
  }
}
```

---

## 3. Stacked Area Trend

### Purpose
Show part-to-whole relationships over time (e.g., traffic by source, storage by type).

### Use Cases
- Resource allocation (compute/storage/network)
- Traffic sources (organic/paid/direct)
- Error breakdown by type

### Data Structure
```json
[
  {"timestamp": "2024-01-01T00:00:00Z", "category": "compute", "value": 120},
  {"timestamp": "2024-01-01T00:00:00Z", "category": "storage", "value": 80},
  ...
]
```

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | Time-series with timestamp + category + value |
| **Transform** | Stack transform (cumulative sum by timestamp) |
| **Mark** | `area` (filled regions) |
| **Encoding** | • `x` ← timestamp (temporal)<br>• `y` ← value (quantitative, stacked)<br>• `color` ← category (nominal) |
| **Scale** | • x: time scale<br>• y: linear, zero baseline (required for stacking)<br>• color: categorical palette |
| **Guides** | • Zero baseline: always visible<br>• Legend: category colors<br>• Gridlines: horizontal |

### Design Decisions

**Stack Order**: Bottom-to-top by importance or alphabetical (consistent)

**Fill Opacity**: 0.7-0.9 (solid enough to see, translucent enough for texture)

**Stroke**: 1px between areas (optional, helps distinguish)

**Zero Baseline**: Required (stacked areas must start at zero)

**Color**: Use sequential or categorical palette, not status colors

**Interaction**: Hover shows exact values per category

### When NOT to Use
- Comparing trends (use multi-line instead)
- Negative values (use diverging bar chart)
- Many categories (>6 becomes unreadable)

### Vega-Lite Implementation Notes
```json
{
  "mark": {"type": "area", "opacity": 0.8},
  "encoding": {
    "x": {"field": "timestamp", "type": "temporal"},
    "y": {"field": "value", "type": "quantitative", "stack": "zero"},
    "color": {"field": "category", "type": "nominal"}
  }
}
```

---

## 4. Histogram / Distribution

### Purpose
Show frequency distribution of a continuous variable (e.g., response times, error counts).

### Use Cases
- Latency distribution (p50, p95, p99)
- Request size distribution
- Error frequency by hour
- Resource usage distribution

### Data Structure
```json
[
  {"value": 23.4},
  {"value": 45.1},
  {"value": 12.8},
  ...
]
```
(Binning happens in the transform)

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | List of continuous values |
| **Transform** | `bin` (group into intervals) + `aggregate` (count per bin) |
| **Mark** | `bar` (rectangle for each bin) |
| **Encoding** | • `x` ← binned value (quantitative)<br>• `y` ← count (quantitative) |
| **Scale** | • x: linear (bin edges)<br>• y: linear, zero baseline |
| **Guides** | • Gridlines: horizontal (for count)<br>• Bin labels: show ranges<br>• Overlay: optional mean/median lines |

### Design Decisions

**Bin Count**: Auto-calculate (Sturges' rule) or ~20-30 bins

**Bar Gap**: 0px (bars touch) or 1px (slight separation)

**Fill Color**: Single muted color, or gradient by density

**Zero Baseline**: Always (frequency must start at zero)

**Overlay**: Optional `rule` marks for mean, median, percentiles

**Tooltip**: Show bin range + count

### When NOT to Use
- Categorical data (use bar chart)
- Time-series trends (use line chart)
- Small sample sizes (<30 values)

### Vega-Lite Implementation Notes
```json
{
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "value",
      "type": "quantitative",
      "bin": {"maxbins": 30}
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative"
    }
  }
}
```

**Add percentile lines:**
```json
{
  "layer": [
    {"mark": "bar", "encoding": {...}},
    {
      "mark": {"type": "rule", "color": "#fbbf24", "strokeDash": [4,2]},
      "encoding": {
        "x": {"aggregate": "median", "field": "value"}
      }
    }
  ]
}
```

---

## 5. Throughput Bar Comparison

### Purpose
Compare discrete quantities across categories (e.g., records processed by pipeline, requests by endpoint).

### Use Cases
- Pipeline throughput comparison
- API endpoint volume
- Error count by service
- Job completion by region

### Data Structure
```json
[
  {"category": "pipeline-a", "value": 12500},
  {"category": "pipeline-b", "value": 8200},
  ...
]
```

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | Category + quantitative value |
| **Transform** | Optional: sort by value (descending) |
| **Mark** | `bar` (horizontal or vertical) |
| **Encoding** | • `x` ← category (nominal) or value (quantitative)<br>• `y` ← value (quantitative) or category (nominal)<br>• `color` ← status (optional, semantic) |
| **Scale** | • quantitative: linear, zero baseline<br>• nominal: band scale (equal width bars) |
| **Guides** | • Gridlines: perpendicular to value axis<br>• Labels: category names<br>• Values: show at bar end or in tooltip |

### Design Decisions

**Orientation**: 
- Vertical: ≤6 categories, short labels
- Horizontal: >6 categories or long labels

**Bar Width**: 60-80% of available space (some gap between bars)

**Color**: 
- Single color (comparison)
- Status color (semantic: green = success, red = error)

**Sort Order**: By value (descending) for easy ranking

**Zero Baseline**: Always (bars must start at zero)

**Negative Values**: If present, use diverging layout (zero in middle)

### When NOT to Use
- Time-series data (use line chart)
- Part-to-whole (use stacked bar or pie)
- Continuous distribution (use histogram)

### Vega-Lite Implementation Notes

**Vertical bars:**
```json
{
  "mark": "bar",
  "encoding": {
    "x": {"field": "category", "type": "nominal", "sort": "-y"},
    "y": {"field": "value", "type": "quantitative"}
  }
}
```

**Horizontal bars (better for long labels):**
```json
{
  "mark": "bar",
  "encoding": {
    "x": {"field": "value", "type": "quantitative"},
    "y": {"field": "category", "type": "nominal", "sort": "-x"}
  }
}
```

---

## 6. Status Timeline (Health Bands)

### Purpose
Show system/service health states over time (e.g., uptime, incident timeline, deployment status).

### Use Cases
- Service uptime visualization
- Incident timeline
- Deployment success/failure
- Data quality status by hour

### Data Structure
```json
[
  {"start": "2024-01-01T00:00:00Z", "end": "2024-01-01T02:00:00Z", "status": "healthy"},
  {"start": "2024-01-01T02:00:00Z", "end": "2024-01-01T02:30:00Z", "status": "degraded"},
  {"start": "2024-01-01T02:30:00Z", "end": "2024-01-01T05:00:00Z", "status": "error"},
  ...
]
```

### Grammar Breakdown

| Layer | Specification |
|-------|--------------|
| **Data** | Time ranges with start, end, status |
| **Transform** | Optional: calculate duration |
| **Mark** | `rect` (rectangles spanning time intervals) |
| **Encoding** | • `x` ← start (temporal)<br>• `x2` ← end (temporal)<br>• `y` ← category/service (nominal)<br>• `color` ← status (nominal, semantic) |
| **Scale** | • x: time scale<br>• y: band scale (if multiple services)<br>• color: status palette (green/amber/red) |
| **Guides** | • Gridlines: vertical (time markers)<br>• Legend: status colors<br>• Height: uniform per service |

### Design Decisions

**Band Height**: 20-40px (enough to see, compact)

**Status Colors**:
- `healthy`: `#34d399` (green)
- `warning/degraded`: `#fbbf24` (amber)
- `error/down`: `#f87171` (red)
- `unknown`: `#6b7280` (gray)

**Gaps Between States**: 0px (continuous timeline)

**Multi-Service**: Stack vertically, share x-axis (time)

**Tooltip**: Show start time, end time, duration, status

**Interaction**: Click to filter/zoom into incident

### When NOT to Use
- Continuous metrics (use line chart)
- Comparing quantities (use bar chart)
- Point-in-time events (use scatter plot or event markers)

### Vega-Lite Implementation Notes

This requires **full Vega** or custom Vega-Lite with `rect` mark and `x2` encoding:

```json
{
  "mark": "rect",
  "encoding": {
    "x": {"field": "start", "type": "temporal"},
    "x2": {"field": "end"},
    "y": {"field": "service", "type": "nominal"},
    "color": {
      "field": "status",
      "type": "nominal",
      "scale": {
        "domain": ["healthy", "warning", "error", "unknown"],
        "range": ["#34d399", "#fbbf24", "#f87171", "#6b7280"]
      }
    }
  }
}
```

**Alternative**: Use `bar` mark with calculated duration (easier but less flexible).

---

## Summary Table: All 6 Charts

| Chart | Primary Mark | Key Encoding | Transform | Best For |
|-------|--------------|--------------|-----------|----------|
| **Time-Series Line** | `line` | x: time, y: value | None | Continuous trends |
| **Multi-Series Line** | `line` | x: time, y: value, color: series | fold | Comparing trends |
| **Stacked Area** | `area` | x: time, y: value (stacked), color: category | stack | Part-to-whole over time |
| **Histogram** | `bar` | x: value (binned), y: count | bin, aggregate | Distribution |
| **Bar Comparison** | `bar` | x: category, y: value | sort | Discrete comparison |
| **Status Timeline** | `rect` | x/x2: time range, color: status | None | State changes over time |

---

## Operational Design Constraints

Apply these rules across all 6 charts:

### Color System
- **Muted palette**: No saturated colors
- **Semantic color**: Green (good), amber (warning), red (error)
- **Categorical palette**: 5 distinct hues (blue, green, amber, purple, red)
- **Sequential**: Perceptually uniform (e.g., single-hue ramp)

### Typography
- **Axis labels**: 11-12px, sans-serif
- **Tick labels**: 10px, monospace (for numbers)
- **Titles**: 14px, sans-serif, medium weight

### Spacing
- **Padding**: 40px top, 60px bottom (for axis), 60px left (for labels), 20px right
- **Grid spacing**: Auto-calculate based on domain
- **Bar gaps**: 20% of bar width

### Gridlines
- **Weight**: 1px
- **Color**: `#2a2a2a` (dark mode), `#e5e5e5` (light mode)
- **Opacity**: 0.3-0.5

### Interaction
- **Tooltip delay**: 0ms (instant)
- **Hover feedback**: Highlight (opacity 1), dim others (opacity 0.2)
- **Transition**: 200ms ease (for data updates)

---

## Next Steps

1. **Design Phase**: Mockup each chart in Figma using these specs
2. **Documentation**: Write usage guidelines for each chart
3. **Implementation**: Start with Time-Series Line (simplest), end with Status Timeline (most complex)

This grammar breakdown gives you both **design clarity** and **implementation roadmap**.
