// Minimal recipe service. Default provider: TheMealDB (free public API)
// You can swap baseURL to another free API if you like.
const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query) {
  try {
    const url = query ? `${BASE}/search.php?s=${encodeURIComponent(query)}` : `${BASE}/search.php?s=`;
    const r = await fetch(url);
    const j = await r.json();
    return j.meals || [];
  } catch (e) {
    console.warn('searchRecipes error', e);
    return [];
  }
}

export async function searchByIngredient(ingredient) {
  try {
    const url = `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`;
    const r = await fetch(url);
    const j = await r.json();
    // This endpoint returns only id, name and thumbnail. Caller may lookup details.
    return j.meals || [];
  } catch (e) {
    console.warn('searchByIngredient error', e);
    return [];
  }
}

export async function getRecipeById(id) {
  try {
    const url = `${BASE}/lookup.php?i=${encodeURIComponent(id)}`;
    const r = await fetch(url);
    const j = await r.json();
    return (j.meals && j.meals[0]) || null;
  } catch (e) {
    console.warn('getRecipeById error', e);
    return null;
  }
}
