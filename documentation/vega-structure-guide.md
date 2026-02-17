# Full Vega: Structure Guide

This guide explains how to build Vega specs from scratch.

---

## Anatomy of a Vega Spec

Every Vega visualization has this structure:

```json
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  
  // 1. LAYOUT
  "width": 800,
  "height": 200,
  "padding": 5,
  "background": "#1a1a1a",
  
  // 2. DATA
  "data": [ ... ],
  
  // 3. SCALES
  "scales": [ ... ],
  
  // 4. AXES
  "axes": [ ... ],
  
  // 5. LEGENDS
  "legends": [ ... ],
  
  // 6. MARKS
  "marks": [ ... ],
  
  // 7. SIGNALS (interaction)
  "signals": [ ... ]
}
```

Let's break down each section.

---

## 1. Layout

```json
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 800,
  "height": 200,
  "padding": {"top": 20, "left": 60, "right": 20, "bottom": 40},
  "background": "#1a1a1a",
  "autosize": {"type": "fit", "contains": "padding"}
}
```

**Properties:**
- `width`, `height` → Chart dimensions (excludes padding)
- `padding` → Space for axes, labels (can be object or number)
- `background` → Canvas color
- `autosize` → Responsive behavior

---

## 2. Data

Data sources and transformations.

### Simple Inline Data
```json
"data": [
  {
    "name": "table",
    "values": [
      {"x": 1, "y": 10},
      {"x": 2, "y": 20}
    ]
  }
]
```

### Load from URL
```json
"data": [
  {
    "name": "table",
    "url": "data/metrics.json",
    "format": {"type": "json"}
  }
]
```

### With Transform
```json
"data": [
  {
    "name": "table",
    "values": [...],
    "transform": [
      {"type": "formula", "expr": "toDate(datum.timestamp)", "as": "date"},
      {"type": "filter", "expr": "datum.value > 0"}
    ]
  }
]
```

**Common Transforms:**
- `formula` → Calculate new field
- `filter` → Remove rows
- `aggregate` → Group and summarize
- `bin` → Create histogram bins
- `stack` → Stack values (for area/bar)

---

## 3. Scales

Map data values to visual values.

### Time Scale (for x-axis with dates)
```json
"scales": [
  {
    "name": "x",
    "type": "time",
    "range": "width",
    "domain": {"data": "table", "field": "date"}
  }
]
```

### Linear Scale (for y-axis with numbers)
```json
"scales": [
  {
    "name": "y",
    "type": "linear",
    "range": "height",
    "nice": true,
    "zero": false,
    "domain": {"data": "table", "field": "value"}
  }
]
```

### Ordinal Scale (for categories)
```json
"scales": [
  {
    "name": "color",
    "type": "ordinal",
    "domain": {"data": "table", "field": "category"},
    "range": ["#60a5fa", "#34d399", "#fbbf24"]
  }
]
```

**Scale Types:**
- `time` → Dates/timestamps
- `linear` → Continuous numbers
- `ordinal` → Discrete categories
- `band` → For bar charts (with spacing)
- `log`, `sqrt`, `pow` → Non-linear

**Properties:**
- `domain` → Input data range
- `range` → Output visual range (`"width"`, `"height"`, or array)
- `nice` → Round domain to nice numbers
- `zero` → Force domain to include zero

---

## 4. Axes

Visual guides for scales.

### Bottom Axis (X)
```json
"axes": [
  {
    "orient": "bottom",
    "scale": "x",
    "title": null,
    
    // Grid
    "grid": true,
    "gridColor": "#2a2a2a",
    "gridOpacity": 0.5,
    
    // Labels
    "labelColor": "#888888",
    "labelFont": "Inter, sans-serif",
    "labelFontSize": 10,
    "labelPadding": 8,
    
    // Ticks
    "tickColor": "#888888",
    "tickSize": 5,
    "tickCount": 10,
    
    // Domain line
    "domainColor": "#2a2a2a",
    "domainWidth": 1
  }
]
```

### Left Axis (Y)
```json
"axes": [
  {
    "orient": "left",
    "scale": "y",
    "title": "CPU Usage (%)",
    "titleColor": "#888888",
    "titleFont": "Inter, sans-serif",
    "titleFontSize": 11,
    "titlePadding": 10,
    
    "grid": true,
    "gridColor": "#2a2a2a",
    "gridOpacity": 0.5,
    
    "labelColor": "#888888",
    "labelFont": "JetBrains Mono, monospace",
    "labelFontSize": 10,
    
    "tickColor": "#888888",
    "domainColor": "#2a2a2a"
  }
]
```

