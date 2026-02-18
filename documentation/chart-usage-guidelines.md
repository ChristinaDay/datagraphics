# Chart Usage Guidelines

**Operational Data Graphics: When to Use Each Chart Type**

This guide helps you choose the right visualization for your operational data. Each chart has specific strengths—using the wrong chart obscures insight.

---

## Chart Selection Decision Tree

```
Is your data...
├─ Continuous over time?
│  ├─ Monitoring real-time metrics? → Time-Series Line Chart
│  ├─ Comparing multiple services? → Multi-Series Comparison
│  └─ Showing cumulative breakdown? → Stacked Area Trend
│
├─ Distribution or frequency?
│  └─ Showing how values are spread? → Histogram / Distribution
│
├─ Comparing discrete categories?
│  └─ Ranking or comparing totals? → Throughput Bar Comparison
│
└─ Tracking status/health over time?
   └─ Showing uptime/incidents? → Status Timeline (Health Bands)
```

---

## 1. High-Density Time-Series Line Chart

### Purpose
Track one or more metrics over time with high precision and detail.

### Best For
- **API latency** (p50, p95, p99)
- **Request rates** (requests/sec)
- **Error rates** (%)
- **Resource utilization** (CPU, memory over time)
- **Any metric where trends and anomalies matter**

### When to Use
✅ You need to see **minute-by-minute** or **second-by-second** changes  
✅ Multiple related metrics should be compared on same axes  
✅ Users need to zoom/pan to investigate spikes  
✅ Spotting anomalies is the primary goal

### When NOT to Use
❌ Comparing totally different units (e.g., latency vs count) → use separate charts  
❌ More than 5 series → becomes unreadable  
❌ Categorical data → use bar chart instead  
❌ Status/health over time → use status timeline

### Data Requirements
- **X-axis**: Timestamp (continuous)
- **Y-axis**: Numeric value (same unit across series)
- **Series**: 1-5 related metrics
- **Typical timespan**: 1 hour to 7 days

### Example Use Cases
```
✅ "Show me API latency (p50, p95, p99) for the last 24 hours"
✅ "Track request rate across 3 regions"
✅ "Monitor database query time with alert thresholds"

❌ "Compare 10 different endpoints" → too many series
❌ "Show service health" → use status timeline instead
```

---

## 2. Multi-Series Comparison Line Chart

### Purpose
Compare different entities (services, regions, endpoints) over the same time period.

### Best For
- **Service-to-service comparison** (which service is slowest?)
- **Regional comparison** (which region has highest load?)
- **Endpoint comparison** (which endpoint gets most traffic?)
- **A/B test results** (variant A vs variant B)

### When to Use
✅ Comparing **2-4 distinct entities** on the same metric  
✅ Identifying which entity is outlier/leader  
✅ Spotting divergence or convergence patterns  
✅ Each series represents a different thing (not percentiles of same thing)

### When NOT to Use
❌ Showing percentiles of single metric → use time-series instead  
❌ More than 4 entities → too cluttered  
❌ Entities use different units → use separate charts  
❌ Categorical ranking matters more than time → use bar chart

### Data Requirements
- **X-axis**: Timestamp (continuous, same range for all)
- **Y-axis**: Numeric value (same unit)
- **Series**: 2-4 distinct entities
- **Typical timespan**: 1 day to 30 days

### Example Use Cases
```
✅ "Compare request volume for Auth, API, Database, Cache"
✅ "Show latency across US-East, US-West, EU-Central"
✅ "Compare throughput for v1 vs v2 endpoints"

❌ "Show p50, p95, p99 for single service" → use time-series
❌ "Compare 8 different microservices" → too many
```

---

## 3. Stacked Area Trend

### Purpose
Show how a total breaks down into parts over time (cumulative composition).

