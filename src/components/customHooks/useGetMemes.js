import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useGetMemes(after, page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);

    const getMemes = useCallback(async () => {
        try {
            await setLoading(true);
            await setError(false);
            const res = await axios.get(`https://www.reddit.com/r/memes/new.json?limit=25?after=${after}?count=${page * 25}`);
            await setList((prev) => [...prev, ...res.data.data]);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }, [after, page]);

    useEffect(() => {
        getMemes(after);
    }, [after, getMemes, page]);

    return { loading, error, list };
}

export default useGetMemes;