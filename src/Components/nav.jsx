import React from 'react';
import FindRecipe from './FindRecipe';
import './nav.css'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='container'>
            <nav>
                <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }}><div className='logo'>DishDiscovery</div></Link>
                <div className='search'>
                    <FindRecipe/>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
