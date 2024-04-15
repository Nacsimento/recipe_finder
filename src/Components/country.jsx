import React, { useEffect, useState } from 'react';
import './country.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Country = () => {
    const [meals, setMeals] = useState([]);
    const [countries, setCountries] = useState([]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then((res) => res.json())
            .then((data) => {
                setCountries(data.meals);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            // Fetch meals for each country
            Promise.all(
                countries.map(country => {
                    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country.strArea}`)
                        .then(res => res.json())
                        .then(data => data.meals)
                        .catch(error => {
                            console.error('Error fetching meals:', error);
                            return [];
                        });
                })
            )
                .then(mealsData => {
                    setMeals(mealsData);
                });
        }
    }, [countries]);

    return (
        <div className='container'>
            {meals.length > 0 && countries.map((country, countryIndex) => (
                <div key={countryIndex}>
                    <div className='countryheading'>
                    <h1>{country.strArea}</h1>
                    <Link to={`/area/${country.strArea}`} data-replace="View All" className='link'><span><h5>View All</h5></span></Link>
                    </div>
                    <div className='con'>
                        <Slider {...settings}>
                            {meals[countryIndex] && meals[countryIndex].map((meal, mealIndex) => (
                                <Link to={`/recipe/${meal.idMeal}`} className='link'>
                                <div className='mealcontainer' key={mealIndex}>
                                    <div className='mealimg'>
                                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                                    </div>
                                    <div className='mealname'>{meal.strMeal}</div>
                                </div>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Country;
