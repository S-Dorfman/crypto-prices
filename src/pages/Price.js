import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Price() {
    // creating a state variable to hold coin data 
    const [coin, setCoin] = useState(null);
    //accessing the params object to get the symbol param ie - symbol"BTC"
    const params = useParams();
    console.log(params);

    //const apiKey = `FC2B7AA4-B1E1-45C5-9D96-551E24FB33DE`
    //to keep api private in .env - doesn't post to github
    const apiKey = process.env.REACT_APP_API_KEY;
    const symbol = params.symbol; 
    //domain name to make request 
    const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

        //function to fetch data from the coin api 
    const getCoin = async () => {
        try {
            //we get the data
          const res = await axios.get(url);  
          //set the data into state 
          setCoin(res.data); 
        } catch (error) {
            console.error(error);    
        }
    }

        //call the getCoin function when the component render for the first time 
        //empty array ? 
    useEffect(() => {
        getCoin();
    }, [])

    //function 
    const loaded = () => {
        return (
            <div>
                <h1>{coin.asset_id_base}/{coin.asset_id_quote}</h1>
                <h2>$ {coin.rate}</h2>
            </div>
        )
    }

        //function that were still waiting for data to come back
    const loading = () => <h1>Loading...</h1>;

    //if else 
    //What True False,  W ? T : F
    return coin && coin.rate ? loaded() : loading();


    
}

export default Price; 