# Vega vs Vega-Lite: A Comparison

## The Same Time-Series Chart in Both

---

## Vega-Lite (High-Level)

**~30 lines of JSON**

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 800,
  "height": 200,
  "background": "#1a1a1a",
  
  "data": {
    "values": [
      {"time": "2024-01-01T00:00:00Z", "value": 45},
      {"time": "2024-01-01T01:00:00Z", "value": 52},
      {"time": "2024-01-01T02:00:00Z", "value": 48}
    ]
  },
  
  "mark": {
    "type": "line",
    "strokeWidth": 1.5,
    "color": "#60a5fa"
  },
  
  "encoding": {
    "x": {
      "field": "time",
      "type": "temporal",
      "axis": {
        "title": null,
        "gridColor": "#2a2a2a",
        "labelColor": "#888888"
      }
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "axis": {
        "title": "Value",
        "gridColor": "#2a2a2a",
        "labelColor": "#888888"
      }
    }
  }
}
```

**What it does automatically:**
- ✅ Creates scales
- ✅ Calculates axis domains
- ✅ Positions axes
- ✅ Generates tick marks
- ✅ Handles tooltips

---

## Full Vega (Low-Level)

**~120 lines of JSON**

```json
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 800,
  "height": 200,
  "padding": 5,
  "background": "#1a1a1a",
  
  "data": [
    {
      "name": "table",
      "values": [
        {"time": "2024-01-01T00:00:00Z", "value": 45},
        {"time": "2024-01-01T01:00:00Z", "value": 52},
        {"time": "2024-01-01T02:00:00Z", "value": 48}
      ],
      "transform": [
        {"type": "formula", "expr": "toDate(datum.time)", "as": "time_parsed"}
      ]
    }
  ],
  
  "scales": [
    {
      "name": "x",
      "type": "time",
      "range": "width",
      "domain": {"data": "table", "field": "time_parsed"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "zero": false,
      "domain": {"data": "table", "field": "value"}
    }
  ],
  
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "grid": true,
      "gridColor": "#2a2a2a",
      "gridOpacity": 0.5,
      "labelColor": "#888888",
      "tickColor": "#888888",
      "domainColor": "#2a2a2a",
      "title": null,
      "labelFont": "Inter, system-ui, sans-serif",
      "labelFontSize": 10
    },
    {
      "orient": "left",
      "scale": "y",
      "grid": true,
      "gridColor": "#2a2a2a",
      "gridOpacity": 0.5,
      "labelColor": "#888888",
      "tickColor": "#888888",
      "domainColor": "#2a2a2a",
      "title": "Value",
      "titleColor": "#888888",
      "labelFont": "JetBrains Mono, Monaco, monospace",
      "labelFontSize": 10,
      "titleFont": "Inter, system-ui, sans-serif",
      "titleFontSize": 11
    }
  ],
  
  "marks": [
    {
      "type": "line",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "time_parsed"},
          "y": {"scale": "y", "field": "value"},
          "stroke": {"value": "#60a5fa"},
          "strokeWidth": {"value": 1.5}
        },
        "update": {
          "opacity": {"value": 1}
        },
        "hover": {
          "opacity": {"value": 0.7}
        }
      }
    }
  ]
}
```

**What you gain:**
- ✅ Explicit control over every scale property
- ✅ Custom axis formatting (fonts, sizes, colors)
- ✅ Multiple encode states (enter, update, hover, exit)
- ✅ Signals for interaction
- ✅ Custom transformations
- ✅ Layering control

---

## Key Differences

| Aspect | Vega-Lite | Full Vega |
|--------|-----------|-----------|
| **Lines of code** | ~30 | ~120 |
| **Learning curve** | 1-2 hours | 4-6 hours |
| **Control** | Opinionated defaults | Everything explicit |
| **Scales** | Auto-generated | Manual definition |
| **Axes** | Auto-positioned | Manual configuration |
| **Interaction** | Limited | Full signal/event system |
| **Custom marks** | Not possible | Full control |
| **Portfolio signal** | "I can use tools" | "I understand visualization systems" |

---

## When to Use Each

### Use Vega-Lite When:
- Prototyping quickly
- Standard chart types are sufficient
- You want concise specs
- You're okay with opinionated defaults

### Use Full Vega When:
- You need pixel-perfect control
- Building a design system
- Custom interactions matter
- You want to demonstrate technical depth

---

## For Your Project: Full Vega

**Why it's better for you:**

1. **Demonstrates systems thinking**  
   You're defining scales, axes, marks explicitly → shows you understand the primitives

2. **Design system alignment**  
   You need precise control over typography, spacing, colors → Vega gives you that

3. **Portfolio differentiation**  
   Most designers use high-level tools. Full Vega shows deeper capability.

4. **Reusability**  
   You can template Vega specs → becomes a true design system implementation

5. **Interview signal**  
   "I built this in full Vega" > "I used Vega-Lite"

---

## The Learning Path

### Step 1: Understand the Structure (30 min)
- Data
- Scales
- Axes
- Marks
- Signals

### Step 2: Build First Chart (2 hours)
- Time-series line chart
- Dark mode styling
- Custom axes

### Step 3: Add Interaction (2 hours)
- Tooltips
- Hover states
- Click events

### Step 4: Template It (1 hour)
- Extract reusable config
- Create pattern library

**Total: ~6 hours to fluency**

---

## Next Steps

1. Set up first working Vega chart (time-series)
2. Create reusable config template
3. Document the pattern
4. Replicate for other 5 charts
