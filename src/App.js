import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './Components/Categories';
import Nav from './Components/nav';
import Hero from './Components/hero';
import Country from './Components/country';
import RecipeDetails from './Components/RecipeDetails';
import Area from './Components/area';
import Bycategories from './Components/bycategories';
import Footer from './Components/footer';
function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Hero />
                <Categories />
                <Country />
                <Footer/>
                
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path='/area/:area' element={<Area/>}/>
          <Route path='/category/:category' element={<Bycategories/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;