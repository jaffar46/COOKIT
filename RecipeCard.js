import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function RecipeCard({ item, onPress }) {
  const { themeStyles } = useTheme();
  return (
    <TouchableOpacity style={[styles.card, themeStyles.card]} onPress={onPress}>
      <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
      <View style={{flex:1, padding:10}}>
        <Text style={[styles.title, themeStyles.text]} numberOfLines={2}>{item.strMeal}</Text>
        <Text style={[styles.subtitle, themeStyles.text]} numberOfLines={3}>{item.strCategory || ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 12,
    overflow: 'hidden',
    elevation: 2
  },
  thumb: { width: 120, height: 100 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, marginTop: 6 }
});
