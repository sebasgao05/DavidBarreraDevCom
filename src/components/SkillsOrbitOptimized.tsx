import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code, Server, Database, Cloud, Wrench, Infinity as InfinityIcon, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { skillsOrbits } from '../data/portfolioData';
import { useTheme } from '../contexts/ThemeContext';
import type { SkillLevel, SkillsOrbits } from '../types/skills';

interface SystemProps {
  category: keyof SkillsOrbits;
  index: number;
}

const SkillsOrbit: React.FC = () => {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'es' | 'en';
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedSystems, setLoadedSystems] = useState<Set<string>>(new Set());

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.getElementById('skills-orbit');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSystemLoad = useCallback((category: string) => {
    setLoadedSystems(prev => {
      const newSet = new Set(prev);
      newSet.add(category);
      return newSet;
    });
  }, []);

  const icons: Record<keyof SkillsOrbits, React.ComponentType<{ className?: string }>> = {
    frontend: Code,
    backend: Server,
    database: Database,
    cloud: Cloud,
    devops: InfinityIcon,
    tools: Wrench,
    integracion: Zap
  };

  const levelConfig = useMemo(() => ({
    fundamentos: { color: '#6B7280', size: 4, opacity: 0.5, glow: false },
    basico: { color: '#3B82F6', size: 5, opacity: 0.65, glow: false },
    intermedio: { color: '#10B981', size: 6, opacity: 0.8, glow: false },
    avanzado: { color: '#F59E0B', size: 7, opacity: 0.95, glow: false },
    experto: { color: '#EF4444', size: 8, opacity: 1.0, glow: true }
  }), []);

  const Comet: React.FC<{ delay: number }> = ({ delay }) => {
    if (shouldReduceMotion) return null;
    
    return (
      <motion.div
        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, 400],
          y: [0, 200],
          opacity: [0, 0.6, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 20,
          ease: "easeOut"
        }}
      />
    );
  };

  const System: React.FC<SystemProps> = ({ category, index }) => {
    const orbit = skillsOrbits[category];
    const IconComponent = icons[category];
    const centerX = 120;
    const centerY = 120;
    const isLoaded = loadedSystems.has(category);
    
    const orbits = useMemo(() => {
      const satellites = orbit.satellites;
      const orbitsData = [];
      
      if (satellites.length <= 6) {
        orbitsData.push({ satellites, radius: 75 });
      } else if (satellites.length <= 18) {
        orbitsData.push(
          { satellites: satellites.slice(0, 6), radius: 60 },
          { satellites: satellites.slice(6, 18), radius: 100 }
        );
      } else {
        orbitsData.push(
          { satellites: satellites.slice(0, 6), radius: 50 },
          { satellites: satellites.slice(6, 18), radius: 80 },
          { satellites: satellites.slice(18, 36), radius: 110 }
        );
      }
      
      return orbitsData;
    }, [orbit.satellites]);

    // Lazy load system after a delay
    useEffect(() => {
      if (isVisible && !isLoaded) {
        const timer = setTimeout(() => {
          handleSystemLoad(category);
        }, index * 200);
        return () => clearTimeout(timer);
      }
    }, [isVisible, isLoaded, category, index, handleSystemLoad]);

    if (!isVisible || !isLoaded) {
      return (
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
          <div className="w-full h-[240px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      );
    }

    return (
      <motion.div
        className="relative w-full aspect-square max-w-[280px] mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
      >
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id={`bg-${category}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={orbit.color} stopOpacity="0.05" />
              <stop offset="100%" stopColor={orbit.color} stopOpacity="0.01" />
            </radialGradient>
            <filter id={`glow-${category}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          
          <circle cx={centerX} cy={centerY} r="110" fill={`url(#bg-${category})`} />
          
          {orbits.map((orbitData, orbitIndex) => (
            <g key={orbitIndex}>
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={orbitData.radius}
                fill="none"
                stroke={orbit.color}
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
                animate={shouldReduceMotion ? {} : {
                  strokeDashoffset: [0, -8],
                  transition: {
                    duration: 12 + orbitIndex * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                  }
                }}
              />
              
              {orbitData.satellites.map((satellite, satIndex) => {
                const baseAngle = (satIndex * 360 / orbitData.satellites.length);
                const angleOffset = orbitIndex * 20;
                const angle = (baseAngle + angleOffset) * Math.PI / 180;
                const satX = centerX + Math.cos(angle) * orbitData.radius;
                const satY = centerY + Math.sin(angle) * orbitData.radius;
                const config = levelConfig[satellite.level];

                return (
                  <motion.g
                    key={satellite.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: (index * 0.1) + 0.3 + (satIndex * 0.05), 
                      duration: 0.4,
                      type: "spring"
                    }}
                  >
                    {config.glow && !shouldReduceMotion && (
                      <motion.circle
                        cx={satX}
                        cy={satY}
                        r={config.size + 3}
                        fill={config.color}
                        opacity="0.3"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.2, 0.3],
                          transition: {
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    )}
                    
                    <motion.circle
                      cx={satX}
                      cy={satY}
                      r={config.size + (shouldReduceMotion ? 0 : 2)}
                      fill={config.color}
                      opacity={shouldReduceMotion ? config.opacity : "0.2"}
                      animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.15, 0.2],
                        transition: {
                          duration: 5 + (satIndex * 0.3),
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <motion.circle
                      cx={satX}
                      cy={satY}
                      r={config.size}
                      fill={config.color}
                      opacity={config.opacity}
                      filter={config.glow ? `url(#glow-${category})` : undefined}
                      animate={shouldReduceMotion ? {} : {
                        y: [0, -0.5, 0],
                        transition: {
                          duration: 3 + (satIndex * 0.4),
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <text
                      x={satX}
                      y={satY - config.size - 4}
                      textAnchor="middle"
                      className={`text-xs font-medium ${
                        isDark ? 'fill-gray-400' : 'fill-gray-600'
                      }`}
                      opacity="0.8"
                    >
                      {satellite.name}
                    </text>
                  </motion.g>
                );
              })}
            </g>
          ))}
          
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: (index * 0.1) + 0.2, duration: 0.5, type: "spring" }}
          >
            <motion.circle
              cx={centerX}
              cy={centerY}
              r="25"
              fill="none"
              stroke={orbit.color}
              strokeWidth="1"
              opacity="0.4"
              animate={shouldReduceMotion ? {} : {
                r: [22, 28, 22],
                opacity: [0.4, 0.2, 0.4],
                transition: {
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }
              }}
            />
            
            <circle
              cx={centerX}
              cy={centerY}
              r="18"
              fill={orbit.color}
              filter={`url(#glow-${category})`}
            />
            
            <foreignObject
              x={centerX - 12}
              y={centerY - 12}
              width="24"
              height="24"
            >
              <IconComponent 
                className="w-6 h-6 text-white"
              />
            </foreignObject>
          </motion.g>
        </svg>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {orbit.name[currentLang]}
          </h3>
        </div>
      </motion.div>
    );
  };

  return (
    <div id="skills-orbit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
        </motion.div>

        {!shouldReduceMotion && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(2)].map((_, i) => (
              <Comet key={i} delay={i * 8} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.keys(skillsOrbits).map((category, index) => (
            <System
              key={category}
              category={category as keyof SkillsOrbits}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsOrbit;