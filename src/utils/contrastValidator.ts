// WCAG 2.1 Contrast Validator

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export class ContrastValidator {
  // Convert hex to RGB
  static hexToRgb(hex: string): ColorRGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Calculate relative luminance
  static getLuminance(rgb: ColorRGB): number {
    const { r, g, b } = rgb;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calculate contrast ratio
  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return 0;

    const lum1 = this.getLuminance(rgb1);
    const lum2 = this.getLuminance(rgb2);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  // Check WCAG compliance
  static checkWCAGCompliance(foreground: string, background: string): {
    ratio: number;
    AA: boolean;
    AAA: boolean;
    level: 'AAA' | 'AA' | 'Fail';
  } {
    const ratio = this.getContrastRatio(foreground, background);
    const AA = ratio >= 4.5;
    const AAA = ratio >= 7;

    return {
      ratio: Math.round(ratio * 100) / 100,
      AA,
      AAA,
      level: AAA ? 'AAA' : AA ? 'AA' : 'Fail'
    };
  }

  // Validate color palette
  static validatePalette(colors: { [key: string]: string }): {
    [key: string]: {
      ratio: number;
      level: string;
      compliant: boolean;
    };
  } {
    const results: any = {};
    const colorKeys = Object.keys(colors);

    for (let i = 0; i < colorKeys.length; i++) {
      for (let j = i + 1; j < colorKeys.length; j++) {
        const key1 = colorKeys[i];
        const key2 = colorKeys[j];
        const pairKey = `${key1}-${key2}`;
        
        const compliance = this.checkWCAGCompliance(colors[key1], colors[key2]);
        results[pairKey] = {
          ratio: compliance.ratio,
          level: compliance.level,
          compliant: compliance.AA
        };
      }
    }

    return results;
  }

  // Get accessible color suggestions
  static getAccessibleColor(baseColor: string, targetBackground: string): string[] {
    const suggestions: string[] = [];
    const baseRgb = this.hexToRgb(baseColor);
    
    if (!baseRgb) return suggestions;

    // Try different lightness values
    for (let lightness = 0; lightness <= 100; lightness += 5) {
      const hsl = this.rgbToHsl(baseRgb);
      hsl.l = lightness / 100;
      const newRgb = this.hslToRgb(hsl);
      const newHex = this.rgbToHex(newRgb);
      
      const compliance = this.checkWCAGCompliance(newHex, targetBackground);
      if (compliance.AA && !suggestions.includes(newHex)) {
        suggestions.push(newHex);
      }
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  // Helper functions for color conversion
  private static rgbToHsl(rgb: ColorRGB): { h: number; s: number; l: number } {
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / diff + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / diff + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s, l };
  }

  private static hslToRgb(hsl: { h: number; s: number; l: number }): ColorRGB {
    const { h, s, l } = hsl;
    const hNorm = h / 360;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, hNorm + 1/3);
      g = hue2rgb(p, q, hNorm);
      b = hue2rgb(p, q, hNorm - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  private static rgbToHex(rgb: ColorRGB): string {
    const { r, g, b } = rgb;
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}

// Predefined color palette validation
export const validatePortfolioColors = () => {
  const colors = {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    background: '#ffffff',
    darkBackground: '#1f2937',
    text: '#1f2937',
    darkText: '#f9fafb'
  };

  return ContrastValidator.validatePalette(colors);
};

export default ContrastValidator;