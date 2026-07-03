import React from "react";
import "./ProductCardStyles.css";

const ProductCardShimmer = () => {
  return (
    <div className="shimmerCardContainer">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="shimmerCard"
          />
        ))}
    </div>
  );
};

export default ProductCardShimmer;