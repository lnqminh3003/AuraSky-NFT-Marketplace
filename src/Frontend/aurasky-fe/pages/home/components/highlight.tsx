import { useEffect, useState } from "react";
import { HOST } from "../../../utils/constant";


export default function Highlight() {
    const [error, setError] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //TODO: fix modules

    useEffect(() => {
        fetch(`${HOST}/nft/get-all`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);
}
//reorganized, delete later