# Interaction & Motion Standards

**Operational Data Graphics: Interaction Design Principles**

---

## Philosophy

Interactions in operational visualization systems should:
- **Reinforce stability** — avoid jarring transitions
- **Be predictable** — users trust deterministic behavior
- **Add clarity** — never obscure data with decoration
- **Respect density** — don't waste space on ornamental UI

Motion is a tool for **communicating state changes**, not entertainment.

---

## Core Interaction Patterns

### 1. Hover / Focus States

**Purpose**: Reveal additional detail without leaving the current view.

**Behavior**:
- **Crosshair**: On line/area charts, display subtle vertical/horizontal guide lines at cursor position
- **Tooltip**: Appears 8px offset from cursor, always within viewport bounds
- **Value highlight**: Dim non-hovered series to 40% opacity, highlight active series at 100%
- **Timing**: Instant on hover, no delay
- **Accessibility**: Full keyboard navigation with visible focus rings

**Tooltip Design**:
```
┌─────────────────────────┐
│ Timestamp               │
│ ─────────────────────── │
│ ● Metric 1: 123.45 ms   │
│ ● Metric 2: 67.89 ms    │
│ ● Metric 3: 234.56 ms   │
└─────────────────────────┘
```
- Dark background (`#1F1F23`)
- 1px border (`#33353A`)
- 4px corner radius
- 8px padding
- 12px body text
- Colored indicators match series colors

---

### 2. Zoom & Pan

**Purpose**: Enable exploration of high-density time-series data.

**Behavior**:
- **Scroll wheel**: Zoom in/out on cursor position (horizontal axis only)
- **Click + drag**: Pan along time axis
- **Double-click**: Reset to default zoom level
- **Zoom limits**: Min 1 minute, Max full dataset
- **Visual feedback**: Minimap or range selector shows current viewport position

**Motion**:
- Zoom easing: `cubic-bezier(0.4, 0.0, 0.2, 1)` — 200ms
- Pan: No easing, follows cursor directly
- Reset: Smooth transition over 300ms

**Accessibility**:
- Keyboard shortcuts: `+` / `-` for zoom, arrow keys for pan, `0` for reset
- Screen reader announcements: "Zoomed to [time range]"

---

### 3. Data Updates & Live Refresh

**Purpose**: Show new data arriving in real-time without disorienting users.

**Behavior**:
- **Append mode**: New data slides in from right edge (time-series)
- **Update mode**: Existing elements morph to new values (status, bars)
- **Refresh indicator**: Subtle pulse in top-right corner during fetch
- **No jank**: Use `requestAnimationFrame` for smooth updates

**Motion**:
- New data entry: 400ms ease-out
- Value changes: 300ms ease-in-out
- Status color changes: 200ms ease-in-out

**Avoid**:
- Full chart re-renders that cause flicker
- Aggressive animations that distract from monitoring

---

### 4. Selection & Filtering

**Purpose**: Focus on specific series, time ranges, or segments.

**Behavior**:
- **Click legend item**: Toggle series visibility
- **Shift + click legend**: Isolate single series (hide all others)
- **Click bar/segment**: Filter to that category
- **ESC key**: Clear all filters

**Visual Feedback**:
- Filtered-out series: 10% opacity, strikethrough in legend
- Active filter: Highlighted legend item with colored underline
- Clear indicator: Small × button appears when filters are active

---

### 5. Threshold Crossings & Alerts

**Purpose**: Draw attention to anomalies or SLA violations.

**Behavior**:
- **Static line**: Threshold appears as dashed horizontal line
- **Color change**: Series changes color when crossing threshold (e.g., green → red)
- **Subtle pulse**: 2-second pulse animation on the threshold line when crossed
- **No sound**: Visual only (users may have multiple dashboards open)

**Motion**:
- Pulse: Opacity 100% → 40% → 100% over 2s, then static
- Color transition: 300ms ease-in-out

---

## Motion Timing System

Use consistent easing and duration for predictable feel:

| Motion Type | Duration | Easing | Use Case |
|-------------|----------|--------|----------|
| **Instant** | 0ms | none | Hover states, cursor following |
| **Fast** | 150-200ms | ease-out | Tooltips, focus rings |
| **Standard** | 250-300ms | ease-in-out | Value updates, filtering |
| **Deliberate** | 400-500ms | ease-out | Zoom, pan, data entry |

**Easing Functions**:
- `ease-out`: Quick start, gentle finish (entering elements)
- `ease-in-out`: Smooth both ends (morphing, updating)
- `linear`: Status changes, threshold alerts

---

## Accessibility Standards

### Keyboard Navigation
- **Tab**: Move between interactive elements (legend, filters, zoom controls)
- **Arrow keys**: Pan chart, navigate data points
- **Enter/Space**: Activate focused element
- **ESC**: Clear selection, close tooltip

### Screen Reader Support
- Semantic HTML: Use `<figure>`, `<figcaption>`, proper ARIA labels
- Data table fallback: Provide `<table>` with same data for non-visual access
- Live region announcements: "Value updated: 123ms → 145ms"

### Focus Indicators
- **Visible rings**: 2px solid `#3B82F6` at 4px offset
- **High contrast**: Meets WCAG AAA (7:1 minimum)

### Reduced Motion
Respect `prefers-reduced-motion: reduce`:
- Disable all animations
- Use instant state changes instead

---

## Anti-Patterns to Avoid

❌ **Don't**: Animate for decoration
- Gratuitous chart intro animations
- Bouncing, spinning, or rotating elements
- Confetti, sparkles, or other celebration effects

❌ **Don't**: Block the view
- Modal tooltips that require dismissal
- Overlays that obscure the chart
- Auto-playing tours or hints

❌ **Don't**: Be unpredictable
- Random animation timings
- Inconsistent hover behavior
- Surprising interactions (e.g., click-to-zoom when user expects pan)

---

## Implementation Checklist

For each chart interaction, verify:
- [ ] Works with keyboard only
- [ ] Works with screen reader
- [ ] Respects `prefers-reduced-motion`
- [ ] Uses consistent timing/easing from standards
- [ ] Provides clear visual feedback
- [ ] Never obscures data
- [ ] Feels stable and deterministic

---

## Examples & Patterns

### Time-Series Line Chart
- Hover: Crosshair + tooltip
- Zoom: Scroll wheel (horizontal only)
- Pan: Click + drag
- Legend click: Toggle series

### Bar Chart
- Hover: Highlight bar, show value
- Click: Filter to category
- No zoom/pan (discrete categories)

### Status Timeline
- Hover: Show incident details
- Click segment: Jump to logs/details
- No zoom (designed for 24h view)

### Histogram
- Hover: Show bin range + count
- Click bin: Drill into distribution
- Zoom: Adjust bin size

---

*These standards ensure all charts feel like part of a unified system, building user trust through consistency and predictability.*
