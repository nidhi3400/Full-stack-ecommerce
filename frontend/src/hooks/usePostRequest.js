import { useCallback, useState } from "react";

export const usePostRequest = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState([]);

    const postData = useCallback((requestObj, callback) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(requestObj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => {
                setIsLoading(false);
                setResponse(json);
                callback(true);
            })
    }, [])

    return { postData, response, isLoading };
}