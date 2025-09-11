
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'indigo' | 'pink';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeConfig {
  color: ThemeColor;
  mode: ThemeMode;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  getThemeClasses: () => string;
}

const defaultTheme: ThemeConfig = {
  color: 'blue',
  mode: 'light',
  fontSize: 'medium',
  borderRadius: 'medium'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  blue: {
    primary: '59 130 246',
    secondary: '147 197 253',
    accent: '37 99 235'
  },
  green: {
    primary: '34 197 94',
    secondary: '134 239 172',
    accent: '22 163 74'
  },
  purple: {
    primary: '147 51 234',
    secondary: '196 181 253',
    accent: '124 58 237'
  },
  orange: {
    primary: '249 115 22',
    secondary: '254 215 170',
    accent: '234 88 12'
  },
  red: {
    primary: '239 68 68',
    secondary: '252 165 165',
    accent: '220 38 38'
  },
  teal: {
    primary: '20 184 166',
    secondary: '153 246 228',
    accent: '15 118 110'
  },
  indigo: {
    primary: '99 102 241',
    secondary: '165 180 252',
    accent: '79 70 229'
  },
  pink: {
    primary: '236 72 153',
    secondary: '251 207 232',
    accent: '219 39 119'
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('app-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(theme));
    applyThemeToDocument(theme);
  }, [theme]);

  const applyThemeToDocument = (config: ThemeConfig) => {
    const root = document.documentElement;
    const colors = themeColors[config.color];

    // Aplicar variables CSS personalizadas
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', config.mode === 'dark' ? '255 255 255' : '255 255 255');
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    
    // Aplicar modo oscuro/claro
    root.classList.remove('light', 'dark');
    if (config.mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'dark' : 'light');
    } else {
      root.classList.add(config.mode);
    }

    // Aplicar tamaño de fuente
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    root.style.setProperty('--base-font-size', fontSizes[config.fontSize]);

    // Aplicar border radius
    const radiusValues = {
      none: '0px',
      small: '4px',
      medium: '8px',
      large: '12px'
    };
    root.style.setProperty('--border-radius', radiusValues[config.borderRadius]);
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const getThemeClasses = () => {
    const colorClass = `theme-${theme.color}`;
    const modeClass = theme.mode === 'system' ? '' : theme.mode;
    return `${colorClass} ${modeClass}`.trim();
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
