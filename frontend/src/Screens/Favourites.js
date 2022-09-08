import React, { useState } from 'react';
import "./Favourites.css";

function Favourites() {
  const [temps, setTemps] = useState([1,2,3,4,5]);
  return (
    <div>
        {
          temps?.map(() => (
            <div>
              <img src="https://static.dw.com/image/62850747_101.jpg" alt="" />
            </div>
          ))
        }
    </div>
  )
};

export default Favourites