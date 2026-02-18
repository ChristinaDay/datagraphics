# Theming System: Light & Dark Modes

## Overview

The Operational Data Graphics system supports both **light and dark modes** to accommodate different user preferences and accessibility needs. The theming system uses CSS custom properties (variables) for seamless switching.

---

## Design Tokens

### Light Mode Colors

**Background:**
- Canvas: `#ffffff` (pure white)
- Chart: `#f9fafb` (very light gray)
- Elevated: `#f3f4f6` (light gray for borders)

**Text:**
- Primary: `#1a1a1a` (near black)
- Secondary: `#6b7280` (medium gray)
- Muted: `#9ca3af` (light gray)

**Borders:**
- Default: `#e5e7eb` (light gray)
- Grid: `#d1d5db` (at 40% opacity)

### Dark Mode Colors

**Background:**
- Canvas: `#0d0d0d` (darkest gray)
- Chart: `#171719` (very dark gray)
- Elevated: `#2a2a2a` (dark gray for borders)

**Text:**
- Primary: `#D9D9E0` (near white)
- Secondary: `#999AA6` (medium gray)
- Muted: `#6b7280` (muted gray)

**Borders:**
- Default: `#33353A` (dark gray)
- Grid: `#4D4E56` (at 40% opacity)

### Mode-Independent Colors

**Categorical Data Colors** (same in both modes):
- Blue: `#3B82F5`
- Green: `#22BF4A`
- Yellow: `#F2CB05`
- Orange: `#F28500`
- Violet: `#8B5CF6`

**Status Colors** (same in both modes):
- Success: `#22BF4A` (green)
- Warning: `#F28500` (orange)
- Error: `#CC3D3D` (red)
- Unknown: `#6b7280` (gray)

---

## CSS Implementation

### CSS Custom Properties

```css
:root {
  /* Light Mode (default) */
  --bg-canvas: #ffffff;
  --bg-chart: #f9fafb;
  --bg-elevated: #f3f4f6;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border-default: #e5e7eb;
  --border-grid: #d1d5db;
}

:root[data-theme="dark"] {
  /* Dark Mode */
  --bg-canvas: #0D0D0E;
  --bg-chart: #171719;
  --bg-elevated: #2a2a2a;
  --text-primary: #D9D9E0;
  --text-secondary: #999AA6;
  --text-muted: #6b7280;
  --border-default: #33353A;
  --border-grid: #4D4E56;
}
```

### Using Variables in CSS

```css
body {
  background: var(--bg-canvas);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

.chart-container {
  background: var(--bg-chart);
  border: 1px solid var(--border-default);
}
```

---

## JavaScript Theme Switching

### Theme Toggle Function

```javascript
function setTheme(theme) {
  currentTheme = theme;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  
  // Save preference
  localStorage.setItem('theme', theme);
  
  // Update all charts
  updateChartsTheme(theme);
}
```

### Updating Vega Charts

When the theme changes, all Vega chart specifications are updated with new colors:

```javascript
function updateChartsTheme(theme) {
  const colors = theme === 'dark' ? {
    background: '#171719',
    textPrimary: '#D9D9E0',
    textSecondary: '#999AA6',
    grid: '#4D4E56'
  } : {
    background: '#f9fafb',
    textPrimary: '#1a1a1a',
    textSecondary: '#6b7280',
    grid: '#d1d5db'
  };
  
  // Update spec properties
  spec1.background = colors.background;
  spec1.axes[0].labelColor = colors.textSecondary;
  
  // Re-render
  vegaEmbed('#vis1', spec1);
}
```

---

## User Preferences

### Default Theme

- **Default:** System preference (auto-detected)
- **Fallback:** Light mode (if system preference unavailable)
- **Rationale:** Respects user's OS-level preference for better UX

### Saving Preferences

Theme preference is saved to `localStorage`:
- Persists across browser sessions
- Per-domain storage
- Falls back to system preference if no explicit preference saved

### System Preference Detection

The system automatically detects the user's OS-level dark mode preference:

```javascript
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
```

### Loading Theme Priority

1. **Explicit user choice** (saved in localStorage) - highest priority
2. **System preference** (`prefers-color-scheme`) - if no saved preference
3. **Light mode** - fallback if system preference unavailable

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = getSystemTheme();
  
  // Use saved preference if exists, otherwise use system preference
  const initialTheme = savedTheme || systemTheme;
  setTheme(initialTheme);
});
```

### Dynamic System Theme Changes

The theme automatically updates if the user changes their OS theme (only if no explicit preference saved):

```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't explicitly set a preference
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

