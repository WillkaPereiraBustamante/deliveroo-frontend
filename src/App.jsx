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
      <span>{data.restaurant.name}</span>
      <br />
      <ul>
        {data.categories.map((categories, index) => {
          return <li key={index}>{categories.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;