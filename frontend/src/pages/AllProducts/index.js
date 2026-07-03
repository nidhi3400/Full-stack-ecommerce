import React from 'react'
import useGetAllProducts from '../../hooks/useGetAllProducts.js'
import { apis } from '../../constants/index.js'
import ProductCard from '../../components/ProductCard/index.js'
import ProductCardShimmer from '../../components/ProductCard/Shimmer.js'
import "./AllProductsPageStyles.css"

const AllProducts = () => {
    const { isLoading, listOfProducts } = useGetAllProducts(apis.GET_ALL_PRODUCTS)
    return (
        <div>
            {isLoading
                ? <ProductCardShimmer />
                : <div className='grid-container'>
                    {listOfProducts?.map(
                        (product, index) =>
                            <ProductCard key={`${JSON.stringify(product)}_${index}`} isLoading={isLoading} cardData={product} />
                    )
                    }
                </div>
            }
        </div>
    )
}

export default AllProducts
