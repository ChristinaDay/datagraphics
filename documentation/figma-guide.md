# Figma Setup Guide: Operational Data Graphics

## Step-by-Step: First Session (2-3 hours)

---

## Step 1: Create Your File (5 min)

1. Open Figma
2. Click **"New design file"**
3. Rename: **"Operational Data Graphics"**
4. Set canvas background: `#0d0d0d` (Settings → Canvas background → Custom color)

---

## Step 2: Create Page Structure (2 min)

In the left sidebar (Pages):

1. Rename "Page 1" → **"Foundations"**
2. Add new page → **"Chart Primitives"**
3. Add new page → **"Exports"** (for screenshots later)

Work on **"Foundations"** page first.

---

## Step 3: Import Design Tokens (5 min) ⚡

### Option A: Import with Plugin (Recommended - 5 min)

**Much faster than manual entry!**

1. In Figma, go to **Plugins → Browse plugins**
2. Search for **"Tokens Studio"** (or "Design Tokens")
3. Install the plugin
4. Open the plugin: **Plugins → Tokens Studio**
5. Click **"Load from file"**
6. Select: **`design/tokens.json`** from your project
7. Click **"Import"**

✨ **All your colors, spacing, and typography are now loaded!**

---

### Option B: Manual Entry (15 min)

If you prefer to do it manually:

#### Background Colors
1. Click **"Local variables"** (4 circles icon in left toolbar)
2. Create collection: **"Colors"**
3. Add colors:

```
BG / Canvas       #0d0d0d
BG / Chart        #1a1a1a
BG / Elevated     #2a2a2a
```

#### Text Colors
```
Text / Primary    #f5f5f5
Text / Secondary  #a0a0a0
Text / Tertiary   #888888
Text / Muted      #6b7280
```

#### Border Colors
```
Border / Strong   #2a2a2a
Border / Medium   #1f1f1f
Border / Subtle   #171717
```

#### Categorical Colors
```
Chart / Categorical / Blue    #60a5fa
Chart / Categorical / Green   #34d399
Chart / Categorical / Amber   #fbbf24
Chart / Categorical / Purple  #a78bfa
Chart / Categorical / Red     #f87171
```

#### Status Colors
```
Chart / Status / Healthy   #34d399
Chart / Status / Warning   #fbbf24
Chart / Status / Error     #f87171
Chart / Status / Unknown   #6b7280
```

**Tip**: Use the `/` naming convention — Figma will auto-organize them into groups.

---

## Step 4: Create a Color Swatch Board (15 min)

On your **"Foundations"** page:

