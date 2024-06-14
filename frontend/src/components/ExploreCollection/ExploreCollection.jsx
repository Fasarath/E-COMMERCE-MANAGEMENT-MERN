import React from 'react';
import './ExploreCollection.css';
import { collection_list } from '../../assets/assets';

const ExploreCollection = ({ category, setCategory }) => {
  return (
    <div className='explore-collection' id='explore-collection'>
      <h1>Explore our collection</h1>
      <p className='explore-collection-text'>
        Discover a curated selection of men's fashion essentials and statement pieces, each crafted with quality materials and attention to detail. Elevate your wardrobe with pieces that reflect your unique style.
      </p>
      <div className="explore-collection-list">
        {collection_list.length > 0 ? (
          collection_list.map((item, index) => (
            <div
              onClick={() => setCategory(prev => prev === item.collection_name ? "All" : item.collection_name)}
              key={index}
              className={`explore-collection-list-item ${category === item.collection_name ? "active" : ""}`}
            >
              <img src={item.collection_image} alt={item.collection_name} />
              <p>{item.collection_name}</p>
            </div>
          ))
        ) : ( 
          <p>No collections available.</p>
        )}
      </div>
      <hr />
    </div>
  );
}

export default ExploreCollection;
