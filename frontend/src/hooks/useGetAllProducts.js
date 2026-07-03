import { useState, useEffect } from "react"

const useGetAllProducts = (url, searchText = "") => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    /** Below variables are used to get data pagewise in batches in order to allow infinite scrolling */
    let pageOffset = 0, LIMIT = 30, total = -1;

    const fetchAllProducts = () => {
        const apiUrl = searchText
            ? `https://dummyjson.com/products/search?q=${searchText}&limit=${LIMIT}&skip=${pageOffset * LIMIT}`
            : `${url}?limit=${LIMIT}&skip=${pageOffset * LIMIT}`;
        fetch(apiUrl)
            .then(response => {
                return response.json();
            })
            .then(json => {
                setIsLoading(false)
                setData(data => data.concat(json?.products))
                /** Updating number of total records after first fetch call */
                if (total === -1) {
                    total = json?.total
                }
            })
    }

    const handleScroll = () => {
        /** Constant to store if the current set of data available have been scrolled.
         * This is being found by finding if the end of current page has been reached.
         * If it is true, we need to fetch data for batch
         */
        const isEndOfPageReached = window.scrollY + window.innerHeight >= document.body.scrollHeight
        if (isEndOfPageReached) {
            pageOffset += 1;
            if (total !== -1 && pageOffset * LIMIT <= total)
                fetchAllProducts();
        }
    }

    useEffect(() => {
        setData([]);
        setIsLoading(true);
        fetchAllProducts();
        window.addEventListener("scroll", handleScroll);
        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, [searchText]);

    return { isLoading, listOfProducts: data };
};

export default useGetAllProducts;