### Create Frame
1. Press `F` (frame tool)
2. Create frame: **1200 × 800**
3. Name: **"Color System"**
4. Fill: `BG / Chart` (#1a1a1a)

### Add Title
1. Press `T` (text tool)
2. Type: **"Color System"**
3. Font: Inter, 24px, Semibold
4. Color: `Text / Primary`
5. Position: 40px from top, 40px from left

### Categorical Palette Section
1. Create text: **"Categorical"** (Inter, 14px, Medium, Text / Secondary)
2. Below it, create 5 rectangles (120 × 60px each)
3. Fill each with categorical colors (Blue → Green → Amber → Purple → Red)
4. Add labels below each: "Blue", "Green", etc. (Text / Tertiary, 11px)
5. Add hex codes below labels: "#60a5fa", etc. (Text / Muted, 10px, JetBrains Mono)
6. Space rectangles: 16px gap (use Auto Layout)

### Status Palette Section
Repeat for Status colors (Healthy, Warning, Error, Unknown)

### Background Swatches
Show all 3 background colors with labels and hex codes

### Text Color Ramp
Show progression: Primary → Secondary → Tertiary → Muted

**Result**: Visual reference of your entire color system

---

## Step 5: Set Up Typography Styles (10 min)

### Create Text Styles

Click **"Text styles"** (Aa icon) → Create styles:

#### For Chart Titles
```
Name:   Chart / Title
Font:   Inter
Size:   14px
Weight: Medium (500)
Color:  Text / Secondary
```

#### For Axis Titles
```
Name:   Axis / Title
Font:   Inter
Size:   11px
Weight: Medium (500)
Color:  Text / Secondary
```

#### For Axis Labels (Numbers)
```
Name:   Axis / Label / Number
Font:   JetBrains Mono (or SF Mono)
Size:   10px
Weight: Regular (400)
Color:  Text / Tertiary
```

#### For Axis Labels (Text)
```
Name:   Axis / Label / Text
Font:   Inter
Size:   10px
Weight: Regular (400)
Color:  Text / Tertiary
```

#### For Legend
```
Name:   Legend / Label
Font:   Inter
Size:   10px
Weight: Regular (400)
Color:  Text / Tertiary
```

---

## Step 6: Create Typography Board (15 min)

Create new frame: **"Typography System"** (1200 × 600)

### Show Each Style
1. Chart Title example: "CPU Usage Over Time"
2. Axis Title example: "Requests per Second"
3. Axis Label (number) example: "1,234.5"
4. Axis Label (text) example: "Jan 15, 2:30 PM"
5. Legend example: "Production • Staging"

**For each:**
- Show the text
- Show font name
- Show size/weight/color
- Show use case

---

## Step 7: Create Spacing Scale Board (15 min)

Create frame: **"Spacing System"** (1200 × 800)

### Visual Scale
Show each spacing value with visual representation:

```
4px   [tiny bar]      Tick to label
8px   [small bar]     Label padding
12px  [medium bar]    Axis title spacing
16px  [bar]           Legend item gap
24px  [larger bar]    Chart title to chart
32px  [large bar]     Between chart cards
40px  [xlarge bar]    Page padding
60px  [huge bar]      Section separation
```

**How to create:**
1. Draw rectangles showing each size
2. Label with token name + px value + use case
3. Use actual spacing between elements to demonstrate

### Chart Padding Visual
Create a chart wireframe showing:
- Top: 10px
- Left: 60px
- Right: 20px
- Bottom: 40px

Annotate with arrows and labels.

---

## Step 8: Create Axis/Grid Examples (20 min)

Create frame: **"Axis & Grid Standards"** (1200 × 1000)

### Bottom Axis Example
1. Draw a horizontal line: `#2a2a2a`, 1px
2. Add tick marks (5px tall, 8 ticks)
3. Add labels below: "12 PM", "1 PM", "2 PM", etc. (Text / Tertiary, 10px)
4. Show spacing: 8px between tick and label
5. Annotate with callouts

### Left Axis Example
1. Draw vertical line: `#2a2a2a`, 1px
2. Add tick marks (5px wide, 5 ticks)
3. Add labels: "0", "25", "50", "75", "100" (JetBrains Mono, 10px)
4. Add axis title: "CPU Usage (%)" (Inter, 11px, rotated -90°)
5. Show spacing: 8px tick to label, 12px label to title

### Gridline Example
1. Draw horizontal dashed lines across chart area
2. Color: `#2a2a2a` at 50% opacity
3. Dash: Show 1px dash, 3px gap pattern
4. Annotate: "Horizontal only"

---

## Step 9: Create Component: Axis Line (15 min)

**Why?** Reuse across all 6 chart mockups.

### Create Bottom Axis Component
1. Draw horizontal line (1px, `#2a2a2a`)
2. Add 8 tick marks (5px tall)
3. Add 8 labels (placeholder text)
4. Select all → Right-click → **"Create component"**
5. Name: **"Axis / Bottom"**

### Create Left Axis Component
1. Draw vertical line (1px, `#2a2a2a`)
2. Add 5 tick marks (5px wide)
3. Add 5 number labels (JetBrains Mono)
4. Add axis title (rotated)
5. Select all → **"Create component"**
6. Name: **"Axis / Left"**

### Create Gridlines Component
1. Draw 5 horizontal dashed lines
2. Space evenly (auto layout)
3. **"Create component"**
4. Name: **"Grid / Horizontal"**

**Now you can reuse these in all your charts!**

---

## Step 10: You're Ready for Charts! (Checkpoint)

At this point you should have:
- ✅ Color styles defined (15+ colors)
- ✅ Typography styles defined (5 text styles)
- ✅ Color swatch board (visual reference)
- ✅ Typography board (examples)
- ✅ Spacing board (scale + chart padding)
- ✅ Axis/grid examples (annotated)
- ✅ Reusable components (axis, gridlines)

**Save and take a break!** ☕

---

## Next Session: Chart Mockups (Chart Primitives Page)

On the **"Chart Primitives"** page, you'll create 6 frames:
1. Time-Series Line
2. Multi-Series Line
3. Stacked Area
4. Histogram
5. Bar Comparison
6. Status Timeline

**Reference:** `documentation/chart-grammar-breakdown.md`

Each chart frame should be:
- **Size**: 1100 × 400px (1000px chart + padding)
- **Background**: `BG / Chart`
- **Padding**: 40px all sides

Use your axis/grid components to build each chart.

---

## Tips

### Auto Layout is Your Friend
- Use Auto Layout (Shift+A) for spacing consistency
- Set gaps to your spacing scale (8px, 16px, 24px)

### Use Plugins
- **Chart** plugin for quick data viz
- **Contrast** plugin to check accessibility

### Annotations
- Use arrows and text to explain design decisions
- Call out Grammar of Graphics layers (Data → Scale → Mark)

### Name Layers
- Good: "Y-Axis / Grid / Labels"
- Bad: "Rectangle 47"

### Save Often
Figma auto-saves, but hit Cmd+S anyway!

---

## Expected Time

| Task | Time |
|------|------|
| Setup + color styles | 20 min |
| Color swatch board | 15 min |
| Typography styles + board | 25 min |
| Spacing board | 15 min |
| Axis/grid examples | 20 min |
| Components | 15 min |
| **Total Session 1** | **~2 hours** |

---

## After Foundations Are Done

Export your color swatches, typography, and spacing boards as PNGs:
1. Select frame
2. Right-click → Copy as PNG
3. Paste into `design/exports/` folder

These will go in your portfolio case study!

---

## Questions While Working?

Reference these docs:
- Colors: `documentation/color-system.md`
- Spacing: `documentation/spacing-system.md`
- Axes: `documentation/axis-grid-standards.md`

Or just ask me in the next session!

---

**Now go create! You've got all the specs you need.** 🎨