### Best For
- **Resource usage breakdown** (CPU + Memory + Disk + Network = 100%)
- **Traffic sources** (Organic + Paid + Direct + Referral)
- **Error type breakdown** (Timeouts + 500s + 400s = total errors)
- **Cost allocation** (Compute + Storage + Network = total cost)

### When to Use
✅ Parts add up to a **meaningful total**  
✅ You care about **both individual parts AND the total**  
✅ 2-5 categories in the breakdown  
✅ Showing how composition changes over time

### When NOT to Use
❌ Parts don't sum to a total → use multi-series instead  
❌ More than 5 categories → hard to read  
❌ Precise individual values matter more than composition → use multi-series  
❌ Comparing independent metrics → not cumulative

### Data Requirements
- **X-axis**: Timestamp (continuous)
- **Y-axis**: Numeric values that sum to a total
- **Series**: 2-5 categories
- **Data format**: Each point shows contribution of each part

### Example Use Cases
```
✅ "Show CPU + Memory + Disk + Network usage totaling 100%"
✅ "Break down total errors by type over time"
✅ "Show cost breakdown: Compute + Storage + Network"

❌ "Compare latency of 3 services" → not cumulative, use multi-series
❌ "Show 10 error categories" → too many layers
```

---

## 4. Histogram / Distribution

### Purpose
Show frequency distribution—how many instances fall into each range.

### Best For
- **Latency distribution** (most requests are 50-100ms)
- **Response size distribution**
- **Request duration bucketing**
- **Understanding outliers and percentiles**

### When to Use
✅ You need to see **shape of the distribution** (normal? bimodal? long tail?)  
✅ Identifying outliers or skew  
✅ Understanding **where most values cluster**  
✅ Validating SLAs (e.g., "95% of requests under 200ms")

### When NOT to Use
❌ Tracking values over time → use time-series instead  
❌ Comparing categories (not ranges) → use bar chart  
❌ You only care about p50/p95/p99 → summary stats suffice  
❌ Continuous trends matter more than distribution shape

### Data Requirements
- **X-axis**: Numeric ranges (bins)
- **Y-axis**: Count or frequency
- **Typical bins**: 8-20 buckets
- **Data format**: Aggregate counts per bin

### Example Use Cases
```
✅ "Show distribution of API response times (0-50ms, 50-100ms, 100-150ms...)"
✅ "What % of requests are under 200ms?"
✅ "Identify long-tail outliers in latency"

❌ "Track latency over the last hour" → use time-series
❌ "Compare throughput of 5 endpoints" → use bar chart
```

---

## 5. Throughput Bar Comparison

### Purpose
Compare discrete categories or entities on a single metric (ranking/magnitude comparison).

### Best For
- **Endpoint throughput** (which endpoint gets most traffic?)
- **Error counts by type**
- **Top N queries by execution time**
- **Service resource usage** (which service uses most memory?)

### When to Use
✅ Comparing **discrete categories** (not continuous time)  
✅ Clear ranking/magnitude matters ("which is biggest?")  
✅ 3-10 categories  
✅ Snapshot comparison (not time-series)

### When NOT to Use
❌ Tracking changes over time → use line chart  
❌ Showing distribution → use histogram  
❌ More than 15 categories → becomes unreadable  
❌ Composition breakdown → use stacked area

### Data Requirements
- **X-axis**: Numeric value (e.g., requests/sec)
- **Y-axis**: Category labels (e.g., endpoint names)
- **Format**: Single value per category
- **Typical count**: 3-10 categories

### Example Use Cases
```
✅ "Rank endpoints by requests/sec"
✅ "Compare error counts by type"
✅ "Show top 5 slowest database queries"

❌ "Track requests/sec over the last day" → use time-series
❌ "Show latency distribution" → use histogram
```

---

## 6. Status Timeline (Health Bands)

### Purpose
Show health/availability of services over time using colored bands.

### Best For
- **Service uptime monitoring**
- **Deployment status** (success, partial, failed)
- **Incident timeline** (healthy → degraded → down → recovering)
- **SLA compliance visualization**

