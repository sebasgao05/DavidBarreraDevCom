export type SkillLevel = 'fundamentos' | 'basico' | 'intermedio' | 'avanzado' | 'experto';

export interface Satellite {
  name: string;
  level: SkillLevel;
}

export interface SkillOrbit {
  name: {
    es: string;
    en: string;
  };
  color: string;
  satellites: Satellite[];
}

export type SkillsOrbits = {
  frontend: SkillOrbit;
  backend: SkillOrbit;
  database: SkillOrbit;
  cloud: SkillOrbit;
  devops: SkillOrbit;
  tools: SkillOrbit;
  integracion: SkillOrbit;
};

// Utility function to convert skill levels to percentages
export const levelToPercentage = (level: SkillLevel): number => {
  const levelMap: Record<SkillLevel, number> = {
    fundamentos: 25,
    basico: 45,
    intermedio: 70,
    avanzado: 85,
    experto: 95
  };
  return levelMap[level];
};

// Utility function to convert orbits to bar format
export const orbitsToSkills = (orbits: SkillsOrbits) => {
  const result: Record<string, Array<{ name: string; level: number }>> = {};
  
  Object.entries(orbits).forEach(([category, orbit]) => {
    result[category] = orbit.satellites.map(satellite => ({
      name: satellite.name,
      level: levelToPercentage(satellite.level)
    }));
  });
  
  return result;
};