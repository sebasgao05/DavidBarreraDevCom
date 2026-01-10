// Resource Preloader for Critical Performance
class ResourcePreloader {
  private preloadedResources = new Set<string>();
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.initIntersectionObserver();
    this.preloadCriticalResources();
  }

  private initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const preloadUrl = element.dataset.preload;
              if (preloadUrl) {
                this.preloadResource(preloadUrl);
                this.observer?.unobserve(element);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );
    }
  }

  // Preload critical resources immediately
  private preloadCriticalResources() {
    const criticalResources = [
      // Critical fonts
      'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
      
      // Hero image
      '/images/profile/profile-david.webp',
      
      // Critical project images (first 3)
      '/images/projects/project-portfolio-320.webp',
      '/images/projects/project-aws-iot-320.webp',
      '/images/projects/generator-cv-320.webp'
    ];

    criticalResources.forEach(url => this.preloadResource(url));
  }

  // Preload resource with appropriate method
  private preloadResource(url: string, type?: string) {
    if (this.preloadedResources.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;

    // Determine resource type
    if (type) {
      link.as = type;
    } else if (url.includes('.woff') || url.includes('.woff2')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (url.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      link.as = 'image';
    } else if (url.includes('.css')) {
      link.as = 'style';
    } else if (url.includes('.js')) {
      link.as = 'script';
    }

    document.head.appendChild(link);
    this.preloadedResources.add(url);
  }

  // Prefetch resources for next navigation
  public prefetchRoute(url: string) {
    if (this.preloadedResources.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    this.preloadedResources.add(url);
  }

  // Preload images when they come into viewport
  public observeImage(element: HTMLElement, imageUrl: string) {
    if (this.observer) {
      element.dataset.preload = imageUrl;
      this.observer.observe(element);
    }
  }

  // Preload next likely resources based on user behavior
  public preloadNextLikelyResources() {
    // Preload CV files (commonly accessed)
    this.prefetchRoute('/DavidBarrera-BogotaEN.pdf');
    this.prefetchRoute('/DavidBarrera-BogotaES.pdf');

    // Preload remaining project images
    const projectImages = [
      '/images/projects/project-ecommerce-320.webp',
      '/images/projects/project-dashboard-320.webp',
      '/images/projects/project-mobile-320.webp'
    ];

    // Delay preloading to avoid blocking critical resources
    setTimeout(() => {
      projectImages.forEach(url => this.preloadResource(url, 'image'));
    }, 2000);
  }

  // Cleanup
  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Web Vitals optimization utilities
class WebVitalsOptimizer {
  private static instance: WebVitalsOptimizer;

  public static getInstance(): WebVitalsOptimizer {
    if (!WebVitalsOptimizer.instance) {
      WebVitalsOptimizer.instance = new WebVitalsOptimizer();
    }
    return WebVitalsOptimizer.instance;
  }

  // Optimize Largest Contentful Paint (LCP)
  public optimizeLCP() {
    // Preload hero image
    const heroImage = document.querySelector('[data-hero-image]') as HTMLImageElement;
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }

    // Optimize font loading
    this.optimizeFontLoading();
  }

  // Optimize Cumulative Layout Shift (CLS)
  public optimizeCLS() {
    // Add aspect ratio containers for images
    const images = document.querySelectorAll('img[data-aspect-ratio]');
    images.forEach(img => {
      const aspectRatio = img.getAttribute('data-aspect-ratio');
      if (aspectRatio) {
        const container = img.parentElement;
        if (container) {
          container.style.aspectRatio = aspectRatio;
        }
      }
    });

    // Reserve space for dynamic content
    this.reserveSpaceForDynamicContent();
  }

  // Optimize First Input Delay (FID)
  public optimizeFID() {
    // Defer non-critical JavaScript
    this.deferNonCriticalJS();

    // Use passive event listeners where possible
    this.optimizeEventListeners();
  }

  private optimizeFontLoading() {
    // Use font-display: swap for better perceived performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  private reserveSpaceForDynamicContent() {
    // Add skeleton loaders with proper dimensions
    const skeletons = document.querySelectorAll('[data-skeleton]');
    skeletons.forEach(skeleton => {
      const element = skeleton as HTMLElement;
      const height = element.dataset.skeletonHeight;
      if (height) {
        element.style.minHeight = height;
      }
    });
  }

  private deferNonCriticalJS() {
    // Mark non-critical scripts for deferred loading
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      const scriptElement = script as HTMLScriptElement;
      if (!scriptElement.defer && !scriptElement.async) {
        scriptElement.defer = true;
      }
    });
  }

  private optimizeEventListeners() {
    // Convert to passive listeners where appropriate
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    
    passiveEvents.forEach(eventType => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (passiveEvents.includes(type) && typeof options !== 'object') {
          options = { passive: true };
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
  }
}

// Initialize optimizations
export const resourcePreloader = new ResourcePreloader();
export const webVitalsOptimizer = WebVitalsOptimizer.getInstance();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    webVitalsOptimizer.optimizeLCP();
    webVitalsOptimizer.optimizeCLS();
    webVitalsOptimizer.optimizeFID();
    resourcePreloader.preloadNextLikelyResources();
  });
} else {
  webVitalsOptimizer.optimizeLCP();
  webVitalsOptimizer.optimizeCLS();
  webVitalsOptimizer.optimizeFID();
  resourcePreloader.preloadNextLikelyResources();
}