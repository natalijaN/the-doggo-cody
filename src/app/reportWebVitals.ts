import type { NextWebVitalsMetric } from 'next/app';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log('[Web Vitals]', metric);
}
console.log("✅ reportWebVitals.ts has been loaded");