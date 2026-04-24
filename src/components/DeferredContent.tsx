import React, { useEffect, useState } from 'react';

interface DeferredContentProps {
  children: React.ReactNode;
}

const DeferredContent: React.FC<DeferredContentProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsReady(true), 1);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
};

export default DeferredContent;
