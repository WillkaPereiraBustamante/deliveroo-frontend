import { useState, useEffect } from "react";
import "./App.css";
// import du package axios
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://site--deliveroo-backend--79d24psydslc.code.run/");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      {/* <Header/> */}
      <div className="presentation">
        <div className="presentation-title">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="presentation-picture">
          <img src={data.restaurant.picture} alt="restaurant table" />
        </div>
      </div>
      
      <br />
      <ul className="content container">
        {data.categories.map((categories, index) => {
          return <li className="category" key={index}>
            <h2>{categories.name}</h2>
            <div className="carrousel">
              {categories.meals.map((meals, id) => {
                return <div className="product-card" key={id}>
                  <div className="menu-item">
                     <h3>{meals.title}</h3>
                     <p>{meals.description}</p>
                     <div className="menu-item-infos">
                        <span>{meals.price} €</span>
                        {meals.popular && 
                          <span><i>*</i>Populaire</span>
                        }
                     </div>
                  </div>
                  {meals.picture && 
                    <img src={meals.picture} alt="" />
                  }
                </div>
              })}
            </div>
            
            </li>;
        })}
      </ul>
    </div>
  );
}

export default App;