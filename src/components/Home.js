import React , {useState, useEffect} from "react";
import "./../Component_css/Home.css";
import Products from "./Products";
import {getProduct} from "./../Firebase.js";

function Home() {
  const [loading , setLoading] = useState(false);
  const [curr, setCurr] = useState(0);
  const [init , setInit] = useState(0);
  const [dynamicComponents, setDynamicComponents] = useState([]);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const displayComponent = async () => {

      let list = await getProduct(curr);
      let length = list.Items.length;
      let newList = list.Items;
      console.log(length);
      const componentsArray = [];
      
      for (let i = 0; i < newList.length; i += 3) {
        // Update two elements at a time in home__row div
        componentsArray.push(
          <div key={`row-${i}`} className="home__row">
            <Products
              id={`${curr + i}`}
              title={`${newList[i]?.title}`}
              price={newList[i]?.price}
              rating={5}
              image={`${newList[i]?.image}`}
            />
            {i + 2 < newList.length && (
              <Products
                id={`${curr + i + 2}`}
                title={`${newList[i + 2]?.title}`}
                price={newList[i + 2]?.price}
                rating={5}
                image={`${newList[i + 2]?.image}`}
              />
            )}
              {i + 1 < newList.length && (
              <Products
                id={`${curr + i + 1}`}
                title={`${newList[i + 1]?.title}`}
                price={newList[i + 1]?.price}
                rating={5}
                image={`${newList[i + 1]?.image}`}
              />
            )}
          </div>
        );
      }
    setDynamicComponents(componentsArray);
    setInit(curr+length);
    setLoading(true);
  };
    // Call the fetchData function when the component mounts
    displayComponent();
  }, [curr]);

  const handleButtonClick = (direction) => async (event) => {
    event.preventDefault();
    setLoading(false);
  
    if (direction === 'prev') {
      // Logic for previous button
      setCurr((prev) => Math.max(0, prev - 2)); // Adjust the logic as needed
    } else if (direction === 'next') {
      // Logic for next button
      setCurr((prev) => prev + 2); // Adjust the logic as needed
    }
  
    // Call the common logic
    await {curr};
  };

  //Next Btn
  const prevBtn =  (event) =>{
    event.preventDefault();
    handleButtonClick('prev');
  }
  const nextBtn =  (event) =>{
    event.preventDefault();
    handleButtonClick('next');
  }



  return (
    <div className="home">
      <img
        className="home__banner"
        alt=""
        src="https://i.imgur.com/C1dcRl7.png"
      />
  {!loading && (init === 1) && (
        <div>
          <p>{curr}</p>
        </div>)}
     {dynamicComponents}
     <div className="home__btn">
      <button onClick = {prevBtn} className="home__btn__left">
      Previous
      </button>
      <button onClick = {nextBtn} className="home__btn__ryt">
        Next
        </button>
     </div>
    </div>
  );
}

export default Home;