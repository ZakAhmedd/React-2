import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
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
      {/* <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addIngredient(new FormData(e.target));
          e.target.reset(); // Optional: clear the input after adding
        }}
        className="add-ingredient-form"
      >
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
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
