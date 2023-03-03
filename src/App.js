import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Recipe from "./components/Recipe";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const APP_ID = "4a5fcca2";
  const APP_KEY = "1ec16e6a559e60c49539ec4f7bdea4e3";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const getSearch = (e) => {
    setQuery(search);
    setSearch("");
    e.preventDefault();
    document.getElementById("form").value = "";
  };

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <Header />

      <Form onChange={handleChange} getSearch={getSearch} />

      <div className="recipes">
        {recipes.map((recipe, index) => {
          return (
            <Recipe
              key={index}
              id={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              url={recipe.recipe.url}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default App;
