import React from 'react';
import { useEffect , useState , useRef } from 'react';
import { Link } from 'react-router-dom';

import './categories.css';

const Categories = () => {

    const categoryRef = useRef(null);

    const[list , setlist] = useState([]);
    const[select , setselect] = useState();
    const[category , setcaregory] = useState([]);
    const[page , setpage] = useState(1);
    


    const[ name , setname] = useState();
    const[image , setimage] = useState();
    const[area , setarea] = useState();
    const[categorynew , setcategorynew] = useState();
    const[instruction , setinstruction] = useState();
    const[meals , setmeals] = useState([]);
    const[ingredient , setingredient] = useState([]);
    const[measure , setmeasure] = useState([]);
    const[recipe , setrecipe] = useState('');
    const[err , seterr] = useState();
    const[loading, setLoading] = useState(false);

    
    

    useEffect(()=>{
        if(select){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${select}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.meals);
            setlist(data.meals);
        })
    }
    }, [select])


    useEffect(()=> {
        fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.categories)
            setcaregory(data.categories)
            
        })
    } , [])

    const handle = (category) => {
       
        setselect(category);
        setpage(1);
        setrecipe('');
        scrollToCategory();
        

    }

    const mealhandle = (mel) => {
         setrecipe(mel);
       
    }

    const scrollToCategory = () => {
        categoryRef.current.scrollIntoView({ behavior: 'smooth' }); 
      };

    useEffect(()=>{
        
        if(recipe.trim() !== '') {
            setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.meals && data.meals.length > 0) {
                console.log(data.meals[0])
                setmeals(data.meals)
                setname(data.meals[0].strMeal)
                setimage(data.meals[0].strMealThumb)
                setarea(data.meals[0].strArea)
                setcategorynew(data.meals[0].strCategory)
                setinstruction(data.meals[0].strInstructions)

                const ingredientsArray = Array.from({ length: 20 }, (_, id) => data.meals[0][`strIngredient${id + 1}`]);
                setingredient(ingredientsArray);

                const measureArray = Array.from({length : 20} , (_, id) => data.meals[0][`strMeasure${id + 1}`]);
                setmeasure(measureArray);
           
        }
        else{
            setmeals([]);
            seterr("Opps , Recipe not found") ;
        }
        
        

        }).finally(() => {
            setLoading(false); 
          });;
    }
    }, [recipe])

    const handlepage =  (pagechange) => {
        if(pagechange >= 1 && pagechange <= Math.ceil(list.length / 3) && page != pagechange)
        setpage(pagechange)
    }
    

    return (
        <>
        <div className='container'>
            <div className='categoryholderc'>
            <h1 className='Categoryheading'>Popular Categories</h1>
            <div className='cardholder'>
            
            {
                category.map((items , index) => {
                    return(
                        <div ref={categoryRef}>
                        <div className='Categoryholder' id='categoryholder' onClick={() => handle(items.strCategory)}>
                        <div><img src={items.strCategoryThumb} alt={items.strCategory} /></div>
                        <div className='card1' key={index} >{items.strCategory}</div>
                        </div>
                        </div>
                    );
                })
            }


       
            </div>
            <div className='mealbycategories'>
            {
                list.slice(page * 3 - 3 , page * 3 ).map((items, index) => {
                    return(
                        <Link to={`/recipe/${items.idMeal}` } style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }} >
                        <div className='cat' key={index} >
                            <img src={items.strMealThumb} alt="items.strMeal" />
                            <h5>{items.strMeal}</h5>
                        </div>
                        </Link>
                    );
                })
            }
            </div>
            <div className='pages'>
    {page > 1 && (
        <span onClick={() => handlepage(page - 1)} className='arrow'>
            <i className="uil uil-arrow-circle-left"></i>
        </span>
    )}
    {page < Math.ceil(list.length / 3) && (
        <span onClick={() => handlepage(page + 1)} className='arrow'>
            <i className="uil uil-arrow-circle-right"></i>
        </span>
    )}
</div>
</div>
        </div>


<div className='container'>

{loading && <div className="loader"></div>}
{!loading && (
<div>
{recipe.trim() && meals.length > 0 ? (
<div ref={categoryRef}>
<div id='categoryholder'>
<img src={image} alt={name} />
<h1>{name}</h1>
<p className="text-body-secondary in">
{area} | {categorynew}
</p>
<p className="m">Instruction</p>
<p className="h6">{instruction}</p>
<p className="m">Ingredients</p>
<div className="n">
<div className="in">
{ingredient.map((itmes, index) => (
  <div key={index} className="h6">
    {itmes}
  </div>
))}
</div>
<div className="me">
{measure.map((items, index) => (
  <div key={index} className="h6">
    {items}
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
)}
</div>

</>
    );
}

export default Categories;
