import React, { useState, useEffect, RefObject } from 'react';

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
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const ref = React.useRef<HTMLElement>(null);

  const minSwipeDistance = input.delta || 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    if (input.preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe && input.onSwipedLeft) {
        input.onSwipedLeft();
      }
      if (isRightSwipe && input.onSwipedRight) {
        input.onSwipedRight();
      }
    } else {
      if (isUpSwipe && input.onSwipedUp) {
        input.onSwipedUp();
      }
      if (isDownSwipe && input.onSwipedDown) {
        input.onSwipedDown();
      }
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd]);

  return { ref };
};

export default useSwipe;