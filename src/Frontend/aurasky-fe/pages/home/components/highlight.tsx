import { useEffect, useState } from "react";
import { HOST } from "../../../utils/constant";
import CardNFT from "./card-nfts";
import Loading from "./loading";

export default function Highlight() {
    const [error, setError] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);