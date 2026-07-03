import { useCallback, useState } from "react";

export const useUpdateRequest = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState([]);

    const updateData = useCallback((requestObj, callback) => {
        fetch(`${url}/${requestObj?.id}`, {
            method: "PUT",
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
    }, [url])

    return { updateData, response, isLoading };
}