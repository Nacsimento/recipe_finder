import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './area.css';
import Nav from './nav';
import { Link } from 'react-router-dom';
import Footer from './footer';


const Area = () => {

    const { area } = useParams();

    const[meal , setmeal] = useState([]);

    useEffect(()=> {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then((res)=> res.json())
        .then((data) => {
            setmeal(data.meals)
            console.log(data.meals)
        })
    },[area])

    return (
        <>
        <div className='container'>
            <Nav/>
            <h1 className='h'>The best of {area} cuisine </h1>
            <div className='areacontainer'>
            
            {
                meal.map((items , index) => {
                    return(
                        <Link to={`/recipe/${items.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }}>
                        < div className='areaholder'>
                        <div className='imagearea'>
                            <img src={items.strMealThumb} alt="" />
                        </div>
                        <div className='areatext'>
                            <h1>{items.strMeal}</h1>
                        </div>
                        </div>
                        </Link>
                    );
                })
            }
        </div>
        </div>
        <Footer/>
        </>
    );
}

export default Area;
