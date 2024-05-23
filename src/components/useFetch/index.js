import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
// utiliser la vateur de Jotai atom pour re render apres mise à jour;
import { useAtomValue} from 'jotai';
import { userAtom } from '../atoms/user';

function useFetch(url, httpMethod, initialData = null, executeImmediately = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [readyToFetch, setReadyToFetch] = useState(executeImmediately);
  const [dataToFetch, setDataToFetch] = useState(initialData);
  const token = Cookies.get("token")
  const currentUser = useAtomValue(userAtom)

  useEffect(() => {
    if (readyToFetch) {
      setIsLoading(true);

      const headers = {
        "Content-Type": "application/json",
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      fetch(url, {
        method: httpMethod,
        headers: headers,
        body: JSON.stringify(dataToFetch),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        console.log("fetch ok");
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

        
    }
  }, [readyToFetch, url, httpMethod, dataToFetch, token, currentUser]);

  const executeFetch = (newData) => {
    console.log("jexecute");
    console.log(readyToFetch);
    setDataToFetch(newData);
    setReadyToFetch(true);
  };

  return { data, error, isLoading, executeFetch, setReadyToFetch };
}

export default useFetch;
