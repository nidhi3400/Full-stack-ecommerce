import React, { useState } from 'react'
import useGetAllProducts from '../../hooks/useGetAllProducts.js';
import useDebounce from "../../hooks/useDebounce";
import { apis } from '../../constants/index.js'
import ProductCard from '../../components/ProductCard/index.js'
import ProductCardShimmer from '../../components/ProductCard/Shimmer.js'
import "./AllProductsPageStyles.css"

const AllProducts = () => {

    const [searchText, setSearchText] = useState("");

    const debouncedSearchTerm = useDebounce(
        searchText,
        500
    );

    const { isLoading, listOfProducts } = useGetAllProducts(
        apis.GET_ALL_PRODUCTS,
        debouncedSearchTerm
    );;

    return (
        <div>
            {isLoading
                ? <ProductCardShimmer />
                :
                <>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div><div className='grid-container'>
                        {listOfProducts?.map(
                            (product, index) =>
                                <ProductCard key={`${JSON.stringify(product)}_${index}`} isLoading={isLoading} cardData={product} />
                        )
                        }
                    </div></>
            }
        </div>
    )
}

export default AllProducts
