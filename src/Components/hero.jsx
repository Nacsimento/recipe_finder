import React from 'react';
import banner from '../Images/banner.png';
import './hero.css';

const Hero = () => {
    return (
        <div className='container'>
            <div className='banner'>
            <h1 className='herotext'>Discover Your Next Culinary <br /> Adventure</h1>
            <img src={banner} alt="Mainbanner" className='bannerimg' />
            <div className='social'>
                <div className='socialitems'><i class="uil uil-instagram"></i></div>
                <div className='socialitems'><i class="uil uil-twitter-alt"></i></div>
                <div className='socialitems'><i class="uil uil-github-alt"></i></div>
            
            </div>
            </div>
        </div>
    );
}

export default Hero;
