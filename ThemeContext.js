import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('cookit_theme');
        if (saved !== null) setIsDark(saved === 'dark');
        else setIsDark(Appearance.getColorScheme() === 'dark');
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const toggle = async () => {
    const newVal = !isDark;
    setIsDark(newVal);
    try {
      await AsyncStorage.setItem('cookit_theme', newVal ? 'dark' : 'light');
    } catch (e) {}
  };

  const themeStyles = isDark ? darkStyles : lightStyles;
  return (
    <ThemeContext.Provider value={{ isDark, toggle, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#ffffff' },
  text: { color: '#111827' },
  card: { backgroundColor: '#f8fafc' }
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#0f1720' },
  text: { color: '#e6eef8' },
  card: { backgroundColor: '#0b1220' }
});
