import { useTheme } from '../contexts/ThemeContext';

export function useThemeStyles() {
  const { theme, colors } = useTheme();

  return {
    theme,
    colors,

    text: {
      primary: theme === 'dark' ? 'text-white' : 'text-stone-900',
      secondary: theme === 'dark' ? 'text-white/80' : 'text-stone-700',
      tertiary: theme === 'dark' ? 'text-white/60' : 'text-stone-600',
      muted: theme === 'dark' ? 'text-white/40' : 'text-stone-500',
    },

    bg: {
      primary: theme === 'dark' ? 'bg-black' : 'bg-stone-50',
      secondary: theme === 'dark' ? 'bg-zinc-900' : 'bg-white',
      elevated: theme === 'dark' ? 'bg-zinc-800' : 'bg-white',
      card: theme === 'dark'
        ? 'from-white/[0.08] to-white/[0.03]'
        : 'from-white to-stone-50',
    },

    border: {
      subtle: theme === 'dark' ? 'border-white/10' : 'border-black/6',
      medium: theme === 'dark' ? 'border-white/20' : 'border-black/12',
      strong: theme === 'dark' ? 'border-white/30' : 'border-black/18',
    },

    accent: {
      primary: theme === 'dark'
        ? 'from-yellow-200 to-yellow-400'
        : 'from-orange-500 to-red-600',
      secondary: theme === 'dark' ? 'text-yellow-400' : 'text-orange-600',
    },

    shadow: {
      card: theme === 'dark'
        ? '0 10px 40px rgba(0, 0, 0, 0.5)'
        : '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      elevated: theme === 'dark'
        ? '0 20px 60px rgba(0, 0, 0, 0.6)'
        : '0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)',
    },

    overlay: {
      gradient: theme === 'dark'
        ? 'bg-gradient-to-b from-transparent via-yellow-500/[0.02] to-transparent'
        : 'bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent',
    },

    getGradientBg: (isDark: string, isLight: string) => theme === 'dark' ? isDark : isLight,
    getBgColor: (isDark: string, isLight: string) => theme === 'dark' ? isDark : isLight,
    getTextColor: (isDark: string, isLight: string) => theme === 'dark' ? isDark : isLight,
  };
}
