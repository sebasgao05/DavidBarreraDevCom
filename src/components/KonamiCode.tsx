import { useEffect, useState } from 'react';

const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const KonamiCode: React.FC = () => {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow keys and B/A keys
      if (konamiSequence.includes(e.code)) {
        setKonamiCode(prev => {
          const newCode = [...prev, e.code];
          if (newCode.length > konamiSequence.length) {
            newCode.shift();
          }
          return newCode;
        });
      }
      
      // Handle text input for "konami"
      if (e.key.length === 1) {
        setTextInput(prev => {
          const newInput = (prev + e.key.toLowerCase()).slice(-6);
          return newInput;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Check Konami sequence
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      window.location.href = '/konami.html';
    }
    
    // Check text input
    if (textInput === 'konami') {
      window.location.href = '/konami.html';
    }
  }, [konamiCode, textInput]);

  return null; // This component doesn't render anything
};

export default KonamiCode;