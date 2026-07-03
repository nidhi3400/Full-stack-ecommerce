import { useState } from "react";

export const useDeleteRequest = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState([]);

    const removeData = (id, callback) => {
        fetch(`${url}/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(json => {
                setIsLoading(false);
                setResponse(json);
                callback();
            })
    }

    return { removeData, response, isLoading };
}