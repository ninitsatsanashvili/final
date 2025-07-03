import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get("https://dummyjson.com/products");
            setData(response.data.products);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        }
    
        fetchData();
      }, []);

      return (data)
}