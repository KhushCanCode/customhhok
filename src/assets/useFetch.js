import { useEffect, useState } from "react";


function useFetch(apiurl){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        const fetchData = async () => {
            try {
              const response = await fetch(apiurl);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              setData(result);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, [apiurl]);
        

    return {data, loading, error};
}

export default useFetch