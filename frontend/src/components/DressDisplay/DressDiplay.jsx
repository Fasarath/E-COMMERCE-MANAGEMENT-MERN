import React from "react";
import { useSelector } from "react-redux";
import DressItem from "../DressItem/DressItem";
import "./DressDisplay.css";

const DressDisplay = ({ category }) => {
  const dressList = useSelector((state) => state.dress.dressList);

  return (
    <div className="dress-display" id="dress-display">
      <h2>Stylish dresses for you</h2>
      {dressList.length === 0 ? (
        <p className="no-item">No items available now</p>
      ) : (
        <div className="dress-display-list">
          {dressList.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <DressItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default DressDisplay;
