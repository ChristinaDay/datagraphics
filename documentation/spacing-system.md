# Spacing System: Operational Data Graphics

## Philosophy

Spacing in operational graphics must balance:
- **Density** (show more data, less whitespace)
- **Clarity** (elements don't overlap or confuse)
- **Consistency** (predictable rhythm across charts)
- **Scannability** (eye can move quickly through information)

---

## Base Unit: 4px

All spacing follows a **4px base unit** for consistency and alignment.

```
4px × 1 = 4px
4px × 2 = 8px
4px × 3 = 12px
4px × 4 = 16px
4px × 6 = 24px
4px × 8 = 32px
4px × 10 = 40px
4px × 12 = 48px
4px × 15 = 60px
```

---

## Spacing Scale

### Micro (4px - 8px)
**Usage**: Internal element spacing, very tight contexts

```
4px  → Gap between tick mark and label
8px  → Padding within small badges or chips
```

**Examples:**
- Tick mark to tick label: `4px`
- Legend item to legend text: `8px`

---

### Small (12px - 16px)
**Usage**: Related elements, component internal spacing

```
12px → Space between axis title and tick labels
16px → Padding within tooltips
```

**Examples:**
- Axis title to axis line: `12px`
- Tooltip padding: `16px` all sides
- Legend item spacing: `12px`

---

### Medium (24px - 32px)
**Usage**: Component separation, section spacing

```
24px → Space between chart title and chart area
32px → Gap between multiple charts in a grid
```

**Examples:**
- Chart title to chart: `24px`
- Between cards in chart grid: `24px` or `32px`
- Section headers to content: `24px`

---

### Large (40px - 60px)
**Usage**: Major sections, page structure

```
40px → Page padding (sides)
60px → Section separation on landing page
```

**Examples:**
- Page left/right padding: `40px`
- Between major sections: `60px`
- Header to first section: `60px`

---

## Chart-Specific Spacing

### Chart Padding (from edge to content)

```
Top:    10px   (minimal — title goes above chart)
Left:   60px   (room for y-axis labels + title)
Right:  20px   (minimal — no labels)
Bottom: 40px   (room for x-axis labels + title)
```

**Rationale:**
- **Top small**: Title is outside chart boundary
- **Left large**: Y-axis labels + title need room (numbers can be wide)
- **Right small**: Usually no elements on right side
- **Bottom medium**: X-axis labels + title need room

**Vega Implementation:**
```json
"padding": {"top": 10, "left": 60, "right": 20, "bottom": 40}
```

---

### Axis Spacing

#### Tick Mark to Label
```
Distance: 8px
```

**Vega Implementation:**
```json
"axes": [
  {
    "orient": "left",
    "labelPadding": 8
  }
]
```

#### Axis Title to Axis Line
```
Distance: 12px
```

**Vega Implementation:**
```json
"axes": [
  {
    "orient": "left",
    "titlePadding": 12
  }
]
```

#### Grid Line Spacing
Auto-calculated by Vega based on scale, typically:
- **Y-axis**: 5-8 gridlines (don't specify exact count)
- **X-axis**: 6-10 time divisions

**Vega Implementation:**
```json
"axes": [
  {
    "orient": "left",
    "tickCount": 5  // Suggestion, not exact
  }
]
```

---

### Legend Spacing

#### Between Legend Items (Horizontal)
```
Distance: 16px
```

#### Between Legend Symbol and Label
```
Distance: 8px
```

**Vega Implementation:**
```json
"legends": [
  {
    "direction": "horizontal",
    "symbolOffset": 8,
    "padding": 8
  }
]
```

---

### Multi-Chart Layouts

#### Chart Grid Gap
```
Gap: 24px (between cards)
```

**CSS Implementation:**
```css
.chart-grid {
  display: grid;
  gap: 24px;
}
```

#### Stacked Charts (Same X-Axis)
```
Gap: 8px (between charts)
```

Tight spacing because they share context.

---

## Typography Spacing

### Line Height
```
Title:       1.3  (tight, single line expected)
Body text:   1.6  (readable for multi-line)
Axis labels: 1.2  (minimal, single line)
```

### Letter Spacing
```
Title:       0px     (default)
Axis labels: 0px     (default)
All caps:    0.5px   (slightly open for readability)
```

**CSS Implementation:**
```css
.chart-title {
  font-size: 14px;
  line-height: 1.3;
}

.axis-label {
  font-size: 10px;
  line-height: 1.2;
}

.all-caps {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## Container Spacing

### Chart Container (Card)
```
Padding: 24px (all sides)
```

Creates breathing room around chart without wasting space.

**CSS Implementation:**
```css
.chart-container {
  padding: 24px;
  background: #1a1a1a;
  border-radius: 8px;
}
```

### Page Container
```
Max width: 1200px
Padding:   40px (left/right)
           60px (top/bottom)
```

**CSS Implementation:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}
```

---

## Border Radius (Related to Spacing)

```
None:   0px    → Chart elements (bars, areas)
Small:  4px    → Badges, small chips
Medium: 6px    → Buttons, inputs
Large:  8px    → Cards, containers
```

**Rationale**: Operational graphics are precise — minimal rounding. Use only for containers, not data marks.

---

## Responsive Adjustments

### Mobile (< 768px)
```
Page padding:    24px (reduce from 40px)
Chart padding:   
  - Left: 50px (reduce from 60px)
  - Bottom: 35px (reduce from 40px)
Chart grid gap:  16px (reduce from 24px)
```

### Tablet (768px - 1024px)
```
Page padding:    32px (between mobile and desktop)
Chart padding:   Same as desktop
Chart grid gap:  20px (slight reduction)
```

---

## Quick Reference Table

| Element | Spacing | Token |
|---------|---------|-------|
| Tick to label | 8px | `space-2` |
| Axis title to line | 12px | `space-3` |
| Legend item gap | 16px | `space-4` |
| Chart title to chart | 24px | `space-6` |
| Between chart cards | 24px | `space-6` |
| Card padding | 24px | `space-6` |
| Section gap | 32px | `space-8` |
| Page padding (sides) | 40px | `space-10` |
| Section separation | 60px | `space-15` |

---

## Examples in Context

### Time-Series Line Chart
```json
{
  "width": 1000,
  "height": 240,
  "padding": {"top": 10, "left": 60, "right": 20, "bottom": 40},
  
  "axes": [
    {
      "orient": "bottom",
      "labelPadding": 8,
      "titlePadding": 12
    },
    {
      "orient": "left",
      "labelPadding": 8,
      "titlePadding": 12
    }
  ]
}
```

### Chart Container (HTML/CSS)
```html
<div class="chart-container" style="padding: 24px;">
  <div class="chart-title" style="margin-bottom: 16px;">
    CPU Usage Over Time
  </div>
  <div id="chart"></div>
</div>
```

---

## Design Tokens (Optional)

If you expand this into a design system package:

```js
export const spacing = {
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
  space15: '60px'
};
```

---

## Rules of Thumb

### 1. **Prefer Consistent Over Perfect**
Use scale values even if 20px "looks better" than 24px. Consistency matters more.

### 2. **Internal Spacing < External Spacing**
Space between elements in a component should be tighter than space between components.

### 3. **Align to Grid**
All spacing aligns to 4px grid. No `17px` or `23px` values.

### 4. **Operational = Dense**
When in doubt, go tighter. Operational users need information density.

### 5. **Test at Scale**
View your chart at actual size (not zoomed). Does it feel cluttered or too loose?

---

## Figma Setup

When creating your Figma file, set up:

### Auto Layout Spacing Presets
- 4px, 8px, 12px, 16px, 24px, 32px, 40px, 60px

### Frame Padding Presets
- Chart: 10/60/20/40 (top/left/right/bottom)
- Card: 24px all sides
- Container: 40px sides, 60px vertical

---

This spacing system ensures density without clutter across all 6 chart primitives.
