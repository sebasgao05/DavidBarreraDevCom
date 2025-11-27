import { useEffect, useRef } from 'react';

interface FocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
}

export const useFocusManagement = (
  isActive: boolean,
  options: FocusManagementOptions = {}
) => {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  const { trapFocus = false, restoreFocus = true, autoFocus = true } = options;

  useEffect(() => {
    if (!isActive) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Auto focus the container or first focusable element
    if (autoFocus && containerRef.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        containerRef.current.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!trapFocus || !containerRef.current) return;

      if (e.key === 'Tab') {
        const focusableElements = containerRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        // Allow parent components to handle escape
        const escapeEvent = new CustomEvent('focusEscape', { bubbles: true });
        containerRef.current?.dispatchEvent(escapeEvent);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, trapFocus, restoreFocus, autoFocus]);

  return containerRef;
};

export const useFocusVisible = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('focus-visible');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('focus-visible');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

export default useFocusManagement;