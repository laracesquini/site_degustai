import { recipes } from "../src/data/recipes.js"
import { categories } from "../src/data/categories.js"
import { db } from "./connect.js";

const newRecipesArray = recipes.map((currentRecipesObj) => {
  const newRecipesObj = { ...currentRecipesObj };
  delete newRecipesObj.id

  return newRecipesObj;
});

const newCategorieArray = categories.map((currentCategorieObj) => {
  const newCategorieObj = { ...currentCategorieObj };
  delete newCategorieObj.id

  return newCategorieObj;
});

const responseSongs = await db.collection('recipes').insertMany(newRecipesArray);

const responseArtists = await db.collection('categories').insertMany(newCategorieArray);