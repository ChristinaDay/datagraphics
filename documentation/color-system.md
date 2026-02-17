# Color System: Operational Data Graphics

## Philosophy

Color in operational graphics must be:
- **Muted** (no visual fatigue)
- **Semantic** (meaning-driven, not decorative)
- **Dark-mode native** (designed for `#1a1a1a` backgrounds)
- **Accessible** (sufficient contrast, paired with patterns when needed)

---

## Background Colors

### Canvas & Chart Backgrounds
```
Canvas:    #0d0d0d  (darkest — page background)
Chart:     #1a1a1a  (primary — chart container)
Elevated:  #2a2a2a  (cards, borders, grid lines)
```

**Usage:**
- Page background: `#0d0d0d`
- Chart container: `#1a1a1a`
- Borders, gridlines: `#2a2a2a` at 50% opacity

---

## Categorical Palette (Multi-Series Data)

Use for comparing different metrics, categories, or series.

```
Blue:    #60a5fa  → Primary series, default color
Green:   #34d399  → Secondary series
Amber:   #fbbf24  → Tertiary series
Purple:  #a78bfa  → Quaternary series
Red:     #f87171  → Fifth series (use sparingly)
```

### Examples
- **Multi-series line chart**: Assign colors 1-5 to different metrics
- **Legend items**: Use these colors with stroke/fill
- **Category encoding**: Map categories to these hues

### Rules
- Never use more than 5 series (chart becomes unreadable)
- Maintain order: blue → green → amber → purple → red
- Red is last because it suggests "error" — don't use unless appropriate

---

## Status Colors (Semantic)

Use for system health, error states, thresholds.

```
Healthy:  #34d399  (green)  → System is operating normally
Warning:  #fbbf24  (amber)  → Degraded performance, approaching threshold
Error:    #f87171  (red)    → Failure, critical state
Unknown:  #6b7280  (gray)   → No data, uncertain state
```

### Examples
- **Status timeline**: Health bands colored by state
- **Threshold indicators**: Line turns red when crossing error threshold
- **Alert badges**: Background color indicates severity

### Accessibility
Always pair status color with non-color indicators:
- ✓ Icons (✓, ⚠, ✗)
- ✓ Patterns (solid, striped, dotted)
- ✗ Color alone (fails for colorblind users)

---

## Sequential Ramp (Single-Hue Intensity)

Use for heatmaps, choropleth maps, density encoding.

```
Darkest → Lightest (Blue)
#1e3a8a → #1e40af → #2563eb → #3b82f6 → #60a5fa → #93c5fd
```

### Examples
- **Histogram density**: Darker = higher frequency
- **Heatmap cells**: Color by value intensity
- **Threshold zones**: Gradient from safe → warning

### Properties
- Perceptually uniform (equal steps feel equal)
- Single hue (easier to read than multi-hue)
- Starts dark (works on dark backgrounds)

---

## Diverging Ramp (Positive/Negative)

Use for data that has a meaningful midpoint (zero, average, median).

```
Negative Side:
#dc2626 (strong) → #ef4444 → #f87171 (subtle)

Neutral:
#6b7280 (gray — the midpoint)

Positive Side:
#10b981 (strong) → #34d399 → #6ee7b7 (subtle)
```

### Examples
- **Performance vs baseline**: Red = below, gray = at, green = above
- **Profit/loss**: Red = loss, green = profit
- **Deviation**: Distance from zero or mean

### Rules
- Always center on gray (`#6b7280`)
- Use equal steps on both sides
- Label the midpoint clearly

---

## Text Colors

### Primary Text
```
Primary:    #f5f5f5  → Titles, headings
Secondary:  #a0a0a0  → Axis titles, subtitles
Tertiary:   #888888  → Axis labels, legends
Muted:      #6b7280  → Footnotes, metadata
```

### Usage
- **Chart title**: `#f5f5f5` (primary)
- **Axis title**: `#a0a0a0` (secondary)
- **Axis tick labels**: `#888888` (tertiary)
- **Timestamps, footer**: `#6b7280` (muted)

### Contrast Ratios (WCAG AA)
- Primary on dark: 13.2:1 ✓
- Secondary on dark: 6.8:1 ✓
- Tertiary on dark: 4.8:1 ✓

---

## Border & Grid Colors

```
Strong:  #2a2a2a  → Chart borders, axis lines
Medium:  #1f1f1f  → Secondary borders
Subtle:  #171717  → Dividers, separators
Grid:    #2a2a2a  at 50% opacity → Gridlines
```

