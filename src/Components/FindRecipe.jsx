import React from 'react';
import './findreceipe.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindRecipe = () => {
  const [name, setname] = useState();
  const [image, setimage] = useState();
  const [area, setarea] = useState();
  const [category, setcategory] = useState();
  const [instruction, setinstruction] = useState();
  const [meals, setmeals] = useState([]);
  const [ingredient, setingredient] = useState([]);
  const [measure, setmeasure] = useState();
  const [recipe, setrecipe] = useState('');
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleNavigation = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  useEffect(() => {
    if (recipe.trim() !== '') {
      setLoading(true);
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meals && data.meals.length > 0) {
            console.log(data.meals[0]);
            setmeals(data.meals);
            setname(data.meals[0].strMeal);
            setimage(data.meals[0].strMealThumb);
            setarea(data.meals[0].strArea);
            setcategory(data.meals[0].strCategory);
            setinstruction(data.meals[0].strInstructions);

            const ingredientsArray = Array.from({ length: 20 }, (_, id) => data.meals[0][`strIngredient${id + 1}`]);
            setingredient(ingredientsArray);

            const measureArray = Array.from({ length: 20 }, (_, id) => data.meals[0][`strMeasure${id + 1}`]);
            setmeasure(measureArray);

            // Now that we have the data, navigate to the recipe details page
            handleNavigation(data.meals[0].idMeal);
          } else {
            setmeals([]);
            seterr('Opps, Recipe not found');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [recipe]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for a recipe"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setrecipe(e.target.value);
          }
        }}
      />
      
    </div>
  );
};

export default FindRecipe;
