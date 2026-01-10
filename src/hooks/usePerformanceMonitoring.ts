import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface PerformanceConfig {
  enableLogging?: boolean;
  enableReporting?: boolean;
  reportEndpoint?: string;
}

export const usePerformanceMonitoring = (config: PerformanceConfig = {}) => {
  const { enableLogging = true, enableReporting = false, reportEndpoint } = config;

  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    if (enableLogging) {
      console.log(`📊 ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        id: metric.id
      });
    }

    if (enableReporting && reportEndpoint) {
      // Send to analytics endpoint
      fetch(reportEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(error => {
        console.warn('Failed to report metric:', error);
      });
    }
  }, [enableLogging, enableReporting, reportEndpoint]);

  const measureCLS = useCallback(() => {
    let clsValue = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          
          const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
          
          reportMetric({
            name: 'CLS',
            value: clsValue,
            rating,
            delta: entry.value,
            id: `cls-${Date.now()}`
          });
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  }, [reportMetric]);

  const measureLCP = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      
      const value = lastEntry.renderTime || lastEntry.loadTime || 0;
      const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';

      reportMetric({
        name: 'LCP',
        value,
        rating,
        delta: value,
        id: `lcp-${Date.now()}`
      });
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    return observer;
  }, [reportMetric]);

  const measureFID = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceEventTiming[]) {
        const value = entry.processingStart - entry.startTime;
        const rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';

        reportMetric({
          name: 'FID',
          value,
          rating,
          delta: value,
          id: `fid-${Date.now()}`
        });
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
    return observer;
  }, [reportMetric]);

  const measureFCP = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = entry.startTime;
        const rating = value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';

        reportMetric({
          name: 'FCP',
          value,
          rating,
          delta: value,
          id: `fcp-${Date.now()}`
        });
      }
    });

    observer.observe({ type: 'paint', buffered: true });
    return observer;
  }, [reportMetric]);

  const measureTTFB = useCallback(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const value = navigationEntry.responseStart - navigationEntry.requestStart;
      const rating = value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';

      reportMetric({
        name: 'TTFB',
        value,
        rating,
        delta: value,
        id: `ttfb-${Date.now()}`
      });
    }
  }, [reportMetric]);

  const measureCustomMetrics = useCallback(() => {
    // Measure React hydration time
    const hydrationStart = performance.mark('hydration-start');
    
    // This will be called after React hydration
    setTimeout(() => {
      const hydrationEnd = performance.mark('hydration-end');
      performance.measure('hydration-time', 'hydration-start', 'hydration-end');
      
      const measure = performance.getEntriesByName('hydration-time')[0];
      if (measure) {
        reportMetric({
          name: 'Hydration Time',
          value: measure.duration,
          rating: measure.duration <= 1000 ? 'good' : measure.duration <= 2000 ? 'needs-improvement' : 'poor',
          delta: measure.duration,
          id: `hydration-${Date.now()}`
        });
      }
    }, 0);

    // Measure bundle size impact
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalJSSize = 0;
    let totalCSSSize = 0;

    resourceEntries.forEach(entry => {
      if (entry.name.includes('.js')) {
        totalJSSize += entry.transferSize || 0;
      } else if (entry.name.includes('.css')) {
        totalCSSSize += entry.transferSize || 0;
      }
    });

    if (totalJSSize > 0) {
      reportMetric({
        name: 'JS Bundle Size',
        value: totalJSSize,
        rating: totalJSSize <= 200000 ? 'good' : totalJSSize <= 500000 ? 'needs-improvement' : 'poor',
        delta: totalJSSize,
        id: `js-size-${Date.now()}`
      });
    }

    if (totalCSSSize > 0) {
      reportMetric({
        name: 'CSS Bundle Size',
        value: totalCSSSize,
        rating: totalCSSSize <= 50000 ? 'good' : totalCSSSize <= 100000 ? 'needs-improvement' : 'poor',
        delta: totalCSSSize,
        id: `css-size-${Date.now()}`
      });
    }
  }, [reportMetric]);

  useEffect(() => {
    const observers: PerformanceObserver[] = [];

    // Check if Performance Observer is supported
    if ('PerformanceObserver' in window) {
      try {
        observers.push(measureCLS());
        observers.push(measureLCP());
        observers.push(measureFID());
        observers.push(measureFCP());
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }

    // Measure TTFB and custom metrics
    measureTTFB();
    measureCustomMetrics();

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [measureCLS, measureLCP, measureFID, measureFCP, measureTTFB, measureCustomMetrics]);

  // Return utility functions for manual measurements
  return {
    measureCustomEvent: useCallback((name: string, startTime: number, endTime?: number) => {
      const value = (endTime || performance.now()) - startTime;
      reportMetric({
        name,
        value,
        rating: value <= 1000 ? 'good' : value <= 2000 ? 'needs-improvement' : 'poor',
        delta: value,
        id: `custom-${Date.now()}`
      });
    }, [reportMetric]),

    markInteraction: useCallback((interactionName: string) => {
      performance.mark(`${interactionName}-start`);
      
      return () => {
        performance.mark(`${interactionName}-end`);
        performance.measure(interactionName, `${interactionName}-start`, `${interactionName}-end`);
        
        const measure = performance.getEntriesByName(interactionName)[0];
        if (measure) {
          reportMetric({
            name: `Interaction: ${interactionName}`,
            value: measure.duration,
            rating: measure.duration <= 100 ? 'good' : measure.duration <= 300 ? 'needs-improvement' : 'poor',
            delta: measure.duration,
            id: `interaction-${Date.now()}`
          });
        }
      };
    }, [reportMetric])
  };
};

// Types for TypeScript support
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}