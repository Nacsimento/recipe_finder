import React from 'react';
import {Link} from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        
            <div className='footer'>
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' , backgroundColor: 'transparent' , border: 'none' }}><div className='logo'>DishDiscovery</div></Link>
            <h4 className='h4'>© 2023 TheMealDB</h4>
            </div>
        
    );
}

export default Footer;
