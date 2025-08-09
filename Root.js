import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import { useTheme } from './context/ThemeContext';
import { View } from 'react-native';

export default function Root() {
  const [route, setRoute] = useState({ name: 'Home', params: null });
  const { themeStyles } = useTheme();
  const navigate = (name, params = null) => setRoute({ name, params });

  return (
    <View style={[{flex:1}, themeStyles.container]}>
      {route.name === 'Home' ? (
        <HomeScreen navigate={navigate} />
      ) : (
        <RecipeScreen navigate={navigate} route={route} />
      )}
    </View>
  );
}
