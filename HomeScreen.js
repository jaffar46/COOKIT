import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import * as recipeService from '../services/recipeService';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigate }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { isDark, toggle, themeStyles } = useTheme();

  useEffect(() => {
    // initial load: some popular recipes
    fetchRecipes('chicken');
  }, []);

  async function fetchRecipes(q) {
    setLoading(true);
    const res = await recipeService.searchRecipes(q);
    setRecipes(res);
    setLoading(false);
  }

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:12}}>
        <Text style={[{fontSize:20, fontWeight:'700'}, themeStyles.text]}>COOKIT</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={themeStyles.text}>{isDark ? 'Dark' : 'Light'}</Text>
          <Button title='Toggle' onPress={toggle} />
        </View>
      </View>

      <View style={{padding:12}}>
        <TextInput
          placeholder='Search recipes by name...'
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => fetchRecipes(query)}
          style={{padding:10, borderRadius:8, borderWidth:1, borderColor:'#ccc'}}
        />
        <View style={{height:8}} />
        <TouchableOpacity onPress={() => fetchRecipes(query)} style={{padding:12, backgroundColor:'#2dd4bf', borderRadius:8, alignItems:'center'}}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator style={{marginTop:24}} size='large'/> : (
        <FlatList
          data={recipes}
          keyExtractor={(i) => i.idMeal || i.id}
          renderItem={({item}) => <RecipeCard item={item} onPress={() => navigate('Recipe', { id: item.idMeal || item.id })} />}
          ListEmptyComponent={() => <Text style={[{textAlign:'center', marginTop:24}, themeStyles.text]}>No recipes found</Text>}
        />
      )}
    </View>
  );
}
