
import './App.css';
import { useEffect, useState } from "react";
import video from "./food.mp4";
import MyRecipesComponent from './MyRecipesComponent';

function App() {

  const API_ID = "5fcab87b";
  const API_KEY = "65d9c924598d3ffbbf14a48eaf9250fc";

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('avocado');

  useEffect(() => {
    const getRecipes = async () => { 
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setMyRecipes(data.hits)
  }
  getRecipes();
  }, [wordSubmitted]) 

 const myRecipeSearch = (e) => {
  setMySearch(e.target.value)
 }


const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

  return (
    <div className="App">
       <div className="container">
         <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
         </video>
            <h1>Find a Recipe</h1>
       </div>

       <div className='container'>
       <form onSubmit={finalSearch}>
        <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}>
        </input>
       </form>
       </div>
      
      <div className='container'>
       <button>
          <img src="https://pngicon.ru/file/uploads/yaichnitsa.png"alt='search' className='icons' />
       </button>
       </div>

       <div>
       {myRecipes.map((element, index) => (
        <MyRecipesComponent key={index}
        label={element.recipe.label} 
        image={element.recipe.image}
        calories={element.recipe.calories}
        ingredients={element.recipe.ingredientLines}
         />
       ))}
       </div>
     
    </div>
  
  );
}

export default App;