**Axis Orientations:**
- `bottom`, `top` → Horizontal axes
- `left`, `right` → Vertical axes

---

## 5. Legends

For categorical scales (color, size, shape).

```json
"legends": [
  {
    "stroke": "color",
    "title": "Metric",
    "titleColor": "#888888",
    "titleFont": "Inter, sans-serif",
    "titleFontSize": 11,
    
    "labelColor": "#888888",
    "labelFont": "Inter, sans-serif",
    "labelFontSize": 10,
    
    "symbolType": "stroke",
    "symbolStrokeWidth": 2,
    
    "orient": "top-right",
    "direction": "horizontal",
    "offset": 0
  }
]
```

---

## 6. Marks

Visual elements (lines, bars, areas, etc.).

### Line Mark
```json
"marks": [
  {
    "type": "line",
    "from": {"data": "table"},
    "encode": {
      "enter": {
        "x": {"scale": "x", "field": "date"},
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
```

### Bar Mark
```json
"marks": [
  {
    "type": "rect",
    "from": {"data": "table"},
    "encode": {
      "enter": {
        "x": {"scale": "x", "field": "category"},
        "width": {"scale": "x", "band": 1},
        "y": {"scale": "y", "field": "value"},
        "y2": {"scale": "y", "value": 0},
        "fill": {"value": "#60a5fa"}
      }
    }
  }
]
```

### Area Mark
```json
"marks": [
  {
    "type": "area",
    "from": {"data": "table"},
    "encode": {
      "enter": {
        "x": {"scale": "x", "field": "date"},
        "y": {"scale": "y", "field": "value"},
        "y2": {"scale": "y", "value": 0},
        "fill": {"value": "#60a5fa"},
        "fillOpacity": {"value": 0.7}
      }
    }
  }
]
```

**Mark Types:**
- `line` → Lines
- `area` → Filled areas
- `rect` → Rectangles (bars, heatmaps)
- `symbol` → Points (scatter plots)
- `rule` → Single lines (reference lines)
- `text` → Labels

**Encode Sets:**
- `enter` → When mark first appears
- `update` → Default state
- `exit` → When mark is removed
- `hover` → On mouse over

---

## 7. Signals (Interaction)

Dynamic variables for interaction.

### Tooltip Signal
```json
"signals": [
  {
    "name": "tooltip",
    "value": null,
    "on": [
      {"events": "rect:mouseover", "update": "datum"},
      {"events": "rect:mouseout", "update": "null"}
    ]
  }
]
```

### Hover Highlight
```json
"signals": [
  {
    "name": "hover",
    "value": null,
    "on": [
      {"events": "@cell:mouseover", "update": "datum"},
      {"events": "@cell:mouseout", "update": "null"}
    ]
  }
]
```

Then use in marks:
```json
"marks": [
  {
    "type": "line",
    "encode": {
      "update": {
        "opacity": [
          {"test": "hover && hover.category === datum.category", "value": 1},
          {"test": "hover", "value": 0.2},
          {"value": 1}
        ]
      }
    }
  }
]
```

---

## Putting It All Together

Here's a complete minimal spec:

```json
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 800,
  "height": 200,
  "padding": 5,
  
  "data": [
    {
      "name": "table",
      "values": [
        {"x": 0, "y": 28},
        {"x": 1, "y": 55},
        {"x": 2, "y": 43}
      ]
    }
  ],
  
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "table", "field": "y"}
    }
  ],
  
  "axes": [
    {"orient": "bottom", "scale": "x"},
    {"orient": "left", "scale": "y"}
  ],
  
  "marks": [
    {
      "type": "line",
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "y": {"scale": "y", "field": "y"},
          "stroke": {"value": "steelblue"}
        }
      }
    }
  ]
}
```

---

## Development Workflow

1. **Start with data** → Define structure
2. **Add scales** → Map data to visual range
3. **Add axes** → Visual guides
4. **Add marks** → Draw the data
5. **Style** → Colors, fonts, spacing
6. **Add interaction** → Signals, tooltips

---

## Debugging Tips

### View in Vega Editor
Open [https://vega.github.io/editor/](https://vega.github.io/editor/) and paste your spec.

### Common Errors

**"Cannot read property 'field' of undefined"**
→ Check scale references in marks (typo in scale name?)

**"Invalid specification"**
→ JSON syntax error (missing comma, bracket)

**"Domain is empty"**
→ Data field name doesn't match (check spelling)

**Mark doesn't appear**
→ Check encode block has x, y, and visual properties

---

## Next: See a Working Example

Check `vega-implementations/time-series-line.html` for a complete, styled example.
