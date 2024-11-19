import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--79d24psydslc.code.run/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <header>
        <div className="container">
          <div className="header-left">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt={data.restaurant.name} />
        </div>
      </header>
      <main>
        <div className="container">
          <div className="main-left">
            {data.categories.map((category) => {
              // console.log(category);
              if (category.meals.length !== 0) {
                return (
                  <section key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {category.meals.map((meal) => {
                        // console.log(meal);
                        return (
                          <article key={meal.id}>
                            <div>
                              <h3>{meal.title}</h3>
                              <p>{meal.description}</p>
                              <span>{meal.price} €</span>
                              {meal.popular && <span>Populaire</span>}
                            </div>

                            {meal.picture && (
                              <img src={meal.picture} alt={meal.title} />
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              }
            })}
          </div>
          <div className="main-right"></div>
        </div>
      </main>
    </>
  );
}

export default App;
