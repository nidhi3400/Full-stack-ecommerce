import { useState } from "react"

const useGetRequest = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = () => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                setIsLoading(false)
                setData(json)
            })
            .catch(err => console.error(err))
    }

    return { fetchData, isLoading, data };
};

export default useGetRequest;