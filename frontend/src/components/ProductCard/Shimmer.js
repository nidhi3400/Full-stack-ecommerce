import React from 'react'
import "./ProductCardStyles.css"

const ProductCardShimmer = () => {
  return <div className='shimmerCardContainer'>
    {Array(20).fill(0).map(
      (item, index) => <div key={`${item}_${index}`} className='shimmerCard'></div>
    )}
  </div>
}

export default ProductCardShimmer;
