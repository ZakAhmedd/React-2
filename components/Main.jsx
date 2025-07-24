import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "pasta",
    "chicken",
    "cheese",
    "cream"
  ]);

  // function addIngredient(formData) {
  //   const newIngredient = formData.get("ingredient");
  //   setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  // }

  function addIngredient(event) {
    event.preventDefault(); // stop normal form submit / reload
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient").trim();
    if (!newIngredient) return; // ignore empty
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    event.target.reset(); // clear the input
  }

  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipe !== "" && recipeSection !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
