import React, { useEffect, useRef, RefObject } from 'react';

interface SwipeInput {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
  preventDefaultTouchmoveEvent?: boolean;
  delta?: number;
}

interface SwipeOutput {
  ref: RefObject<HTMLElement>;
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const ref = React.useRef<HTMLElement>(null);

  // Store touch coordinates in refs to avoid state updates and re-renders
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  // Keep input config in a ref so handlers always see the latest callbacks
  const inputRef = useRef(input);
  inputRef.current = input;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onTouchStart = (e: TouchEvent) => {
      touchEndRef.current = null;
      touchStartRef.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (inputRef.current.preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
      touchEndRef.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const onTouchEnd = () => {
      const touchStart = touchStartRef.current;
      const touchEnd = touchEndRef.current;
      if (!touchStart || !touchEnd) return;

      const minSwipeDistance = inputRef.current.delta || 50;
      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isLeftSwipe = distanceX > minSwipeDistance;
      const isRightSwipe = distanceX < -minSwipeDistance;
      const isUpSwipe = distanceY > minSwipeDistance;
      const isDownSwipe = distanceY < -minSwipeDistance;

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (isLeftSwipe && inputRef.current.onSwipedLeft) {
          inputRef.current.onSwipedLeft();
        }
        if (isRightSwipe && inputRef.current.onSwipedRight) {
          inputRef.current.onSwipedRight();
        }
      } else {
        if (isUpSwipe && inputRef.current.onSwipedUp) {
          inputRef.current.onSwipedUp();
        }
        if (isDownSwipe && inputRef.current.onSwipedDown) {
          inputRef.current.onSwipedDown();
        }
      }
    };

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return { ref };
};

export default useSwipe;
