import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './nav'
import './categories.css';
import Footer from './footer';

const RecipeDetails = () => {
    const { id } = useParams();
   
    const[ name , setname] = useState();
    const[image , setimage] = useState();
    const[area , setarea] = useState();
    const[category , setcategory] = useState();
    const[instruction , setinstruction] = useState();
    const[meals , setmeals] = useState([]);
    const[ingredient , setingredient] = useState([]);
    const[measure , setmeasure] = useState([]);
    const[recipe , setrecipe] = useState('');
    const[err , seterr] = useState();
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false); 
      }, []);

    
    

      useEffect(() => {
        setLoading(true); // Set loading to true while fetching data.
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.meals && data.meals.length > 0) {
              const meal = data.meals[0];
              console.log(meal);
              setname(meal.strMeal);
              setimage(meal.strMealThumb);
              setarea(meal.strArea);
              setcategory(meal.strCategory);
              setinstruction(meal.strInstructions);
      
              const ingredientsArray = Array.from({ length: 20 }, (_, id) => meal[`strIngredient${id + 1}`]);
              setingredient(ingredientsArray);
      
              const measureArray = Array.from({ length: 20 }, (_, id) => meal[`strMeasure${id + 1}`]);
              setmeasure(measureArray);
              setLoading(false); // Set loading to false after data is fetched and set.
            } else {
              seterr("Oops, Recipe not found");
              setLoading(false); // Set loading to false even if no recipe is found.
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            seterr("Oops, something went wrong while fetching the recipe.");
            setLoading(false); // Set loading to false in case of an error.
          });
      }, [id]);
      
      
      
      
      
      
      
   

    return (
        <>
        <div className='container'>
          <Nav/>
        <div className="recipe-details">
      {loading && <div className="loader"></div>}
      {!loading && name ? (
        <div id="categoryholder" className='categoryholder'>
          <div className='cardimage'>
          <img src={image} alt={name} />
          </div>
          <div className='cardinfo'>
          <h1>{name}</h1>
          <p className="text-body-secondary in">
            <Link to={`/area/${area}`} style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }}>{area}</Link> | <Link to={`/category/${category}`} style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }}>{category}</Link>
          </p>
          <p className="m">Instruction</p>
          <p className="h6">{instruction}</p>
          <p className="m">Ingredients</p>
          <div className="n">
            <div className="in">
              {ingredient.map((item, index) => (
                <div key={index} className="h6">
                  {item}
                </div>
              ))}
            </div>
            <div className="me">
              {measure.map((item, index) => (
                <div key={index} className="h6">
                  {item}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      ) : (
        <div>{err}</div>
      )}
    </div>
    
    </div>
    <Footer/> 
        </>
        
    );
}

export default RecipeDetails;