### Usage
- **Gridlines**: `#2a2a2a` at 50% opacity, dashed `[1, 3]`
- **Axis domain line**: `#2a2a2a` solid
- **Chart container border**: `#2a2a2a` solid
- **Card dividers**: `#1f1f1f` solid

---

## Color Application Rules

### 1. Prioritize Grayscale
Default to grays. Use color only when it adds meaning.

**Good:**
- Single-series line chart → one color (blue)
- Axes, labels, grids → all gray

**Bad:**
- Random colors on every element
- Saturated backgrounds

### 2. Color = Meaning
Every color should communicate something.

**Semantic Uses:**
- Green = healthy, success
- Amber = warning, caution
- Red = error, critical
- Blue = neutral default
- Gray = unknown, inactive

### 3. Limit Color Count
In any single chart:
- 1-2 colors: Ideal
- 3-5 colors: Acceptable (multi-series)
- 6+ colors: Too many (use small multiples instead)

### 4. Test for Colorblindness
Run your charts through a colorblind simulator:
- [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- Ensure patterns/labels supplement color

---

## Vega Implementation

### Single Color
```json
"marks": [
  {
    "type": "line",
    "encode": {
      "enter": {
        "stroke": {"value": "#60a5fa"}
      }
    }
  }
]
```

### Categorical Scale
```json
"scales": [
  {
    "name": "color",
    "type": "ordinal",
    "domain": ["cpu", "memory", "disk", "network"],
    "range": ["#60a5fa", "#34d399", "#fbbf24", "#a78bfa"]
  }
]
```

### Status Scale
```json
"scales": [
  {
    "name": "status",
    "type": "ordinal",
    "domain": ["healthy", "warning", "error", "unknown"],
    "range": ["#34d399", "#fbbf24", "#f87171", "#6b7280"]
  }
]
```

### Sequential Scale
```json
"scales": [
  {
    "name": "intensity",
    "type": "linear",
    "domain": [0, 100],
    "range": ["#1e3a8a", "#93c5fd"]
  }
]
```

---

## Figma Color Swatches

When creating your Figma file, define these as color styles:

### Categorical
- `Chart/Categorical/Blue` → #60a5fa
- `Chart/Categorical/Green` → #34d399
- `Chart/Categorical/Amber` → #fbbf24
- `Chart/Categorical/Purple` → #a78bfa
- `Chart/Categorical/Red` → #f87171

### Status
- `Chart/Status/Healthy` → #34d399
- `Chart/Status/Warning` → #fbbf24
- `Chart/Status/Error` → #f87171
- `Chart/Status/Unknown` → #6b7280

### Background
- `BG/Canvas` → #0d0d0d
- `BG/Chart` → #1a1a1a
- `BG/Elevated` → #2a2a2a

### Text
- `Text/Primary` → #f5f5f5
- `Text/Secondary` → #a0a0a0
- `Text/Tertiary` → #888888
- `Text/Muted` → #6b7280

### Border
- `Border/Strong` → #2a2a2a
- `Border/Medium` → #1f1f1f
- `Border/Subtle` → #171717

---

## Examples in Context

### Time-Series Line Chart
- **Line**: `#60a5fa` (categorical blue)
- **Grid**: `#2a2a2a` at 50% opacity
- **Axis labels**: `#888888` (tertiary text)
- **Background**: `#1a1a1a` (chart)

### Multi-Series Comparison
- **Series 1 (CPU)**: `#60a5fa` (blue)
- **Series 2 (Memory)**: `#34d399` (green)
- **Series 3 (Disk)**: `#fbbf24` (amber)
- **Legend text**: `#888888` (tertiary)

### Status Timeline
- **Healthy bands**: `#34d399` (status green)
- **Warning bands**: `#fbbf24` (status amber)
- **Error bands**: `#f87171` (status red)
- **Unknown bands**: `#6b7280` (status gray)

---

## Light Mode (Future)

If you eventually need light mode:

### Backgrounds
```
Canvas:    #ffffff
Chart:     #fafafa
Elevated:  #f5f5f5
```

### Text (Inverted)
```
Primary:   #0d0d0d
Secondary: #404040
Tertiary:  #6b7280
```

### Categorical (Darker)
```
Blue:    #2563eb  (darker than dark mode)
Green:   #10b981
Amber:   #f59e0b
Purple:  #7c3aed
Red:     #dc2626
```

**Note:** Design dark mode first. Light mode is an adaptation, not the default.

---

This color system ensures consistency across all 6 chart primitives.
