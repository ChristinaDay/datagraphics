/**
 * Operational Data Graphics: Vega Config Template
 * Reusable configuration for all 6 chart primitives
 */

const OperationalConfig = {
  
  // LAYOUT
  layout: {
    width: 1000,
    height: 240,
    padding: {
      top: 10,
      left: 60,
      right: 20,
      bottom: 40
    },
    background: "#1a1a1a",
    autosize: {
      type: "fit",
      contains: "padding"
    }
  },
  
  // COLOR SYSTEM
  colors: {
    // Background
    background: {
      canvas: "#0d0d0d",
      chart: "#1a1a1a",
      elevated: "#2a2a2a"
    },
    
    // Categorical palette (for multi-series)
    categorical: [
      "#60a5fa",  // Blue
      "#34d399",  // Green
      "#fbbf24",  // Amber
      "#a78bfa",  // Purple
      "#f87171"   // Red
    ],
    
    // Status colors (semantic)
    status: {
      healthy: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      unknown: "#6b7280"
    },
    
    // Sequential ramp (single-hue, low to high)
    sequential: [
      "#1e3a8a",
      "#1e40af",
      "#2563eb",
      "#3b82f6",
      "#60a5fa",
      "#93c5fd"
    ],
    
    // Diverging ramp (for positive/negative)
    diverging: {
      negative: ["#dc2626", "#ef4444", "#f87171"],
      neutral: "#6b7280",
      positive: ["#10b981", "#34d399", "#6ee7b7"]
    },
    
    // UI elements
    ui: {
      text: {
        primary: "#f5f5f5",
        secondary: "#a0a0a0",
        tertiary: "#888888",
        muted: "#6b7280"
      },
      border: {
        strong: "#2a2a2a",
        medium: "#1f1f1f",
        subtle: "#171717"
      },
      grid: "#2a2a2a"
    }
  },
  
  // TYPOGRAPHY
  typography: {
    fonts: {
      sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "JetBrains Mono, Consolas, Monaco, 'Courier New', monospace"
    },
    
    sizes: {
      title: 14,
      axisTitle: 11,
      axisLabel: 10,
      tick: 10,
      legend: 10,
      tooltip: 12
    },
    
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600
    }
  },
  
  // AXIS DEFAULTS
  axis: {
    bottom: {
      orient: "bottom",
      titleColor: "#a0a0a0",
      titleFont: "Inter, system-ui, sans-serif",
      titleFontSize: 11,
      titleFontWeight: 500,
      titlePadding: 12,
      
      labelColor: "#888888",
      labelFont: "Inter, system-ui, sans-serif",
      labelFontSize: 10,
      labelPadding: 8,
      labelFlush: true,
      
      tickColor: "#2a2a2a",
      tickSize: 5,
      
      domainColor: "#2a2a2a",
      domainWidth: 1,
      
      grid: false
    },
    
    left: {
      orient: "left",
      titleColor: "#a0a0a0",
      titleFont: "Inter, system-ui, sans-serif",
      titleFontSize: 11,
      titleFontWeight: 500,
      titlePadding: 12,
      
      labelColor: "#888888",
      labelFont: "JetBrains Mono, Consolas, Monaco, monospace",
      labelFontSize: 10,
      labelPadding: 8,
      
      tickColor: "#2a2a2a",
      tickSize: 5,
      
      domainColor: "#2a2a2a",
      domainWidth: 1,
      
      grid: true,
      gridColor: "#2a2a2a",
      gridOpacity: 0.5,
      gridDash: [1, 3]
    }
  },
  
  // MARK DEFAULTS
  marks: {
    line: {
      strokeWidth: 1.5,
      strokeCap: "round",
      strokeJoin: "round",
      interpolate: "linear"
    },
    
    area: {
      fillOpacity: 0.8,
      strokeWidth: 1
    },
    
    bar: {
      cornerRadius: 2,
      opacity: 1
    },
    
    point: {
      size: 50,
      opacity: 1
    },
    
    rect: {
      cornerRadius: 0,
      opacity: 1
    }
  },
  
  // INTERACTION
  interaction: {
    hover: {
      opacity: 0.7,
      transition: 200
    },
    
    focus: {
      opacity: 1,
      strokeWidth: 2
    },
    
    unfocus: {
      opacity: 0.2
    }
  },
  
  // LEGEND DEFAULTS
  legend: {
    titleColor: "#a0a0a0",
    titleFont: "Inter, system-ui, sans-serif",
    titleFontSize: 11,
    titleFontWeight: 500,
    
    labelColor: "#888888",
    labelFont: "Inter, system-ui, sans-serif",
    labelFontSize: 10,
    
    symbolType: "stroke",
    symbolStrokeWidth: 2,
    symbolSize: 100,
    
    orient: "top-right",
    direction: "horizontal",
    offset: 0,
    padding: 8
  }
};

/**
 * Helper: Create axis with config
 */
function createAxis(orient, scale, title = null, options = {}) {
  const baseConfig = OperationalConfig.axis[orient] || OperationalConfig.axis.left;
  
  return {
    ...baseConfig,
    scale,
    title,
    ...options
  };
}

/**
 * Helper: Create scale
 */
function createScale(name, type, range, domain, options = {}) {
  return {
    name,
    type,
    range,
    domain,
    ...options
  };
}

/**
 * Helper: Create line mark
 */
function createLineMark(dataSource, xField, yField, color = OperationalConfig.colors.categorical[0]) {
  return {
    type: "line",
    from: { data: dataSource },
    encode: {
      enter: {
        x: { scale: "x", field: xField },
        y: { scale: "y", field: yField },
        stroke: { value: color },
        strokeWidth: { value: OperationalConfig.marks.line.strokeWidth },
        strokeCap: { value: OperationalConfig.marks.line.strokeCap },
        strokeJoin: { value: OperationalConfig.marks.line.strokeJoin }
      },
      update: {
        opacity: { value: 1 }
      },
      hover: {
        opacity: { value: OperationalConfig.interaction.hover.opacity }
      }
    }
  };
}

/**
 * Usage Example:
 * 
 * const spec = {
 *   "$schema": "https://vega.github.io/schema/vega/v5.json",
 *   ...OperationalConfig.layout,
 *   
 *   scales: [
 *     createScale("x", "time", "width", { data: "table", field: "date" }),
 *     createScale("y", "linear", "height", { data: "table", field: "value" }, { nice: true, zero: false })
 *   ],
 *   
 *   axes: [
 *     createAxis("bottom", "x"),
 *     createAxis("left", "y", "CPU Usage (%)")
 *   ],
 *   
 *   marks: [
 *     createLineMark("table", "date", "value", OperationalConfig.colors.categorical[0])
 *   ]
 * };
 */

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OperationalConfig, createAxis, createScale, createLineMark };
}