### When to Use
✅ Binary or categorical **status states** (healthy/degraded/down)  
✅ Visualizing **uptime and incidents**  
✅ Showing **state duration** (how long was it down?)  
✅ 2-5 distinct statuses

### When NOT to Use
❌ Continuous numeric values → use line chart  
❌ Comparing magnitude → use bar chart  
❌ More than 5 status levels → too many colors  
❌ Fine-grained per-second changes → use line chart with threshold

### Data Requirements
- **X-axis**: Timestamp (continuous)
- **Y-axis**: Service/entity names
- **Status**: Categorical (Healthy, Degraded, Down)
- **Colors**: Green (healthy), Yellow (degraded), Red (down)

### Example Use Cases
```
✅ "Show API, Database, Cache health for last 24 hours"
✅ "Visualize deployment success/failure timeline"
✅ "Track incident status: detecting → mitigating → resolved"

❌ "Show exact latency values" → use line chart
❌ "Compare throughput of services" → use bar chart
```

---

## Quick Reference Table

| Chart Type | Best For | X-Axis | Y-Axis | # of Series/Categories |
|------------|----------|--------|--------|------------------------|
| **Time-Series Line** | Metric trends, anomaly detection | Time | Numeric (same unit) | 1-5 related metrics |
| **Multi-Series Comparison** | Entity comparison over time | Time | Numeric (same unit) | 2-4 distinct entities |
| **Stacked Area** | Cumulative composition | Time | Numeric (summed) | 2-5 categories |
| **Histogram** | Distribution shape | Numeric ranges | Count/Frequency | 8-20 bins |
| **Bar Comparison** | Category ranking | Numeric value | Category labels | 3-10 categories |
| **Status Timeline** | Health/uptime monitoring | Time | Service names | 2-5 statuses |

---

## Choosing Between Similar Charts

### Time-Series vs Multi-Series Comparison
- **Time-Series**: Same metric, different percentiles (p50, p95, p99)
- **Multi-Series**: Different entities, same metric (Service A, B, C latency)

### Multi-Series vs Stacked Area
- **Multi-Series**: Independent series that DON'T sum to a total
- **Stacked Area**: Series that ADD UP to a meaningful total

### Histogram vs Bar Chart
- **Histogram**: Numeric ranges (0-50ms, 50-100ms) showing distribution
- **Bar Chart**: Discrete categories (/api/users, /api/posts) showing comparison

### Time-Series vs Status Timeline
- **Time-Series**: Continuous numeric values (123.45ms)
- **Status Timeline**: Categorical states (Healthy, Degraded, Down)

---

## Anti-Patterns to Avoid

❌ **Don't use pie charts** for operational data  
→ Hard to compare angles, wastes space, implies a "whole"

❌ **Don't use 3D charts** ever  
→ Distorts perception, purely decorative

❌ **Don't use dual Y-axes** unless absolutely necessary  
→ Confusing, implies false correlation

❌ **Don't overload a single chart**  
→ More than 5 series = unreadable

❌ **Don't use line charts for categories**  
→ Line implies continuity between discrete categories

---

## Accessibility Considerations

For every chart, ensure:
- **Alt text** describes the insight (not just "line chart")
- **Data table fallback** for screen readers
- **Color is not the only indicator** (use patterns, labels)
- **Keyboard navigation** works for all interactions
- **Sufficient contrast** for all text and lines

---

## Summary

> **The right chart makes the insight obvious. The wrong chart hides it.**

Use this guide when designing dashboards, choosing visualizations, or explaining why a specific chart type is needed. Consistency in chart usage builds user trust and fluency.

For implementation details, see:
- [Design Thesis](design-thesis.md)
- [Interaction Patterns](interaction-patterns.md)
- [Chart Grammar Breakdown](chart-grammar-breakdown.md)
