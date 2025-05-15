import { useState, useEffect } from "react";
import axios from "axios";

function UseFetch(url) {
    const[isLoading, setIsLoading] = useState(false);
    const[data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const { data } = await axios.get(url);

            setData(data)
            setIsLoading(false)
        }

        fetchData();
    }, [url])

    return {
        data,
        isLoading
    }
}


export default UseFetch;