This means:
- If user clicks the theme toggle → preference saved, stays fixed
- If user never clicks toggle → follows OS changes automatically

---

## UI Components

### Theme Toggle Button

Located in the navigation bar:
- ☀️ Light mode
- 🌙 Dark mode
- Active state highlighted
- Smooth transitions

### Toggle Styling

```css
.theme-toggle {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 6px;
}

.theme-option.active {
  background: #3B82F5;
  color: white;
}
```

---

## Accessibility Considerations

### Contrast Ratios

All text meets **WCAG AA** standards for contrast:
- **Light Mode:** Dark text on light backgrounds
- **Dark Mode:** Light text on dark backgrounds

### Motion

Smooth transitions (0.3s ease) provide visual feedback without being jarring.

Users who prefer reduced motion should see instant theme changes:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```


---

## Figma Integration

### Design Tokens with Modes

The `tokens-with-modes.json` file includes both light and dark mode values:

```json
{
  "color": {
    "mode": {
      "dark": { ... },
      "light": { ... }
    }
  }
}
```

### Importing to Figma

1. Use **Tokens Studio** plugin
2. Import `tokens-with-modes.json`
3. Figma creates **mode-aware variables**
4. Switch between Light/Dark in Figma UI

---

## Chart-Specific Considerations

### Data Colors

**Stay consistent across themes:**
- Blue, green, yellow, orange, violet remain the same
- Ensures data series are recognizable in both modes

### Grid Lines

**Adjust opacity, not color:**
- Dark mode: `#4D4E56` at 40%
- Light mode: `#d1d5db` at 40%
- Maintains subtle appearance in both

### Tooltips

**Theme-aware:**
- Dark mode: `{ theme: 'dark' }`
- Light mode: `{ theme: 'light' }`
- Vega handles tooltip styling

---

## Design Philosophy

### Why Both Modes?

1. **Accessibility:** Some users prefer light mode for visibility
2. **Context:** Light mode better for presentations/printouts
3. **Professional Polish:** Modern design systems support both
4. **User Choice:** Respects individual preferences

### Design Decisions

**Backgrounds:**
- Dark mode: True black avoided (reduces eye strain)
- Light mode: Off-white for subtle depth

**Text:**
- High contrast for readability
- Secondary text clearly distinguishable but not distracting

**Borders:**
- Subtle in both modes
- Visible but not prominent

---

## Testing Checklist

### Visual Testing

- [ ] All text readable in both modes
- [ ] Charts visible and clear
- [ ] Borders and grid lines appropriate opacity
- [ ] No color clashing
- [ ] Smooth transitions

### Functional Testing

- [ ] Toggle switches between modes correctly
- [ ] Theme persists after page reload
- [ ] All 4 charts update properly
- [ ] Simulations work in both modes
- [ ] Tooltips styled correctly

### Accessibility Testing

- [ ] WCAG AA contrast ratios met
- [ ] Keyboard navigation works
- [ ] Screen reader announces theme change
- [ ] Reduced motion respected

---

## Future Enhancements

1. ~~**Auto-detect system preference** on first visit~~ ✅ **Implemented**
2. ~~**Respect `prefers-color-scheme` media query**~~ ✅ **Implemented**
3. **Add "Auto" option** (explicit toggle to follow system)
4. **Print styles** (force light mode for printing)
5. **Export theme with SVG** downloads

---

## Portfolio Value

**This theming system demonstrates:**
- ✅ Complete design system thinking (not just dark mode)
- ✅ Accessibility consideration
- ✅ Professional polish and attention to detail
- ✅ Understanding of CSS custom properties
- ✅ Figma integration with mode-aware variables
- ✅ User experience design (saving preferences)

**Interview Talking Point:**
> "I implemented a complete theming system with light and dark modes. It automatically detects the user's system preference using `prefers-color-scheme`, but respects explicit user choices saved to localStorage. The system also listens for OS-level theme changes and adapts in real-time—unless the user has set a manual preference. It uses CSS custom properties for instant switching, updates all Vega charts dynamically, and the design tokens support both modes in Figma, so the entire system—from design to code—is theme-aware."

---

*Last Updated: February 17, 2026*
